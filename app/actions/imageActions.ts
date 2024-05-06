"use server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { writeFile } from "fs/promises";
import { join } from "path";
import { getURL } from "next/dist/shared/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface IDataItems {
  status: string;
  name: string;
  id: string;
  view: string;
  link: string;
}

let postData: any = [];
let myImages: string[] = [];

export async function getAllImageHomeData() {
  const res = await fetch(`${process.env.API_URL}/image`, {
    method: "GET",
    next: {
      revalidate: 10,
    },
  });
  if (!res.ok) {
    throw new Error("Error fetching image");
  }
  return res.json();
}

//pushing image to Google Drive and get array urls
async function postFile(postData: any) {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzQvQOAAm77MqEkW_2fBmFxBELEIx3hyLZYieL-TABqleJZ7br4O0rIDOF8NzxN1QA0/exec",
      {
        method: "POST",
        body: JSON.stringify(postData),
      }
    );
    const data: IDataItems[] = await response.json();
    const linksArray: string[] = data.map((item: IDataItems) => item.link);
    myImages = [...linksArray];
  } catch (error) {
    console.log(error);
  }
}

// handling input images (conver to base64 and give it to postFile() function)
async function getUrl(images: File[]) {
  for (const image of images) {
    const buffer = await image.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");
    postData.push({
      name: image.name,
      type: image.type,
      data: base64Image,
    });
  }
  await postFile(postData);
  postData = []; //reset postData array
}

export async function createImage(prevState: any, formData: FormData) {
  const session = await getServerSession(authOptions);
  // const schema = z.object({
  //   title: z.string().nonempty(),
  //   description: z.string().nonempty(),
  //   images: typeof window === "undefined" ? z.any() : z.instanceof(File),
  // });
  // const data = schema.safeParse({
  //   title: formData.get("title"),
  //   description: formData.get("description"),
  //   images: formData.getAll("images") as File[],
  // });
  // if (!data.success) {
  //   let errorMessage = "";
  //   data.error.issues.forEach((issue) => {
  //     errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
  //   });
  //   return { message: errorMessage };
  // }
  // // await getUrl(data.data.images)

  // console.log(data.data);
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    images: formData.getAll("images") as File[],
  };
  if (!rawData.title) {
    return { message: "Please enter a title" };
  }
  if (!rawData.description) {
    return { message: "Please enter a description" };
  }
  if (rawData.images.length === 0 || rawData.images[0].size === 0) {
    return { message: "Please choose images" };
  }
  await getUrl(rawData.images);
  console.log(myImages);
  if (myImages.length > 0) {
    const res = await fetch(`${process.env.API_URL}/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: rawData.title,
        description: rawData.description,
        userId: session?.user?.userId,
        createdById: session?.user?.id,
        imageUrl: myImages,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.status === 200) {
      revalidatePath("/");
      redirect("/");
    } else {
      return { message: "There was an error creating post, please try again" };
    }
  }
  // console.log(rawData.images);
}

export async function getImageDetail(id: string) {
  const parseId = parseInt(id);
  const res = await fetch(`${process.env.API_URL}/image/${parseId}`, {
    method: "GET",
    next: {
      tags: ["image-details"],
    },
  });
  if (!res.ok) {
    throw new Error("Couldn't get image details");
  }
  const data = await res.json();
  return data;
}
