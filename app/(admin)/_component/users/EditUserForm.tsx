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
import { createUserSchema } from "@/constants/schema";
import { revalidatePath, revalidateTag } from "next/cache";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

export default function AddUserForm() {
  const router = useRouter();
  const { reset } = useForm();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [avatarDisplay, setAvatarDisplay] = useState<string | null>(null);

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
  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      userId: "",
      password: "",
      name: "",
      role: "user",
      avatarUrl:
        "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg",
    },
  });
  async function onSubmit(values: z.infer<typeof createUserSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(values),
    });
    const data = await res.json();
    // console.log(data);
    if (data.message === "success") {
      router.refresh();
      setOpenDialog(false);
    }
    if (data.message === "user created") {
      toast.error("User created", {
        duration: 1000,
      });
    }
    toast.error("There is something wrong, please try again", {
      duration: 1000,
    });
  }
  return (
    <>
      <Dialog open={openDialog} onOpenChange={handleOpenDialog}>
        <DialogTrigger asChild>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add User
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-w-[560px] lg:max-w-[780px]">
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
            <DialogDescription>
              Add a new user here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-5"
            >
              <FormField
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
                name="password"
                render={({ field }) => (
                  <FormItem className="max-md:col-span-2">
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Default: 123"
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
                        defaultValue={field.value}
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
              <FormField
                control={form.control}
                name="avatarUrl"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="">Thêm ảnh</FormLabel>
                    {avatarDisplay ? (
                      <Image
                        src={avatarDisplay}
                        alt="avatar Immage preview"
                        width={200}
                        height={200}
                      />
                    ) : (
                      <Image
                        src="https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
                        alt="avatar Immage preview"
                        width={200}
                        height={200}
                      />
                    )}
                    <FormControl className="border py-[0.5rem] rounded-md">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="col-span-2 uppercase" type="submit">
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
