import CreateContent from '@/components/create/create-content';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function CreatePage() {
    const supabase = createServerComponentClient({ cookies });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login');
    }

    return (
        <div className="container py-6 max-w-4xl">
            <CreateContent user={user} />
        </div>
    );
} 