"use client";

import React from "react";
import { PhotoDetailResponse } from "@/types/photoDetail";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import AvatarLoading from "./loadings/AvatarLoading";
import ImageLoading from "./loadings/ImageLoading";

const CreatorAvatar = dynamic(() => import("./CreatorAvatar"), {
  loading: () => <AvatarLoading />,
});
const Photos = dynamic(() => import("./Photos"), {
  loading: () => <ImageLoading />,
});
const Comments = dynamic(() => import("./Comments"));
const PhotoDescription = dynamic(() => import("./PhotoDescription"), {
  loading: () => <p>Loading ....</p>,
});

interface IProps {
  detail: PhotoDetailResponse;
  imageId: string;
}

const PhotoDetail: React.FC<IProps> = ({ detail, imageId }) => {
  const session = useSession();
  return (
    <main className="space-y-3 max-md:px-2">
      <CreatorAvatar
        name={detail.images.createdBy.name}
        imageUrl={detail.images.createdBy.avatarUrl}
        userId={detail.images?.createdBy?.userId}
      />
      <PhotoDescription title={detail.images.title} description={detail.images.description}/>
      <Photos image={detail.images.imageUrl} />
      <Comments
        userCommentId={session?.data?.user?.id}
        likes={detail.images.likes}
        imageId={imageId}
        currentUser={session?.data?.user?.userId}
      />
    </main>
  );
};

export default PhotoDetail;
