import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  try {
    const images = await prisma.image.findMany({
      select: {
        id: true,
        userId: true,
        title: true,
        imageUrl: true,
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
