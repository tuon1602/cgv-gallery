"use server";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import type { User } from "@prisma/client";
import { revalidateTag } from "next/cache";

export async function getAllUsers() {
  const res = await fetch(`${process.env.API_URL}/user`, {
    method: "GET",
    next: {
      tags: ["users"],
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Cannot get all users");
  }
  return res.json();
}

export async function getAdmins() {
  const users = await prisma.user.findMany({
    where: {
      role: "admin",
    },
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
  revalidateTag("users-admin");
  return users;
}

export async function getUsers() {
  const users = await prisma.user.findMany({
    where: {
      role: "user",
    },
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
  revalidateTag("users-admin");
  return users;
}
export async function getUserById(userId: string) {
  const res = await fetch(`${process.env.API_URL}/user/${userId}`, {
    method: "GET",
    next: {
      tags: ["user_detail"],
      revalidate: 2,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Cannot get all users");
  }
  if (data && data.status !== 200) {
    throw new Error(data.message);
  }
  return data.user;
}

// export async function createUser(req: NextRequest) {
//   const { userId, password, name, role } = await req.json();
//   const hashPassword = await bycript.hash(password, salt);
//   try {
//     const findDuplicateUser = await prisma.user.findFirst({
//       where: {
//         userId: userId,
//       },
//     });
//     if (findDuplicateUser) {
//       return NextResponse.json({ message: "user created" });
//     }
//     const user = await prisma.user.create({
//       data: {
//         userId,
//         password: hashPassword,
//         name,
//         role,
//       },
//     });
//     if (user) {
//       return NextResponse.json({ message: "success", user });
//     } else {
//       return NextResponse.json({
//         message: "cannot create user, please try again",
//       });
//     }
//   } catch (err) {
//     return NextResponse.json({ message: "error", err });
//   }
// }

export async function changePassword(prevState: any, formData: FormData) {
  const salt = 10;
  const rawData = {
    currentPassword: formData.get("current-password") as string,
    newPassword: formData.get("new-password") as string,
    userId: formData.get("userId") as string,
  };
  if (!rawData.newPassword || !rawData.currentPassword) {
    return {
      status: 400,
      message: "Missing current password field or new password field",
    };
  }
  if (rawData.newPassword.length < 3) {
    return {
      status: 400,
      message: "Your new password must be at least 3 characters",
    };
  }
  if (rawData.newPassword === rawData.currentPassword) {
    return {
      status: 400,
      message: "Your new password is equal to the current password",
    };
  }
  const user = await prisma.user.findUnique({
    where: {
      userId: rawData.userId,
    },
  });
  if (user) {
    const match = await bcrypt.compare(rawData.currentPassword, user?.password);
    if (match) {
      const newPasswordHash = await bcrypt.hash(rawData.newPassword, salt);
      const updatePassword = await prisma.user.update({
        where: {
          userId: rawData.userId,
        },
        data: {
          password: newPasswordHash,
        },
      });
      return { status: 200, message: "Updated password" };
    }
    return { status: 400, message: "Password does not match" };
  }
  return { status: 404, message: "There has problem updating your password" };
}
