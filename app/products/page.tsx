import ProductsContent from '@/components/products/products-content';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export default async function ProductsPage() {
    const cookieStore = cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
            },
        }
    );

    const { data: { user } } = await supabase.auth.getUser();

    // Fetch products with seller information
    const { data: products } = await supabase
        .from('products')
        .select(`
          id,
          title,
          description,
          price,
          images,
          created_at,
          category,
          condition,
          location,
          profiles (
            id,
            username,
            avatar_url,
            business_type,
            verified
          )
        `)
        .order('created_at', { ascending: false })
        .limit(12);

    return (
        <div className="container py-6 max-w-7xl">
            <ProductsContent initialProducts={products || []} currentUser={user || null} />
        </div>
    );
} 