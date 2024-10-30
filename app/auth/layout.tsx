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
        <main className="flex min-h-screen flex-col items-center justify-center">
            {children}
        </main>
    )
} 