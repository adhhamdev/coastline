import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Bell, Mail, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function SideNavbar() {
  return (
    <div className="hidden md:flex flex-col gap-4 h-[calc(100vh-5rem)] sticky top-16">
      <ScrollArea className="h-full">
        <div className="space-y-2 py-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            asChild
          >
            <Link href="/feed" prefetch>
              <Home className="h-5 w-5" />
              Home
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            asChild
          >
            <Link href="/messages" prefetch>
              <Mail className="h-5 w-5" />
              Messages
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            asChild
          >
            <Link href="/profile" prefetch>
              <UserIcon className="h-5 w-5" />
              Profile
            </Link>
          </Button>
          <Button variant="default" className="w-full mt-4" asChild>
            <Link href="/create" prefetch>
              Create Post
            </Link>
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
}
