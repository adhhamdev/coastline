import PostCard from '@/components/feed/post-card';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function FeedPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login');
    }

    // Get posts with likes status for current user
    const { data: posts } = await supabase
        .from('posts')
        .select(`
      *,
      profiles:user_id (
        username,
        avatar_url,
        business_type
      ),
      likes:post_likes (
        user_id
      )
    `)
        .order('created_at', { ascending: false })
        .limit(10)

    const postsWithLikeStatus = posts?.map(post => ({
        ...post,
        isLiked: post.likes?.some((like: any) => like.user_id === user.id) || false
    }))

    return (
        <div className="container py-6 max-w-4xl">
            <div className="space-y-6">
                {postsWithLikeStatus?.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        currentUser={user}
                        initialLiked={post.isLiked}
                    />
                ))}
            </div>
        </div>
    )
} 