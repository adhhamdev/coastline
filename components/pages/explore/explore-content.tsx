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
  products: Product[];
  users: Profile[];
  posts: Post[];
}

// Dummy data for testing UI
const dummyProfiles: Profile[] = [
  {
    id: "1",
    username: "ocean_gems",
    full_name: "Sarah Ocean",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    banner_url: "https://images.unsplash.com/photo-1596423816419-8e709f5f458a",
    bio: "Rare sea gems & precious finds 💎 | Sustainable sourcing",
    location: "Coastal California",
    business_type: "gems",
    website: "www.oceangems.com",
    phone: "+1234567890",
    email: "sarah@oceangems.com",
    verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    followers_count: 1234,
    products_count: 45,
    following_count: 567,
  },
  {
    id: "2",
    username: "coastal_catch",
    full_name: "Mike Fisher",
    avatar_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
    banner_url: "https://images.unsplash.com/photo-1545659531-9159b1209130",
    bio: "Fresh catches daily 🎣 | Sustainable fishing",
    location: "Pacific Coast",
    business_type: "fishing",
    email: "mike@coastalcatch.com",
    verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    followers_count: 5678,
    products_count: 89,
    following_count: 890,
  },
  {
    id: "3",
    username: "sea_artisan",
    full_name: "Emma Craft",
    avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    bio: "Handcrafted sea-inspired jewelry | Custom orders welcome 🌊",
    location: "Beach Side",
    business_type: "gems",
    verified: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    followers_count: 892,
    products_count: 34,
    following_count: 345,
  },
  {
    id: "4",
    username: "pearl_diver",
    full_name: "James Pearl",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    bio: "Rare pearls & ocean treasures | Diving adventures 🤿",
    location: "Deep Sea",
    business_type: "gems",
    verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    followers_count: 2341,
    products_count: 56,
    following_count: 432,
  },
  {
    id: "5",
    username: "fish_market",
    full_name: "Lisa Marine",
    avatar_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    bio: "Fresh seafood daily | Wholesale & retail 🐟",
    location: "Harbor Front",
    business_type: "fishing",
    verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    followers_count: 3456,
    products_count: 78,
    following_count: 234,
  },
];

const dummyProducts: Product[] = [
  {
    id: "1",
    user_id: dummyProfiles[0],
    title: "Natural Blue Sapphire",
    description: "Rare ocean-blue sapphire, ethically sourced",
    price: 1299.99,
    category: "Gems",
    images: ["https://images.unsplash.com/photo-1615485290382-441e4d049cb5"],
    status: "available",
    location: "Coastal California",
    views_count: 234,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    user_id: dummyProfiles[1],
    title: "Fresh Wild Salmon",
    description: "Caught today, premium quality",
    price: 29.99,
    category: "Seafood",
    images: ["https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c"],
    status: "available",
    location: "Pacific Coast",
    views_count: 567,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    user_id: dummyProfiles[2],
    title: "Pearl Necklace",
    description: "Handcrafted with genuine pearls",
    price: 299.99,
    category: "Jewelry",
    images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338"],
    status: "available",
    views_count: 123,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    user_id: dummyProfiles[3],
    title: "Black Pearl Collection",
    description: "Rare Tahitian black pearls",
    price: 2499.99,
    category: "Gems",
    images: ["https://images.unsplash.com/photo-1602173574767-37ac01994b2a"],
    status: "available",
    location: "Deep Sea",
    views_count: 789,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    user_id: dummyProfiles[4],
    title: "Premium Tuna Steaks",
    description: "Fresh caught, sushi-grade",
    price: 39.99,
    category: "Seafood",
    images: ["https://images.unsplash.com/photo-1595456982104-14cc660c4d22"],
    status: "available",
    location: "Harbor Front",
    views_count: 345,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const dummyPosts: Post[] = [
  {
    id: "1",
    user_id: "1",
    content:
      "Just found this stunning blue sapphire! 💎 Perfect for a statement piece. #OceanGems #RareFinds",
    images: ["https://images.unsplash.com/photo-1615485290382-441e4d049cb5"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    videos: [],
    profile: dummyProfiles[0],
    product: dummyProducts[0],
  },
  {
    id: "2",
    user_id: "2",
    content:
      "Today's catch! Fresh wild salmon available now 🎣 #SustainableFishing #FreshSeafood",
    images: ["https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    videos: [],
    profile: dummyProfiles[1],
    product: dummyProducts[1],
  },
  {
    id: "3",
    user_id: "3",
    content:
      "New pearl collection just finished! Each piece handcrafted with love 🤍 #HandmadeJewelry",
    images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    videos: [],
    profile: dummyProfiles[2],
    product: dummyProducts[2],
  },
  {
    id: "4",
    user_id: "4",
    content:
      "Rare find: Tahitian black pearls from our latest diving expedition 🤿 #BlackPearls #LuxuryGems",
    images: ["https://images.unsplash.com/photo-1602173574767-37ac01994b2a"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    videos: [],
    profile: dummyProfiles[3],
    product: dummyProducts[3],
  },
  {
    id: "5",
    user_id: "5",
    content:
      "Fresh tuna just in! Perfect for sashimi or grilling 🐟 #FreshSeafood #SustainableFishing",
    images: ["https://images.unsplash.com/photo-1595456982104-14cc660c4d22"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    videos: [],
    profile: dummyProfiles[4],
    product: dummyProducts[4],
  },
];

export default function ExploreContent({ user, profile }: ExploreContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "products" | "users" | "posts"
  >("all");
  const [searchResults, setSearchResults] = useState<SearchResults>({
    products: dummyProducts,
    users: dummyProfiles,
    posts: dummyPosts,
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
            .select("*")
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
            .select("*")
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
  // useEffect(() => {
  //   handleSearch(debouncedSearch);
  // }, [debouncedSearch]);

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
                              .map((product: Product) => (
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
                              .map((post: Post) => (
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
                      {searchResults.products.map((product: Product) => (
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
                      {searchResults.posts.map((post: Post) => (
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
