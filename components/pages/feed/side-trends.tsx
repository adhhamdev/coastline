import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";

const NoTrends = () => (
  <div className="flex items-center justify-center p-2 rounded-md bg-background">
    <p className="text-muted-foreground">No trends found.</p>
  </div>
);

const NoSuggestedUsers = () => (
  <div className="flex items-center justify-center p-2 rounded-md bg-muted">
    <p className="text-muted-foreground">No suggested users.</p>
  </div>
);

export default async function SideTrends() {
  const supabase = await createClient();
  const { data: trends, error: trendsError } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: users, error: usersError } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  if (trendsError || usersError) {
    return null;
  }

  return (
    <div className="hidden md:block space-y-4 h-[calc(100vh-5rem)] sticky top-16 overflow-y-auto px-4">
      <div className="rounded-lg bg-muted p-4">
        <h2 className="font-semibold mb-4">Trending Products</h2>
        <div>
          {trends.length > 0 ? (
            trends?.map((product) => (
              <Link
                key={product.id}
                href={`/marketplace/product/${product.id}`}
                className="flex items-center gap-3 hover:bg-primary/10 p-1 rounded-lg"
              >
                <div className="h-16 w-16 rounded-lg bg-background shrink-0]">
                  <Image
                    src={product?.images?.[0] || ""}
                    alt={product.title}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1 flex-1">
                  <p className="font-medium line-clamp-1">{product.title}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <span>${product.price}</span>
                    <span>•</span>
                    <span>⭐ 4.5</span>
                    <span>•</span>
                    <span>150 reviews</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoTrends />
          )}
        </div>
      </div>

      <div className="rounded-lg bg-muted p-4 mt-4">
        <h2 className="font-semibold mb-4">Suggested Users</h2>
        <div>
          {users.length > 0 ? (
            users?.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between hover:bg-primary/10 rounded-lg py-2 px-3 transition-all duration-200 w-full"
              >
                <Link
                  href={`/profile/${user.username}`}
                  className="flex items-center gap-3 w-full"
                >
                  <Image
                    src={user.avatar_url}
                    alt={user.full_name}
                    width={40}
                    height={40}
                    className="rounded-full w-[clamp(32px,3.5vw,40px)] h-[clamp(32px,3.5vw,40px)]"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-[clamp(14px,1.2vw,16px)]">
                      {user.full_name}
                    </p>
                    <p className="truncate text-[clamp(12px,1vw,14px)] text-muted-foreground">
                      {user.username}
                    </p>
                  </div>
                </Link>
                <Button variant="outline" size="sm">
                  Follow
                </Button>
              </div>
            ))
          ) : (
            <NoSuggestedUsers />
          )}
        </div>
      </div>
    </div>
  );
}
