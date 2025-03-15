import { createClient } from "@/utils/supabase/client";

export default async function checkLiked(postId: string, userId: string) {
  if (!userId) return false;
  try {
    
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
