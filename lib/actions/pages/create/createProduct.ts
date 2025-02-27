'use server';

import generateEmbeddings from "@/lib/helpers/generate-embeddings";
import { Product } from "@/lib/types/database.types";
import { handleSupabaseError } from "@/lib/utils/handle-error";
import { createClient } from "@/utils/supabase/server";

interface ProductData {
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  location: string;
}

export default async function createProduct(
  data: ProductData,
  images: string[],
  userId: string
) {
  try {
    const supabase = createClient();

  const embeddingData = await generateEmbeddings(`${data.title}\n${data.description}`);

    const productData: Partial<Product<false>> = {
      user: userId,
      title: data.title,
      description: data.description.trim() || undefined,
      price: data.price,
      category: data.category,
      stock: data.stock,
      images: images.length > 0 ? images : undefined,
      location: data.location.trim() || undefined,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      embedding: embeddingData
    };

    const { error, data: product } = await supabase
      .from("products")
      .insert(productData)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data: product };
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
