import { Skeleton } from "../ui/skeleton";

export const QuestionCardSkeleton = () => {
  return (
    <div className="p-4 md:px-24">
      <div className="flex">
        <div className="space-y-1">
          <Skeleton className="h-3 w-16 bg-gray-300" />
          <Skeleton className="h-3 w-16 bg-gray-300" />
          <Skeleton className="h-3 w-16 bg-gray-300" />
        </div>
        <div className="ml-4">
          <Skeleton className="h-4 w-64 bg-gray-300" />
          <div className="mt-2 flex w-full flex-wrap">
            <Skeleton className="m-1 h-6 w-16 rounded bg-gray-300" />
            <Skeleton className="m-1 h-6 w-16 rounded bg-gray-300" />
            <Skeleton className="m-1 size-6 rounded bg-gray-300" />
            <Skeleton className="m-1 h-6 w-16 rounded bg-gray-300" />
          </div>
          <Skeleton className="mt-2 h-3 w-64 bg-gray-300" />
        </div>
      </div>
      <Skeleton />
    </div>
  );
};
