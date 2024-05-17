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
} from "../../actions/imageActions";
import { notFound } from "next/navigation";
import HomeImages from "./_component/HomeImages";
import moment from "moment";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const imagesDateFilter = await getAllImageByDate(searchParams.date);
  const images = await getAllImageHomeData();
  const session = await getServerSession(authOptions);
  return (
    <main className="w-full p-5 flex flex-col items-center m-auto">
      <section className="flex flex-col lg:flex-row lg:justify-center lg:items-center gap-4 lg:gap-10 md:max-w-[500px] lg:max-w-[800px] w-full">
        <UserSearch />
        <DatePicking />
      </section>
      {/* <section className="mt-10">
        <UserFindTags />
      </section> */}
      <section className="mt-10 max-w-[800px] 2xl:max-w-[1000px] w-full ">
        {!searchParams ||
          (searchParams.date === "undefined" && (
            <Suspense fallback={<p>loading....</p>}>
                <HomeImages imageData={images} />
            </Suspense>
          
          ))}
        {searchParams.date && searchParams.date != "undefined" && (
          <div>
            {imagesDateFilter?.images?.length === 0 ? (
              <div className="mt-10 text-center text-2xl">No result found</div>
            ) : (
              <div className="flex flex-col gap-10">
                <p className="text-center font-bold text-2xl">
                  {moment(searchParams.date).format("DD/MM/YYYY")}
                </p>
                <Suspense fallback={<p>loading....</p>}>
                   <HomeImages imageData={imagesDateFilter} />
                </Suspense>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
