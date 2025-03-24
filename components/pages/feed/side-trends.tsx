import { Button } from "@/components/ui/button";
import { Profile } from "@/lib/types/database.types";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";

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

  return (
    <div className="hidden md:block space-y-4 h-[calc(100vh-5rem)] sticky top-16 overflow-y-auto">
      <div className="rounded-lg bg-muted p-4">
        <h2 className="font-semibold mb-4">Trending Products</h2>
        <div>
          {trends?.map((product) => (
            <Link
              key={product.id}
              href={`/marketplace/product/${product.id}`}
              className="flex items-center gap-3 hover:bg-primary/10 p-1 rounded-lg"
            >
              <div className="h-16 w-16 rounded-lg bg-background shrink-0 overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div className="space-y-1 flex-1">
                <p className="font-medium line-clamp-1">
                  {product.title}
                </p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>${product.price}</span>
                  <span>•</span>
                  <span>⭐ 4.5</span>
                  <span>•</span>
                  <span>150 reviews</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-muted p-4 mt-4">
        <h2 className="font-semibold mb-4">Suggested Users</h2>
        <div>
          {users?.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between hover:bg-primary/10 rounded-lg py-1 px-2"
            >
              <Link
                href={`/profile/${user.username}`}
                className="flex items-center gap-2"
              >
                <Image
                  src={user.avatar_url}
                  alt={user.full_name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">{user.full_name}</p>
                  <p className="text-sm text-muted-foreground">
                    {user.username}
                  </p>
                </div>
              </Link>
              <Button variant="outline" size="sm">
                Follow
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
