import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LikeButton from "./LikeButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy, MessageCircle, SmilePlus } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/app/(user)/@modal/(.)photo/[id]/_components/SubmitButton";
import { useFormState } from "react-dom";
import { createComment } from "@/actions/commentActions";
import { toast } from "sonner";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";

interface CommentedBy {
  id: number;
  avatarUrl: string;
  name: string;
  role: string;
  userId: string;
}

interface Comment {
  id: number;
  content: string;
  userId: string;
  userCommentId: number;
  imageId: number;
  createdAt: string;
  updatedAt: string;
  commentedBy: CommentedBy;
}

interface CommentsResponse {
  status: number;
  message: string;
  allCommentsByImageId: Comment[];
}

interface IProps {
  imageId: string;
  currentUser: string | undefined;
  likes: number;
  userCommentId: number | undefined;
}
const Comments: React.FC<IProps> = ({
  imageId,
  currentUser,
  likes,
  userCommentId,
}) => {
  const [commentValue, setCommentValue] = useState<string>("");
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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
  useEffect(() => {
    const fetchGetAllComments = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comment?imageId=${imageId}`
      );
      if (!res.ok) {
        return notFound();
      }
      const data: CommentsResponse = await res.json();
      setAllComments(data.allCommentsByImageId);
    };
    fetchGetAllComments();
  }, [state]);
  return (
    <>
      <section className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          {currentUser ? (
            <LikeButton imageId={imageId} userId={currentUser} />
          ) : (
            <FaRegHeart className="w-5 h-5" />
          )}
          <button onClick={handleFocusInput}>
            <MessageCircle className="cursor-pointer" />
          </button>
          <TooltipProvider delayDuration={10}>
            <Tooltip>
              <TooltipTrigger>
                {" "}
                <Copy
                  className="cursor-pointer "
                  onClick={() =>
                    navigator.clipboard.writeText(window.location.href)
                  }
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy Url</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="text-md">
          {likes > 0 ? <p>{likes} likes</p> : <p>0 like</p>}
        </div>
      </section>
      <section>
        <Dialog>
          <DialogTrigger>
            <p>View all {allComments.length} comments</p>
          </DialogTrigger>
          <DialogContent className="min-w-[400px] max-h-[500px] overflow-y-scroll">
            {allComments.map((comment, index) => (
              <div key={comment.id}>
                <Link
                  href={`/profile/${comment.commentedBy.userId}`}
                  className="flex items-center gap-2"
                >
                  <Avatar>
                    <AvatarImage src={comment.commentedBy.avatarUrl} />
                    <AvatarFallback className="text-sm">
                      {comment.commentedBy.userId}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p>
                      {comment.commentedBy.name}{" "}
                      <span className="text-sm text-gray-600">
                        (
                        {moment(comment.createdAt).format(
                          "DD/MM/YYYY"
                        )}
                        )
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      {comment.commentedBy.userId}
                    </p>
                  </div>
                </Link>
                <p className="mt-2">{comment.content}</p>
              </div>
            ))}
          </DialogContent>
        </Dialog>
      </section>
      <section>
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
          <Input type="hidden" name="userId" value={currentUser} />
          <Input type="hidden" name="imageId" value={parseInt(imageId)} />
          <Input type="hidden" name="userCommentId" value={userCommentId} />
          <SubmitButton />
        </form>
      </section>
    </>
  );
};

export default Comments;
