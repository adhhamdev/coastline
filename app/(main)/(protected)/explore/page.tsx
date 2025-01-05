import ExploreContent from "@/components/pages/explore/explore-content";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ExplorePage() {
  const supabase = createClient();
  const [
    {
      data: { user },
    },
    { data: profile },
  ] = await Promise.all([
    supabase.auth.getUser(),
    supabase
      .from("profiles")
      .select("*")
      .eq("id", (await supabase.auth.getUser()).data.user?.id)
      .single(),
  ]);

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <ExploreContent user={user} profile={profile} />
    </div>
  );
}
