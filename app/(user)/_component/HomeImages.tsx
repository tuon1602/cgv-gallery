"use client";

import React from "react";
import { IGetAllImages } from "@/types";
import Image from "next/image";
import Link from "next/link";

const HomeImages = ({ imageData }: { imageData: IGetAllImages }) => {
  console.log(imageData);
  return (
    <>
      <section className="grid grid-cols-3 gap-4">
        {imageData?.images?.map((image, index) => (
          <Link key={image.id} href={`/photo/${image.id}`} className="relative cursor-pointer">
            <Image
              src={image.imageUrl[0]}
              alt={image.title}
              width={400}
              height={400}
              className="aspect-square object-cover"
            />
          </Link>
        ))}
      </section>
    </>
  );
};

export default HomeImages;
