"use client";
import Image from "next/image";
import { useState, type FC, useRef, ChangeEvent, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IImageDetail } from "@/types";
import moment from "moment";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Copy, Heart, MessageCircle, SmilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { previousDay } from "date-fns";
import { createComment } from "@/app/actions/commentActions";
import { usePathname } from "next/navigation";
import { IImageComment } from "@/types";
import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButton";
import { toast } from "sonner";
import LikeButton from "./LikeButton";
import ImageCarousel from "./ImageCarousel";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PhotoDetailsProps {
  imageDetailData: IImageDetail;
  imageId: string;
  comments: IImageComment;
}

const PhotoDetails: React.FC<PhotoDetailsProps> = ({
  imageDetailData,
  imageId,
  comments,
}) => {
  const session = useSession();
  const pathname = usePathname();
  const [commentValue, setCommentValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  // @ts-ignore
  const [state, action] = useFormState(createComment, undefined);
  const handleFocusInput = () => {
    inputRef?.current?.focus();
  };
  const handleSetCommentValue = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentValue(event.target.value);
  };
  const handleEmojiSelect = (data: any) => {
    inputRef?.current?.focus();
    setCommentValue((prev) => prev + data.native);
  };
  useEffect(() => {
    if (state && state.message && state.message != "Created") {
      toast.error(state.message);
    } else if (state && state.message && state.message === "Created")
      toast.success(state.message);
  }, [state]);
  useEffect(() => {
    if (state?.message) {
      setCommentValue("");
    }
  }, [state]);
  return (
    <>
      <div className="grid grid-cols-2 w-full h-full items-center text-sm">
        <div className="relative h-full">
          {imageDetailData?.images?.imageUrl.length > 1 ? (
            <ImageCarousel images={imageDetailData.images.imageUrl} />
          ) : (
            <Image
              alt={imageDetailData?.images?.title}
              src={imageDetailData?.images?.imageUrl[0]}
              fill
              className="object-contain"
            />
          )}
        </div>

        <div className="bg-background w-full h-full px-8 pb-5 pt-5 flex justify-between flex-col">
          <div className="w-full">
            <div className="flex justify-between border-b border-b-border pb-2">
              <div className="flex items-center gap-3">
                <Link
                  target="_blank"
                  href={`/profile/${imageDetailData?.images?.createdBy?.userId}`}
                >
                  <Avatar>
                    <AvatarImage
                      src={imageDetailData?.images?.createdBy?.avatarUrl}
                      alt={imageDetailData?.images?.createdBy?.name}
                    />
                    <AvatarFallback>
                      {imageDetailData?.images?.createdBy?.name}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex flex-col gap-1">
                  <Link
                    target="_blank"
                    href={`/profile/${imageDetailData?.images?.createdBy?.userId}`}
                  >
                    <p>
                      {imageDetailData?.images?.createdBy?.name}{" "}
                      <span className="text-input">
                        ({imageDetailData?.images?.createdBy?.role})
                      </span>
                    </p>
                  </Link>
                  <p className="text-sm text-gray-500">
                    {imageDetailData?.images?.createdBy?.userId}
                  </p>
                </div>
              </div>
              <div>
                <p>
                  {moment(imageDetailData?.images?.createdAt).format(
                    "DD/MM/YYYY"
                  )}
                </p>
              </div>
            </div>
            <div className="pt-2 overflow-y-scroll max-h-[700px]">
              <div className="flex items-center gap-3">
                <Link
                  target="_blank"
                  href={`/profile/${imageDetailData?.images?.createdBy?.userId}`}
                >
                  <Avatar>
                    <AvatarImage
                      src={imageDetailData?.images?.createdBy?.avatarUrl}
                      alt={imageDetailData?.images?.createdBy?.name}
                    />
                    <AvatarFallback>
                      {imageDetailData?.images?.createdBy?.name}
                    </AvatarFallback>
                  </Avatar>
                </Link>

                <div className="flex flex-col gap-1">
                  <Link
                    target="_blank"
                    href={`/profile/${imageDetailData?.images?.createdBy?.userId}`}
                  >
                    <p>{imageDetailData?.images?.createdBy?.name}</p>
                  </Link>

                  <p className="text-sm text-gray-500">
                    {imageDetailData?.images?.createdBy?.userId}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <p>{imageDetailData?.images?.title}</p>
              </div>
              <div className="mt-2">
                <p className="capitalize">
                  {imageDetailData?.images?.description}
                </p>
              </div>
              <div className="mt-4 flex flex-col gap-5">
                {comments?.allCommentsByImageId?.map((comment, index) => (
                  <div key={comment.id} className="flex gap-4">
                    <div className="flex items-center gap-3">
                      <Link
                        target="_blank"
                        href={`/profile/${comment.commentedBy?.userId}`}
                      >
                        <Avatar>
                          <AvatarImage
                            src={comment.commentedBy?.avatarUrl}
                            alt={comment.commentedBy?.name}
                          />
                          <AvatarFallback>
                            {comment.commentedBy?.name}
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="flex flex-col gap-1">
                        <Link
                          target="_blank"
                          href={`/profile/${comment.commentedBy?.userId}`}
                        >
                          <p>{comment.commentedBy?.name}</p>
                        </Link>
                        <p className="text-sm text-gray-500">
                          {comment?.userId}
                        </p>
                      </div>
                    </div>
                    <div>{comment.content}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="border-b border-b-border py-2 flex items-center justify-between">
              <div className="flex gap-5">
                <LikeButton
                  imageId={imageId}
                  userId={session?.data?.user?.userId}
                />
                <button onClick={handleFocusInput}>
                  <MessageCircle className="cursor-pointer" />
                </button>
                <TooltipProvider delayDuration={10}>
                  <Tooltip>
                    <TooltipTrigger>
                      {" "}
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(window.location.href)
                        }
                      >
                        <Copy className="cursor-pointer" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy Url</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-md">
                {imageDetailData?.images?.likes > 0 ? (
                  <p>{imageDetailData?.images?.likes} likes</p>
                ) : (
                  <p>0 like</p>
                )}
              </div>
            </div>
            <div className="py-2">
              <form
                ref={formRef}
                className="flex justify-between items-center"
                action={action}
              >
                {/* <DropdownMenu>
                  <DropdownMenuTrigger>
                    <SmilePlus />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Picker data={data} onEmojiSelect={console.log} />
                  </DropdownMenuContent>
                </DropdownMenu> */}
                <Dialog>
                  <DialogTrigger>
                    <SmilePlus />
                  </DialogTrigger>
                  <DialogContent className="w-fit">
                    <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                  </DialogContent>
                </Dialog>
                <Input
                  onChange={handleSetCommentValue}
                  value={commentValue}
                  ref={inputRef}
                  type="text"
                  placeholder="Add a comment ..."
                  className="ring-offset-0 border-0 focus-visible:ring-0 focus-visible:ring-ring-0 focus-visible:ring-offset-0"
                  name="content"
                />
                <Input
                  type="hidden"
                  name="userId"
                  value={session?.data?.user?.userId}
                />
                <Input type="hidden" name="imageId" value={parseInt(imageId)} />
                <Input
                  type="hidden"
                  name="userCommentId"
                  value={parseInt(session?.data?.user?.id as any)}
                />
                <SubmitButton />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotoDetails;
