import { Button } from "@/components/ui/button";
import { Post } from "@/lib/types/database.types";
import { formatRelativeTime } from "@/lib/utils/date";
import { User } from "@supabase/supabase-js";
import {
  CheckIcon,
  ExternalLink,
  MessageCircle,
  PackageIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import "react-medium-image-zoom/dist/styles.css";
import { LikeButton } from "../pages/feed/like-button";
import { ShareButton } from "../pages/feed/share-button";
import { ImageViewer } from "./image-viewer";
import checkLiked from "@/lib/actions/pages/feed/checkLiked";

interface PostCardProps {
  post: Post<true, true>;
  user: User | null;
}

export async function PostCard({ post, user }: PostCardProps) {
  const isLiked = user ? await checkLiked(post.id, user.id) : false;

  return (
    <article className="p-4">
      <div className="flex items-start gap-3">
        <Link
          href={`/profile/${post.user.username}`}
          className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted"
        >
          {post.user.avatar_url ? (
            <Image
              src={post.user.avatar_url}
              alt={post.user?.username || ""}
              className="object-cover"
              fill
              sizes="40px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <UserIcon className="h-5 w-5" />
            </div>
          )}
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Link
              href={`/profile/${post.user.username}`}
              className="truncate font-semibold hover:underline"
            >
              {post.user.username}
            </Link>
            {post.user.verified && (
              <CheckIcon className="h-4 w-4 shrink-0 text-primary" />
            )}
            <span className="shrink-0 text-xs text-muted-foreground">·</span>
            <time
              dateTime={post.created_at}
              className="shrink-0 text-xs text-muted-foreground"
            >
              {formatRelativeTime(post.created_at)}
            </time>
          </div>
          {post.content && (
            <p className="whitespace-pre-wrap break-words py-3">
              {post.content}
            </p>
          )}
          {post.images && post.images.length > 0 && (
            <div className="mt-3">
              <ImageViewer src={post.images[0]} alt={post.content || ""} />
            </div>
          )}
          {post.product && (
            <div className="mt-3">
              <Link
                href={`/product/${post.product.id}`}
                className="group flex items-start gap-3 rounded-lg border p-3 hover:bg-muted/50"
              >
                <div className="relative aspect-square w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                  {post.product.images?.[0] ? (
                    <Image
                      src={post.product.images[0]}
                      alt={post.product.title}
                      className="object-cover transition-transform group-hover:scale-110"
                      fill
                      sizes="64px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <PackageIcon className="h-6 w-6" />
                    </div>
                  )}
                </div>
                <div className="flex-1 truncate">
                  <p className="mb-1 line-clamp-1 font-medium group-hover:text-primary">
                    {post.product.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ${post.product.price.toLocaleString()}
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
              </Link>
            </div>
          )}
          <div className="mt-3 flex items-center gap-1">
            <LikeButton
              postId={post.id}
              userId={user?.id || ""}
              initialLiked={isLiked}
              initialCount={post.likes_count || 0}
            />
            <Button variant="ghost" size="sm" className="px-3">
              <MessageCircle className="h-4 w-4" />
              <span className="ml-1.5 text-sm">{post.comments_count || 0}</span>
            </Button>
            <div className="ml-auto">
              <ShareButton postId={post.id} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
