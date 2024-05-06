import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { toLowerCaseNonAccentVietnamese } from "@/helper/convertVNtoEngStr";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  const date = searchParams.get("date");
  try {
    if (query) {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            {
              name: {
                startsWith: query,
                mode: "insensitive",
              },
            },
            {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              userId: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
        select: {
          id: true,
          userId: true,
          avatarUrl: true,
          name: true,
        },
        take: 10,
      });
      const images = await prisma.image.findMany({
        where: {
          OR: [
            {
              title: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              createdBy: {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            },
            {
              createdBy: {
                userId: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            },
          ],
        },
        select: {
          id: true,
          userId: true,
          title: true,
          createdBy: {
            select: {
              id: true,
              userId: true,
              avatarUrl: true,
              name: true,
            },
          },
          imageUrl: true,
        },
        take: 10,
      });
      const result = { users, images };
      return NextResponse.json({ status: 200, message: "Success", result });
    }
    if (date) {
      const convertedDate = new Date(date);
      convertedDate.setUTCHours(convertedDate.getUTCHours() + 24);
      const newDateString = convertedDate.toString();
      const startOfDay = new Date(newDateString);
      startOfDay.setUTCHours(0, 0, 0, 0);
      const endOfDay = new Date(newDateString);
      endOfDay.setUTCHours(23, 59, 59, 999);
      const result = await prisma.image.findMany({
        where: {
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
        include: {
          createdBy: {
            select: {
              id: true,
              userId: true,
              avatarUrl: true,
              role: true,
            },
          },
          comments: true,
        },
      });
      return NextResponse.json({
        status: 200,
        message: "Success",
        images: result,
      });
    }
    return NextResponse.json({ status: 400, message: "No result found" });
  } catch (err) {
    return NextResponse.json({ status: 500, message: "Server Error" });
  }
}
