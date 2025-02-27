import Navigation from "@/components/common/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex relative flex-col min-h-screen">
      <Navigation user={user} />
      <main className="flex-1 pb-[4rem] md:pb-0">{children}</main>
    </div>
  );
}
