import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ReactElement } from "react";

interface IProps {
  route: string;
  label: string;
  icon: ReactElement;
}

const NavRoute = ({ route, label, icon }: IProps) => {
  return (
    <Button variant="outline" className="border-0">
      <Link href={route} className="flex items-center gap-4 text-lg">
        {icon}
        {label}
      </Link>
    </Button>
  );
};

export default NavRoute;
