import FeedPosts from "@/components/pages/feed/feed-posts";
import getPosts from "@/lib/helpers/pages/feed/getPosts";
import protectPage from "@/lib/helpers/protectPage";

export default async function FeedPage() {
  const user = await protectPage();
  const { posts, error } = await getPosts();

  return <FeedPosts user={user} posts={posts || null} error={error || null} />;
}
