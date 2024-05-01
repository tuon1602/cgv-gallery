import Image from "next/image";
import React from "react";
import NavRoute from "./NavRoute";
import { Home, Heart, CirclePlus, LayoutDashboard } from "lucide-react";
import LogoutButton from "@/app/components/LogoutButton";
import ThemeToggle from "@/app/components/ThemeToggle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="w-base border-r border-r-secondary min-h-screen">
      <div className="sticky top-0 left-0 p-5 space-y-4 flex flex-col justify-between items-start min-h-[100dvh]">
        <div className="space-y-4 flex flex-col items-start">
          <Image src="/logo.png" alt="logo" width={150} height={150} />
          <NavRoute
            label="Home"
            route="/"
            icon={<Home className="size-[30px]" />}
          />
          <NavRoute
            label="Saved"
            route="/saved"
            icon={<Heart className="size-[30px]" />}
          />
          <NavRoute
            label="Create"
            route="/create"
            icon={<CirclePlus className="size-[30px]" />}
          />
          {session && session?.user?.role === "admin" && (
            <NavRoute
              label="Admin dashboard"
              route="/admin/dashboard"
              icon={<LayoutDashboard className="size-[30px]" />}
            />
          )}
        </div>
        <div className="flex flex-wrap gap-5">
          <ThemeToggle />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
