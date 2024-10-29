import ContentTabs from '@/components/content/tabs';
import DashboardHeader from '@/components/dashboard/header';
import DashboardShell from '@/components/dashboard/shell';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ContentPage() {
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
                heading="Content"
                text="Create and manage your content."
            />
            <div className="grid gap-10">
                <ContentTabs />
            </div>
        </DashboardShell>
    );
} 