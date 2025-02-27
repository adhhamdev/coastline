import ExploreContent from "@/components/pages/explore/explore-content";
import protectPage from "@/lib/helpers/protectPage";
import { createClient } from "@/utils/supabase/server";

export default async function ExplorePage() {
  const user = await protectPage();
  const supabase = await createClient();
  const profile = (
    await supabase.from("profiles").select("*").eq("id", user?.id).single()
  ).data;

  return (
    <div className="min-h-screen bg-background">
      <ExploreContent user={user} profile={profile} />
    </div>
  );
}
