import ImageCarousel from "@/app/(user)/@modal/(.)photo/[id]/_components/ImageCarousel";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";

interface IProps {
  image: string[];
}

const Photos: React.FC<IProps> = ({ image }) => {
  console.log(image);
  return (
    <>
      {image.length > 1 ? (
        <Carousel className="">
          <CarouselContent>
            {image.map((image, index) => (
              <CarouselItem className="p-0 m-0 min-w-full" key={index}>
                <Card className="border-0 p-0 m-0 w-full min-w-full">
                  <CardContent className="relative border-0 p-0 m-0 w-full  md:aspect-video lg:aspect-[4/3] xl:aspect-video aspect-[5/4] ">
                    <Image
                      src={image}
                      alt={`${index}`}
                      fill
                      className="object-cover"
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
      ) : (
        <Card className="border-0 p-0 m-0">
          <CardContent className="relative border-0 p-0 m-0 w-full md:aspect-video aspect-[5/4] ">
            <Image
              alt="image"
              src={image[0]}
              fill
              loading="lazy"
              className="object-cover xl:object-contain"
            />
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Photos;
