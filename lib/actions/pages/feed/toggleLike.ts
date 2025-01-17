'use server';

import { handleSupabaseError } from "@/lib/utils/handle-error";
import { createClient } from "@/utils/supabase/server";

export default async function toggleLike(postId: string, userId: string) {
  try {
    const supabase = createClient();

    // Check if the user has already liked the post
    const { data: existingLike } = await supabase
      .from("likes")
      .select()
      .match({ user: userId, post: postId })
      .single();

    if (existingLike) {
      // Unlike: Delete the like and decrement likes_count
      const { error: deleteError } = await supabase
        .from("likes")
        .delete()
        .match({ user: userId, post: postId });

      if (deleteError) throw deleteError;

      return { success: true, liked: false };
    } else {
      // Like: Insert new like and increment likes_count
      const { error: insertError } = await supabase
        .from("likes")
        .insert({ user: userId, post: postId });

      if (insertError) throw insertError;

      return { success: true, liked: true };
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    const appError = handleSupabaseError(error);
    return {
      success: false,
      error: {
        message: appError.message,
        statusCode: appError.statusCode,
        code: appError.code,
      },
    };
  }
}
