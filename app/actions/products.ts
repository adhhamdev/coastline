'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function searchProducts(query: string, category: string = 'all') {
  const supabase = createClient();

  let queryBuilder = supabase
    .from('products')
    .select(
      `
      id,
      title,
      description,
      price,
      images,
      created_at,
      category,
      condition,
      location,
      profiles (
        id,
        username,
        avatar_url,
        business_type,
        verified
      )
    `
    )
    .order('created_at', { ascending: false });

  if (query) {
    queryBuilder = queryBuilder.ilike('title', `%${query}%`);
  }

  if (category !== 'all') {
    queryBuilder = queryBuilder.eq('category', category);
  }

  const { data, error } = await queryBuilder.limit(20);

  if (error) throw error;
  return data;
}

export async function saveProduct(productId: string, userId: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from('saved_products')
    .upsert({ product_id: productId, user_id: userId });

  if (error) throw error;

  revalidatePath('/products');
  revalidatePath(`/products/${productId}`);
}

export async function unsaveProduct(productId: string, userId: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from('saved_products')
    .delete()
    .match({ product_id: productId, user_id: userId });

  if (error) throw error;

  revalidatePath('/products');
  revalidatePath(`/products/${productId}`);
}
