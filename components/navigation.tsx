'use client';

import ThemeToggle from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import UserNav from '@/components/user-nav';
import { User } from '@supabase/supabase-js';
import { Compass, Home, MessageCircle, PlusSquare } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation({ user }: { user: User | null }) {
  const pathname = usePathname();

  // React.useEffect(() => {
  //   const getUser = async () => {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();
  //     setUser(user);
  //   };

  //   getUser();

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setUser(session?.user ?? null);
  //   });

  //   return () => subscription.unsubscribe();
  // }, [supabase, router]);

  const navLinks = [
    { href: '/feed', label: 'Feed', icon: Home },
    { href: '/explore', label: 'Explore', icon: Compass },
    { href: '/create', label: 'Create', icon: PlusSquare },
    { href: '/messages', label: 'Messages', icon: MessageCircle },
  ];

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex justify-between items-center px-4 h-14'>
        {/* Logo - always visible */}
        <Link href='/' className='flex items-center space-x-2'>
          <span className='text-lg font-bold text-primary'>Coastline</span>
        </Link>

        {/* Desktop Navigation */}
        {pathname !== '/' && pathname !== '/auth/login' &&
          (<nav className='hidden md:flex items-center space-x-6 text-sm font-medium'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-2 ${pathname === link.href
                  ? 'text-primary'
                  : 'text-foreground/60 hover:text-primary'
                  }`}>
                <link.icon className='w-4 h-4' />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
          )}

        {/* Right side items - always visible */}
        <div className='flex items-center space-x-4'>
          <ThemeToggle />
          {user ? (
            <UserNav user={user} />
          ) : (
            <Button
              asChild
              variant='default'
              size='sm'
              className='bg-primary hover:bg-primary/90'>
              <Link href='/auth/login'>Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
