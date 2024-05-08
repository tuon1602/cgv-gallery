import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { searchParams } = new URL(req.url);
  try {
    if (!params.userId)
      return NextResponse.json({ status: 404, message: "Missing params" });

    const user = await prisma.user.findUnique({
      where: {
        userId: params.userId,
      },
      select: {
        id: true,
        userId: true,
        avatarUrl: true,
        name: true,
        role: true,
        images: {
          include: {
            comments: true,
          },
        },
      },
    });
    if (user) {
      return NextResponse.json({ status: 200, message: "Sucess", user });
    } else {
      return NextResponse.json({ status: 404, message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Server error" });
  }
}
