import ProductCard from "@/components/common/product-card";
import { Product } from "@/lib/types/database.types";
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export default async function SimilarProducts({
  product,
  user,
}: {
  product: Product<true>;
  user: User;
}) {
  const supabase = createClient();

  const { data: productEmbeddings, error } = await supabase.rpc(
    "match_products",
    {
      match_count: 10,
      match_threshold: 0.8,
      query_embedding: product.embedding,
    }
  );

  return (
    <div className="lg:col-span-2 mt-12 md:mt-16">
      <h2 className="text-2xl font-bold mb-8">Similar Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {productEmbeddings?.map((product: Product<true>) => (
          <ProductCard key={product.id} product={product} currentUser={user} />
        ))}
      </div>
    </div>
  );
}
