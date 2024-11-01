'use client';

import { Compass, Home, MessageCircle, PlusSquare } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
    { href: '/feed', label: 'Feed', icon: Home },
    { href: '/explore', label: 'Explore', icon: Compass },
    { href: '/create', label: 'Create', icon: PlusSquare },
    { href: '/messages', label: 'Messages', icon: MessageCircle },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className='fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden '>
            <div className='flex justify-around items-center h-16 px-4'>
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`flex flex-col items-center justify-center flex-1 h-full pt-2 ${pathname === link.href
                            ? 'text-primary'
                            : 'text-muted-foreground hover:text-primary'
                            }`}>
                        <link.icon className='w-5 h-5 mb-1' />
                        <span className='text-xs'>{link.label}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
} 