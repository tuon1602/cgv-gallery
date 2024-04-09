import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProviders from "../providers/AuthProvider";
import { Session, getServerSession } from "next-auth";
import { Toaster } from "@/components/ui/sonner";
import ExpiredAlert from "../components/ExpiredAlert";
import Navbar from "./_component/Navbar";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yêu cgv iph ",
  description: "Nơi lưu giữ kỉ niệm của chúng ta ",
};

export default async function UserLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav>
        <Navbar />
      </nav>
      {children}
    </section>
  );
}
