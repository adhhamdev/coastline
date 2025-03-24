"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deletePost(postId: string, userId: string | undefined, revalidationPath: string) {
  const supabase = await createClient();

  // First, get the post to check ownership and get image paths
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .single();

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.user !== userId) {
    throw new Error("Unauthorized to delete this post");
  }

  // Delete post images from storage if they exist
  if (post.images && post.images.length > 0) {
    const imagePaths = post.images.map((path: string) => path.split("/").pop());
    await supabase.storage.from("post-images").remove(imagePaths);
  }

  // Delete the post
  const { error } = await supabase.from("posts").delete().eq("id", postId);
  
  if (error) {
    throw error;
  }
  
  if (revalidatePath) {
    revalidatePath(revalidationPath)
  }
  
}
