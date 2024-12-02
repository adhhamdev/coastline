import ProductDetail from '@/components/pages/products/product-detail';
import { createClient } from '@/utils/supabase/server';
import { notFound, redirect } from 'next/navigation';

interface ProductPageProps {
    params: {
        id: string;
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login');
    }

    // Fetch product details with seller information
    const { data: product } = await supabase
        .from('products')
        .select(`
            *,
            profiles (
                id,
                username,
                avatar_url,
                business_type,
                verified,
                location,
                followers_count
            )
        `)
        .eq('id', params.id)
        .single();

    if (!product) {
        notFound();
    }

    // Increment view count
    await supabase
        .from('products')
        .update({ views_count: (product.views_count || 0) + 1 })
        .eq('id', params.id);

    // Fetch similar products
    const { data: similarProducts } = await supabase
        .from('products')
        .select(`
            id,
            title,
            price,
            images,
            created_at,
            profiles (
                id,
                username,
                avatar_url
            )
        `)
        .eq('category', product.category)
        .neq('id', product.id)
        .limit(4);

    return (
        <div className="container py-6 max-w-7xl">
            <ProductDetail
                product={product}
                similarProducts={similarProducts || []}
                currentUser={user || null}
            />
        </div>
    );
} 