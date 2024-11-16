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
      <div className="flex min-h-screen flex-col gap-8 py-8md:py-12">
        <DashboardHeader
          heading="Dashboard"
          text="Welcome back! Here's an overview of your account."
        />
        <DashboardTabs defaultValue="overview">
          <Overview />
        </DashboardTabs>
      </div>
    </DashboardShell>
  );
}