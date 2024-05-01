import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import ThemeToggle from "../components/ThemeToggle";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { DatePicking } from "./_component/DatePicking";
import UserSearch from "./_component/UserSearch";
import UserFindTags from "./_component/UserFindTags";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="w-full p-5 flex flex-col items-center">
      <div className="flex justify-center items-center gap-10">
        <UserSearch />
        <DatePicking />
      </div>
      <div className="mt-10">
        <UserFindTags/>
      </div>
    </div>
  );
}
