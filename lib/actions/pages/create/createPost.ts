'use server';

import generateEmbeddings from "@/lib/helpers/generate-embeddings";
import { Post } from "@/lib/types/database.types";
import { handleSupabaseError } from "@/lib/utils/handle-error";
import { createClient } from "@/utils/supabase/server";

export default async function createPost(
  content: string,
  images: string[],
  userId: string,
  productId?: string
) {
  try {
    const supabase = createClient();

    const embeddingData  = await generateEmbeddings(content);

    const postData: Partial<Post<false, false>> = {
      user: userId,
      content,
      images: images.length > 0 ? images : undefined,
      product: productId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      likes_count: 0,
      comments_count: 0,
      embedding: embeddingData
    };


    const { error, data: post } = await supabase
      .from("posts")
      .insert(postData)
      .select()
      .single();

      console.log(error)

    if (error) throw error;
    return { success: true, data: post };
  } catch (error) {
    const appError = handleSupabaseError(error);
    return { 
      success: false, 
      error: {
        message: appError.message,
        statusCode: appError.statusCode,
        code: appError.code
      }
    };
  }
}
