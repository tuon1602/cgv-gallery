import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProviders from "../providers/AuthProvider";
import { Session, getServerSession } from "next-auth";
import { Toaster } from "@/components/ui/sonner";
import ExpiredAlert from "../components/ExpiredAlert";
import Navbar from "./_component/Navbar";
import { authOptions } from "@/lib/authOptions";

import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yêu cgv iph ",
  description: "Nơi lưu giữ kỉ niệm của chúng ta ",
};

export default async function UserLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-12 min-h-screen">
      <nav className="grid col-span-2">
        <Navbar />
      </nav>
      <div className="col-span-10">
        {children}
      </div>
      {modal}
    </section>
  );
}
