"use client";

import { Product } from "@/lib/types/database.types";
import { PackageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ProductImages({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const hasImages = product.images && product.images.length > 0;

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        {hasImages ? (
          <Image
            src={product.images?.[selectedImage] || ""}
            alt={product.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <PackageIcon className="w-24 h-24 text-muted-foreground" />
          </div>
        )}
      </div>
      {hasImages && (
        <div className="grid grid-cols-4 gap-4">
          {product.images?.map((image: string, index: number) => (
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
      )}
    </div>
  );
}
