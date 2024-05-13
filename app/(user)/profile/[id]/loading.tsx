import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <main className="flex items-center flex-col m-auto min-h-screen max-w-[1000px] max-lg:w-full mt-5">
      <Skeleton className="w-20 h-20 rounded-full" />
      <Skeleton className="w-[250px] h-4 mt-10" />
      <section className="grid grid-cols-3 gap-2 mt-10 h-screen w-full max-lg:px-5">
        <Skeleton className="max-lg:h-[200px]" />
        <Skeleton className="max-lg:h-[200px]" />
        <Skeleton className="max-lg:h-[200px]" />
        <Skeleton className="max-lg:h-[200px]" />
        <Skeleton className="max-lg:h-[200px]" />
        <Skeleton className="max-lg:h-[200px]" />
        <Skeleton className="max-lg:h-[200px]" />
        <Skeleton className="max-lg:h-[200px]" />
        <Skeleton className="max-lg:h-[200px]" />
        <Skeleton className="max-lg:h-[200px]" />
      </section>
    </main>
  );
}
