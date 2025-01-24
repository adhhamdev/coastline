import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Product } from "@/lib/types/database.types";
import { PackagePlus, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ProductSelector({
  loadProducts,
  setSelectedProduct,
  products,
}: {
  loadProducts: () => void;
  setSelectedProduct: (product: Product | null) => void;
  products: Product[];
}) {
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="rounded-full hover:bg-primary/10 transition-colors"
        onClick={() => {
          loadProducts();
          setIsProductDialogOpen(true);
        }}
      >
        <PackagePlus className="h-5 w-5" />
        <span className="sr-only">Link product</span>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a Product</DialogTitle>
          <DialogDescription>
            Select a product to link to this post
          </DialogDescription>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-4 text-sm text-muted-foreground">
              {products.length === 0
                ? "No products found. Create a product first!"
                : "No products match your search."}
            </div>
          ) : (
            filteredProducts.map((product) => (
              <button
                key={product.id}
                className="w-full p-3 rounded-lg hover:bg-muted/50 flex items-center gap-3 transition-colors text-left"
                onClick={() => {
                  setSelectedProduct(product);
                  setIsProductDialogOpen(false);
                  setSearchQuery("");
                }}
              >
                {product.images?.[0] && (
                  <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-grow min-w-0">
                  <h4 className="font-medium text-sm truncate">
                    {product.title}
                  </h4>
                  {product.description && (
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {product.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
