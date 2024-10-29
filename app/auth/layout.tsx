import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
        redirect('/feed')
    }

    return (
        <div className="container flex items-center justify-center min-h-screen py-10">
            {children}
        </div>
    )
} 