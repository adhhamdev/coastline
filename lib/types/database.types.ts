export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// UUID type for unique identifiers
export type UUID = string;

// Generic type for references based on environment
export type UserReference<T extends boolean = false> = T extends true ? Profile : string;
export type PostReference<T extends boolean = false> = T extends true ? Post<T, T> : string;
export type ProductReference<T extends boolean = false> = T extends true ? Product<T> : string;

export interface Comment<WithProfile extends boolean = false, WithPost extends boolean = false, WithProduct extends boolean = false> {
  id: string; // uuid
  user: UserReference<WithProfile>; // uuid or Profile
  post?: PostReference<WithPost>; // uuid | null
  product?: ProductReference<WithProduct>; // uuid | null
  content: string; // text
  created_at: string; // timestamp with time zone
  updated_at: string; // timestamp with time zone
}

export interface Follow<WithProfile extends boolean = false> {
  follower: UserReference<WithProfile>; // uuid or Profile
  following: UserReference<WithProfile>; // uuid or Profile
  created_at: string; // timestamp with time zone
}

export interface Like<WithProfile extends boolean = false, WithPost extends boolean = false> {
  id: string; // uuid
  user: UserReference<WithProfile>; // uuid or Profile
  post?: PostReference<WithPost>; // uuid | null
  created_at: string; // timestamp with time zone
}

export interface Message<WithProfile extends boolean = false> {
  id: string; // uuid
  sender: UserReference<WithProfile>; // uuid or Profile
  receiver: UserReference<WithProfile>; // uuid or Profile
  content: string; // text
  read?: boolean; // boolean | null
  created_at: string; // timestamp with time zone
}

export interface Post<WithProfile extends boolean = false, WithProduct extends boolean = false> {
  id: string; // UUID
  user: UserReference<WithProfile>; // uuid or Profile
  content?: string; // text | null
  images?: string[]; // text[] | null
  videos?: string[]; // text[] | null
  product?: ProductReference<WithProduct>; // uuid or Product
  likes_count?: number; // Integer | null
  comments_count?: number; // Integer | null
  created_at: string; // timestamp with time zone
  updated_at: string; // timestamp with time zone
}

export interface Product<WithProfile extends boolean = false> {
  id: string; // UUID
  user: UserReference<WithProfile>; // uuid or Profile
  title: string; // Text
  description?: string; // Text | null
  price: number; // Numeric
  category: string; // Text
  images?: string[]; // Array of Text | null
  status?: 'available' | 'sold' | 'hidden'; // Text | null
  location?: string; // Text | null
  views_count?: number; // Integer | null
  created_at: string; // timestamp with time zone
  updated_at: string; // timestamp with time zone
}

export interface Profile {
  id: string; // UUID
  username: string; // Text
  full_name?: string; // Text | null
  avatar_url?: string; // Text | null
  banner_url?: string; // Text | null
  bio?: string; // Text | null
  location: string; // Text
  business_type?: 'gems' | 'fishing' | 'other'; // Text | null
  website?: string; // Text | null
  phone?: string; // Text | null
  email?: string; // Text | null
  verified: boolean; // Boolean
  created_at: string; // timestamp with time zone
  updated_at: string; // timestamp with time zone
  followers_count: number; // Numeric
  products_count: number; // Numeric
  following_count: number; // Numeric
}

export interface SavedPost<WithProfile extends boolean = false, WithPost extends boolean = false> {
  id: number; // bigint
  created_at: string; // timestamp with time zone
  user?: UserReference<WithProfile>; // uuid | null
  post?: PostReference<WithPost>; // uuid | null
}

export interface SavedProduct<WithProfile extends boolean = false, WithProduct extends boolean = false> {
  id: string; // uuid
  created_at: string; // timestamp with time zone
  user?: UserReference<WithProfile>; // uuid | null
  product?: ProductReference<WithProduct>; // uuid | null
}
