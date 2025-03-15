import DashboardHeader from "@/components/pages/dashboard/header";
import DashboardShell from "@/components/pages/dashboard/shell";
import SavedTabs from "@/components/pages/saved/tabs";
import protectPage from "@/lib/helpers/protectPage";
import { createClient } from "@/utils/supabase/server";

export default async function SavedPage() {
  const user = await protectPage();

  const getSavedPosts = async (userId: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("saved_posts")
      .select(
        `*, user:profiles(*), post:posts(*, user:profiles(*), product:products(*))`
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
