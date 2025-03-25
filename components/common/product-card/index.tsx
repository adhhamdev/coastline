import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/lib/types/database.types";
import { cn } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import { Heart, PackageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
  return (
    <Card className="group overflow-hidden transition duration-200 hover:shadow-lg hover:bg-muted/50 p-0">
      <div className="relative aspect-square">
        <Badge
          variant="secondary"
          className={cn(
            "absolute bottom-3 left-3 z-10 text-xs font-medium whitespace-nowrap backdrop-blur-xs px-2.5 py-1",
            product.stock === 0
              ? "bg-destructive text-destructive-foreground"
              : "bg-background/80 text-foreground"
          )}
        >
          {product.stock === 0 ? "Out of Stock" : `${product.stock} in Stock`}
        </Badge>
        <Link
          prefetch={true}
          href={`/marketplace/product/${product.id}`}
          className="absolute inset-0"
        >
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
      <CardContent className="p-2">
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <p className="font-semibold text-lg">
              ${product.price.toLocaleString()}
            </p>
            <Button size="icon" variant="ghost" className="h-7 w-7 -mt-1">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          <Link
            prefetch={true}
            href={`/marketplace/product/${product.id}`}
            className="hover:underline line-clamp-2 text-sm leading-snug block"
          >
            {product.title}
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 font-normal"
            >
              {product.category}
            </Badge>
            <span>•</span>
            <span>{product.sold || 0} sold</span>
          </div>

          <div className="flex items-center gap-1.5 pt-1.5 border-t mt-1.5">
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
              prefetch={true}
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
