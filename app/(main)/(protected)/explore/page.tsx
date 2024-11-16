import ExploreContent from '@/components/explore/explore-content';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
export default async function ExplorePage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login');
    }

    // Fetch initial trending data
    const [{ data: trendingProducts }, { data: popularSellers }] = await Promise.all([
        supabase
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
            .limit(6),

        supabase
            .from('profiles')
            .select(`
        id,
        username,
        avatar_url,
        business_type,
        bio,
        verified,
        followers_count,
        products_count,
        (
          SELECT COUNT(*) FROM follows 
          WHERE following_id = profiles.id 
          AND follower_id = '${user?.id}'
        ) as is_following
      `)
            .eq('verified', true)
            .order('followers_count', { ascending: false })
            .limit(6)
    ]);

    return (
        <div className="container py-6 mx-auto px-4">
            <ExploreContent
                initialProducts={trendingProducts || []}
                popularSellers={popularSellers || []}
                user={user}
            />
        </div>
    );
} 