import { Post, Product, Profile } from "@/lib/types/database.types";
import { createClient } from "@/utils/supabase/server";


export default async function getPosts() {
    const supabase = await createClient();
    const { data: posts, error } = await supabase
      .from("posts")
      .select("*, user:profiles(*), product:products(*)")
      .order("created_at", { ascending: false })
      .limit(10)
      .returns<
        (Post<true, true> & { user: Profile; products: Product<true>[] })[]
      >();
  
    if (error) {
      console.error("Error fetching posts:", error);
      return { error };
    }
  
    return { posts };
  }

  