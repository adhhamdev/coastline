import { ImageCarousel } from "@/components/common/image-carousel";
import CommentButton from "@/components/common/post-card/comment-button";
import LikeButton from "@/components/common/post-card/like-button";
import MoreButton from "@/components/common/post-card/more-button";
import SaveButton from "@/components/common/post-card/save-post-button";
import { ShareButton } from "@/components/common/share-button";
import { Post } from "@/lib/types/database.types";
import { formatRelativeTime } from "@/lib/utils/date";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { BadgeCheck, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "react-medium-image-zoom/dist/styles.css";
import AttachedProduct from "./attached-product";

interface PostCardProps {
  post: Post<true, true>;
  user: User | null;
}

export default function ExplorePostCard({ post, user }: PostCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const isPostOwner = post.user.id === user?.id;

  useEffect(() => {
    async function checkIfPostSaved(postId: string, userId?: string) {
      if (!userId) return false;

      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("saved_posts")
          .select()
          .eq("post", postId)
          .eq("user", userId)
          .single();

        if (error) throw error;

        setIsSaved(!!data);
      } catch (error) {
        setIsSaved(false);
      }
    }
    checkIfPostSaved(post.id, user?.id);
  });

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
          {post?.content && (
            <p className="whitespace-pre-wrap break-words mt-1">
              {post?.content}
            </p>
          )}
          {post.images && post.images.length > 0 && (
            <div className="mt-2">
              <ImageCarousel
                images={post.images}
                alt={post.content || ""}
                showDownload
              />
            </div>
          )}
          {post.product && (
            <div className="mt-2">
              <AttachedProduct post={post} />
            </div>
          )}
          <div className="mt-2 flex items-center justify-end">
            {!isPostOwner && (
              <LikeButton
                postId={post.id}
                userId={user?.id || ""}
                initialCount={post.likes_count || 0}
              />
            )}
            <CommentButton post={post} />
            <ShareButton
              url={`/post/${post.id}`}
              title={post?.content || ""}
              type="post"
              contentId={post.id}
            />
            <SaveButton
              postId={post.id}
              userId={user?.id}
              initialSaved={isSaved}
            />
            <MoreButton
              isPostOwner={isPostOwner}
              postId={post.id}
              userId={user?.id || ""}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
