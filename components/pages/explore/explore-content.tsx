"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import search from "@/lib/helpers/pages/explore/search";
import useDebounce from "@/lib/hooks/use-debounce";
import { ExploreContentProps, SearchResults } from "@/lib/types/pages/explore";
import { MessageSquare, Search, ShoppingBag, Users } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import AllTab from "./all-tab";
import FilterDialog, { FilterOptions } from "./filter-dialog";
import PeoplesTab from "./peoples-tab";
import PostsTab from "./posts-tab";
import ProductsTab from "./products-tab";

const defaultFilters: FilterOptions = {
  products: {
    sortBy: "latest",
    priceRange: [0, 0],
    inStock: false,
    category: "all",
  },
  posts: {
    sortBy: "latest",
    dateRange: [new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()],
    hasProduct: false,
  },
  users: {
    sortBy: "followers",
    followersRange: [0, 1000],
    hasProducts: false,
    hasPosts: false,
  },
};

export default function ExploreContent({ user, profile }: ExploreContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
  const [activeTab, setActiveTab] = useState<
    "all" | "products" | "users" | "posts"
  >("all");
  const [searchResults, setSearchResults] = useState<SearchResults>({
    products: [],
    users: [],
    posts: [],
  });
  const [isPending, startTransition] = useTransition();
  const debouncedSearch = useDebounce(searchQuery, 500);

  const hasActiveFilters = () => {
    return JSON.stringify(filters) !== JSON.stringify(defaultFilters);
  };

  const clearAllFilters = () => {
    setFilters({
      products: {
        sortBy: "latest",
        priceRange: [0, 0],
        inStock: false,
        category: "all",
      },
      posts: {
        sortBy: "latest",
        dateRange: [
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          new Date(),
        ],
        hasProduct: false,
      },
      users: {
        sortBy: "followers",
        followersRange: [0, 1000],
        hasProducts: false,
        hasPosts: false,
      },
    });
  };

  useEffect(() => {
    startTransition(() => {
      search({
        filters,
        debouncedSearch,
        setSearchResults,
      });
    });
  }, [debouncedSearch, filters]);

  return (
    <div className="w-full">
      {/* Search Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm supports-backdrop-filter:bg-background/60 border-b">
        <div className="py-4 space-y-4">
          <div className="flex items-center gap-2 px-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search posts, products, or people..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 [&::-webkit-search-cancel-button]:hover:cursor-pointer [&::-webkit-search-cancel-button]:appearance-auto"
              />
            </div>
            <div className="flex gap-2">
              {hasActiveFilters() && (
                <Button
                  title="Clear all filters"
                  variant="ghost"
                  onClick={clearAllFilters}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Reset
                </Button>
              )}
              <FilterDialog
                filters={filters}
                onFiltersChange={setFilters}
                activeTab={activeTab}
              />
            </div>
          </div>

          <Tabs
            defaultValue={activeTab}
            onValueChange={(value: any) => setActiveTab(value)}
            className="w-full"
          >
            <div className="sm:flex sm:justify-center mb-10">
              <div className="mx-2 sm:w-[640px]">
                <TabsList className="w-full grid grid-cols-4 h-9 md:h-12">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs md:text-sm px-1 md:px-4"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="posts"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs md:text-sm px-1 md:px-4"
                  >
                    <MessageSquare className="h-3.5 w-3.5 md:h-4 md:w-4 mr-2" />
                    <span className="hidden md:inline">Posts</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="products"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs md:text-sm px-1 md:px-4"
                  >
                    <ShoppingBag className="h-3.5 w-3.5 md:h-4 md:w-4 mr-2" />
                    <span className="hidden md:inline">Products</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="users"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs md:text-sm px-1 md:px-4"
                  >
                    <Users className="h-3.5 w-3.5 md:h-4 md:w-4 mr-2" />
                    <span className="hidden md:inline">People</span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <div className="mt-4 min-h-[calc(100vh-12rem)]">
              <AllTab
                searchResults={searchResults}
                setActiveTab={setActiveTab}
                searchQuery={searchQuery}
                user={user}
                profile={profile}
              />
              <ProductsTab searchResults={searchResults} user={user} />
              <PeoplesTab searchResults={searchResults} profile={profile} />
              <PostsTab searchResults={searchResults} user={user} />
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
