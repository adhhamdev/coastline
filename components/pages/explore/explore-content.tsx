"use client";

import UserCard from "@/components/pages/explore/user-card";
import ProductCard from "@/components/pages/products/product-card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useDebounce from "@/lib/hooks/use-debounce";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Search } from "lucide-react";
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

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search products, users, or posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="products" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {searchResults.products.map((product: any) => (
              <ProductCard
                key={product.id}
                product={product}
                currentUser={user}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {searchResults.users.map((profile: any) => (
              <UserCard key={profile.id} profile={profile} currentUser={user} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="posts" className="space-y-4">
          <div className="grid gap-6">
            {searchResults.posts.map((post: any) => (
              <PostCard key={post.id} post={post} user={user as AuthUser} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
