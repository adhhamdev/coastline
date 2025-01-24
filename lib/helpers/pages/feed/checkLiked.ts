import { createClient } from "@/utils/supabase/client";

export default async function checkLiked(postId: string, userId: string) {
  try {
    if (!userId) return false;
    
    const supabase = createClient();
    const { data, error } = await supabase
      .from("likes")
      .select()
      .match({ user: userId, post: postId })
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  } catch (error) {
    console.error("Error checking like status:", error);
    return false;
  }
}
