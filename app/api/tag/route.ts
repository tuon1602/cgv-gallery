import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit");
  try {
    if (limit) {
      const tags = await prisma.tag.findMany({
        take: parseInt(limit),
      });
      return NextResponse.json({ status: 200, message: "success", tags });
    }
    const tags = await prisma.tag.findMany();
    if (tags) {
      return NextResponse.json({ status: 200, message: "success", tags });
    } else {
      return NextResponse.json({ status: 400, message: "failed to get tags" });
    }
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Server error" });
  }
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    if (data) {
      const res = await prisma.tag.create({
        data: data,
      });
      return NextResponse.json({ status: 200, message: "success", res });
    }
    return NextResponse.json({ status: 400, message: "failed to create" });
  } catch (error) {
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
    const res = await prisma.tag.delete({
      where: {
        id: parseInt(paramsId),
      },
    });
    if (res) {
      return NextResponse.json({ status: 200, message: "Tag deleted" });
    } else {
      return NextResponse.json({
        status: 400,
        message: "Failed to Delete tag",
      });
    }
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Server error" });
  }
}
