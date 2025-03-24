import ExploreActionsBar from "@/components/pages/explore/actions-bar";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full">
        {/* Search Header */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
          <div className="py-4 space-y-4">
            <div className="sm:flex sm:justify-center">
              <div className="mx-2 sm:w-[640px]">
                <ExploreActionsBar />
              </div>
            </div>

            <div className="mt-4 min-h-[calc(100vh-12rem)]">
              <Suspense
                fallback={<Skeleton className="h-[calc(100vh-12rem)] w-full" />}
              >
                {children}
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
