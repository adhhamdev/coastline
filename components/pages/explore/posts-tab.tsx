import { TabsContent } from "@/components/ui/tabs";
import { Post } from "@/lib/types/database.types";
import { SearchResults } from "@/lib/types/pages/explore";
import { User } from "@supabase/supabase-js";
import { MessagesSquare } from "lucide-react";
import ExplorePostCard from "./post-card";

export default function PostsTab({
  searchResults,
  user,
}: {
  searchResults: SearchResults;
  user: User | null;
}) {
  return (
    <TabsContent value="posts" className="m-0">
      {searchResults.posts.length > 0 ? (
        <div className="flex justify-center">
          <div className="w-full max-w-[640px] space-y-4 md:px-4">
            {searchResults.posts.map((post: Post<true, true>) => (
              <ExplorePostCard key={post.id} post={post} user={user} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <MessagesSquare className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-medium text-lg mb-1">No posts found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </TabsContent>
  );
}
