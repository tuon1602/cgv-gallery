import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageIdQuery = searchParams.get("imageId");
  try {
    if (imageIdQuery) {
      const allCommentsByImageId = await prisma.userComment.findMany({
        where: {
          imageId: parseInt(imageIdQuery),
        },
        include: {
          commentedBy: {
            select: {
              id: true,
              avatarUrl: true,
              name: true,
              role: true,
              userId:true
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return NextResponse.json({
        status: 200,
        message: "sucess",
        allCommentsByImageId,
      });
    }
    const comments = await prisma.userComment.findMany({
      include: {
        commentedBy: {
          select: {
            id: true,
            avatarUrl: true,
            name: true,
            role: true,
            userId:true
          },
        },
        image: true,
      },
    });
    if (comments) {
      return NextResponse.json({ status: 200, message: "sucess", comments });
    } else {
      return NextResponse.json({
        status: 404,
        message: "failed to get Comments",
      });
    }
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Server error" });
  }
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    if (data) {
      const res = await prisma.userComment.create({
        data: data,
      });
      return NextResponse.json({ status: 200, message: "Created", res });
    } else {
      return NextResponse.json({
        status: 404,
        message: "failed to create Comment",
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
    const res = await prisma.userComment.delete({
      where: {
        id: parseInt(paramsId),
      },
    });
    if (res) {
      return NextResponse.json({ status: 200, message: "Comment deleted" });
    } else {
      return NextResponse.json({
        status: 400,
        message: "Failed to Delete Comment",
      });
    }
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Server error" });
  }
}
export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const paramsId = searchParams.get("id");
  const data = await req.json();
  try {
    if (!paramsId || !data)
      return NextResponse.json({
        status: 404,
        message: "Missing params",
      });
    if (data) {
      const res = await prisma.userComment.update({
        where: {
          id: parseInt(paramsId),
        },
        data: {
          content: data.content,
        },
      });
      return NextResponse.json({ status: 200, message: "updated", res });
    } else {
      return NextResponse.json({
        status: 404,
        message: "failed to update comment",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Server error" });
  }
}
