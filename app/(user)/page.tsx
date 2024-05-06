import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import ThemeToggle from "../components/ThemeToggle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import { DatePicking } from "./_component/DatePicking";
import UserSearch from "./_component/UserSearch";
import UserFindTags from "./_component/UserFindTags";
import {
  getAllImageByDate,
  getAllImageHomeData,
} from "../actions/imageActions";
import { notFound } from "next/navigation";
import HomeImages from "./_component/HomeImages";
import moment from "moment";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const imagesDateFilter = await getAllImageByDate(searchParams.date);
  const images = await getAllImageHomeData();
  const session = await getServerSession(authOptions);
  console.log(imagesDateFilter);
  console.log(images);
  return (
    <main className="w-full p-5 flex flex-col items-center m-auto">
      <section className="flex justify-center items-center gap-10 min-w-[800px]">
        <UserSearch />
        <DatePicking />
      </section>
      {/* <section className="mt-10">
        <UserFindTags />
      </section> */}
      <section className="mt-10 max-w-[1000px]">
        {!searchParams || searchParams.date==="undefined" && <HomeImages imageData={images} />}
        {searchParams.date && searchParams.date != "undefined" && (
          <div>
            {imagesDateFilter?.images?.length === 0 ? (
              <div className="mt-10">No result found</div>
            ) : (
              <div className="flex flex-col gap-10">
                <p className="text-center font-bold text-2xl">
                  {moment(searchParams.date).format("DD/MM/YYYY")}
                </p>
                <HomeImages imageData={imagesDateFilter} />
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
