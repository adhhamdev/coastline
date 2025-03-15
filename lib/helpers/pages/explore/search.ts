import { Post, Product, Profile } from "@/lib/types/database.types";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

const supabase = createClient();

interface SearchResults {
  products: Product<true>[];
  users: Profile[];
  posts: Post<true, true>[];
}

type SearchParams = { [key: string]: string | string[] | undefined }

const searchExplore = async (searchParams: SearchParams, currentUser: User | null): Promise<SearchResults> => {
  const search = (await searchParams).search;

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
        .neq("id", currentUser?.id)
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