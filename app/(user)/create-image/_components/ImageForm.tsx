"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { createImage } from "@/actions/imageActions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { Toaster, toast } from "sonner";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { Image as ImageLogo } from "lucide-react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "./SubmitButton";

const initialState = {
  message: null,
};

const ImageForm = () => {
  const inputImage = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { data: session, status } = useSession();
  //@ts-ignore
  const [state, formAction] = useFormState(createImage, initialState);
  const [images, setImages] = useState<File[]>([]);
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedImages = Array.from(event.target.files || []);
    setImages(selectedImages);
  };
  const handleDeleteImage = () => {
    if (inputImage.current) {
      inputImage.current.value = "";
      inputImage.current.type = "text";
      inputImage.current.type = "file";
    }
    setImages([]);
  };
  useEffect(() => {
    if (state && state.message && state.message != "Success") {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <>
      <form
        action={formAction}
        className="p-5 grid grid-cols-2 max-md:w-full md:w-2/3 xl:max-w-[700px] 2xl:max-w-[1000px] m-auto gap-5"
        ref={formRef}
      >
        <div>
          <Label>Title</Label>
          <Input type="text" placeholder="Enter your title" name="title" />
        </div>
        <div className="col-span-2">
          <Label>Description</Label>
          <Textarea
            placeholder="Enter your description"
            name="description"
            rows={6}
          />
        </div>
        {status === "authenticated" && (
          <div>
            <Label>UserId</Label>
            <Input
              disabled
              defaultValue={session.user?.userId}
              type="text"
              placeholder="Enter your description"
              name="userId"
            />
          </div>
        )}
        {status === "authenticated" && (
          <div>
            <Label>RegularId</Label>
            <Input
              disabled
              defaultValue={session.user?.id}
              type="text"
              placeholder="Enter your description"
              name="id"
            />
          </div>
        )}
        <div className="col-span-2">
          <Card>
            <CardContent className="p-6 space-y-4">
              <Label
                aria-valuetext="file"
                htmlFor="file"
                className="cursor-pointer"
              >
                <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
                  <ImageLogo className="w-12 h-12" />
                  <span className="text-sm font-medium text-gray-500">
                    Your images with show up here
                  </span>
                  <span className="text-xs text-gray-500">png,jpg,...</span>
                </div>
              </Label>

              <div className="space-y-2 text-sm">
                <Input
                  accept="image/*"
                  id="file"
                  name="images"
                  placeholder="File"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                  ref={inputImage}
                />
              </div>
              <CardFooter>
                {images.length > 0 && (
                  <div className="grid grid-cols-2 mt-5 gap-10 relative">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={URL.createObjectURL(image)}
                          alt={`Image ${index + 1}`}
                          width={400}
                          height={400}
                          className="object-contain"
                        />
                      </div>
                    ))}
                    <Button
                      className="bg-red-500 text-white hover:bg-red-600 col-span-2"
                      onClick={handleDeleteImage}
                    >
                      Delete all images
                    </Button>
                  </div>
                )}
              </CardFooter>
            </CardContent>
          </Card>
        </div>
        {/* {state?.message != "Created" && (
          <p role="status" className="text-red-500 col-span-2 text-center">
            {state?.message}
          </p>
        )} */}
        <SubmitButton />
      </form>
      <Toaster position="top-center" richColors duration={1000} />
    </>
  );
};

export default ImageForm;
