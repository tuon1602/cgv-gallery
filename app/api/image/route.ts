import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  try {
    const images = await prisma.image.findMany({
      include: {
        comments: true,
        tags: true,
        likers: {
          select: {
            id: true,
            userId: true,
            avatarUrl: true,
            role: true,
          },
        },
      },
    });
    if (images) {
      return NextResponse.json({ status: 200, message: "sucess", images });
    } else {
      return NextResponse.json({ status: 404, message: "failed to get users" });
    }
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Server error" });
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data);
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
