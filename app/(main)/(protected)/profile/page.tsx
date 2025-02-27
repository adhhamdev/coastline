import ProfileContent from "@/components/pages/profile/profile-content";
import ProfileHeader from "@/components/pages/profile/profile-header";
import protectPage from "@/lib/helpers/protectPage";
import { Profile } from "@/lib/types/database.types";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your profile settings and preferences.",
};

export default async function ProfilePage() {
  const user = await protectPage();

  // Fetch user profile data with additional fields
  const supabase = await createClient();
  const { data: profile }: { data: Profile | null } = await supabase
    .from("profiles")
    .select(`*`)
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-background pt-1">
      <div className="flex flex-col w-full">
        {/* Profile Header with cover photo and profile info */}
        <ProfileHeader user={user} profile={profile} />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Main Content Area */}
            <div className="md:col-span-8">
              <ProfileContent user={user} profile={profile} />
            </div>

            {/* Sidebar */}
            <aside className="md:col-span-4 space-y-6">
              <div className="bg-card rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-lg mb-4">Stats</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">
                      {profile?.posts_count || 0}
                    </p>
                    <p className="text-muted-foreground text-sm">Posts</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {profile?.followers_count || 0}
                    </p>
                    <p className="text-muted-foreground text-sm">Followers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {profile?.following_count || 0}
                    </p>
                    <p className="text-muted-foreground text-sm">Following</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
