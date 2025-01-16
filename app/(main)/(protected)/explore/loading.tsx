import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Filter,
  Search,
  MessageSquare,
  ShoppingBag,
  Users,
} from "lucide-react";

export default function ExploreLoading() {
  return (
    <div className="w-full">
      {/* Search Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2 px-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts, products, or people..."
                disabled
                className="w-full pl-9 pr-4"
              />
            </div>
            <Button variant="outline" size="icon" disabled>
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <div className="sm:flex sm:justify-center mb-10">
              <div className="mx-2 sm:w-[640px]">
                <TabsList className="w-full grid grid-cols-4 h-9 md:h-12">
                  <TabsTrigger
                    value="all"
                    disabled
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs md:text-sm px-1 md:px-4"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="posts"
                    disabled
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs md:text-sm px-1 md:px-4"
                  >
                    <MessageSquare className="h-3.5 w-3.5 md:h-4 md:w-4 mr-2 md:hidden" />
                    <span className="hidden md:inline">Posts</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="products"
                    disabled
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs md:text-sm px-1 md:px-4"
                  >
                    <ShoppingBag className="h-3.5 w-3.5 md:h-4 md:w-4 mr-2 md:hidden" />
                    <span className="hidden md:inline">Products</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="users"
                    disabled
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs md:text-sm px-1 md:px-4"
                  >
                    <Users className="h-3.5 w-3.5 md:h-4 md:w-4 mr-2 md:hidden" />
                    <span className="hidden md:inline">People</span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <div className="min-h-[calc(100vh-12rem)]">
              <div className="space-y-14">
                {/* Products Section */}
                <section className="space-y-3">
                  <div className="flex items-center justify-between px-4 md:px-6">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <div className="relative">
                    <div className="flex overflow-x-auto pb-2 px-4 gap-4 snap-x snap-mandatory">
                      {Array(4)
                        .fill(null)
                        .map((_, i) => (
                          <Card
                            key={i}
                            className="w-[160px] sm:w-[180px] flex-none snap-center overflow-hidden"
                          >
                            <Skeleton className="h-48 w-full" />
                            <div className="p-4 space-y-3">
                              <Skeleton className="h-4 w-3/4" />
                              <Skeleton className="h-4 w-1/2" />
                              <div className="flex items-center gap-2">
                                <Skeleton className="h-8 w-8 rounded-full" />
                                <Skeleton className="h-4 w-24" />
                              </div>
                            </div>
                          </Card>
                        ))}
                    </div>
                  </div>
                </section>

                {/* Users Section */}
                <section className="space-y-3">
                  <div className="flex items-center justify-between px-4 md:px-6">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <div className="relative">
                    <div className="flex overflow-x-auto pb-2 px-4 gap-4 snap-x snap-mandatory">
                      {Array(3)
                        .fill(null)
                        .map((_, i) => (
                          <Card
                            key={i}
                            className="w-[200px] flex-none snap-center p-4 space-y-4"
                          >
                            <div className="flex items-center gap-3">
                              <Skeleton className="h-12 w-12 rounded-full" />
                              <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-16" />
                              </div>
                            </div>
                            <Skeleton className="h-8 w-full rounded-md" />
                          </Card>
                        ))}
                    </div>
                  </div>
                </section>

                {/* Posts Section */}
                <section className="space-y-3">
                  <div className="flex items-center justify-between px-4 md:px-6">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <div className="flex justify-center">
                    <div className="w-full max-w-[640px] space-y-4 md:px-4">
                      {Array(4)
                        .fill(null)
                        .map((_, i) => (
                          <Card key={i} className="p-4 space-y-4">
                            <div className="flex items-center gap-3">
                              <Skeleton className="h-10 w-10 rounded-full" />
                              <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-16" />
                              </div>
                            </div>
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-[300px] w-full rounded-lg" />
                          </Card>
                        ))}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
