import ExploreContent from '@/components/explore/explore-content';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ExplorePage() {
    const supabase = createServerComponentClient({ cookies });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login');
    }

    // Fetch initial trending data
    const { data: trendingProducts } = await supabase
        .from('products')
        .select(`
      id,
      title,
      price,
      images,
      created_at,
      profiles (
        id,
        username,
        avatar_url,
        business_type
      )
    `)
        .order('views_count', { ascending: false })
        .limit(6);

    const { data: popularSellers } = await supabase
        .from('profiles')
        .select('*')
        .eq('verified', true)
        .order('followers_count', { ascending: false })
        .limit(6);

    return (
        <div className="container py-6 max-w-7xl">
            <ExploreContent
                initialProducts={trendingProducts || []}
                popularSellers={popularSellers || []}
                user={user}
            />
        </div>
    );
} 