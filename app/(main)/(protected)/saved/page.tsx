import DashboardHeader from "@/components/pages/dashboard/header";
import DashboardShell from "@/components/pages/dashboard/shell";
import SavedTabs from "@/components/pages/saved/tabs";
import { getUser } from "@/lib/actions/auth";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function SavedPage() {
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const getSavedPosts = async (userId: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("saved_posts")
      .select(
        `
                *,
                profiles:user (*),
                likes (
                    user
                ),
                comments:comments_count
            `
      )
      .eq("user", userId);

    return data;
  };

  const savedPosts = await getSavedPosts(user.id);

  return (
    <DashboardShell>
      <DashboardHeader heading="Saved" text="Manage your saved content." />
      <div className="grid gap-10">
        <SavedTabs savedPosts={savedPosts || []} user={user} />
      </div>
    </DashboardShell>
  );
}
