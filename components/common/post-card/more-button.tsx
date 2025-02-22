"use client";

import { Button } from "@/components/ui/button";
import { deletePost } from "@/lib/actions/pages/feed/deletePost";
import { useToast } from "@/lib/hooks/use-toast";
import {
  Edit,
  Flag,
  MoreHorizontal,
  Share2,
  Trash2,
  UserPlus,
} from "lucide-react";
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
  userId,
  revalidationPath = "",
}: {
  isPostOwner: boolean;
  postId: string;
  userId: string;
  revalidationPath?: string;
}) {
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await deletePost(postId, userId, revalidationPath);
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="px-3" title="More">
          <MoreHorizontal className="h-5 w-5" />
          <span className="sr-only">More options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 optimize-visibility">
        {isPostOwner ? (
          <>
            <DropdownMenuItem className="flex items-center gap-3 py-3">
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-3 py-3 text-destructive"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        ) : (
          <>
            <DropdownMenuItem className="flex items-center gap-3 py-3">
              <UserPlus className="h-4 w-4" />
              <span>Follow User</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-3 py-3 text-destructive">
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
