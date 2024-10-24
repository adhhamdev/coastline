'use client';

import { useSupabase } from '@/components/providers/supabase-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/user-nav';
import { User } from '@supabase/supabase-js';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export function Navigation() {
  const pathname = usePathname();
  const { supabase } = useSupabase();
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex justify-between items-center px-4 h-14 md:px-6">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-lg font-bold">Coastline</span>
          </Link>
          <nav className="hidden items-center space-x-4 text-sm font-medium md:flex">
            <Link
              href="/dashboard"
              className={pathname === '/dashboard' ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'}
            >
              Dashboard
            </Link>
            <Link
              href="/content"
              className={pathname === '/content' ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'}
            >
              Content
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {user ? (
            <UserNav user={user} />
          ) : (
            <Button asChild variant="ghost">
              <Link href="/auth/login">Login</Link>
            </Button>
          )}
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => {/* Toggle mobile menu */ }}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
      {/* Add a mobile menu here */}
    </header>
  );
}
