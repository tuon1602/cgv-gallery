import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import LogoutButton from "../components/LogoutButton";
import ThemeToggle from "../components/ThemeToggle";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      wtf
      <LogoutButton />
      <ThemeToggle />
      <Link href="/login">Go to login page</Link>
    </div>
  );
}
