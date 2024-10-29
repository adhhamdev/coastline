'use client';

import PostCard from '@/components/feed/post-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createClient } from '@/utils/supabase';
import { User } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

interface FeedContentProps {
    initialFeedItems: any[];
    user: User;
}

export default function FeedContent({ initialFeedItems, user }: FeedContentProps) {
    const [feedItems, setFeedItems] = useState(initialFeedItems);
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    const loadMore = async () => {
        if (loading) return;
        setLoading(true);

        const lastItem = feedItems[feedItems.length - 1];
        const { data: newItems } = await supabase
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
            .lt('created_at', lastItem.created_at)
            .order('created_at', { ascending: false })
            .limit(10);

        if (newItems?.length) {
            setFeedItems([...feedItems, ...newItems]);
        }
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="following">Following</TabsTrigger>
                    <TabsTrigger value="trending">Trending</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                    {feedItems.map((item) => (
                        <PostCard key={item.id} post={item} currentUser={user} />
                    ))}
                    <div className="flex justify-center">
                        <Button
                            variant="outline"
                            onClick={loadMore}
                            disabled={loading}
                            className="w-full sm:w-auto"
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? 'Loading...' : 'Load More'}
                        </Button>
                    </div>
                </TabsContent>
                {/* Add other tab contents as needed */}
            </Tabs>
        </div>
    );
} 