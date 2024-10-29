import FeedContent from '@/components/feed/feed-content';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function FeedPage() {
    const supabase = createServerComponentClient({ cookies });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login');
    }

    // Fetch posts and products for the feed
    const { data: feedItems } = await supabase
        .from('posts')
        .select(`
      id,
      content,
      media_urls,
      created_at,
      profiles (
        id,
        username,
        avatar_url,
        business_type
      ),
      likes_count,
      comments_count
    `)
        .order('created_at', { ascending: false })
        .limit(10);

    return (
        <div className="container py-6 max-w-4xl">
            <FeedContent initialFeedItems={feedItems || []} user={user} />
        </div>
    );
} 