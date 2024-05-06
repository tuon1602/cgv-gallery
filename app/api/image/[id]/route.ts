import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);
  try {
    if (!params.id)
      return NextResponse.json({ status: 404, message: "Missing params" });

    const images = await prisma.image.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: {
        comments: true,
        tags: true,
        createdBy: {
          select: {
            id: true,
            name: true,
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
      return NextResponse.json({ status: 404, message: "Image not found" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Server error" });
  }
}
