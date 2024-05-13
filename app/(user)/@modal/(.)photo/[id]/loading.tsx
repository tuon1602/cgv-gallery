import { Skeleton } from "@/components/ui/skeleton";
import Modal from "./_components/Modal";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Modal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto py-12 px-4 md:px-6">
        <div className="flex items-center justify-center">
          <Skeleton className="h-[1000px] w-[500px] rounded-lg" />
        </div>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-5 w-24" />
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
