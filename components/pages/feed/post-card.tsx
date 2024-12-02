"use client";

import { Comment, Post, Profile } from "@/lib/types/database.types"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle, Share2 } from "lucide-react"
import { formatRelativeTime } from "@/lib/utils/date"
import { LikeButton } from "./like-button"
import { ShareButton } from "./share-button";
import { AuthUser } from "@/lib/types/auth.types";

interface ExtendedPost extends Post {
  profiles: Profile | null
  likes: { user_id: string }[]
  comments: Comment[]
}

interface PostCardProps {
  post: ExtendedPost
  user: AuthUser
}

export function PostCard({ post, user }: PostCardProps) {
  const isLiked = post.likes.some((like: { user_id: string }) => like.user_id === user.id)
  return (
    <article className="p-4">
      <div className="flex gap-4">
        <Link
          href={`/profile/${post.profiles?.username || post.user_id}`}
          className="relative h-10 w-10 rounded-full bg-muted overflow-hidden hover:opacity-80 transition"
        >
          {post.profiles?.avatar_url && (
            <Image
              src={post.profiles.avatar_url}
              alt={post.profiles.username || 'User'}
              fill
              className="object-cover"
              sizes="40px"
            />
          )}
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/profile/${post.profiles?.username || post.user_id}`}
              className="hover:underline"
            >
              <span className="font-semibold">
                {post.profiles?.full_name || post.profiles?.username || 'Anonymous'}
              </span>
            </Link>
            <Link
              href={`/profile/${post.profiles?.username || post.user_id}`}
              className="hover:underline"
            >
              <span className="text-muted-foreground">
                @{post.profiles?.username || 'user'}
              </span>
            </Link>
            {post.profiles?.verified && (
              <span className="text-primary" title="Verified">
                ✓
              </span>
            )}
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">
              {formatRelativeTime(post.created_at)}
            </span>
          </div>
          <p className="mt-2 whitespace-pre-wrap break-words">{post.content}</p>
          {
            post.images && post.images.length > 0 && (
              <div className={`mt-3 grid gap-2 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {post.images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative bg-muted overflow-hidden rounded-lg ${post.images?.length === 1 ? 'aspect-video' : 'aspect-square'
                      }`}
                  >
                    <Image
                      src={image}
                      alt={`Post image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 640px) 400px, 200px"
                    />
                  </div>
                ))}
              </div>
            )}
          <div className="flex gap-6 mt-4">
            <LikeButton
              postId={post.id}
              initialLiked={isLiked}
              initialCount={post.likes.length}
            />
            <Button variant="ghost" size="sm" className="gap-2" asChild>
              <Link href={`/post/${post.id}`}>
                <MessageCircle className="h-4 w-4" />
                {post.comments_count}
              </Link>
            </Button>
            <ShareButton postId={post.id} />
          </div>
        </div>
      </div>
    </article>
  )
}
