'use client';

import { likePost, unlikePost } from '@/actions/posts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useTransition } from 'react';

interface PostCardProps {
    post: any;
    currentUser: User | null;
    initialLiked: boolean;
}

export default function PostCard({ post, currentUser, initialLiked }: PostCardProps) {
    const [isLiked, setIsLiked] = useState(initialLiked);
    const [likesCount, setLikesCount] = useState(post.likes_count);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleLike = async () => {
        if (!currentUser) {
            toast({
                title: "Authentication required",
                description: "Please login to like posts",
                variant: "destructive"
            });
            return;
        }

        startTransition(async () => {
            try {
                if (isLiked) {
                    await unlikePost(post.id);
                    setLikesCount((prev: number) => prev - 1);
                } else {
                    await likePost(post.id);
                    setLikesCount((prev: number) => prev + 1);
                }
                setIsLiked(!isLiked);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to like post. Please try again.",
                    variant: "destructive"
                });
            }
        });
    };

    return (
        <Card className="overflow-hidden">
            <CardHeader className="p-4">
                <div className="flex items-center space-x-3">
                    <Link href={`/${post.profiles.username}`}>
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={post.profiles.avatar_url} />
                            <AvatarFallback>{post.profiles.username[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </Link>
                    <div>
                        <Link href={`/${post.profiles.username}`} className="font-semibold hover:underline">
                            {post.profiles.username}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <p className="whitespace-pre-wrap">{post.content}</p>
                {post.media_urls && post.media_urls.length > 0 && (
                    <div className="mt-3 grid gap-2">
                        {post.media_urls.map((url: string, index: number) => (
                            <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                                <Image
                                    src={url}
                                    alt={`Post media ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`flex items-center space-x-2 ${isLiked ? 'text-red-500' : ''}`}
                        onClick={handleLike}
                        disabled={isPending}
                    >
                        <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                        <span>{likesCount}</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-2"
                        asChild
                    >
                        <Link href={`/post/${post.id}`}>
                            <MessageCircle className="h-5 w-5" />
                            <span>{post.comments_count}</span>
                        </Link>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                        <Share2 className="h-5 w-5" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
} 