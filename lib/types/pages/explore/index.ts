import { User } from "@supabase/supabase-js";
import { Post, Product, Profile } from "@/lib/types/database.types";

export interface ExploreContentProps {
    user: User | null;
    profile: Profile | null;
  }
  
export interface SearchResults {
    products: Product<true>[];
    users: Profile[];
    posts: Post<true, true>[];
  }