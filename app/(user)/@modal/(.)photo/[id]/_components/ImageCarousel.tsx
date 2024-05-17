import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface IProps {
  images: string[];
}

const ImageCarousel: React.FC<IProps> = ({ images }) => {
  return (
    <>
      {/* <Carousel className="absolute w-[inherit] top-1/2 left-1/2 transform -translate-y-1/2 right-1/2">
       */}
      <Carousel className="">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem
              className="p-0 m-0 min-w-full max-lg:h-[300px] basis-0"
              key={index}
            >
              <Card className="border-0 p-0 m-0">
                <CardContent className="relative max-lg:aspect-[5/4] max-lg:w-full max-lg:h-full flex items-center justify-center lg:min-h-screen border-0 p-0 m-0">
                  <Image
                    src={image}
                    alt={`${index}`}
                    fill
                    className="object-cover xl:object-contain"
                    onClick={() => window.location.reload()}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </>
  );
};

export default ImageCarousel;
