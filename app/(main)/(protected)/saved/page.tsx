import DashboardHeader from '@/components/dashboard/header';
import DashboardShell from '@/components/dashboard/shell';
import SavedTabs from '@/components/saved/tabs';
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
                heading="Saved"
                text="Manage your saved content."
            />
            <div className="grid gap-10">
                <SavedTabs />
            </div>
        </DashboardShell>
    );
} 