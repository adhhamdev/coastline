"use client";

import ThemeToggle from "@/components/common/theme-toggle";
import UserNav from "@/components/common/user-nav";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { Compass, Home, LogIn, MapIcon, PlusSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation({ user }: { user: User | null }) {
  const pathname = usePathname();
  const navLinks = [
    { href: "/", label: "Feed", icon: Home },
    { href: "/explore", label: "Explore", icon: Compass },
    { href: "/create", label: "Create", icon: PlusSquare },
    { href: "/places", label: "Places", icon: MapIcon },
  ];

  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur-sm bg-background/80">
      <div className="flex justify-between items-center h-14 px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-foreground">Coastline.</span>
        </Link>

        {/* Desktop Navigation */}
        {pathname !== "/auth/login" && (
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-2 ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-foreground/60 hover:text-primary"
                }`}
              >
                <link.icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        )}

        {/* Right side items - always visible */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {user ? (
            <UserNav user={user} />
          ) : (
            <Button
              size="sm"
              className="flex shadow-lg hover:bg-secondary-foreground rounded-full px-5"
            >
              <LogIn />
              <Link href="/auth/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
