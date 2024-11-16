import PostCard from '@/components/feed/post-card';
import { Card } from "@/components/ui/card";
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function FeedContent() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login');
    }

    // Get posts with likes status for current user
    const { data: posts, error } = await supabase
        .from('posts')
        .select(`
            *,
            profiles:user_id (id, username, avatar_url),
            likes (user_id)
        `)
        .order('created_at', { ascending: false })
        .limit(10)

    console.log(posts, error);

    const postsWithLikeStatus = posts?.map(post => ({
        ...post,
        isLiked: post.likes?.some((like: any) => like.user_id === user.id) || false
    }))

    return (
        <div className="w-full px-0 md:container md:py-6 md:max-w-xl mx-auto scrollbar-hide">
            {!postsWithLikeStatus?.length ? (
                <Card className="mx-0 rounded-none sm:mx-auto sm:rounded-lg p-6">
                    <div className="text-center space-y-2">
                        <h3 className="font-semibold text-lg">No posts yet</h3>
                        <p className="text-muted-foreground">
                            Be the first to share something with the community!
                        </p>
                    </div>
                </Card>
            ) : (
                <div className="space-y-0 sm:space-y-4 snap-y snap-mandatory overflow-y-auto max-h-[calc(100vh-4rem)]">
                    {postsWithLikeStatus.map((post) => (
                        <div key={post.id} className="border-b sm:border-none snap-start">
                            <PostCard
                                post={post}
                                currentUser={user}
                                initialLiked={post.isLiked}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
} 