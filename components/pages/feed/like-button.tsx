"use client";

import { Button } from "@/components/ui/button";
import toggleLike from "@/lib/actions/pages/feed/toggleLike";
import { useToast } from "@/lib/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useOptimistic, useTransition } from "react";

interface LikeButtonProps {
  postId: string;
  userId: string;
  initialLiked: boolean;
  initialCount: number;
}

export function LikeButton({
  postId,
  userId,
  initialLiked,
  initialCount,
}: LikeButtonProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(
    initialLiked,
    (state, newState: boolean) => newState
  );
  const [optimisticCount, setOptimisticCount] = useOptimistic(
    initialCount,
    (state, newState: number) => newState
  );

  const handleLike = async () => {
    if (!userId) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like posts",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      try {
        // Optimistically update UI
        setOptimisticLiked(!optimisticLiked);
        setOptimisticCount(optimisticCount + (optimisticLiked ? -1 : 1));

        // Make server request
        const result = await toggleLike(postId, userId);

        if (!result.success) {
          // Revert optimistic update on error
          setOptimisticLiked(optimisticLiked);
          setOptimisticCount(optimisticCount);
          throw new Error(result.error?.message);
        }
      } catch (error) {
        console.error("Error liking post:", error);
        toast({
          title: "Error",
          description:
            error instanceof Error ? error.message : "Failed to like post",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Button
      title="Like Post"
      variant="ghost"
      size="sm"
      className={cn(
        "px-3 hover:text-red-500 flex items-center gap-1.5",
        optimisticLiked && "text-red-500"
      )}
      onClick={handleLike}
      disabled={isPending}
    >
      <Heart className={`h-4 w-4 ${optimisticLiked ? "fill-current" : ""}`} />
      <span className="text-sm">{optimisticCount}</span>
    </Button>
  );
}
