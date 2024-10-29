import DashboardHeader from '@/components/dashboard/header';
import Overview from '@/components/dashboard/overview';
import DashboardShell from '@/components/dashboard/shell';
import DashboardTabs from '@/components/dashboard/tabs';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Welcome back! Here's an overview of your account."
      />
      <div className="grid gap-10">
        <DashboardTabs defaultValue="overview">
          <Overview />
        </DashboardTabs>
      </div>
    </DashboardShell>
  );
}