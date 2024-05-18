import { IGetAllImages } from "@/types";
import React from "react";
import {
  getAllImageDirectFormDB,
  getAllImageHomeData,
} from "@/actions/imageActions";
import dynamic from "next/dynamic";
import { getImageDetail } from "@/actions/imageActions";
import { notFound } from "next/navigation";

const PhotoDetail = dynamic(() => import("./_components/PhotoDetail"));

const PhotoPage = async ({ params }: { params: { id: string } }) => {
  const image = await getImageDetail(params.id);
  console.log(image);
  if (!image || image.status != 200) {
    return notFound();
  }
  return (
    <main className="max-lg:w-full lg:max-w-[600px]  xl:max-w-[800px] 2xl:max-w-[1000px]  md:m-auto pt-5">
      <PhotoDetail detail={image} imageId={params.id} />
    </main>
  );
};

export default PhotoPage;
