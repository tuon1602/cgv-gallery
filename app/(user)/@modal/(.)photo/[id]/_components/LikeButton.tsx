"use client";

import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IProps {
  userId: string | undefined;
  imageId: string;
}

const LikeButton: React.FC<IProps> = ({ userId, imageId }) => {
  const router = useRouter();
  const [liked, setLiked] = useState<boolean>(false);
  const [likedId, setLikedId] = useState<number | undefined>(undefined);

  const deleteLike = async (likeId: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/like?id=${likeId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data.status === 200) {
        setLiked(false);
        router.refresh();
      } else {
        toast.error("Something went wrong,please try again");
      }
    } catch (error) {
      toast.error("Something went wrong,please try again");
    }
  };

  const createLike = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/like`, {
        method: "POST",
        body: JSON.stringify({
          userId: userId,
          imageId: parseInt(imageId),
        }),
      });
      const data = await res.json();
      if (data.status === 200) {
        setLiked(true);
        router.refresh();
      } else {
        toast.error("Something went wrong,please try again");
      }
    } catch (error) {
      toast.error("Something went wrong,please try again");
    }
  };

  useEffect(() => {
    const checkLiked = async () => {
      try {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL
          }/like?userId=${userId}&imageId=${parseInt(imageId)}`,
          { method: "GET" }
        );
        if (res.ok) {
          const data = await res.json();
          if (data.status === 200) {
            setLiked(data.isLiked);
            setLikedId(data.id);
          }
        } else {
          console.error("Failed to check like:", res.status, res.statusText);
        }
      } catch (error) {
        console.error("Error checking like:", error);
      }
    };
    checkLiked();
  }, []);
  useEffect(() => {
    const checkLiked = async () => {
      try {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL
          }/like?userId=${userId}&imageId=${parseInt(imageId)}`,
          { method: "GET" }
        );
        if (res.ok) {
          const data = await res.json();
          if (data.status === 200) {
            setLiked(data.isLiked);
            setLikedId(data.id);
          }
        } else {
          console.error("Failed to check like:", res.status, res.statusText);
        }
      } catch (error) {
        console.error("Error checking like:", error);
      }
    };
    checkLiked();
  }, [liked, userId, imageId]);

  const handleLikeButtonClick = () => {
    if (liked) {
      deleteLike(likedId!); // Delete like if already liked
    } else {
      createLike(); // Create like if not liked
    }
  };

  return (
    <TooltipProvider delayDuration={10}>
      <button onClick={handleLikeButtonClick} className="like-button">
        {liked ? (
          <FaHeart className="w-5 h-5 text-red-500" />
        ) : (
          <span>
            <FaRegHeart className="w-5 h-5" />
          </span>
        )}
      </button>
    </TooltipProvider>
  );
};

export default LikeButton;
