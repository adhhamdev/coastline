export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// UUID type for unique identifiers
export type UUID = string;

// Comment type
export interface Comment {
    id: UUID;
    user_id: UUID;
    post_id?: UUID;
    content: string;
    created_at: string; // ISO 8601 format
    updated_at: string; // ISO 8601 format
}

// Follow type
export interface Follow {
    follower_id: UUID;
    following_id: UUID;
    created_at: string; // ISO 8601 format
}

// Like type
export interface Like {
    id: UUID;
    user_id: UUID;
    post_id?: UUID;
    created_at: string; // ISO 8601 format
}

// Message type
export interface Message {
    id: UUID;
    sender_id: UUID;
    receiver_id: UUID;
    content: string;
    read?: boolean;
    created_at: string; // ISO 8601 format
}

// Post type
export interface Post {
    id: UUID;
    user_id: UUID;
    content?: string;
    images?: string[];
    likes_count?: number;
    comments_count?: number;
    created_at: string; // ISO 8601 format
    updated_at: string; // ISO 8601 format
    videos?: string[];
}

// Product type
export interface Product {
    id: UUID;
    user_id: UUID;
    title: string;
    description?: string;
    price: number; // Numeric with 2 decimal places
    category: string;
    images?: string[];
    status?: 'available' | 'sold' | 'hidden';
    location?: string;
    views_count?: number;
    created_at: string; // ISO 8601 format
    updated_at: string; // ISO 8601 format
}

// Profile type
export interface Profile {
    id: UUID;
    username: string;
    full_name?: string;
    avatar_url?: string;
    banner_url?: string;
    bio?: string;
    location?: string;
    business_type?: 'gems' | 'fishing' | 'other';
    website?: string;
    phone?: string;
    email?: string;
    verified: boolean;
    created_at: string; // ISO 8601 format
    updated_at: string; // ISO 8601 format
    followers_count: number; // Numeric
    products_count: number; // Numeric
    following_count: number; // Numeric
}

// Saved Product type
export interface SavedProduct {
    id: UUID; // bigint
    created_at: string; // ISO 8601 format
    user_id?: UUID;
    product_id?: UUID;
}
