import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProviders from "../providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import ExpiredAlert from "../components/ExpiredAlert";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login ",
  description: "Trang đăng nhập của CGV-Gallery",
};

export default async function LoginLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return <section>{children}</section>;
}
