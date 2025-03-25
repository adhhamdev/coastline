import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Home, MapIcon, Menu, Package, Users } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Products", icon: Package },
  { href: "/people", label: "People", icon: Users },
  { href: "/places", label: "Places", icon: MapIcon },
];

export default async function SideNavbar() {
  return (
    <div className="hidden md:flex flex-col gap-4 h-[calc(100vh-5rem)] sticky top-16 transition-all duration-300">
      <ScrollArea className="h-full">
        <div className="space-y-2 py-2">
          <div className="px-4 flex items-center gap-2">
            <Menu className="h-5 w-5 hidden lg:hidden" />
            <h2 className="text-lg font-semibold hidden lg:inline">Menu</h2>
          </div>
          <Separator className="my-2" />
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              className="w-full justify-start md:justify-center lg:justify-start gap-2 text-base"
              asChild
            >
              <Link href={link.href} prefetch={true}>
                <link.icon className="h-5 w-5" />
                <span className="hidden lg:inline">{link.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
