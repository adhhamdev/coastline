'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import useDebounce from '@/hooks/use-debounce';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { Loader2, Search } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProductCard from './product-card';

interface ProductsContentProps {
    initialProducts: any[];
    currentUser: User | null;
}

export default function ProductsContent({ initialProducts, currentUser }: ProductsContentProps) {
    const [products, setProducts] = useState(initialProducts);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('all');
    const [loading, setLoading] = useState(false);
    const debouncedSearch = useDebounce(searchQuery, 500);
    const supabase = createClient();

    const handleSearch = async (query: string, selectedCategory: string) => {
        setLoading(true);
        try {
            let supabaseQuery = supabase
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
                .order('created_at', { ascending: false });

            if (query) {
                supabaseQuery = supabaseQuery.textSearch('fts', query);
            }

            if (selectedCategory !== 'all') {
                supabaseQuery = supabaseQuery.eq('category', selectedCategory);
            }

            const { data } = await supabaseQuery.limit(12);
            setProducts(data || []);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Effect for debounced search
    useEffect(() => {
        handleSearch(debouncedSearch, category);
    }, [debouncedSearch, category]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                <Button asChild>
                    <Link href="/create">List New Product</Link>
                </Button>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="gems">Gems & Jewelry</SelectItem>
                        <SelectItem value="fishing">Fishing</SelectItem>
                        <SelectItem value="local">Local Products</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {loading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} currentUser={currentUser} />
                    ))}
                </div>
            )}

            {products.length === 0 && !loading && (
                <div className="text-center py-12">
                    <h3 className="text-lg font-semibold">No products found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                </div>
            )}
        </div>
    );
} 