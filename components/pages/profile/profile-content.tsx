import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Profile } from "@/lib/types/database.types";
import { User } from "@supabase/supabase-js";
import { Calendar, Link as LinkIcon, Mail, MapPin } from "lucide-react";
import Link from "next/link";

interface ProfileContentProps {
  user: User;
  profile: Profile | null;
}

export default function ProfileContent({ user, profile }: ProfileContentProps) {
  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="w-full justify-start mb-6 bg-transparent border-b rounded-none h-auto p-0">
        <TabsTrigger
          value="posts"
          className="data-[state=active]:border-b-2 border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-6 pb-2"
        >
          Posts
        </TabsTrigger>
        <TabsTrigger
          value="about"
          className="data-[state=active]:border-b-2 border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-6 pb-2"
        >
          About
        </TabsTrigger>
        <TabsTrigger
          value="photos"
          className="data-[state=active]:border-b-2 border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-6 pb-2"
        >
          Photos
        </TabsTrigger>
      </TabsList>

      <TabsContent value="posts" className="mt-0">
        <div className="space-y-4">
          {/* Placeholder for posts - to be implemented */}
          <Card className="p-6">
            <p className="text-muted-foreground text-center py-8">
              No posts yet.
            </p>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="about" className="mt-0">
        <Card className="p-6">
          <div className="space-y-6">
            {profile?.bio && (
              <div>
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p className="text-muted-foreground">{profile.bio}</p>
              </div>
            )}

            <div className="grid gap-4">
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              {profile?.location && (
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile?.website && (
                <div className="flex items-center text-sm">
                  <LinkIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Link
                    href={profile.website}
                    className="text-primary hover:underline"
                    target="_blank"
                  >
                    {new URL(profile.website).hostname}
                  </Link>
                </div>
              )}
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>
                  Joined{" "}
                  {new Intl.DateTimeFormat(undefined, {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(new Date(profile?.created_at || new Date()))}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="photos" className="mt-0">
        <Card className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {/* Placeholder for photos - to be implemented */}
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground text-sm">No photos yet</p>
            </div>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
