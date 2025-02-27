"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleSavePost(postId: string, userId: string, revalidationPath: string) {
  const supabase = await createClient();

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
    revalidatePath("/feed")
    return false; // Post is now unsaved
  } else {
    // Save the post
    const { error } = await supabase
    .from("saved_posts")
    .insert({ post: postId, user: userId });
    
    if (error) throw error;
    
    if (revalidationPath) {
      revalidatePath(revalidationPath)
    }

    return true; // Post is now saved
  }
}
