"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import toggleLike from "@/lib/actions/pages/feed/toggleLike";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useOptimistic, useState, useTransition } from "react";

interface LikeButtonProps {
  postId: string;
  userId: string;
  initialCount: number;
  isPostOwner: boolean;
  initialLiked: boolean;
}

interface LikeState {
  isLiked: boolean;
  likeCount: number;
}

export default function LikeButton({
  postId,
  userId,
  initialCount,
  isPostOwner,
  initialLiked,
}: LikeButtonProps) {
  const [likeState, setLikeState] = useState<LikeState>({
    isLiked: initialLiked,
    likeCount: initialCount,
  });
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  // Define optimistic state update
  const [optimisticLikeState, updateOptimisticLikeState] = useOptimistic(
    likeState,
    (state: LikeState, newState: Partial<LikeState>) => ({
      ...state,
      ...newState,
    })
  );

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
      const wasLiked = optimisticLikeState.isLiked;
      const newLikeCount = wasLiked
        ? optimisticLikeState.likeCount > 0
          ? optimisticLikeState.likeCount - 1
          : optimisticLikeState.likeCount
        : optimisticLikeState.likeCount + 1;

      startTransition(async () => {
        updateOptimisticLikeState({
          isLiked: !wasLiked,
          likeCount: newLikeCount,
        });

        const result = await toggleLike(postId, userId);

        if (!result.success) {
          // Revert optimistic update on error
          setLikeState({
            isLiked: wasLiked,
            likeCount: wasLiked
              ? newLikeCount < initialCount
                ? newLikeCount + 1
                : newLikeCount
              : newLikeCount > 0
              ? newLikeCount - 1
              : newLikeCount,
          });

          toast({
            title: "Error",
            description:
              result.error?.message || "Failed to update like status",
            variant: "destructive",
          });
        } else {
          // Update the actual state with the confirmed result
          setLikeState({
            isLiked: result.liked || false,
            likeCount: newLikeCount,
          });
        }
      });
    } catch (error) {
      // Revert optimistic update on error
      const currentIsLiked = optimisticLikeState.isLiked;
      setLikeState({
        isLiked: !currentIsLiked,
        likeCount: currentIsLiked
          ? optimisticLikeState.likeCount - 1
          : optimisticLikeState.likeCount + 1,
      });

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
      disabled={isPostOwner || isPending}
    >
      <Heart
        className={cn(
          "h-4 w-4 transition-transform duration-200 group-hover:scale-110",
          {
            "fill-red-500 text-red-500": optimisticLikeState.isLiked,
          }
        )}
      />
      <span className="ml-1.5 text-sm">{optimisticLikeState.likeCount}</span>
    </Button>
  );
}
