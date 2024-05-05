"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSession, signIn, signOut } from "next-auth/react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userLoginSchema } from "@/constants/schema";

export function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof userLoginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const { userId, password } = values;
    signIn("credentials", {
      userId,
      password,
      redirect: false,
    }).then((res) => {
      if (res?.ok && res?.status === 401) {
        toast.error("Id or password is incorrect", {
          duration: 800,
        });
        return null;
      }
      if (res?.ok && res?.status === 200) {
        toast.success("Login sucessful, going to homepage", {
          duration: 800,
        });
        router.push("/");
      } else {
        toast.error("Id or password is incorrect", {
          duration: 800,
        });
        return null;
      }
    });
  }
  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 ">
        <div className="hidden bg-muted lg:block">
          <Image
            src="/login.jpg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your CGV user ID for log in
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
              >
                <FormField
                  control={form.control}
                  name="userId"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>UserId</FormLabel>
                      <FormControl>
                        <Input placeholder="Example: 214925" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Login</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
