import PostCard from "@/components/common/post-card";
import ProductCard from "@/components/common/product-card";
import UserCard from "@/components/common/user-card";
import searchExplore from "@/lib/helpers/pages/explore/search";
import protectPage from "@/lib/helpers/protectPage";
import { createClient } from "@/utils/supabase/server";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const user = await protectPage();
  const supabase = await createClient();
  const filterParams = await searchParams;

  // Get the profile for the current user
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  const searchResults = await searchExplore(filterParams);

  return (
    <div className="sm:flex sm:justify-center">
      <div className="mx-2 sm:w-[640px]">
        <div className="mt-6 space-y-14">
          {/* Products Section */}
          {searchResults?.products.length && (
            <section className="space-y-3">
              <div className="flex items-center justify-between px-4 md:px-6">
                <h3 className="text-lg font-semibold">Products</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4">
                {searchResults.products.map((product) => (
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
          {searchResults?.users.length && (
            <section className="space-y-3">
              <div className="flex items-center justify-between px-4 md:px-6">
                <h3 className="text-lg font-semibold">People</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-4">
                {searchResults.users.map((user) => (
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
          {searchResults?.posts.length && (
            <section className="space-y-3">
              <div className="flex items-center justify-between px-4 md:px-6">
                <h3 className="text-lg font-semibold">Posts</h3>
              </div>
              <div className="flex justify-center">
                <div className="grid grid-cols-1 w-full max-w-[640px] md:px-4">
                  {searchResults.posts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      user={user}
                      revalidationPath="/explore"
                    />
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
