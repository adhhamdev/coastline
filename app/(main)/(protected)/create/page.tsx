import CreateContent from '@/components/pages/create/create-content';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function CreatePage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login');
    }

    return (
        <div className="md:container md:mx-auto flex flex-col justify-end items-center md:py-8 md:py-12">
            <CreateContent user={user} />
        </div>
    );
} 