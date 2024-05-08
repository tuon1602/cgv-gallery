"use client";

import React from "react";

interface IProps {
  currentAvatar: string;
}
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AvatarForm: React.FC<IProps> = ({ currentAvatar }) => {
  return (
    <Avatar className="w-20 h-20">
      <AvatarImage src={currentAvatar} alt="avatar" />
      <AvatarFallback>Avatar</AvatarFallback>
    </Avatar>
  );
};

export default AvatarForm;
