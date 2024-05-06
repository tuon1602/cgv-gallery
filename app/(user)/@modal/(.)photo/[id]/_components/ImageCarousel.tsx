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
  console.log(images);
  return (
    <>
      {/* <Carousel className="absolute w-[inherit] top-1/2 left-1/2 transform -translate-y-1/2 right-1/2">
       */}
      <Carousel className="w-full h-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem className="p-0 m-0">
              <Card className="border-0 p-0 m-0">
                <CardContent className="flex aspect-square items-center justify-center min-h-screen w-full border-0 p-0 m-0">
                  <Image src={image} alt={`${index}`} width={1000} height={1000} className="object-cover"/>
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
