"use client";

import UserCard from "@/components/pages/explore/user-card";
import ProductCard from "@/components/pages/products/product-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { PostCard } from "../feed/post-card";
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
  const [activeFilter, setActiveFilter] = useState<
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

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults({
        products: [],
        users: [],
        posts: [],
      });
      return;
    }

    try {
      startTransition(async () => {
        const [productsRes, usersRes, postsRes] = await Promise.all([
          // Search products
          supabase
            .from("products")
            .select("*, user(*)")
            .textSearch("title", query, {
              type: "websearch",
              config: "english",
            })
            .limit(10),

          // Search users
          supabase
            .from("profiles")
            .select("*")
            .or(`username.ilike.%${query}%, full_name.ilike.%${query}%`)
            .limit(10),

          // Search posts
          supabase
            .from("posts")
            .select("*, user(*)")
            .textSearch("content", query, {
              type: "websearch",
              config: "english",
            })
            .limit(10),
        ]);

        console.log(productsRes);
        console.log(usersRes);
        console.log(postsRes);

        setSearchResults({
          products: productsRes.data || [],
          users: usersRes.data || [],
          posts: postsRes.data || [],
        });
      });
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  // Effect for debounced search
  useEffect(() => {
    handleSearch(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Search Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts, products, or people..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <Tabs
            defaultValue={activeFilter}
            onValueChange={(value: any) => setActiveFilter(value)}
            className="w-full"
          >
            <TabsList className="w-full grid grid-cols-4 h-12">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="posts"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <MessageSquare className="h-4 w-4 mr-2 md:hidden" />
                <span className="hidden md:inline">Posts</span>
              </TabsTrigger>
              <TabsTrigger
                value="products"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <ShoppingBag className="h-4 w-4 mr-2 md:hidden" />
                <span className="hidden md:inline">Products</span>
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Users className="h-4 w-4 mr-2 md:hidden" />
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
                              onClick={() => setActiveFilter("products")}
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
                              onClick={() => setActiveFilter("users")}
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
                              onClick={() => setActiveFilter("posts")}
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
