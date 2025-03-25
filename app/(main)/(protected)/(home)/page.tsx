import FeedPosts from "@/components/pages/feed/feed-posts";
import RealTimeFeed from "@/components/pages/feed/real-time-feed";
import { getUser } from "@/lib/actions/auth";
import getPosts from "@/lib/helpers/pages/feed/getPosts";

export const dynamic = "force-static";
export const fetchCache = "force-cache";

export default async function FeedPage() {
  const user = await getUser();
  const { posts, error } = await getPosts();
  const latestPostTimestamp =
    posts?.[0]?.created_at || new Date().toISOString();

  return (
    <div>
      <RealTimeFeed latestPostTimestamp={latestPostTimestamp} />
      <FeedPosts user={user} posts={posts || null} error={error || null} />
    </div>
  );
}
