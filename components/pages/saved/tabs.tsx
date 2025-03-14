import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Post, SavedPost } from "@/lib/types/database.types";
import { User } from "@supabase/supabase-js";
import PostCard from "../../common/post-card";

export default function SavedTabs({
  savedPosts,
  user,
}: {
  savedPosts: SavedPost<true, true>[];
  user: User;
}) {
  return (
    <Tabs defaultValue="posts" className="space-y-4 w-full">
      <TabsList className="w-full overflow-x-auto grid grid-cols-2">
        <TabsTrigger value="posts">Saved Posts</TabsTrigger>
        <TabsTrigger value="products">Saved Products</TabsTrigger>
      </TabsList>
      <TabsContent value="posts" className="w-full">
        <div>
          {savedPosts.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No saved posts yet
              </CardContent>
            </Card>
          ) : (
            savedPosts.map((savedPost) => (
              <PostCard
                key={savedPost.post?.id}
                post={savedPost?.post as Post<true, true>}
                user={user}
                revalidationPath="/saved"
              />
            ))
          )}
        </div>
      </TabsContent>
      <TabsContent value="products">
        <Card>
          <CardHeader>
            <CardTitle>Saved Products</CardTitle>
            <CardDescription>
              Your saved products will appear here
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
