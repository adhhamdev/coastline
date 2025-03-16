import FeedPosts from "@/components/pages/feed/feed-posts";
import getFollowingPosts from "@/lib/helpers/pages/feed/getFollowingPosts";
import protectPage from "@/lib/helpers/protectPage";

export default async function FollowingPage() {
  const user = await protectPage();
  const { posts, error } = await getFollowingPosts(user);

  return <FeedPosts user={user} posts={posts || null} error={error || null} />;
}
