import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const imageId = searchParams.get("imageId");
  try {
    if (!userId || !imageId) {
      return NextResponse.json({
        status: 404,
        message: "Missing params",
      });
    }
    const existingLike = await prisma.like.findFirst({
      where: {
        userId: userId,
        imageId: parseInt(imageId),
      },
    });
    if (existingLike) {
      return NextResponse.json({
        status: 200,
        isLiked: true,
        id: existingLike.id,
      });
    } else {
      return NextResponse.json({ status: 200, isLiked: false });
    }
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Server error" });
  }
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    if (data) {
      const existingLike = await prisma.like.findFirst({
        where: {
          userId: data.userId,
          imageId: data.imageId,
        },
      });
      if (existingLike) {
        return NextResponse.json({
          status: "201",
          message: "Like already created",
        });
      }
      const res = await prisma.like.create({
        data: data,
      });
      await prisma.image.update({
        where: {
          id: data.imageId,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
      return NextResponse.json({ status: 200, message: "Created", res });
    } else {
      return NextResponse.json({
        status: 404,
        message: "failed to create like",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Server error" });
  }
}
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const paramsId = searchParams.get("id");
  try {
    if (!paramsId)
      return NextResponse.json({
        status: 404,
        message: "Missing params",
      });
    const like = await prisma.like.findUnique({
      where: {
        id: parseInt(paramsId),
      },
    });

    if (!like)
      return NextResponse.json({
        status: 404,
        message: "Like not found",
      });

    const deletedLike = await prisma.like.delete({
      where: {
        id: parseInt(paramsId),
      },
    });

    if (!deletedLike)
      return NextResponse.json({
        status: 400,
        message: "Failed to delete like",
      });
    await prisma.image.update({
      where: {
        id: like.imageId, // Update based on the associated imageId
      },
      data: {
        likes: {
          decrement: 1,
        },
      },
    });

    return NextResponse.json({ status: 200, message: "Like deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Server error" });
  }
}
