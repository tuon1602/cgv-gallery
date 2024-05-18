import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const CreatorAvatar = ({
  imageUrl,
  userId,
  name,
}: {
  imageUrl: string;
  userId: string;
  name: string;
}) => {
  return (
    <section className="w-fit px-2">
      <Link href={`/profile/${userId}`} className="flex items-center gap-5">
        <Avatar className="w-16 h-16">
          <AvatarImage src={imageUrl} />
          <AvatarFallback className="text-sm">{userId}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-lg">{name}</p>
          <p className="text-sm text-gray-500">{userId}</p>
        </div>
      </Link>
    </section>
  );
};

export default CreatorAvatar;
