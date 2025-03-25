import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@supabase/supabase-js";
import {
  Bookmark,
  CreditCard,
  LayoutDashboard,
  Settings,
  User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import LogoutBtn from "./logout-btn";

interface UserNavProps {
  user: User | null;
  [key: string]: any;
}

export default function UserNav({ user, ...props }: UserNavProps) {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.user_metadata.avatar_url || ""}
              alt={user?.email || ""}
            />
            <AvatarFallback>
              {user?.email?.[0].toUpperCase() || ""}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-base font-medium leading-none">
              {user?.user_metadata.full_name || user?.email}
            </p>
            <p className="text-sm leading-none text-muted-foreground">
              {user?.email || ""}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              prefetch={true}
              href="/dashboard"
              className="w-full flex items-center cursor-pointer py-2"
            >
              <LayoutDashboard className="mr-2 h-5 w-5" />
              <span className="text-base">Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              prefetch={true}
              href="/saved"
              className="w-full flex items-center cursor-pointer py-2"
            >
              <Bookmark className="mr-2 h-5 w-5" />
              <span className="text-base">Saved</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              prefetch={true}
              href="/profile"
              className="w-full flex items-center cursor-pointer py-2"
            >
              <UserIcon className="mr-2 h-5 w-5" />
              <span className="text-base">Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              prefetch={true}
              href="/billing"
              className="w-full flex items-center cursor-pointer py-2"
            >
              <CreditCard className="mr-2 h-5 w-5" />
              <span className="text-base">Billing</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              prefetch={true}
              href="/settings"
              className="w-full flex items-center cursor-pointer py-2"
            >
              <Settings className="mr-2 h-5 w-5" />
              <span className="text-base">Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <div>
            <LogoutBtn />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
