"use client";

import { Button } from "@/components/ui/button";
import { Post } from "@/lib/types/database.types";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import CommentDrawer from "./comment-drawer";

export default function CommentButton({ post }: { post: Post<true, true> }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="px-3"
        onClick={() => setOpen(true)}
      >
        <MessageCircle className="h-4 w-4" />
        <span className="ml-1 text-sm">{post.comments_count || 0}</span>
      </Button>
      <CommentDrawer post={post} open={open} onOpenChange={setOpen} />
    </>
  );
}
