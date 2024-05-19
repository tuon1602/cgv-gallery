
import React from "react";
import { getImageDetail } from "@/actions/imageActions";
import { notFound } from "next/navigation";
import PhotoDetail from "./_components/PhotoDetail";

const PhotoPage = async ({ params }: { params: { id: string } }) => {
  const image = await getImageDetail(params.id);
  console.log(image);
  if (!image || image.status != 200) {
    return notFound();
  }
  return (
    <main className="max-md:w-full md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] 2xl:max-w-[1000px]  md:m-auto pt-5 max-lg:pb-[100px]">
      <PhotoDetail detail={image} imageId={params.id} />
    </main>
  );
};

export default PhotoPage;
