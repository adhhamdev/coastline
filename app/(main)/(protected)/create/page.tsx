import CreateContent from '@/components/create/create-content';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function CreatePage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login');
    }

    return (
        <div className="container py-6 max-w-4xl">
            <CreateContent user={user} />
        </div>
    );
} 