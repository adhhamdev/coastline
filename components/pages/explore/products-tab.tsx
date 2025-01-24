import ProductCard from "@/components/common/product-card";
import { TabsContent } from "@/components/ui/tabs";
import { Product } from "@/lib/types/database.types";
import { SearchResults } from "@/lib/types/pages/explore";
import { User } from "@supabase/supabase-js";
import { PackageSearch } from "lucide-react";

export default function ProductsTab({
  searchResults,
  user,
}: {
  searchResults: SearchResults;
  user: User | null;
}) {
  return (
    <TabsContent value="products" className="m-0 px-4">
      {searchResults.products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {searchResults.products.map((product: Product<true>) => (
            <div key={product.id}>
              <ProductCard product={product} currentUser={user} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <PackageSearch className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-medium text-lg mb-1">No products found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </TabsContent>
  );
}
