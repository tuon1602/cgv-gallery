import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ImageLoading = () => {
  return (
    <>
      <Skeleton className="w-full md:aspect-video aspect-[5/4]" />
    </>
  );
};

export default ImageLoading;
