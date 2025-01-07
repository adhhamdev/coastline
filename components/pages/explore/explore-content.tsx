"use client";

import UserCard from "@/components/common/user-card";
import ProductCard from "@/components/common/product-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FilterDialog, { FilterOptions } from "./filter-dialog";
import useDebounce from "@/lib/hooks/use-debounce";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import {
  Filter,
  Search,
  Loader2,
  Users,
  ShoppingBag,
  MessageSquare,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { PostCard } from "../../common/post-card";
import { Post, Product, Profile } from "@/lib/types/database.types";

interface ExploreContentProps {
  user: User | null;
  profile: Profile | null;
}

interface SearchResults {
  products: Product<true>[];
  users: Profile[];
  posts: Post<true, true>[];
}

export default function ExploreContent({ user, profile }: ExploreContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    products: {
      sortBy: "latest",
      priceRange: [0, 1000],
      inStock: false,
      category: "all",
    },
    posts: {
      sortBy: "latest",
      dateRange: [new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()],
      hasProduct: false,
      hasMedia: false,
    },
    users: {
      sortBy: "followers",
      followersRange: [0, 10000],
      hasProducts: false,
      hasPosts: false,
    },
  });
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
  const supabase = createClient();
  const router = useRouter();

  const hasActiveFilters = () => {
    const defaultFilters: FilterOptions = {
      products: {
        sortBy: "latest",
        priceRange: [0, 1000],
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
        hasMedia: false,
      },
      users: {
        sortBy: "followers",
        followersRange: [0, 10000],
        hasProducts: false,
        hasPosts: false,
      },
    };

    return JSON.stringify(filters) !== JSON.stringify(defaultFilters);
  };

  const clearAllFilters = () => {
    setFilters({
      products: {
        sortBy: "latest",
        priceRange: [0, 1000],
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
        hasMedia: false,
      },
      users: {
        sortBy: "followers",
        followersRange: [0, 10000],
        hasProducts: false,
        hasPosts: false,
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let productsQuery = supabase
          .from("products")
          .select("*, user: profiles(*)");

        // Apply product filters
        if (filters.products.category && filters.products.category !== "all") {
          productsQuery = productsQuery.eq(
            "category",
            filters.products.category
          );
        }

        if (filters.products.inStock) {
          productsQuery = productsQuery.gt("stock", 0);
        }

        if (filters.products.priceRange) {
          productsQuery = productsQuery
            .gte("price", filters.products.priceRange[0])
            .lte("price", filters.products.priceRange[1]);
        }

        // Apply product sorting
        switch (filters.products.sortBy) {
          case "price-low":
            productsQuery = productsQuery.order("price", { ascending: true });
            break;
          case "price-high":
            productsQuery = productsQuery.order("price", { ascending: false });
            break;
          case "popular":
            productsQuery = productsQuery.order("likes_count", {
              ascending: false,
            });
            break;
          default:
            productsQuery = productsQuery.order("created_at", {
              ascending: false,
            });
        }

        let usersQuery = supabase.from("profiles").select();

        // Apply user filters
        if (filters.users.hasProducts) {
          usersQuery = usersQuery.gt("products_count", 0);
        }

        if (filters.users.hasPosts) {
          usersQuery = usersQuery.gt("posts_count", 0);
        }

        if (filters.users.followersRange) {
          usersQuery = usersQuery
            .gte("followers_count", filters.users.followersRange[0])
            .lte("followers_count", filters.users.followersRange[1]);
        }

        // Apply user sorting
        switch (filters.users.sortBy) {
          case "followers":
            usersQuery = usersQuery.order("followers_count", {
              ascending: false,
            });
            break;
          case "joined":
            usersQuery = usersQuery.order("created_at", { ascending: false });
            break;
          case "active":
            usersQuery = usersQuery.order("last_active", { ascending: false });
            break;
        }

        let postsQuery = supabase
          .from("posts")
          .select("*, user:profiles(*), product:products(*)");

        // Apply post filters
        if (filters.posts.hasProduct) {
          postsQuery = postsQuery.not("product_id", "is", null);
        }

        if (filters.posts.hasMedia) {
          postsQuery = postsQuery.not("media_url", "is", null);
        }

        if (filters.posts.dateRange) {
          postsQuery = postsQuery
            .gte("created_at", filters.posts.dateRange[0].toISOString())
            .lte("created_at", filters.posts.dateRange[1].toISOString());
        }

        // Apply post sorting
        switch (filters.posts.sortBy) {
          case "popular":
            postsQuery = postsQuery.order("likes_count", { ascending: false });
            break;
          case "comments":
            postsQuery = postsQuery.order("comments_count", {
              ascending: false,
            });
            break;
          default:
            postsQuery = postsQuery.order("created_at", { ascending: false });
        }

        // Add search filters if query exists
        if (debouncedSearch) {
          productsQuery = productsQuery.textSearch("title", debouncedSearch, {
            type: "websearch",
            config: "english",
          });

          usersQuery = usersQuery.textSearch("username", debouncedSearch);

          postsQuery = postsQuery.textSearch("content", debouncedSearch, {
            type: "websearch",
            config: "english",
          });
        }

        // Apply limits
        productsQuery = productsQuery.limit(10);
        usersQuery = usersQuery.limit(10);
        postsQuery = postsQuery.limit(10);

        const [productsRes, usersRes, postsRes] = await Promise.all([
          productsQuery,
          usersQuery,
          postsQuery,
        ]);

        setSearchResults({
          products: productsRes.data || [],
          users: usersRes.data || [],
          posts: postsRes.data || [],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    startTransition(() => {
      fetchData();
    });
  }, [debouncedSearch, filters]);

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Search Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-2">
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
                  size="icon"
                  onClick={clearAllFilters}
                  className="h-10 w-10 shrink-0 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
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
                <MessageSquare className="h-3.5 w-3.5 md:h-4 md:w-4 mr-2 md:hidden" />
                <span className="hidden md:inline">Posts</span>
              </TabsTrigger>
              <TabsTrigger
                value="products"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs md:text-sm px-1 md:px-4"
              >
                <ShoppingBag className="h-3.5 w-3.5 md:h-4 md:w-4 mr-2 md:hidden" />
                <span className="hidden md:inline">Products</span>
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs md:text-sm px-1 md:px-4"
              >
                <Users className="h-3.5 w-3.5 md:h-4 md:w-4 mr-2 md:hidden" />
                <span className="hidden md:inline">People</span>
              </TabsTrigger>
            </TabsList>

            <div className="mt-4 min-h-[calc(100vh-12rem)]">
              {isPending ? (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <>
                  <TabsContent value="all" className="m-0">
                    <div className="space-y-6">
                      {/* Products Section */}
                      {searchResults.products.length > 0 && (
                        <section>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Products</h3>
                            <Button
                              variant="link"
                              onClick={() => setActiveTab("products")}
                            >
                              See all
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {searchResults.products
                              .slice(0, 4)
                              .map((product: Product<true>) => (
                                <ProductCard
                                  key={product.id}
                                  product={product}
                                  currentUser={user}
                                />
                              ))}
                          </div>
                        </section>
                      )}

                      {/* Users Section */}
                      {searchResults.users.length > 0 && (
                        <section>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">People</h3>
                            <Button
                              variant="link"
                              onClick={() => setActiveTab("users")}
                            >
                              See all
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {searchResults.users
                              .slice(0, 3)
                              .map((user: Profile) => (
                                <UserCard
                                  key={user.id}
                                  profile={user}
                                  currentUser={profile}
                                />
                              ))}
                          </div>
                        </section>
                      )}

                      {/* Posts Section */}
                      {searchResults.posts.length > 0 && (
                        <section>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Posts</h3>
                            <Button
                              variant="link"
                              onClick={() => setActiveTab("posts")}
                            >
                              See all
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {searchResults.posts
                              .slice(0, 4)
                              .map((post: Post<true, true>) => (
                                <PostCard
                                  key={post.id}
                                  post={post}
                                  user={user}
                                />
                              ))}
                          </div>
                        </section>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="products" className="m-0">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {searchResults.products.map((product: Product<true>) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          currentUser={user}
                        />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="users" className="m-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {searchResults.users.map((user: Profile) => (
                        <UserCard
                          key={user?.id}
                          profile={user || null}
                          currentUser={profile || null}
                        />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="posts" className="m-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {searchResults.posts.map((post: Post<true, true>) => (
                        <PostCard key={post.id} post={post} user={user} />
                      ))}
                    </div>
                  </TabsContent>
                </>
              )}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
