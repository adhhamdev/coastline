'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from '@supabase/supabase-js';
import { formatDistanceToNow } from 'date-fns';
import { Bookmark, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProductCardProps {
    product: any;
    currentUser: User | null;
}

export default function ProductCard({ product, currentUser }: ProductCardProps) {
    const [isSaved, setIsSaved] = useState(false);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR'
        }).format(price);
    };

    return (
        <Card className="group overflow-hidden">
            <CardHeader className="p-0">
                <Link href={`/products/${product.id}`}>
                    <div className="relative aspect-square">
                        <Image
                            src={product.images[0]}
                            alt={product.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <Badge className="absolute top-2 right-2" variant={product.category === 'gems' ? 'default' : 'secondary'}>
                            {product.category}
                        </Badge>
                    </div>
                </Link>
            </CardHeader>
            <CardContent className="p-4">
                <div className="flex justify-between items-start">
                    <Link href={`/products/${product.id}`} className="flex-1">
                        <h3 className="font-semibold line-clamp-2 hover:underline">{product.title}</h3>
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="-mr-2">
                                <MoreHorizontal className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Share</DropdownMenuItem>
                            <DropdownMenuItem>Report</DropdownMenuItem>
                            {currentUser?.id === product.profiles.id && (
                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <p className="mt-1 text-xl font-bold text-emerald-600">{formatPrice(product.price)}</p>
                <div className="mt-2 flex items-center space-x-2">
                    <Link href={`/${product.profiles.username}`} className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={product.profiles.avatar_url} />
                            <AvatarFallback>{product.profiles.username[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{product.profiles.username}</span>
                    </Link>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(product.created_at), { addSuffix: true })}
                    </span>
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
                        onClick={() => setIsSaved(!isSaved)}
                        className={isSaved ? 'text-emerald-600' : ''}
                    >
                        <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
} 