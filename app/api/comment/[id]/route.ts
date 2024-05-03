import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const comments = await prisma.userComment.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: {
        commentedBy: {
          select: {
            id: true,
            avatarUrl: true,
            name: true,
            role: true,
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
