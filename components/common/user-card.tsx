"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/lib/hooks/use-toast";
import { Post, Product, Profile } from "@/lib/types/database.types";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useState } from "react";

interface UserCardProps {
  profile: Profile;
  currentUser: Profile | null;
}

export default function UserCard({ profile, currentUser }: UserCardProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const supabase = createClient();
  const { toast } = useToast();

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await supabase
          .from("follows")
          .delete()
          .match({ follower: currentUser?.id, following: profile.id });
      } else {
        await supabase
          .from("follows")
          .insert({ follower: currentUser?.id, following: profile.id });
      }
      setIsFollowing(!isFollowing);

      toast({
        title: isFollowing ? "Unfollowed" : "Following",
        description: isFollowing
          ? `You unfollowed ${profile.username}`
          : `You are now following ${profile.username}`,
      });
    } catch (error) {
      console.error("Follow error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="h-20 bg-gradient-to-r from-emerald-600/90 to-teal-600/90" />
      <CardContent className="-mt-10 p-4 text-center">
        <Avatar className="h-20 w-20 mx-auto ring-4 ring-background">
          <AvatarImage src={profile.avatar_url || ""} />
          <AvatarFallback>{profile.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="mt-3 space-y-1.5">
          <Link href={`/${profile.username}`} className="hover:underline">
            <h3 className="font-semibold truncate">{profile.username}</h3>
          </Link>
          {profile.business_type && (
            <p className="text-sm text-muted-foreground truncate">
              {profile.business_type}
            </p>
          )}
          {profile.bio && (
            <p className="text-sm text-muted-foreground line-clamp-2 px-4">
              {profile.bio}
            </p>
          )}
        </div>
        <div className="mt-4 flex items-center justify-center gap-6 text-sm">
          <div className="text-center">
            <p className="font-semibold">{profile.followers_count || 0}</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">{profile.products_count || 0}</p>
            <p className="text-xs text-muted-foreground">Products</p>
          </div>
        </div>
        {currentUser?.id !== profile.id && (
          <Button
            onClick={handleFollow}
            variant={isFollowing ? "outline" : "default"}
            size="sm"
            className="mt-4 w-32"
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
