import DashboardHeader from '@/components/dashboard/header';
import DashboardShell from '@/components/dashboard/shell';
import ProfileForm from '@/components/profile/profile-form';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Fetch user profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Profile"
        text="Manage your profile settings and preferences."
      />
      <div className="grid gap-10 mx-auto">
        <ProfileForm user={user} profile={profile} />
      </div>
    </DashboardShell>
  );
}