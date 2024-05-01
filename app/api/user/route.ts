//route handler
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bycript from "bcrypt";
import { revalidateTag } from "next/cache";

const salt = 10;

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        userId: true,
        avatarUrl: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // Exclude the password field
      },
    });
    if (users) {
      return NextResponse.json({ message: "sucess", users });
    } else {
      return NextResponse.json({ message: "failed to get users" });
    }
  } catch (error) {
    console.error(error);
  }
}

export async function POST(req: NextRequest) {
  const { userId, password, name, role, avatarUrl } = await req.json();
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
        avatarUrl,
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

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  console.log(id)
  if (id === null) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
    if (deleteUser) {
      return NextResponse.json({ message: "Deleted" });
    }
    return NextResponse.json({ message: "Error deleting" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting" });
  }
}
