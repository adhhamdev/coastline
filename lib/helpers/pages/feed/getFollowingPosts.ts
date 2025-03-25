import { Post } from "@/lib/types/database.types";
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export default async function getFollowingPosts(user: User) {
    const supabase = await createClient();
    
    // First, get the list of users that the current user is following
    const { data: followings, error: followError } = await supabase
      .from("follows")
      .select("following")
      .eq("follower", user.id);
    
    if (followError) {
      console.error("Error fetching followed users:", followError);
      return { error: followError };
    }
    
    // Extract the user IDs of followed users
    const followedUserIds = followings?.map(follow => follow.following) || [];
    
    // If the user isn't following anyone, return empty array
    if (followedUserIds.length === 0) {
      return { posts: [] };
    }
    
    // Get posts from the followed users
    const { data: posts, error: postsError } = await supabase
      .from("posts")
      .select(`
        *,
        user:profiles(*),
        product:products(*)
      `)
      .in("user", followedUserIds)
      .order("created_at", { ascending: false })
      .limit(10);
  
    if (postsError) {
      console.error("Error fetching posts:", postsError);
      return { error: postsError };
    }
    
    // Transform the data to match the expected types
    const typedPosts = posts as unknown as Array<Post<true, true>>;
  
    return { posts: typedPosts };
  }