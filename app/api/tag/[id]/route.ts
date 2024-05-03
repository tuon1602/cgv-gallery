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

    const tag = await prisma.tag.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: {
        images: true,
      },
    });
    if (tag) {
      return NextResponse.json({ status: 200, message: "sucess", tag });
    } else {
      return NextResponse.json({ status: 404, message: "Image not found" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Server error" });
  }
}
