'use server';

import { registerFormSchema } from '@/lib/zod-schemas';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import * as z from 'zod';

export const login = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/');
  redirect('/feed');
};

export const register = async (values: z.infer<typeof registerFormSchema>) => {
  const supabase = createClient();
  const origin = headers().get('origin');

  const { error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/auth/login');
  redirect('/auth/login');
};

export const handleOAuth = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  console.log(data.provider);

  if (data.url) {
    redirect(data.url);
  }
};
