import { Button } from "@/components/ui/button";
import { Post } from "@/lib/types/database.types";
import { formatRelativeTime } from "@/lib/utils/date";
import { User } from "@supabase/supabase-js";
import {
  BadgeCheck,
  ExternalLink,
  MessageCircle,
  PackageIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import "react-medium-image-zoom/dist/styles.css";
import { ImageSlider } from "./image-slider";
import { ImageViewer } from "./image-viewer";
import { LikeButton } from "./like-button";
import { ShareButton } from "./share-button";

interface PostCardProps {
  post: Post<true, true>;
  user: User | null;
}

export default function PostCard({ post, user }: PostCardProps) {
  return (
    <article className="border-b p-3 hover:bg-muted/5">
      <div className="flex gap-3">
        <Link
          href={`/profile/${post.user.username}`}
          className="relative h-10 w-10 shrink-0 bg-muted rounded-full"
        >
          {post.user.avatar_url ? (
            <>
              <Image
                src={post.user.avatar_url}
                alt={post.user?.username || ""}
                className="object-cover overflow-hidden rounded-full"
                fill
                sizes="40px"
              />
              {true && (
                <div className="absolute -bottom-0.5 -right-0.5 rounded-full bg-background p-0.5">
                  <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                </div>
              )}
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <UserIcon className="h-5 w-5" />
            </div>
          )}
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 text-sm">
            <Link
              href={`/profile/${post.user.username}`}
              className="truncate font-semibold hover:underline"
            >
              {post.user.full_name}
            </Link>
            <Link
              href={`/profile/${post.user.username}`}
              className="truncate text-muted-foreground hover:underline"
            >
              @{post.user.username}
            </Link>
            <time dateTime={post.created_at} className="text-muted-foreground">
              {formatRelativeTime(post.created_at)}
            </time>
          </div>
          {post.content && (
            <p className="whitespace-pre-wrap break-words mt-1">
              {post.content}
            </p>
          )}
          {post.images && post.images.length > 0 && (
            <div className="mt-2">
              {post.images.length === 1 ? (
                <ImageViewer src={post.images[0]} alt={post.content || ""} />
              ) : (
                <ImageSlider images={post.images} alt={post.content || ""} />
              )}
            </div>
          )}
          {post.product && (
            <div className="mt-2">
              <Link
                href={`/product/${post.product.id}`}
                className="group flex items-start gap-2 rounded-lg border p-2 hover:bg-muted/50"
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
                  <p className="line-clamp-1 font-medium group-hover:text-primary">
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
          <div className="mt-2 flex items-center justify-end">
            <LikeButton
              postId={post.id}
              userId={user?.id || ""}
              initialCount={post.likes_count || 0}
            />
            <Button variant="ghost" size="sm" className="px-3">
              <MessageCircle className="h-4 w-4" />
              <span className="ml-1 text-sm">{post.comments_count || 0}</span>
            </Button>
            <ShareButton postId={post.id} />
          </div>
        </div>
      </div>
    </article>
  );
}
