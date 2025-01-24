"use client";

import { Button } from "@/components/ui/button";
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

export default function MoreButton({ isPostOwner }: { isPostOwner: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="px-3">
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
            <DropdownMenuItem className="flex items-center gap-3 py-3 text-destructive">
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
