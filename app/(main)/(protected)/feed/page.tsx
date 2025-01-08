import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Home,
  Bell,
  Mail,
  User as UserIcon,
  MoreHorizontal,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Metadata } from "next";
import { PostSkeleton } from "@/components/skeletons/post-skeleton";
import { PostCard } from "@/components/common/post-card";
import { CreatePost } from "@/components/pages/feed/create-post";
import { User } from "@supabase/supabase-js";
import SideNavbar from "@/components/pages/feed/side-navbar";
import MainFeed from "@/components/pages/feed/main-feed";
import SideTrends from "@/components/pages/feed/side-trends";
import getPosts from "@/lib/helpers/feed/getPosts";
import protectPage from "@/lib/helpers/protectPage";

export const metadata: Metadata = {
  title: "Feed | Coastline",
  description: "Stay updated with the latest posts from your network",
};

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

async function FeedPosts({ user }: { user: User | null }) {
  const { posts, error } = await getPosts();

  if (error) {
    return <ErrorMessage />;
  }

  if (!posts || posts.length === 0) {
    return <EmptyFeed />;
  }

  return (
    <div className="divide-y">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} user={user} />
      ))}
    </div>
  );
}

export default async function FeedPage() {
  const user = await protectPage();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-[300px,1fr] lg:grid-cols-[300px,1fr,1fr] gap-5 md:p-4">
        <SideNavbar />
        <main className="min-h-screen md:border-x">
          <MainFeed>
            <CreatePost user={user} />
            <Suspense
              fallback={
                <div className="divide-y">
                  {[...Array(5)].map((_, i) => (
                    <PostSkeleton key={i} />
                  ))}
                </div>
              }
            >
              <FeedPosts user={user} />
            </Suspense>
          </MainFeed>
        </main>
        <SideTrends />
      </div>
    </div>
  );
}
