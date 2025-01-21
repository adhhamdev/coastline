import { Post, Product, Profile } from "@/lib/types/database.types";
import { User } from "@supabase/supabase-js";

export interface ExploreContentProps {
    user: User | null;
    profile: Profile | null;
  }
  
export interface SearchResults {
    products: Product<true>[];
    users: Profile[];
    posts: Post<true, true>[];
  }