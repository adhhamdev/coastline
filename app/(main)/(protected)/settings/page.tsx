import DashboardHeader from '@/components/pages/dashboard/header';
import DashboardShell from '@/components/pages/dashboard/shell';
import SettingsTabs from '@/components/pages/settings/tabs';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function SettingsPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login');
    }

    return (
        <DashboardShell>
            <DashboardHeader
                heading="Settings"
                text="Manage your account settings and preferences."
            />
            <div className="grid gap-10">
                <SettingsTabs />
            </div>
        </DashboardShell>
    );
} 