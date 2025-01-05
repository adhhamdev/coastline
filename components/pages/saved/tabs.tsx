"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Post, Profile, Comment } from "@/lib/types/database.types";
import { useToast } from "@/lib/hooks/use-toast";
import { PostCard } from "../feed/post-card";
import { User } from "@supabase/supabase-js";

export default function SavedTabs({
  savedPosts,
  user,
}: {
  savedPosts: Post<true, true>[];
  user: User;
}) {
  const { toast } = useToast();

  const handleRemoveSavedPost = (postId: string) => {
    toast({
      title: "Post Removed",
      description: "The post has been removed from your saved list.",
    });
  };

  return (
    <Tabs defaultValue="posts" className="space-y-4 w-full">
      <TabsList className="w-full overflow-x-auto grid grid-cols-2">
        <TabsTrigger value="posts">Saved Posts</TabsTrigger>
        <TabsTrigger value="products">Saved Products</TabsTrigger>
      </TabsList>
      <TabsContent value="posts" className="w-full">
        <div className="space-y-4 flex flex-col items-center">
          {savedPosts.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No saved posts yet
              </CardContent>
            </Card>
          ) : (
            savedPosts.map((post) => (
              <PostCard key={post.id} post={post} user={user} />
            ))
          )}
        </div>
      </TabsContent>
      <TabsContent value="products">
        <Card>
          <CardHeader>
            <CardTitle>Saved Products</CardTitle>
            <CardDescription>
              Your saved products will appear here
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
