export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// UUID type for unique identifiers
export type UUID = string;

export interface Comment {
  id: string; // uuid
  user_id: string; // uuid
  post_id?: string; // uuid | null
  content: string; // text
  created_at: string; // timestamp with time zone
  updated_at: string; // timestamp with time zone
}

export interface Follow {
  follower_id: string; // uuid
  following_id: string; // uuid
  created_at: string; // timestamp with time zone
}

export interface Like {
  id: string; // uuid
  user_id: string; // uuid
  post_id?: string; // uuid | null
  created_at: string; // timestamp with time zone
}

export interface Message {
  id: string; // uuid
  sender_id: string; // uuid
  receiver_id: string; // uuid
  content: string; // text
  read?: boolean; // boolean | null
  created_at: string; // timestamp with time zone
}

export interface Post {
  id: string; // uuid
  user_id: string; // uuid
  content?: string; // text | null
  images?: string[]; // text[] | null
  created_at: string; // timestamp with time zone
  updated_at: string; // timestamp with time zone
  videos?: string[]; // text[] | null
  profile: Profile | null;
  product: Product | null;
}

export interface Product {
  id: string; // uuid
  user_id: Profile; // uuid
  title: string; // text
  description?: string; // text | null
  price: number; // numeric(10,2)
  category: string; // text
  images?: string[]; // text[] | null
  status?: 'available' | 'sold' | 'hidden'; // text | null
  location?: string; // text | null
  views_count?: number; // integer | null
  created_at: string; // timestamp with time zone
  updated_at: string; // timestamp with time zone
}

export interface Profile {
  id: string; // uuid
  username: string; // text
  full_name?: string; // text | null
  avatar_url?: string; // text | null
  banner_url?: string; // text | null
  bio?: string; // text | null
  location?: string; // text | null
  business_type?: 'gems' | 'fishing' | 'other'; // text | null
  website?: string; // text | null
  phone?: string; // text | null
  email?: string; // text | null
  verified: boolean; // boolean
  created_at: string; // timestamp with time zone
  updated_at: string; // timestamp with time zone
  followers_count: number; // numeric
  products_count: number; // numeric
  following_count: number; // numeric
}

export interface SavedPost {
  id: number; // bigint
  created_at: string; // timestamp with time zone
  user_id?: string; // uuid | null
  post_id?: string; // uuid | null
}

export interface SavedProduct {
  created_at: string; // timestamp with time zone
  user_id?: string; // uuid | null
  product_id?: string; // uuid | null
  id: string; // uuid
}
