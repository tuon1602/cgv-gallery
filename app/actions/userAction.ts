"use server"
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bycript from "bcrypt";
import type { User } from "@prisma/client";
import { revalidateTag } from "next/cache";

export async function getAllUsers() {
  const res = await fetch(`${process.env.API_URL}/user`,{
    method:"GET",
    next:{
      tags:["users"]
    },
    cache:"no-store"
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


// const salt = 10;

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
