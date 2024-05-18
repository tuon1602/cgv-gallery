import LikeButton from "./LikeButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy, MessageCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

interface IProps {
  imageId: string;
}
const Comments: React.FC<IProps> = ({ imageId }) => {
  const session = useSession();
  const handleFocusInput = () => {};
  return (
    <>
      <div className="flex gap-5">
        <LikeButton imageId={imageId} userId={session?.data?.user?.userId} />
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
    </>
  );
};

export default Comments;
