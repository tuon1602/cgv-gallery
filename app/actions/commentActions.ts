"use server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function getCommentByImageId(imageIdQuery: string) {
  const res = await fetch(
    `${process.env.API_URL}/comment?imageId=${imageIdQuery}`,
    {
      method: "GET",
      next: {
        tags: ["allComments"],
      },
    }
  );
  if (res.ok) {
    return res.json();
  }
}

export async function createComment(prevState: any, formData: FormData) {
  const rawData = {
    content: formData.get("content"),
    userId: formData.get("userId"),
    userCommentId: formData.get("userCommentId"),
    imageId: formData.get("imageId"),
  };
  let userCommentId: number | null = null;
  let imageId: number | null = null;

  if (typeof rawData.userCommentId === "string") {
    userCommentId = parseInt(rawData.userCommentId, 10);
  }
  if (typeof rawData.imageId === "string") {
    imageId = parseInt(rawData.imageId, 10);
  }
  if (
    !rawData.content ||
    !rawData.userId ||
    !rawData.userCommentId ||
    !rawData.imageId
  ) {
    return { resetKey:Math.random(),message: "Missing params, try again" };
  } else {
    const res = await fetch(`${process.env.API_URL}/comment`, {
      method: "POST",
      body: JSON.stringify({
        content: rawData.content,
        userId: rawData.userId,
        userCommentId: userCommentId,
        imageId: imageId,
      }),
    });
    if (!res.ok) return { message: "Error creating comment" };
    const data = await res.json();
    console.log(data)
    if (data.status === 200) {
      revalidateTag("allComments");
      revalidatePath("/")
      return {resetKey:Date.now().toString(),message:"Created"}
    } else {
      return {message: "Error creating comment" };
    }
  }
}
