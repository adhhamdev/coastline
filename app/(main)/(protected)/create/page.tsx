import CreateContent from "@/components/pages/create/create-content";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function CreatePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("username, full_name, avatar_url")
    .eq("id", user?.id)
    .single();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="md:container md:mx-auto flex flex-col justify-end items-center md:py-8">
      <CreateContent user={user} profile={profile} />
    </div>
  );
}
