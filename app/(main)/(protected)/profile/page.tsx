import DashboardHeader from '@/components/pages/dashboard/header';
import DashboardShell from '@/components/pages/dashboard/shell';
import ProfileForm from '@/components/pages/profile/profile-form';
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
      <div className='my-4'>
        <ProfileForm user={user} profile={profile} />
      </div>
    </DashboardShell>
  );
}