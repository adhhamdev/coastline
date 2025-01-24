import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function SideTrends() {
  return (
    <div className="hidden md:block space-y-4 h-[calc(100vh-5rem)] sticky top-16 overflow-y-auto">
      <div className="rounded-lg bg-muted p-4">
        <h2 className="font-semibold mb-4">Trending Products</h2>
        <div>
          {Array.from({ length: 5 }).map((_, i) => (
            <Link
              key={i}
              href={`/market/product/${i + 1}`}
              className="flex items-center gap-3 hover:bg-primary/10 p-1 rounded-lg"
            >
              <div className="h-16 w-16 rounded-lg bg-background shrink-0" />
              <div className="space-y-1 flex-1">
                <p className="font-medium line-clamp-1">Product Name {i + 1}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>$9.99</span>
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
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-background" />
                <div>
                  <p className="font-medium">User Name</p>
                  <p className="text-sm text-muted-foreground">@username</p>
                </div>
              </div>
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
