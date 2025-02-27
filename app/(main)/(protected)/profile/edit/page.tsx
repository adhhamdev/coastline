import DashboardHeader from "@/components/pages/dashboard/header";
import DashboardShell from "@/components/pages/dashboard/shell";
import EditProfileHeader from "@/components/pages/profile/edit-profile-header";
import ProfileForm from "@/components/pages/profile/profile-form";
import protectPage from "@/lib/helpers/protectPage";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Update your profile information and settings.",
};

export default async function EditProfilePage() {
  const user = await protectPage();
  const supabase = await createClient();

  // Fetch user profile data
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Edit Profile"
        text="Update your profile information and settings."
      />
      <div className="space-y-6">
        <EditProfileHeader user={user} profile={profile} />
        <div className="container max-w-3xl mx-auto">
          <ProfileForm user={user} profile={profile} />
        </div>
      </div>
    </DashboardShell>
  );
}
