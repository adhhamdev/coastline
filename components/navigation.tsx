'use client';

import ThemeToggle from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import UserNav from '@/components/user-nav';
import { createClient } from '@/utils/supabase';
import { User } from '@supabase/supabase-js';
import { Compass, Home, Menu, MessageCircle, PlusSquare } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = React.useState<User | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const supabase = createClient();

  React.useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase, router]);

  const navLinks = [
    { href: '/feed', label: 'Feed', icon: Home },
    { href: '/explore', label: 'Explore', icon: Compass },
    { href: '/create', label: 'Create', icon: PlusSquare },
    { href: '/messages', label: 'Messages', icon: MessageCircle },
  ];

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex justify-between items-center px-4 h-14 md:px-6'>
        <div className='flex items-center space-x-4'>
          <Link href='/' className='flex items-center space-x-2'>
            <span className='text-lg font-bold text-emerald-600'>
              Coastline
            </span>
          </Link>
          <nav className='hidden items-center space-x-4 text-sm font-medium md:flex'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-2 ${
                  pathname === link.href
                    ? 'text-emerald-600'
                    : 'text-foreground/60 hover:text-emerald-600'
                }`}>
                <link.icon className='w-4 h-4' />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className='flex items-center space-x-4'>
          <ThemeToggle />
          {user ? (
            <UserNav user={user} />
          ) : (
            <Button
              asChild
              variant='default'
              className='bg-emerald-600 hover:bg-emerald-700'>
              <Link href='/auth/login'>Login</Link>
            </Button>
          )}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant='ghost'
                className='md:hidden'
                onClick={() => setIsOpen(true)}>
                <Menu className='w-5 h-5' />
              </Button>
            </SheetTrigger>
            <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
              <nav className='flex flex-col space-y-4'>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center space-x-2 text-lg ${
                      pathname === link.href
                        ? 'text-emerald-600'
                        : 'text-foreground/60 hover:text-emerald-600'
                    }`}
                    onClick={() => setIsOpen(false)}>
                    <link.icon className='w-5 h-5' />
                    <span>{link.label}</span>
                  </Link>
                ))}
                {!user && (
                  <Button
                    asChild
                    className='mt-4 bg-emerald-600 hover:bg-emerald-700'
                    onClick={() => setIsOpen(false)}>
                    <Link href='/auth/login'>Login</Link>
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
