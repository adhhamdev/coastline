import React, { Suspense } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Home,
  Bell,
  Mail,
  User,
  MoreHorizontal,
  AlertCircle,
} from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Metadata } from "next";
import { PostSkeleton } from "@/components/skeletons/post-skeleton";
import { PostCard } from "@/components/pages/feed/post-card";
import { CreatePost } from "@/components/pages/feed/create-post";
import { Post, Profile } from "@/lib/types/database.types";
import { getUser } from "@/lib/actions/auth";
import { AuthUser } from "@/lib/types/auth.types";

export const metadata: Metadata = {
  title: "Feed | Coastline",
  description: "Stay updated with the latest posts from your network",
};

// Revalidate the page every 60 seconds
export const revalidate = 10;

interface ExtendedPost extends Post {
  profiles: Profile | null;
}

async function getPosts() {
  const supabase = createClient();

  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      `
            *,
            profiles:user_id (*),
            likes (
                user_id
            ),
            comments:comments_count
        `
    )
    .order("created_at", { ascending: false })
    .limit(10);

  console.log(posts);

  if (error) {
    console.error("Error fetching posts:", error);
    return { error };
  }

  return { posts };
}

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

async function FeedPosts({ user }: { user: AuthUser }) {
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
  const user = await getUser();
  console.log(user);

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Main container with responsive grid */}
      <div className="mx-auto grid grid-cols-1 md:grid-cols-[auto,1fr] lg:grid-cols-[250px,1fr,350px] gap-4 md:p-4">
        {/* Left Column - Navigation */}
        <div className="hidden md:flex flex-col gap-4 h-[calc(100vh-2rem)] sticky top-4">
          <ScrollArea className="h-full">
            <div className="space-y-2 py-2">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                asChild
              >
                <Link href="/feed" prefetch>
                  <Home className="h-5 w-5" />
                  Home
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                asChild
              >
                <Link href="/messages" prefetch>
                  <Mail className="h-5 w-5" />
                  Messages
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                asChild
              >
                <Link href="/profile" prefetch>
                  <User className="h-5 w-5" />
                  Profile
                </Link>
              </Button>
              <Button variant="default" className="w-full mt-4" asChild>
                <Link href="/create" prefetch>
                  Create Post
                </Link>
              </Button>
            </div>
          </ScrollArea>
        </div>

        {/* Middle Column - Feed */}
        <main className="min-h-screen md:border-x">
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur">
            <div className="flex items-center justify-between p-4">
              <h1 className="text-xl font-semibold">Home</h1>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
            <Separator />
          </div>

          {/* Create Post Section */}
          <CreatePost user={user} />

          {/* Feed Posts with Suspense */}
          <Suspense
            fallback={
              <div className="divide-y">
                {[...Array(5)].map((_, i) => (
                  <PostSkeleton key={i} />
                ))}
              </div>
            }
          >
            <FeedPosts user={user as AuthUser} />
          </Suspense>
        </main>

        {/* Right Column - Trending */}
        <div className="hidden lg:block space-y-4">
          <div className="sticky top-4">
            <div className="rounded-lg bg-muted p-4">
              <h2 className="font-semibold mb-4">Trending Topics</h2>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Trending in Tech
                    </p>
                    <p className="font-medium">#{`TrendingTopic${i + 1} `}</p>
                    <p className="text-sm text-muted-foreground">10.5K posts</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-muted p-4 mt-4">
              <h2 className="font-semibold mb-4">Who to follow</h2>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-background" />
                      <div>
                        <p className="font-medium">User Name</p>
                        <p className="text-sm text-muted-foreground">
                          @username
                        </p>
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
        </div>
      </div>
    </div>
  );
}
