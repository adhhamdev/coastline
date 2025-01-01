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
import { Filter, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { PostCard } from "../feed/post-card";
import { AuthUser } from "@/lib/types/auth.types";

interface ExploreContentProps {
  initialProducts: any[];
  popularSellers: any[];
  user: User | null;
}

export default function ExploreContent({
  initialProducts,
  popularSellers,
  user,
}: ExploreContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "products" | "users" | "posts"
  >("all");
  const [searchResults, setSearchResults] = useState<any>({
    products: initialProducts,
    users: popularSellers,
    posts: [],
  });
  const [isPending, startTransition] = useTransition();
  const debouncedSearch = useDebounce(searchQuery, 500);
  const supabase = createClient();
  const router = useRouter();

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults({
        products: initialProducts,
        users: popularSellers,
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
            .select(
              `
            id,
            title,
            price,
            images,
            created_at,
            profiles (
              id,
              username,
              avatar_url,
              business_type
            )
          `
            )
            .textSearch("fts", query)
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
            .select(
              `
            id,
            content,
            media_urls,
            created_at,
            profiles (
              id,
              username,
              avatar_url,
              business_type
                        )
                    `
            )
            .textSearch("content", query)
            .limit(10),
        ]);

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

  const filterButtons = [
    { label: "All", value: "all" },
    { label: "Products", value: "products" },
    { label: "Users", value: "users" },
    { label: "Posts", value: "posts" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      {/* Left Column - Advanced Explore */}
      <Card className="md:col-span-2 p-4 space-y-4">
        <h2 className="text-lg font-semibold">Advanced Explore</h2>
        <div className="space-y-2">
          {filterButtons.map((button) => (
            <Button
              key={button.value}
              variant={activeFilter === button.value ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => setActiveFilter(button.value as any)}
            >
              <Filter className="mr-2 h-4 w-4" />
              {button.label}
            </Button>
          ))}
        </div>

        <div className="pt-4">
          <h3 className="text-sm font-medium mb-2">Trending Users</h3>
          <ScrollArea className="h-[300px]">
            <div className="space-y-2">
              {popularSellers.map((seller) => (
                <UserCard key={seller.id} profile={seller} currentUser={user} />
              ))}
            </div>
          </ScrollArea>
        </div>
      </Card>

      {/* Right Column - Search Results */}
      <div className="md:col-span-3 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products, users, or posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="space-y-4">
          {isPending && <div className="text-center">Loading...</div>}

          {!isPending &&
            (activeFilter === "all" || activeFilter === "products") &&
            searchResults.products.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {searchResults.products.map((product: any) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      currentUser={user}
                    />
                  ))}
                </div>
              </div>
            )}

          {!isPending &&
            (activeFilter === "all" || activeFilter === "users") &&
            searchResults.users.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Users</h2>
                <div className="grid grid-cols-1 gap-4">
                  {searchResults.users.map((user: any) => (
                    <UserCard key={user.id} profile={user} currentUser={user} />
                  ))}
                </div>
              </div>
            )}

          {!isPending &&
            (activeFilter === "all" || activeFilter === "posts") &&
            searchResults.posts.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Posts</h2>
                <div className="space-y-4">
                  {searchResults.posts.map((post: any) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      user={user as AuthUser}
                    />
                  ))}
                </div>
              </div>
            )}

          {!isPending &&
            Object.values(searchResults).every(
              (arr: any) => arr.length === 0
            ) && (
              <div className="text-center text-muted-foreground">
                No results found
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
