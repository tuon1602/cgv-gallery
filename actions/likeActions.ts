"use server"

export async function createLike(prevState:any,formData: FormData) {
  const rawData = {
    userId: formData.get("userId"),
    imageId: formData.get("imageId"),
  };
  let imageId: number | null = null;
  if (typeof rawData.imageId === "string") {
    imageId = parseInt(rawData.imageId, 10);
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/like`, {
    method: "POST",
    body: JSON.stringify({
      userId: rawData.userId,
      imageId: imageId
    }),
  });
  if (!res.ok) return { message: "Error creating comment" };
  const data= await res.json()
  console.log(data)
  if(data.status===200){
    return {key:"ok",message:"like created"}
  }
  else{
    return {message: "Error creating like"}
  }
}

export async function delteLike() {}
