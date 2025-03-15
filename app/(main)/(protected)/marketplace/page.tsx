import ProductsContent from "@/components/pages/marketplace/product/products-content";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function MarketPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Fetch products with seller information
  const { data: products } = await supabase
    .from("products")
    .select(`*, profiles(*)`)
    .order("created_at", { ascending: false })
    .limit(12);

  return (
    <div className="container py-6 max-w-7xl">
      <ProductsContent
        initialProducts={products || []}
        currentUser={user || null}
      />
    </div>
  );
}
