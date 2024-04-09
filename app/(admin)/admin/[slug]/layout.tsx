import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProviders from "../../../providers/AuthProvider";
import { Session, getServerSession } from "next-auth";
import { Toaster } from "@/components/ui/sonner";
import ExpiredAlert from "../../../components/ExpiredAlert";
import SideSelect from "../../_component/SideSelect";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trang admin cgv iph ",
  description: "Quản lí cgv-gallery",
};

export default async function AdminLayout({
  children, params// will be a page or nested layout
}: {
  children: React.ReactNode
  params:{
    slug:string
  };
}) {
  const session = await getServerSession();
  if(!session){
    redirect("/login")
  }
  return (
    <section>
      <nav>
        <SideSelect slug={params.slug}/>
      </nav>
      {children}
    </section>
  );
}
