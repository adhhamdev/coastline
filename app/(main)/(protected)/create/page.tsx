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
        <div className="container mx-auto flex flex-col justify-end items-center py-8 md:py-12">
            <CreateContent user={user} />
        </div>
    );
} 