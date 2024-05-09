import Image from "next/image";
import React from "react";
import NavRoute from "./NavRoute";
import {
  Home,
  Heart,
  CirclePlus,
  LayoutDashboard,
  MessageCircleQuestion,
  Settings,
} from "lucide-react";
import LogoutButton from "@/app/components/LogoutButton";
import ThemeToggle from "@/app/components/ThemeToggle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
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
import ChangePassword from "./ChangePassword";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="border-r border-r-secondary min-h-screen">
      <div className="sticky top-0 left-0 p-5 space-y-4 flex flex-col justify-between items-start min-h-[100dvh] w-full">
        <div className="space-y-4 flex flex-col items-start">
          <Image src={`/logo.png`} alt="logo" width={150} height={150} />
          <NavRoute
            label="Home"
            route="/?date=undefined"
            icon={<Home className="size-[30px]" />}
          />
          <NavRoute
            label="Saved"
            route="/saved"
            icon={<Heart className="size-[30px]" />}
          />
          <NavRoute
            label="Create"
            route="/create-image"
            icon={<CirclePlus className="size-[30px]" />}
          />
          {session && session?.user?.role === "admin" && (
            <NavRoute
              label="Admin dashboard"
              route="/admin/dashboard"
              icon={<LayoutDashboard className="size-[30px]" />}
            />
          )}
          {session && (
            <NavRoute
              label="Profile"
              route={`/profile/${session?.user?.userId}`}
              avatar={session?.user?.avatarUrl}
            />
          )}
          <NavRoute
            label="Faq"
            route="/faq"
            icon={<MessageCircleQuestion className="size-[30px]" />}
          />
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="pl-3.5">
              <Settings />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[10rem]">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="flex flex-col gap-3 mt-2">
                <Dialog>
                  <DialogTrigger>Change password</DialogTrigger>
                  <DialogContent>
                    <ChangePassword userId={session?.user?.userId}/>
                  </DialogContent>
                </Dialog>
                <ThemeToggle />
                <LogoutButton />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
