import PostCard from "@/components/common/post-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Post } from "@/lib/types/database.types";
import { PostgrestError, User } from "@supabase/supabase-js";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default async function FeedPosts({
  user,
  posts,
  error,
}: {
  user: User | null;
  posts: Post<true, true>[] | null;
  error: PostgrestError | null;
}) {
  function EmptyFeed() {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="rounded-full bg-muted p-3 mb-4">
          <AlertCircle className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-lg mb-2">No Posts Yet</h3>
        <p className="text-muted-foreground mb-4">
          Be the first one to share something with the community!
        </p>
        <Button asChild>
          <Link href="/create">Create a Post</Link>
        </Button>
      </div>
    );
  }

  function ErrorMessage() {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load posts. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage />;
  }

  if (!posts || posts.length === 0) {
    return <EmptyFeed />;
  }

  return (
    <div>
      {posts.map((post: Post<true, true>) => (
        <PostCard
          key={post.id}
          post={post}
          user={user}
          revalidationPath="/feed"
        />
      ))}
    </div>
  );
}
