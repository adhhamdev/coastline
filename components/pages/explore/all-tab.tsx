import { TabsContent } from "@/components/ui/tabs";
import { SearchResults } from "@/lib/types/pages/explore";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/common/product-card";
import UserCard from "@/components/common/user-card";
import { Product, Post, Profile } from "@/lib/types/database.types";
import { User } from "@supabase/supabase-js";
import {
  Search,
  PackageSearch,
  UserSearch,
  MessagesSquare,
} from "lucide-react";
import { PostCard } from "@/components/common/post-card";

interface Params {
  searchResults: SearchResults;
  setActiveTab: React.Dispatch<
    React.SetStateAction<"all" | "products" | "users" | "posts">
  >;
  searchQuery: string;
  user: User | null;
  profile: Profile | null;
}

export default function AllTab({
  searchResults,
  setActiveTab,
  searchQuery,
  user,
  profile,
}: Params) {
  return (
    <TabsContent value="all" className="m-0">
      <div className="space-y-14">
        {/* Products Section */}
        {searchResults.products.length > 0 ? (
          <section className="space-y-3">
            <div className="flex items-center justify-between px-4 md:px-6">
              <h3 className="text-lg font-semibold">Products</h3>
              <Button
                variant="link"
                onClick={() => setActiveTab("products")}
                className="text-muted-foreground hover:text-primary"
              >
                See all
              </Button>
            </div>
            <div className="relative">
              <div className="flex overflow-x-auto pb-2 px-4 gap-4 snap-x snap-mandatory">
                {searchResults.products
                  .slice(0, 4)
                  .map((product: Product<true>) => (
                    <div
                      key={product.id}
                      className="w-[160px] sm:w-[250px] flex-none snap-center"
                    >
                      <ProductCard product={product} currentUser={user} />
                    </div>
                  ))}
              </div>
            </div>
          </section>
        ) : (
          searchQuery && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <PackageSearch className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg mb-1">No products found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )
        )}

        {/* Users Section */}
        {searchResults.users.length > 0 ? (
          <section className="space-y-3">
            <div className="flex items-center justify-between px-4 md:px-6">
              <h3 className="text-lg font-semibold">People</h3>
              <Button
                variant="link"
                onClick={() => setActiveTab("users")}
                className="text-muted-foreground hover:text-primary"
              >
                See all
              </Button>
            </div>
            <div className="relative">
              <div className="flex overflow-x-auto pb-2 px-4 gap-4 snap-x snap-mandatory">
                {searchResults.users.slice(0, 3).map((user: Profile) => (
                  <UserCard
                    key={user.id}
                    profile={user}
                    currentUser={profile}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : (
          searchQuery && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <UserSearch className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg mb-1">No people found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )
        )}

        {/* Posts Section */}
        {searchResults.posts.length > 0 ? (
          <section className="space-y-3">
            <div className="flex items-center justify-between px-4 md:px-6">
              <h3 className="text-lg font-semibold">Posts</h3>
              <Button
                variant="link"
                onClick={() => setActiveTab("posts")}
                className="text-muted-foreground hover:text-primary"
              >
                See all
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 gap-4 w-full max-w-[640px] space-y-4 md:px-4">
                {searchResults.posts
                  .slice(0, 4)
                  .map((post: Post<true, true>) => (
                    <PostCard key={post.id} post={post} user={user} />
                  ))}
              </div>
            </div>
          </section>
        ) : (
          searchQuery && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <MessagesSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg mb-1">No posts found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )
        )}

        {!searchQuery &&
          searchResults.products.length === 0 &&
          searchResults.users.length === 0 &&
          searchResults.posts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg mb-1">Start exploring</h3>
              <p className="text-sm text-muted-foreground">
                Search for products, people, or posts
              </p>
            </div>
          )}
      </div>
    </TabsContent>
  );
}
