"use client";

import React, { useState } from "react";
import { IGetAllImages } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Images, Heart, MessageSquare } from "lucide-react";

const HomeImages = ({ imageData }: { imageData: IGetAllImages }) => {
  const [isShown, setIsShown] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const handleMouseEnter = (index: any) => {
    setIsShown(true);
    setCurrentImage(index);
  };

  const handleMouseLeave = () => {
    setIsShown(false);
  };

  return (
    <>
      <section className="grid grid-cols-3 gap-2">
        {imageData?.images?.map((image, index) => (
          <div key={image.id}>
            <Link
              href={`/photo/${image.id}`}
              className="relative cursor-pointer hover:bg-muted-background hover:opacity-60"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                src={image.imageUrl[0]}
                alt={image.title}
                width={400}
                height={400}
                className="aspect-square object-cover"
              />
              {image.imageUrl.length > 1 && (
                <Images className="absolute right-2 top-2 w-5 h-5 shadow-xl drop-shadow-2xl text-blue-500" />
              )}
              {isShown && currentImage === index && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                  <div className="flex text-primary font-bold items-center gap-5">
                    <div className="flex gap-2">
                      <Heart /> <p>{image.likes}</p>
                    </div>
                    <div className="flex gap-2">
                      <MessageSquare /> <p>{image.comments.length}</p>
                    </div>
                  </div>
                </div>
              )}
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default HomeImages;
