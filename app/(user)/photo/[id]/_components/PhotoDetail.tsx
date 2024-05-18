"use client";

import React from "react";
import { PhotoDetailResponse } from "@/types/photoDetail";
import dynamic from "next/dynamic";
import Comments from "./Comments";



const CreatorAvatar = dynamic(() => import("./CreatorAvatar"),{
    loading:()=><p>Loading ...</p>
});
const Photos = dynamic(() => import("./Photos"),{
    loading:()=><p>Loading ...</p>
});


interface IProps {
  detail: PhotoDetailResponse;
  imageId: string;
}

const PhotoDetail: React.FC<IProps> = ({ detail, imageId }) => {
  return (
    <main className="space-y-5">
      <CreatorAvatar
        name={detail.images.createdBy.name}
        imageUrl={detail.images.createdBy.avatarUrl}
        userId={detail.images?.createdBy?.userId}
      />
      <Photos image={detail.images.imageUrl}/>
      <Comments imageId={imageId} />
    </main>
  );
};

export default PhotoDetail;
