"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/lib/hooks/use-toast";
import { Product } from "@/lib/types/database.types";
import { User } from "@supabase/supabase-js";
import { formatDistanceToNow } from "date-fns";
import { Heart, Circle, CircleDot, PackageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
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
        // if (isSaved) {
        //   await unsaveProduct(product.id, currentUser.id);
        // } else {
        //   // await saveProduct(product.id, currentUser.id);
        // }
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
    <Card className="group overflow-hidden transition duration-200 hover:shadow-lg hover:bg-muted/50">
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
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <PackageIcon className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
        </Link>
      </div>
      <CardContent className="p-3 space-y-2">
        <div className="space-y-2">
          <Link
            href={`/products/${product.id}`}
            className="hover:underline line-clamp-2 text-sm font-medium"
          >
            {product.title}
          </Link>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-base">
              ${product.price.toLocaleString()}
            </p>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
              onClick={handleSave}
              disabled={isPending}
            >
              <Heart
                className={cn(
                  "h-3.5 w-3.5",
                  isSaved && "fill-primary text-primary"
                )}
              />
            </Button>
          </div>
          <div className="flex items-center gap-1.5">
            <Avatar className="h-5 w-5">
              <AvatarImage
                src={product.user?.avatar_url || ""}
                alt={product.user?.username || "User"}
              />
              <AvatarFallback>
                {product.user?.username?.[0].toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <Link
              href={`/profile/${product.user?.username || product.user?.id}`}
              className="text-xs hover:underline truncate text-muted-foreground"
            >
              {product.user?.username}
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
