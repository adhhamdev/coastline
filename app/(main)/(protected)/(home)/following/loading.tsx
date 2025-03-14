import { PostSkeleton } from "@/components/skeletons/post-skeleton";

export default function FollowingLoading() {
  return (
    <div className="divide-y">
      {[...Array(5)].map((_, i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  );
}
