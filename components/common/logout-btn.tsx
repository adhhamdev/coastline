"use client";

import { logOut } from "@/lib/actions/auth";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";
import { useTransition } from "react";

export default function LogoutBtn() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleLogout = async () => {
    startTransition(async () => {
      const result = await logOut();

      if (result?.error) {
        toast({
          title: "Logout Failed",
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Logged out",
          description: "You have been logged out successfully.",
        });
      }
    });
  };
  return (
    <form action={handleLogout}>
      <button
        className="w-full flex items-center cursor-pointer text-red-400"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span>Logging out...</span>
          </>
        ) : (
          <>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </>
        )}
      </button>
    </form>
  );
}
