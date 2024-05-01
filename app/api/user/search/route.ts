import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const query = url.searchParams.get("query");
  try {
    const result = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: `${query}`,
              mode: "insensitive",
            },
          },
          {
            userId: {
              contains: `${query}`,
              mode: "insensitive",
            },
          },
          {
            role: {
              contains: `${query}`,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    if (result) {
      return NextResponse.json({ message: "success", result });
    } else {
      return NextResponse.json({ message: "No results" });
    }
  } catch (error) {
    return NextResponse.json({ message: "Error", error });
  }
}
