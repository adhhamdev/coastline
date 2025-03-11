"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { Post } from "@/lib/types/database.types";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Image as ImageIcon, MessageCircle, Send, Smile } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface CommentDrawerProps {
  post: Post<true, true>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CommentDrawer({
  post,
  open,
  onOpenChange,
}: CommentDrawerProps) {
  const [comment, setComment] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async () => {
    // TODO: Implement comment submission
    setComment("");
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[95vh] max-w-lg mx-auto">
        <div className="mx-auto w-full">
          <DrawerHeader className="border-b">
            <DrawerTitle className="flex items-center gap-2 text-xl">
              <MessageCircle className="h-5 w-5" />
              Comments
            </DrawerTitle>
          </DrawerHeader>

          <div className="divide-y">
            {/* Original Post Preview */}
            <div className="p-4 bg-muted/5">
              <div className="flex items-center gap-3 mb-2">
                <div className="relative h-8 w-8 rounded-full overflow-hidden">
                  {post.user.avatar_url ? (
                    <Image
                      src={post.user.avatar_url}
                      alt={post.user.username || ""}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-muted flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {post.user.username?.[0]?.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium">{post.user.full_name}</p>
                  <p className="text-sm text-muted-foreground">
                    @{post.user.username}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {post.content}
              </p>
            </div>

            {/* Comments Section */}
            <div className="p-4 flex-1 overflow-y-auto max-h-[50vh]">
              <AnimatePresence>
                {/* TODO: Map through actual comments */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <p className="text-center text-muted-foreground text-sm">
                    No comments yet. Be the first to comment!
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Comment Input Section */}
            <div className="p-4 bg-backgroun sticky bottom-0 border-t">
              <div className="relative">
                <Textarea
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                    setIsTyping(true);
                    // Reset typing indicator after delay
                    setTimeout(() => setIsTyping(false), 1000);
                  }}
                  className={cn(
                    "min-h-[80px] pr-24 resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20",
                    isTyping && "border-primary"
                  )}
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full hover:bg-muted"
                  >
                    <Smile className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full hover:bg-muted"
                  >
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!comment.trim()}
                    size="icon"
                    className={cn(
                      "h-8 w-8 rounded-full transition-all duration-200",
                      comment.trim()
                        ? "bg-primary hover:bg-primary/90"
                        : "bg-muted hover:bg-muted/90"
                    )}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
