import { Post } from "@/lib/types/database.types";
import { formatRelativeTime } from "@/lib/utils/date";
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";
import { BadgeCheck, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ImageCarousel } from "../image-carousel";
import { ShareButton } from "../share-button";
import AttachedProduct from "./attached-product";
import CommentButton from "./comment-button";
import LikeButton from "./like-button";
import MoreButton from "./more-button";
import SaveButton from "./save-post-button";

interface PostCardProps {
  post: Post<true, true>;
  user: User | null;
  revalidationPath?: string;
}

async function checkIfPostSaved(postId: string, userId?: string) {
  if (!userId) return false;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("likes")
      .select()
      .match({ user: userId, post: postId })
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return !!data;
  } catch (error) {
    console.error("Error checking like status:", error);
    return false;
  }
}

async function checkIfPostLiked(postId: string, userId?: string) {
  if (!userId) return false;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("likes")
    .select()
    .eq("post", postId)
    .eq("user", userId)
    .single();

  return !!data;
}

export default async function PostCard({
  post,
  user,
  revalidationPath = "",
}: PostCardProps) {
  const isPostOwner = post.user.id === user?.id;
  const [isSaved, isLiked] = await Promise.all([
    checkIfPostSaved(post.id, user?.id),
    checkIfPostLiked(post.id, user?.id),
  ]);

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
          <div className="flex items-center justify-between text-sm">
            <div className="flex gap-1 w-full">
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
            </div>
            <time
              dateTime={post.created_at}
              className="text-muted-foreground px-2"
            >
              {formatRelativeTime(post.created_at)}
            </time>
          </div>
          {post?.content && (
            <p className="whitespace-pre-wrap break-words mt-1 text-sm">
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
          <div className="mt-2 flex items-center justify-between">
            <div>
              <MoreButton
                isPostOwner={isPostOwner}
                postId={post.id}
                userId={user?.id || ""}
                revalidationPath={revalidationPath}
              />
            </div>
            <div>
              <CommentButton post={post} />
              <ShareButton
                url={`/post/${post.id}`}
                title={post?.content || ""}
                type="post"
                contentId={post.id}
              />
              <SaveButton
                revalidationPath={revalidationPath}
                postId={post.id}
                userId={user?.id}
                initialSaved={isSaved}
              />
              <LikeButton
                postId={post.id}
                userId={user?.id || ""}
                initialLiked={isLiked}
                initialCount={post.likes_count || 0}
                isPostOwner={isPostOwner}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
