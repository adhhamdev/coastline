'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from '@supabase/supabase-js';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, MoreHorizontal, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface PostCardProps {
    post: any;
    currentUser: User;
}

export default function PostCard({ post, currentUser }: PostCardProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(post.likes_count);

    const handleLike = async () => {
        setIsLiked(!isLiked);
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
        // TODO: Implement like functionality with Supabase
    };

    return (
        <Card className="overflow-hidden">
            <CardHeader className="p-4">
                <div className="flex justify-between items-center">
                    <Link href={`/${post.profiles.username}`} className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={post.profiles.avatar_url} />
                            <AvatarFallback>{post.profiles.username[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-semibold">{post.profiles.username}</div>
                            <div className="text-sm text-muted-foreground">
                                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                            </div>
                        </div>
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Report</DropdownMenuItem>
                            {currentUser.id === post.profiles.id && (
                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
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