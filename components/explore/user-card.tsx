'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { useState } from 'react';

interface UserCardProps {
    profile: any;
    currentUser: User;
}

export default function UserCard({ profile, currentUser }: UserCardProps) {
    const [isFollowing, setIsFollowing] = useState(false);
    const supabase = createClient();
    const { toast } = useToast();

    const handleFollow = async () => {
        try {
            if (isFollowing) {
                await supabase
                    .from('follows')
                    .delete()
                    .match({ follower_id: currentUser.id, following_id: profile.id });
            } else {
                await supabase
                    .from('follows')
                    .insert({ follower_id: currentUser.id, following_id: profile.id });
            }
            setIsFollowing(!isFollowing);

            toast({
                title: isFollowing ? "Unfollowed" : "Following",
                description: isFollowing
                    ? `You unfollowed ${profile.username}`
                    : `You are now following ${profile.username}`,
            });
        } catch (error) {
            console.error('Follow error:', error);
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <Card className="overflow-hidden">
            <CardHeader className="p-0">
                <div className="h-24 bg-gradient-to-r from-emerald-600 to-teal-700" />
            </CardHeader>
            <CardContent className="pt-0">
                <div className="flex flex-col items-center -mt-12">
                    <Avatar className="h-24 w-24 border-4 border-background">
                        <AvatarImage src={profile.avatar_url} />
                        <AvatarFallback>{profile.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="mt-4 text-center">
                        <Link href={`/${profile.username}`} className="hover:underline">
                            <h3 className="text-lg font-semibold">{profile.username}</h3>
                        </Link>
                        <p className="text-sm text-muted-foreground">{profile.business_type}</p>
                        {profile.bio && (
                            <p className="mt-2 text-sm">{profile.bio}</p>
                        )}
                    </div>
                    <div className="mt-4 flex items-center space-x-4">
                        <div className="text-center">
                            <p className="text-lg font-semibold">{profile.followers_count || 0}</p>
                            <p className="text-sm text-muted-foreground">Followers</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-semibold">{profile.products_count || 0}</p>
                            <p className="text-sm text-muted-foreground">Products</p>
                        </div>
                    </div>
                    {currentUser.id !== profile.id && (
                        <Button
                            onClick={handleFollow}
                            variant={isFollowing ? "outline" : "default"}
                            className="mt-4 w-full"
                        >
                            {isFollowing ? "Unfollow" : "Follow"}
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
} 