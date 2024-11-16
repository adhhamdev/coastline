"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Post } from "@/lib/database.types";
import { useToast } from "@/lib/hooks/use-toast";
import { useState } from "react";
import PostCard from "../feed/post-card";

export default function SavedTabs() {
  const { toast } = useToast();

  // Placeholder saved posts - replace with actual data fetching logic
  const [savedPosts, setSavedPosts] = useState<Post[]>([
    {
      id: "1",
      user_id: "user1",
      content: "This is a sample saved post",
      images: ["https://example.com/image1.jpg"],
      likes_count: 10,
      comments_count: 5,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      user_id: "user2",
      content: "Another saved post example",
      videos: ["https://example.com/video1.mp4"],
      likes_count: 15,
      comments_count: 8,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);

  const handleRemoveSavedPost = (postId: string) => {
    setSavedPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== postId)
    );
    toast({
      title: "Post Removed",
      description: "The post has been removed from your saved list.",
    });
  };

  return (
    <Tabs defaultValue="posts" className="space-y-4">
      <TabsList>
        <TabsTrigger value="posts">Saved Posts</TabsTrigger>
        <TabsTrigger value="products">Saved Products</TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <div className="space-y-4">
          {savedPosts.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No saved posts yet
              </CardContent>
            </Card>
          ) : (
            savedPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUser={null}
                initialLiked={false}
              />
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
