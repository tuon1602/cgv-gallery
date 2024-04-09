//route handler
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bycript from "bcrypt";

const salt = 10;

export async function POST(req: NextRequest) {
  const { userId, password, name, role } = await req.json();
  const hashPassword = await bycript.hash(password, salt);
  try {
    const findDuplicateUser = await prisma.user.findFirst({
      where: {
        userId: userId,
      },
    });
    if (findDuplicateUser) {
      return NextResponse.json({ message: "user created" });
    }
    const user = await prisma.user.create({
      data: {
        userId,
        password: hashPassword,
        name,
        role,
      },
    });
    if (user) {
      return NextResponse.json({ message: "success", user });
    } else {
      return NextResponse.json({
        message: "cannot create user, please try again",
      });
    }
  } catch (err) {
    return NextResponse.json({ message: "error", err });
  }
}
