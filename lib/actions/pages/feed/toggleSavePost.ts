import { createClient } from "@/utils/supabase/client";

export async function toggleSavePost(postId: string, userId: string) {
  const supabase = createClient();

  // Check if post is already saved
  const { data: existingSave } = await supabase
    .from("saved_posts")
    .select()
    .eq("post", postId)
    .eq("user", userId)
    .single();

  if (existingSave) {
    // Unsave the post
    const { error } = await supabase
      .from("saved_posts")
      .delete()
      .eq("post", postId)
      .eq("user", userId);

    if (error) throw error;
    return false; // Post is now unsaved
  } else {
    // Save the post
    const { error } = await supabase
      .from("saved_posts")
      .insert({ post: postId, user: userId });

    if (error) throw error;
    return true; // Post is now saved
  }
}
