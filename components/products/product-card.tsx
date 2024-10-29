'use client';

import { saveProduct, unsaveProduct } from '@/app/actions/products';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';
import { formatDistanceToNow } from 'date-fns';
import { Bookmark } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useTransition } from 'react';

interface ProductCardProps {
    product: any;
    currentUser: User | null;
    initialSaved?: boolean;
}

export default function ProductCard({ product, currentUser, initialSaved = false }: ProductCardProps) {
    const [isSaved, setIsSaved] = useState(initialSaved);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleSave = async () => {
        if (!currentUser) {
            toast({
                title: "Authentication required",
                description: "Please login to save products",
                variant: "destructive"
            });
            return;
        }

        startTransition(async () => {
            try {
                if (isSaved) {
                    await unsaveProduct(product.id, currentUser.id);
                } else {
                    await saveProduct(product.id, currentUser.id);
                }
                setIsSaved(!isSaved);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to save product. Please try again.",
                    variant: "destructive"
                });
            }
        });
    };

    return (
        <Card className="overflow-hidden">
            <CardHeader className="p-0">
                <Link href={`/products/${product.id}`}>
                    <div className="relative aspect-square">
                        <Image
                            src={product.images[0]}
                            alt={product.title}
                            fill
                            className="object-cover transition-transform hover:scale-105"
                        />
                    </div>
                </Link>
            </CardHeader>
            <CardContent className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <Link href={`/products/${product.id}`} className="hover:underline">
                            <h3 className="font-semibold">{product.title}</h3>
                        </Link>
                        <p className="text-lg font-bold text-emerald-600">
                            ${product.price.toLocaleString()}
                        </p>
                    </div>
                    <Badge variant="outline">{product.category}</Badge>
                </div>
                <div className="mt-4">
                    <Link href={`/${product.profiles.username}`} className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={product.profiles.avatar_url} />
                            <AvatarFallback>{product.profiles.username[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{product.profiles.username}</span>
                    </Link>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(product.created_at), { addSuffix: true })}
                    </p>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <div className="flex items-center space-x-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1"
                        asChild
                    >
                        <Link href={`/products/${product.id}`}>
                            View Details
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleSave}
                        disabled={isPending}
                        className={isSaved ? 'text-emerald-600' : ''}
                    >
                        <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
} 