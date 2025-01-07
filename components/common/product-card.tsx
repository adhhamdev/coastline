"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { saveProduct, unsaveProduct } from "@/lib/actions/products";
import { useToast } from "@/lib/hooks/use-toast";
import { Product } from "@/lib/types/database.types";
import { User } from "@supabase/supabase-js";
import { formatDistanceToNow } from "date-fns";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Circle, CircleDot } from "lucide-react";
import { cn } from "@/lib/utils";

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

interface ProductCardProps {
  product: Product<true>;
  currentUser: User | null;
  initialSaved?: boolean;
}

export default function ProductCard({
  product,
  currentUser,
  initialSaved = false,
}: ProductCardProps) {
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSave = async () => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please login to save products",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      try {
        if (isSaved) {
          await unsaveProduct(product.id, currentUser.id);
        } else {
          await saveProduct(product.id, currentUser.id);
        }
        setIsSaved(!isSaved);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save product. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Card className="group overflow-hidden transition duration-200 hover:shadow-lg hover:-translate-y-2">
      <div className="relative aspect-square">
        <Badge
          variant="secondary"
          className={cn(
            "absolute top-2 left-2 z-10 text-xs whitespace-nowrap backdrop-blur-sm",
            product.stock === 0
              ? "bg-destructive text-destructive-foreground"
              : "bg-background/80 text-foreground"
          )}
        >
          {product.stock === 0 ? "Out of Stock" : `${product.stock} in Stock`}
        </Badge>
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.images?.[0] || ""}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>
      </div>
      <CardContent className="p-3 space-y-2.5">
        <div className="space-y-1.5">
          <div className="flex flex-col gap-1.5">
            <Badge variant="outline" className="w-fit text-xs">
              {product.category}
            </Badge>
            <div className="min-w-0">
              <Link
                href={`/products/${product.id}`}
                className="hover:underline"
              >
                <h3 className="font-semibold truncate text-sm sm:text-base">
                  {product.title}
                </h3>
              </Link>
              <p className="text-base sm:text-lg font-bold text-emerald-600">
                ${product.price.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/${product.user.username}`}
            title={product.user.username}
            className="flex-shrink-0"
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src={product.user.avatar_url || ""} />
              <AvatarFallback>
                {product.user.username?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground truncate">
              {product.location && (
                <span className="truncate">{product.location}</span>
              )}
              <span className="flex-shrink-0">·</span>
              <span className="flex-shrink-0">{formatDate(product.created_at)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
