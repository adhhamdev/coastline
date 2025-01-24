import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Home, Mail, User as UserIcon } from "lucide-react";
import Link from "next/link";

export default async function SideNavbar() {
  return (
    <div className="hidden md:flex flex-col gap-4 h-[calc(100vh-5rem)] sticky top-16 md:w-12 lg:w-auto transition-all duration-300">
      <ScrollArea className="h-full">
        <div className="space-y-2 py-2">
          <Button
            variant="ghost"
            className="w-full justify-start md:justify-center lg:justify-start gap-2"
            asChild
          >
            <Link href="/feed" prefetch>
              <Home className="h-5 w-5" />
              <span className="hidden lg:inline">Home</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start md:justify-center lg:justify-start gap-2"
          >
            <Bell className="h-5 w-5" />
            <span className="hidden lg:inline">Notifications</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start md:justify-center lg:justify-start gap-2"
            asChild
          >
            <Link href="/messages" prefetch>
              <Mail className="h-5 w-5" />
              <span className="hidden lg:inline">Messages</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start md:justify-center lg:justify-start gap-2"
            asChild
          >
            <Link href="/profile" prefetch>
              <UserIcon className="h-5 w-5" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>
          <Button
            variant="default"
            className="w-full mt-4 md:px-2 lg:px-4"
            asChild
          >
            <Link href="/create" prefetch>
              <span className="hidden lg:inline">Create Post</span>
              <span className="lg:hidden">+</span>
            </Link>
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
}
