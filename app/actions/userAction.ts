"use server";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import type { User } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";
import { revalidate } from "../(user)/profile/[id]/page";

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

export async function getUserAvatar(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      userId: userId,
    },
    select: {
      avatarUrl: true,
    },
  });
  if (user) {
    return user;
  }
  else{
    throw new Error("There is no user")
  }
}

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

let dataImage: string;

async function postFile(postData: any) {
  try {
    const response = await fetch(`${process.env.API_GOOGLEDRIVE_AVATAR}`, {
      method: "POST",
      body: JSON.stringify(postData),
    });
    const data: any = await response.json();
    dataImage = data.link;
  } catch (error) {
    console.log(error);
  }
}

async function getUrl(image: File) {
  const buffer = await image.arrayBuffer();
  const base64Image = Buffer.from(buffer).toString("base64");
  const postData = {
    name: image.name,
    type: image.type,
    data: base64Image,
  };
  await postFile(postData);
}

export async function changeAvatar(prevState: any, formData: FormData) {
  const rawData = {
    avatar: formData.get("avatarImage") as File,
    userId: formData.get("userId") as string,
  };
  if (!rawData.avatar) {
    return { status: 404, message: "Missing params" };
  }
  await getUrl(rawData.avatar);
  const updateAvatarUser = await prisma.user.update({
    where: {
      userId: rawData.userId,
    },
    data: {
      avatarUrl: dataImage,
    },
  });
  if (updateAvatarUser) {
    revalidatePath("/", "layout");
    return { status: 200, message: "Updated avatar" };
  } else {
    return { status: 404, message: "Something went wrong" };
  }
}
