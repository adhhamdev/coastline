"use client";

import { Comment, Post, Product, Profile } from "@/lib/types/database.types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  MessageCircle,
  Eye,
  ExternalLink,
} from "lucide-react";
import { formatRelativeTime } from "@/lib/utils/date";
import { LikeButton } from "../pages/feed/like-button";
import { ShareButton } from "../pages/feed/share-button";
import { User } from "@supabase/supabase-js";
import { ImageViewer } from "./image-viewer";
import "react-medium-image-zoom/dist/styles.css";
import { createClient } from "@/utils/supabase/client";

interface PostCardProps {
  post: Post<true, true>;
  user: User | null;
}

export function PostCard({ post, user }: PostCardProps) {
  const supabase = createClient();
  const isLiked = true;
  return (
    <article className="p-4">
      <div className="flex gap-4">
        <Link href={`/profile/`} className="group relative h-8 w-8">
          <div className="relative h-full w-full rounded-full bg-muted overflow-hidden ring-2 ring-transparent transition-all group-hover:ring-primary/20">
            {post.user?.avatar_url && (
              <Image
                src={post.user.avatar_url}
                alt={post.user.username || "User"}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="32px"
              />
            )}
          </div>
          {post.user?.verified && (
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-primary ring-1 ring-background flex items-center justify-center">
              <CheckIcon className="w-1.5 h-1.5 text-primary-foreground" />
            </div>
          )}
        </Link>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-1 flex-wrap text-sm">
            <div>
              <Link
                href={`/profile/${post.user?.username || post.user?.id}`}
                className="hover:underline"
              >
                <span className="font-semibold truncate max-w-[150px]">
                  {post.user?.full_name || post.user?.username || "Anonymous"}
                </span>
              </Link>{" "}
              <Link
                href={`/profile/${post.user?.username || post.user?.id}`}
                className="hover:underline"
              >
                <span className="text-muted-foreground truncate max-w-[100px]">
                  @{post.user?.username || "user"}
                </span>
              </Link>
            </div>
            <span className="text-muted-foreground truncate">
              {formatRelativeTime(post.created_at)}
            </span>
          </div>
          <p className="mt-2 whitespace-pre-wrap break-words">{post.content}</p>
          {post.product && (
            <Link
              href={`/product/${post.product.id}`}
              className="mt-3 flex items-center gap-3 p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition group"
            >
              <div className="relative h-12 w-12 rounded-md bg-background overflow-hidden shrink-0">
                <Image
                  src={post.product.images?.[0] || ""}
                  alt={post.product.title}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-medium truncate">
                    {post.product.title}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
                </div>
                {post.product.price && (
                  <span className="text-sm text-muted-foreground">
                    {post.product.price}
                  </span>
                )}
              </div>
            </Link>
          )}
          {post.images && post.images.length > 0 && (
            <div
              className={`mt-3 grid gap-2 ${
                post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
              }`}
            >
              {post.images.map((image, index) => (
                <ImageViewer
                  key={index}
                  src={image}
                  alt={`Post image ${index + 1}`}
                  aspectRatio={post.images?.length === 1 ? "video" : "square"}
                />
              ))}
            </div>
          )}
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Eye className="h-3.5 w-3.5" />
              <span className="text-sm">1.2k</span>
            </div>
            <div className="flex gap-2">
              <LikeButton
                postId={post.id}
                initialLiked={isLiked}
                initialCount={22}
              />
              <Button variant="ghost" size="sm" className="gap-2" asChild>
                <Link href={`/post/${post.id}`}>
                  <MessageCircle className="h-4 w-4" />
                  <span>{22}</span>
                </Link>
              </Button>
              <ShareButton postId={post.id} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
