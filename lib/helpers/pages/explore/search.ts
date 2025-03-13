import { Post, Product, Profile } from "@/lib/types/database.types";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

interface SearchResults {
  products: Product<true>[];
  users: Profile[];
  posts: Post<true, true>[];
}

const searchExplore = async (searchParams: {[key: string]: string | undefined;
}) => {
  const search = searchParams.search;

  try {
    if (search) {
      // Create all queries in parallel
      const productsQuery = supabase
        .from("products")
        .select(`
          *,
          user:profiles(*)
        `)
        .ilike("title", `%${search}%`)
        .order("created_at", { ascending: false })
        .limit(8);
      
      const usersQuery = supabase
        .from("profiles")
        .select("*")
        .or(`username.ilike.%${search}%, full_name.ilike.%${search}%`)
        .limit(8);
      
      const postsQuery = supabase
        .from("posts")
        .select(`
          *,
          user:profiles(*),
          product:products(*)
        `)
        .ilike("content", `%${search}%`)
        .order("created_at", { ascending: false })
        .limit(8);
      
      // Execute all queries in parallel
      const [productsResult, usersResult, postsResult] = await Promise.all([
        productsQuery,
        usersQuery,
        postsQuery
      ]);
      
      return {
        products: productsResult.data || [],
        users: usersResult.data || [],
        posts: postsResult.data || []
      };
    } else {
      const productsQuery = supabase
        .from("products")
        .select(`
          *,
          user:profiles(*)
        `)
        .order("created_at", { ascending: false })
        .limit(8);
      
      const usersQuery = supabase
        .from("profiles")
        .select("*")
        .limit(8);
      
      const postsQuery = supabase
        .from("posts")
        .select(`
          *,
          user:profiles(*),
          product:products(*)
        `)
        .order("created_at", { ascending: false })
        .limit(8);
      
      // Execute all queries in parallel
      const [productsResult, usersResult, postsResult] = await Promise.all([
        productsQuery,
        usersQuery,
        postsQuery
      ]);
      
      return {
        products: productsResult.data || [],
        users: usersResult.data || [],
        posts: postsResult.data || []
      };
    }
  } catch (error) {
    console.error("Error fetching search results:", error);
    return {
      products: [],
      users: [],
      posts: []
    };
  }
};

export default searchExplore;