import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Profile } from "@/lib/types/database.types";
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import FollowButton from "./follow-btn";

interface UserCardProps {
  profile: Profile;
  currentUser: User | null;
  revalidationPath: string;
}

async function checkIfFollowed(profile: Profile, currentUser: User | null) {
  if (!currentUser) return false;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("follows")
    .select()
    .eq("follower", currentUser.id)
    .eq("following", profile.id)
    .single();

  if (error && error.code !== "PGRST116") throw error;

  return !!data;
}

export default async function UserCard({
  profile,
  currentUser,
  revalidationPath,
}: UserCardProps) {
  const isFollowing = await checkIfFollowed(profile, currentUser);

  return (
    <Card className="overflow-hidden p-0">
      <div className="h-20 bg-linear-to-r from-emerald-600/90 to-teal-600/90" />
      <CardContent className="-mt-18 p-4 text-center min-h-[250px]">
        <Avatar className="h-20 w-20 mx-auto ring-4 ring-background">
          <AvatarImage src={profile.avatar_url || ""} />
          <AvatarFallback>{profile.username?.[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="mt-3 space-y-1.5">
          <Link
            prefetch={true}
            href={`/${profile.username}`}
            className="hover:underline"
          >
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
          <FollowButton
            profile={profile}
            currentUser={currentUser}
            isFollowing={isFollowing}
            revalidationPath={revalidationPath}
          />
        )}
      </CardContent>
    </Card>
  );
}
