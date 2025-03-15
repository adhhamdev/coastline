"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleSavePost(postId: string, userId: string, isSaved: boolean, revalidationPath: string) {
  const supabase = await createClient();

  if (isSaved) {
    // Unsave the post
    const { error } = await supabase
      .from("saved_posts")
      .delete()
      .eq("post", postId)
      .eq("user", userId);

    if (error) throw error;
     
    if (revalidationPath) {
      revalidatePath(revalidationPath)
    }
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
