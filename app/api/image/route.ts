import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  try {
    const images = await prisma.image.findMany({
      include: {
        createdBy: {
          select: {
            id: true,
            userId: true,
            avatarUrl: true,
            role: true,
          },
        },
        comments:true
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (images) {
      return NextResponse.json({ status: 200, message: "sucess", images });
    } else {
      return NextResponse.json({
        status: 404,
        message: "failed to get images",
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
      const res = await prisma.image.create({
        data: data,
      });
      return NextResponse.json({ status: 200, message: "Created", res });
    } else {
      return NextResponse.json({ status: 404, message: "failed to get users" });
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
    const res = await prisma.image.delete({
      where: {
        id: parseInt(paramsId),
      },
    });
    if (res) {
      return NextResponse.json({ status: 200, message: "Image deleted" });
    } else {
      return NextResponse.json({
        status: 400,
        message: "Failed to Delete image",
      });
    }
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Server error" });
  }
}
