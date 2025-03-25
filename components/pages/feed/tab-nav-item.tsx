"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface TabNavItemProps {
  href: string;
  label: string;
}

export function TabNavItem({ href, label }: TabNavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      prefetch={true}
      href={href}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10",
        isActive
          ? "bg-primary text-primary-foreground shadow-sm"
          : "bg-muted text-muted-foreground hover:bg-muted/80"
      )}
    >
      {label}
    </Link>
  );
}
