'use server';

import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export interface FollowAction {
  followerId: string;
  followingId: string;
  isFollowing: boolean;
  revalidationPath: string;
}

export async function followOrUnfollow(
  currentUser: User | null,
  followingId: string,
  isCurrentlyFollowing: boolean,
  revalidationPath: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!currentUser) {
      return { success: false, error: "You must be logged in to follow users" };
    }

    const supabase = await createClient();

    if (isCurrentlyFollowing) {
      // Unfollow
      const { error } = await supabase
        .from("follows")
        .delete()
        .match({ follower: currentUser.id, following: followingId });

      if (error) throw error;
    } else {
      // Follow
      const { error } = await supabase
        .from("follows")
        .insert({ follower: currentUser.id, following: followingId });

      if (error) throw error;
    }

    revalidatePath(revalidationPath);

    return { success: true };
  } catch (error) {
    console.error("Follow/unfollow error:", error);
    return { 
      success: false, 
      error: "Something went wrong. Please try again." 
    };
  }
}