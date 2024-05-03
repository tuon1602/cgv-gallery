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
    <Button variant="outline" className="border-0">
      {avatar && (
        <Image
          src={avatar}
          alt="Avatar"
          width={30}
          height={30}
          className="mr-4 rounded-full"
        />
      )}
      <Link href={route} className="flex items-center gap-4 text-lg">
        {icon}
        {label}
      </Link>
    </Button>
  );
};

export default NavRoute;
