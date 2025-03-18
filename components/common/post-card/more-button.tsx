"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { deletePost } from "@/lib/actions/pages/feed/deletePost";
import { followOrUnfollow } from "@/lib/actions/pages/feed/followOrUnfollow";
import { Post } from "@/lib/types/database.types";
import { User } from "@supabase/supabase-js";
import {
  Edit,
  Flag,
  Loader2,
  MoreHorizontal,
  Share2,
  Trash2,
  UserPlus,
} from "lucide-react";
import { useState, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

export default function MoreButton({
  isPostOwner,
  post,
  user,
  revalidationPath = "",
  isFollowed,
}: {
  isPostOwner: boolean;
  post: Post<true, true>;
  user: User;
  revalidationPath?: string;
  isFollowed: boolean;
}) {
  const [following, setFollowing] = useState(isFollowed);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      startTransition(async () => {
        await deletePost(post.id, user.id, revalidationPath);
      });
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete post",
        variant: "destructive",
      });
    }
  };

  const handleFollow = async () => {
    try {
      await followOrUnfollow(user, post.user.id, following, revalidationPath);
      setFollowing(!isFollowed);
      toast({
        title: "Success",
        description: following
          ? `Unfollowed ${post.user.full_name}`
          : `Followed ${post.user.full_name}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || `Failed to follow ${post.user.full_name}`,
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="px-3" title="More">
          <MoreHorizontal className="h-5 w-5" />
          <span className="sr-only">More options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {isPostOwner ? (
          <>
            <DropdownMenuItem className="flex items-center gap-3 py-3">
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-3 py-3"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        ) : (
          <>
            <DropdownMenuItem
              className={
                isFollowed
                  ? "flex items-center gap-3 py-3"
                  : "flex items-center gap-3 py-3"
              }
              onClick={handleFollow}
              disabled={isPending}
            >
              <UserPlus className="h-4 w-4" />
              {isPending && <Loader2 className="h-4 w-4" />}
              <span>{isFollowed ? "Unfollow User" : "Follow User"}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-3 py-3">
              <Flag className="h-4 w-4" />
              <span>Report</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem className="flex items-center gap-3 py-3">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
