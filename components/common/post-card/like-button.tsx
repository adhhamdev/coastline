"use client";

import { Button } from "@/components/ui/button";
import toggleLike from "@/lib/actions/pages/feed/toggleLike";
import checkLiked from "@/lib/helpers/pages/feed/checkLiked";
import { useToast } from "@/lib/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface LikeButtonProps {
  postId: string;
  userId: string;
  initialCount: number;
}

export default function LikeButton({
  postId,
  userId,
  initialCount,
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialCount);
  const { toast } = useToast();

  useEffect(() => {
    const checkInitialLikeStatus = async () => {
      try {
        const liked = await checkLiked(postId, userId);
        setIsLiked(liked);
      } catch (error) {
        console.error("Error checking like status:", error);
      }
    };
    checkInitialLikeStatus();
  }, [postId, userId]);

  const handleLike = async () => {
    if (!userId) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like posts",
      });
      return;
    }

    try {
      // Optimistically update UI
      const wasLiked = isLiked;
      setIsLiked(!wasLiked);
      setLikeCount((prev) =>
        wasLiked ? (prev > 0 ? prev - 1 : prev) : prev + 1
      );

      const result = await toggleLike(postId, userId);

      if (!result.success) {
        // Revert optimistic update on error
        setIsLiked(wasLiked);
        setLikeCount((prev) => (wasLiked ? prev - 1 : prev + 1));
        toast({
          title: "Error",
          description: result.error?.message || "Failed to update like status",
          variant: "destructive",
        });
      }
    } catch (error) {
      // Revert optimistic update on error
      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
      toast({
        title: "Error",
        description: "Failed to update like status",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="px-3 group"
      onClick={handleLike}
      title="Like"
    >
      <Heart
        className={cn(
          "h-4 w-4 transition-transform duration-200 group-hover:scale-110",
          {
            "fill-red-500 text-red-500": isLiked,
          }
        )}
      />
      <span className="ml-1.5 text-sm">{likeCount}</span>
    </Button>
  );
}
