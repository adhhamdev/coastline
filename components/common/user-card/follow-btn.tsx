"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { followOrUnfollow } from "@/lib/actions/pages/feed/followOrUnfollow";
import { Profile } from "@/lib/types/database.types";
import { User } from "@supabase/supabase-js";
import { useOptimistic, useTransition } from "react";

interface FollowButtonProps {
  profile: Profile;
  currentUser: User | null;
  isFollowing: boolean;
  revalidationPath: string;
}

export default function FollowButton({
  profile,
  currentUser,
  isFollowing: initialIsFollowing,
  revalidationPath,
}: FollowButtonProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  // Set up optimistic state
  const [optimisticIsFollowing, setOptimisticIsFollowing] = useOptimistic(
    initialIsFollowing,
    (state, newState: boolean) => newState
  );

  const handleFollow = async () => {
    // Update optimistically
    startTransition(() => {
      setOptimisticIsFollowing(!optimisticIsFollowing);
    });

    // Perform the actual server action
    const result = await followOrUnfollow(
      currentUser,
      profile.id,
      optimisticIsFollowing,
      revalidationPath
    );

    // Handle errors if the action fails
    if (!result.success) {
      // Revert the optimistic update
      setOptimisticIsFollowing(optimisticIsFollowing);

      // Show error toast
      toast({
        title: "Error",
        description: result.error || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleFollow}
      variant={optimisticIsFollowing ? "outline" : "default"}
      size="sm"
      className="mt-4 w-32"
      disabled={isPending}
    >
      {optimisticIsFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}
