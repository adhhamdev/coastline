'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const signInWithGoogle = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.url) {
    redirect(data.url);
  }
};

export const signInWithFacebook = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'facebook',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback/`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.url) {
    redirect(data.url);
  }
};


export const logOut = async () => {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error?.status) {
      console.log(error);
      if (error.status === 401) {
        return { error: 'Unauthorized. Please log in again.' };
      } else if (error.status === 403) {
        return {
          error: "Forbidden. You don't have permission to perform this action.",
        };
      } else if (error.status >= 500) {
        return { error: 'Server error. Please try again later.' };
      } else {
        return { error: 'An unexpected error occurred.' };
      }
    }
  } catch (err: any) {
    return { error: 'Check your internet connection.' };
  }
  redirect('/');
};

export const getUser = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};
