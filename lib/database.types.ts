export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// UUID type for unique identifiers
export type UUID = string;

// profiles.ts
export interface Profile {
  id: string; // uuid
  username: string; // text
  full_name?: string; // text
  avatar_url?: string; // text
  banner_url?: string; // text
  bio?: string; // text
  location?: string; // text
  business_type?: 'gems' | 'fishing' | 'other'; // text
  website?: string; // text
  phone?: string; // text
  email?: string; // text
  verified: boolean; // boolean
  created_at: string; // timestamp with time zone
  updated_at: string; // timestamp with time zone
  followers_count: number; // numeric
  products_count: number; // numeric
  following_count: number; // numeric
}

// posts.ts
export interface Post {
  id: string; // uuid
  user_id: string; // uuid
  content?: string; // text
  images?: string[]; // text[]
  likes_count?: number; // integer
  comments_count?: number; // integer
  created_at: string; // timestamp with time zone
  updated_at: string; // timestamp with time zone
  videos?: string[]; // text[]
}

// comments.ts
export interface Comment {
  id: string; // uuid
  user_id: string; // uuid
  post_id?: string; // uuid
  content: string; // text
  created_at: string; // timestamp with time zone
  updated_at: string; // timestamp with time zone
}

// likes.ts
export interface Like {
  id: string; // uuid
  user_id: string; // uuid
  post_id?: string; // uuid
  created_at: string; // timestamp with time zone
}

// follows.ts
export interface Follow {
  follower_id: string; // uuid
  following_id: string; // uuid
  created_at: string; // timestamp with time zone
}

// messages.ts
export interface Message {
  id: string; // uuid
  sender_id: string; // uuid
  receiver_id: string; // uuid
  content: string; // text
  read?: boolean; // boolean
  created_at: string; // timestamp with time zone
}

// products.ts
export interface Product {
  id: string; // uuid
  user_id: string; // uuid
  title: string; // text
  description?: string; // text
  price: number; // numeric(10,2)
  category: string; // text
  images?: string[]; // text[]
  status?: 'available' | 'sold' | 'hidden'; // text
  location?: string; // text
  views_count?: number; // integer
  created_at: string; // timestamp with time zone
  updated_at: string; // timestamp with time zone
}

// saved_posts.ts
export interface SavedPost {
  id: number; // bigint
  created_at: string; // timestamp with time zone
  user_id?: string; // uuid
  post_id?: string; // uuid
}

// saved_products.ts
export interface SavedProduct {
  created_at: string; // timestamp with time zone
  user_id?: string; // uuid
  product_id?: string; // uuid
  id: string; // uuid
}
