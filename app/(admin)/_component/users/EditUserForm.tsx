"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, PlusCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CldUploadButton, CldUploadWidget } from "next-cloudinary";
import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { editUserSchema } from "@/constants/schema";
import { revalidatePath, revalidateTag } from "next/cache";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

import { User } from "@/types";

interface UserEditProps {
  userData: User;
}

export default function EditUserForm({ userData }: UserEditProps) {
  const router = useRouter();
  const { reset } = useForm();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [avatarDisplay, setAvatarDisplay] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog((prev) => !prev);
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setAvatarDisplay(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      userId: userData.userId,
      name: userData.name,
      role: userData.role,
    },
  });
  async function onSubmit(values: z.infer<typeof editUserSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //fetch api put
    setLoading(true);
    const res = await fetch(`/api/user?id=${userData.id}`, {
      method: "PUT",
      body: JSON.stringify(values),
    });
    const data = await res.json();
    // console.log(data);
    if (data.message === "Updated") {
      toast.success("User Updated, Vui lòng đợi xíu :3", {
        duration: 1000,
      });
      setLoading(false);
      setTimeout(() => {
        router.refresh();
        setOpenDialog(false);
      }, 1000);
    } else {
      toast.error("There is something wrong, please try again", {
        duration: 1000,
      });
    }
  }
  return (
    <>
      <Dialog open={openDialog} onOpenChange={handleOpenDialog}>
        <DialogTrigger asChild>
          <Button size="sm" variant="ghost" className="w-full justify-start">
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-w-[560px] lg:max-w-[780px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-5"
            >
              <FormField
                defaultValue={userData.name}
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="max-md:col-span-2">
                    <FormLabel>Họ và Tên *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ví dụ:  Nguyễn Minh Tuấn"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mã nhân viên *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ví dụ: 214925" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Role *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={userData.role}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="col-span-2 uppercase" type="submit" disabled={loading}>
                {loading ? "Updating ...." :"Update"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
