import { Skeleton } from "@/components/ui/skeleton";

export function PostSkeleton() {
  return (
    <div className="p-4 optimize-visibility">
      <div className="flex gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[80%]" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}
