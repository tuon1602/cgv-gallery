import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);
  console.log("wtf")
  try {
    const images = await prisma.image.findUnique({
      where:{
        id:parseInt(params.id)
      }
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
