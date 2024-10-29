'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const content = formData.get('content') as string;
  const mediaFiles = formData.getAll('media') as File[];

  // Upload media files
  const mediaUrls = [];
  for (const file of mediaFiles) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('posts')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from('posts').getPublicUrl(filePath);

    mediaUrls.push(publicUrl);
  }

  // Create post
  const { error } = await supabase.from('posts').insert({
    user_id: user.id,
    content,
    media_urls: mediaUrls,
  });

  if (error) throw error;

  revalidatePath('/feed');
}

export async function likePost(postId: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase.from('post_likes').insert({
    user_id: user.id,
    post_id: postId,
  });

  if (error) throw error;

  // Update likes count
  //   await supabase.rpc('increment_post_likes', { post_id: postId as never });

  revalidatePath('/feed');
  revalidatePath(`/post/${postId}`);
}

export async function unlikePost(postId: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase.from('post_likes').delete().match({
    user_id: user.id,
    post_id: postId,
  });

  if (error) throw error;

  // Update likes count
  //   await supabase.rpc('decrement_post_likes', { post_id: postId as never });

  revalidatePath('/feed');
  revalidatePath(`/post/${postId}`);
}
