"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/lib/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { formatDistanceToNow } from "date-fns";
import {
  Bookmark,
  Heart,
  MapPin,
  MessageCircle,
  Share2,
  Star,
  User as UserIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductCard from "../../common/product-card";

interface ProductDetailProps {
  product: any;
  similarProducts: any[];
  currentUser: User | null;
}

export default function ProductDetail({
  product,
  similarProducts,
  currentUser,
}: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const supabase = createClient();
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(price);
  };

  const handleContact = async () => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please login to contact the seller.",
        variant: "destructive",
      });
      return;
    }

    // Create or get existing chat
    const { data: chat } = await supabase
      .from("chats")
      .select("id")
      .or(`user1_id.eq.${currentUser.id},user2_id.eq.${currentUser.id}`)
      .or(
        `user1_id.eq.${product.profiles.id},user2_id.eq.${product.profiles.id}`
      )
      .single();

    if (chat) {
      window.location.href = `/messages/${chat.id}`;
    } else {
      const { data: newChat } = await supabase
        .from("chats")
        .insert({
          user1_id: currentUser.id,
          user2_id: product.profiles.id,
          product_id: product.id,
        })
        .select("id")
        .single();

      if (newChat) {
        window.location.href = `/messages/${newChat.id}`;
      }
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={product.images[selectedImage]}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {product.images.map((image: string, index: number) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
                selectedImage === index
                  ? "border-emerald-600"
                  : "border-transparent"
              }`}
            >
              <Image
                src={image}
                alt={`${product.title} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <div className="mt-2 flex items-center space-x-2">
            <Badge
              variant={product.category === "gems" ? "default" : "secondary"}
            >
              {product.category}
            </Badge>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">
              Listed{" "}
              {formatDistanceToNow(new Date(product.created_at), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>

        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-emerald-600">
            {formatPrice(product.price)}
          </span>
          {product.original_price && (
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(product.original_price)}
            </span>
          )}
        </div>

        <Separator />

        {/* Seller Info */}
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <Link
              href={`/${product.profiles.username}`}
              className="flex items-center space-x-3"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={product.profiles.avatar_url} />
                <AvatarFallback>
                  {product.profiles.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">
                    {product.profiles.username}
                  </span>
                  {product.profiles.verified && (
                    <Badge variant="secondary">
                      <Star className="mr-1 h-3 w-3" /> Verified
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {product.profiles.business_type}
                </p>
              </div>
            </Link>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsSaved(!isSaved)}
              >
                <Bookmark
                  className={`h-5 w-5 ${
                    isSaved ? "fill-current text-emerald-600" : ""
                  }`}
                />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <UserIcon className="mr-1 h-4 w-4" />
              <span>{product.profiles.followers_count || 0} followers</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              <span>{product.profiles.location}</span>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Description</h3>
          <p className="whitespace-pre-wrap">{product.description}</p>
        </div>

        <div className="flex space-x-4">
          <Button className="flex-1" onClick={handleContact}>
            <MessageCircle className="mr-2 h-5 w-5" />
            Contact Seller
          </Button>
          <Button variant="outline" size="icon">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="lg:col-span-2">
          <h2 className="mb-6 text-2xl font-bold">Similar Products</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {similarProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currentUser={currentUser}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
