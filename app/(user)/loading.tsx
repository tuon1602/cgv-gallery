import { Skeleton } from "@/components/ui/skeleton";

export default function loading(){
    return(
        <section className="grid grid-cols-3 gap-2 w-full lg:max-w-[1000px] m-auto min-h-screen mt-10 lg:px-5">
            <Skeleton className="max-lg:h-[200px]"/>
            <Skeleton className="max-lg:h-[200px]"/>
            <Skeleton className="max-lg:h-[200px]"/>
            <Skeleton className="max-lg:h-[200px]"/>
            <Skeleton className="max-lg:h-[200px]"/>
            <Skeleton className="max-lg:h-[200px]"/>
            <Skeleton className="max-lg:h-[200px]"/>
            <Skeleton className="max-lg:h-[200px]"/>
            <Skeleton className="max-lg:h-[200px]"/>
            <Skeleton className="max-lg:h-[200px]"/>
        </section>
    )
}