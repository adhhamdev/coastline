'use client';

import { cn } from '@/lib/utils';
import { Compass, Home, PlusSquare, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
    { href: '/feed', label: 'Feed', icon: Home },
    { href: '/explore', label: 'Explore', icon: Compass },
    { href: '/create', label: 'Create', icon: PlusSquare },
    { href: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe md:hidden">
            <div className="border-t bg-background/80 backdrop-blur-lg">
                <div className="flex h-16 items-center justify-around px-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'flex h-full min-w-[3.5rem] flex-1 flex-col items-center justify-center transition-colors',
                                'active:opacity-70',
                                pathname === link.href
                                    ? 'text-primary'
                                    : 'text-muted-foreground hover:text-primary'
                            )}
                        >
                            <link.icon className="mb-1 h-5 w-5" />
                            <span className="text-xs font-medium">{link.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
} 