import FeedPosts from "@/components/pages/feed/feed-posts";
import { Skeleton } from "@/components/ui/skeleton";
import getPosts from "@/lib/helpers/pages/feed/getPosts";
import protectPage from "@/lib/helpers/protectPage";
import { Suspense } from "react";

// export const dynamic = "force-static";

function FeedSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-4 border rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-4" />
          <Skeleton className="h-64 w-full rounded-md mb-4" />
        </div>
      ))}
    </div>
  );
}

export default async function FeedPage() {
  const user = await protectPage();
  const { posts, error } = await getPosts();

  return (
    <Suspense fallback={<FeedSkeleton />}>
      <FeedPosts user={user} posts={posts || null} error={error || null} />
    </Suspense>
  );
}
