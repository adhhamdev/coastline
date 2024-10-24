import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';
import { ProfileForm } from '@/components/profile/profile-form';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Profile"
        text="Manage your profile settings and preferences."
      />
      <div className="grid gap-10">
        <ProfileForm user={user} />
      </div>
    </DashboardShell>
  );
}