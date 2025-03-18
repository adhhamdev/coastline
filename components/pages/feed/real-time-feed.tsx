"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface RealTimeFeedProps {
  latestPostTimestamp: string;
}

export default function RealTimeFeed({
  latestPostTimestamp,
}: RealTimeFeedProps) {
  const [newPostsCount, setNewPostsCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Create a channel to listen for changes on the posts table
    const channel = supabase
      .channel("posts-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "posts",
        },
        (payload) => {
          // Increment the counter when a new post is detected
          setNewPostsCount((prevCount) => prevCount + 1);
          // Show the floating button
          setIsVisible(true);
        }
      )
      .subscribe((status) => {
        if (status !== "SUBSCRIBED") {
          toast.error("Failed to subscribe to real-time updates");
        }
      });

    // Cleanup function to unsubscribe when component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, latestPostTimestamp]);

  const handleRefresh = () => {
    // Reset the counter
    setNewPostsCount(0);
    // Hide the button
    setIsVisible(false);
    // Refresh the feed
    router.refresh();
  };

  if (!isVisible || newPostsCount === 0) {
    return null;
  }

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
      <Button
        onClick={handleRefresh}
        className="rounded-full shadow-lg flex items-center gap-2 bg-primary hover:bg-primary/90 transition-all"
      >
        <ArrowUp className="h-4 w-4" />
        {newPostsCount === 1 ? "1 new post" : `${newPostsCount} new posts`}
      </Button>
    </div>
  );
}
