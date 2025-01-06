"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { saveProduct, unsaveProduct } from "@/lib/actions/products";
import { useToast } from "@/lib/hooks/use-toast";
import { Product } from "@/lib/types/database.types";
import { User } from "@supabase/supabase-js";
import { formatDistanceToNow } from "date-fns";
import { Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";

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
    <Card className="overflow-hidden group">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`}>
          <div className="relative aspect-square">
            <Image
              src={product?.images ? product.images[0] : ""}
              alt={product.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0">
            <Link href={`/products/${product.id}`} className="hover:underline">
              <h3 className="font-semibold truncate text-sm sm:text-base">{product.title}</h3>
            </Link>
            <p className="text-base sm:text-lg font-bold text-emerald-600">
              ${product.price.toLocaleString()}
            </p>
          </div>
          <Badge variant="outline" className="text-xs whitespace-nowrap">{product.category}</Badge>
        </div>
        <Link
          href={`/${product.user.username}`}
          className="flex items-center space-x-2 text-sm"
        >
          <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
            <AvatarImage src={product.user.avatar_url} />
            <AvatarFallback>
              {product.user.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-muted-foreground truncate">
            {product.user.username}
          </span>
        </Link>
      </CardContent>
      <CardFooter className="p-3 sm:p-4 pt-0 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(product.created_at), {
            addSuffix: true,
          })}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handleSave}
          disabled={isPending}
        >
          <Bookmark
            className={`h-4 w-4 ${isSaved ? "fill-primary" : ""}`}
            strokeWidth={1.5}
          />
        </Button>
      </CardFooter>
    </Card>
  );
}
