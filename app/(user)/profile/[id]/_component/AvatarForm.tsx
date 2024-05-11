"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface IProps {
  currentAvatar: string;
  userId: string;
}
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { changeAvatar } from "@/actions/userAction";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import ChangeAvatarSubmitButton from "./ChangeAvatarSubmitButton";

const AvatarForm: React.FC<IProps> = ({ currentAvatar, userId }) => {
  const { update } = useSession();
  const router = useRouter();
  const [state, changeAvatarAction] = useFormState(changeAvatar, undefined);
  const { pending } = useFormStatus();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<File>();
  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setAvatar(files[0]);
    }
  };
  useEffect(() => {
    if (state && state?.status === 200) {
      toast.success(state?.message);
      setAvatar(undefined);
    } else if (state && state?.status === 404) {
      toast.error(state?.message);
      setAvatar(undefined);
    }
  }, [state]);
  return (
    <>
      <Dialog>
        <DialogTrigger asChild className="cursor-pointer">
          <Avatar className="w-28 h-28 hover:opacity-65">
            <AvatarImage src={currentAvatar} alt="avatar" />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <form action={changeAvatarAction}>
            <DialogHeader>
              <DialogTitle>Edit Avatar</DialogTitle>
              <DialogDescription>
                Click the image to change new avatar
              </DialogDescription>
              <DialogDescription>
                Recommended ratio is 1:1 (200x200, 250x250, ....)
              </DialogDescription>
            </DialogHeader>
            <section className="w-full max-w-md mx-auto py-8">
              <div className="space-y-2">
                <div className="grid gap-4">
                  <div className="flex items-center justify-center">
                    <Label htmlFor="avatarInput" className="cursor-pointer">
                      {avatar ? (
                        <Avatar className="w-28 h-28 relative">
                          <AvatarImage
                            src={URL.createObjectURL(avatar)}
                            alt="avatar"
                          />
                          <AvatarFallback>Avatar</AvatarFallback>
                        </Avatar>
                      ) : (
                        <Avatar className="w-28 h-28">
                          <AvatarImage src={currentAvatar} alt="avatar" />
                          <AvatarFallback>Avatar</AvatarFallback>
                        </Avatar>
                      )}
                    </Label>
                  </div>
                  <Input
                    id="avatarInput"
                    type="file"
                    className="hidden"
                    name="avatarImage"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    ref={fileInputRef}
                  />
                  <Input value={userId} name="userId" type="hidden" />
                </div>
              </div>
            </section>
            <DialogFooter className="flex flex-col items-center sm:flex-row sm:justify-center sm:space-x-2">
              <ChangeAvatarSubmitButton avatar={avatar} />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AvatarForm;
