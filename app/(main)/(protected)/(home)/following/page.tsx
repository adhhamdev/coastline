import FeedPosts from "@/components/pages/feed/feed-posts";
import RealTimeFeed from "@/components/pages/feed/real-time-feed";
import { getUser } from "@/lib/actions/auth";
import getFollowingPosts from "@/lib/helpers/pages/feed/getFollowingPosts";

export default async function FollowingPage() {
  const user = await getUser();
  const { posts, error } = await getFollowingPosts(user!);

  const latestPostTimestamp =
    posts?.[0]?.created_at || new Date().toISOString();

  return (
    <div>
      <RealTimeFeed latestPostTimestamp={latestPostTimestamp} />
      <FeedPosts user={user} posts={posts || null} error={error || null} />
    </div>
  );
}
