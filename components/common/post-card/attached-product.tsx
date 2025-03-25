import { Post } from "@/lib/types/database.types";
import { PackageIcon, ShoppingBag, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AttachedProduct({ post }: { post: Post<true, true> }) {
  const product = post.product;
  if (!product) return null;

  return (
    <Link
      prefetch={true}
      href={`/marketplace/product/${product.id}`}
      className="group relative flex items-start gap-3 rounded-lg border p-3 hover:bg-muted/50 "
      title={product.title}
    >
      <div className="absolute right-3 top-3">
        <ShoppingBag className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>

      <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-md bg-muted">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.title}
            className="object-cover transition-transform group-hover:scale-110"
            fill
            sizes="80px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <PackageIcon className="h-6 w-6" />
          </div>
        )}
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Tag className="h-3 w-3" />
          <span className="text-xs">{product.category}</span>
        </div>
        <p className="line-clamp-1 text-lg font-medium group-hover:text-primary">
          {product.title}
        </p>
        <p className="text-xl font-semibold text-primary">${product.price}</p>
      </div>
    </Link>
  );
}
