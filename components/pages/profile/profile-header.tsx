import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Profile } from "@/lib/types/database.types";
import { User } from "@supabase/supabase-js";
import { Edit, Link as LinkIcon, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProfileHeaderProps {
  user: User | null;
  profile: Profile | null;
}

export default function ProfileHeader({ user, profile }: ProfileHeaderProps) {
  return (
    <div className="relative">
      {/* Cover Photo */}
      <div className="h-48 sm:h-64 md:h-80 w-full relative bg-linear-to-r from-blue-100 to-blue-200">
        {profile?.banner_url && (
          <Image
            src={profile.banner_url}
            alt="Cover"
            className="w-full h-full object-cover"
            width={1000}
            height={500}
          />
        )}
      </div>

      {/* Profile Info Section */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 md:-mt-20 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end sm:space-x-5">
            {/* Profile Picture */}
            <div className="relative">
              <Avatar className="h-32 w-32 sm:h-40 sm:w-40 rounded-full ring-4 ring-background">
                <AvatarImage src={profile?.avatar_url || ""} />
                <AvatarFallback className="text-4xl">
                  {user?.email?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Profile Info */}
            <div className="flex-1 mt-3 md:mt-0">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-center sm:text-left">
                    {profile?.full_name || user?.user_metadata?.full_name}
                  </h1>
                  <p className="text-muted-foreground text-center sm:text-left">
                    @{profile?.username || user?.email?.split("@")[0]}
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 flex justify-center sm:justify-start space-x-3">
                  <Link href="/profile/edit">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </Link>
                  <Button size="sm">Follow</Button>
                </div>
              </div>

              {/* Bio and Links */}
              <div className="mt-4">
                {profile?.bio && (
                  <p className="text-sm text-center sm:text-left">
                    {profile.bio || "No bio yet."}
                  </p>
                )}
                <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-4">
                  {profile?.location && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {profile.location || "No location yet."}
                    </div>
                  )}
                  {profile?.website && (
                    <Link
                      href={profile.website}
                      className="flex items-center text-sm text-primary hover:underline"
                      target="_blank"
                    >
                      <LinkIcon className="h-4 w-4 mr-1" />
                      {new URL(profile.website).hostname || "No website yet."}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
