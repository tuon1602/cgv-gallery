import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ReactElement } from "react";
import Image from "next/image";

interface IProps {
  route: string;
  label: string;
  icon?: ReactElement | null;
  avatar?: string | null;
}

const NavRoute = ({ route, label, icon, avatar }: IProps) => {
  return (
    <Link href={route} className="w-full">
      <Button variant="outline" className="border-0 w-full flex justify-start">
        {avatar && (
          <Image
            src={avatar}
            alt="Avatar"
            width={30}
            height={30}
            className="aspect-square mr-4 rounded-full"
          />
        )}
        <div className="flex gap-4 text-lg">
          {icon}
          {label}
        </div>
      </Button>
    </Link>
  );
};

export default NavRoute;
