import { Skeleton } from "@/components/ui/skeleton";

export default function ExploreLoading() {
  return (
    <div className="w-full">
      {/* Main Content */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
        <div className="space-y-4 py-4">
          <div className="min-h-[calc(100vh-12rem)]">
            <div className="space-y-14">
              <div className="sm:flex sm:justify-center">
                <div className="mx-2 sm:w-[640px]">
                  <div className="mt-6 space-y-14">
                    {/* Products Section Skeleton */}
                    <section className="space-y-3">
                      <div className="flex items-center justify-between px-4 md:px-6">
                        <Skeleton className="h-7 w-24" />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="space-y-3">
                            <Skeleton className="aspect-square w-full rounded-lg" />
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-3/4" />
                              <Skeleton className="h-4 w-1/2" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Users Section Skeleton */}
                    <section className="space-y-3">
                      <div className="flex items-center justify-between px-4 md:px-6">
                        <Skeleton className="h-7 w-20" />
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-4">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="p-4 space-y-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Skeleton className="h-10 w-10 rounded-full" />
                              <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-3 w-1/2" />
                              </div>
                            </div>
                            <Skeleton className="h-8 w-full" />
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
