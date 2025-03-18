"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { deletePost } from "@/lib/actions/pages/feed/deletePost";
import { followOrUnfollow } from "@/lib/actions/pages/feed/followOrUnfollow";
import { User } from "@supabase/supabase-js";
import {
  Edit,
  Flag,
  MoreHorizontal,
  Share2,
  Trash2,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

export default function MoreButton({
  isPostOwner,
  postId,
  user,
  followingId,
  revalidationPath = "",
  isFollowed,
}: {
  isPostOwner: boolean;
  postId: string;
  user: User;
  followingId: string;
  revalidationPath?: string;
  isFollowed: boolean;
}) {
  const [following, setFollowing] = useState(isFollowed);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await deletePost(postId, user.id, revalidationPath);
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
      await followOrUnfollow(user, followingId, following, revalidationPath);
      setFollowing(!isFollowed);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to follow user",
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
            >
              <UserPlus className="h-4 w-4" />
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
