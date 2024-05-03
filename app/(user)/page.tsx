import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import ThemeToggle from "../components/ThemeToggle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import { DatePicking } from "./_component/DatePicking";
import UserSearch from "./_component/UserSearch";
import UserFindTags from "./_component/UserFindTags";
import { getAllImageHomeData } from "../actions/imageActions";
import { notFound } from "next/navigation";
import HomeImages from "./_component/HomeImages";

export default async function Home() {
  const images = await getAllImageHomeData();
  const session = await getServerSession(authOptions);
  if (images.status != 200) {
    return notFound();
  }
  return (
    <main className="w-full p-5 flex flex-col items-center">
      <section className="flex justify-center items-center gap-10 min-w-[800px]">
        <UserSearch />
        <DatePicking />
      </section>
      <section className="mt-10">
        <UserFindTags />
      </section>
      <section>
        <HomeImages />
      </section>
    </main>
  );
}
