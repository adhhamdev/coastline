"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/use-toast";
import { User } from "@supabase/supabase-js";
import { MessageCircle } from "lucide-react";

export default function ContactSellerButton({
  currentUser,
}: {
  currentUser: User;
}) {
  const { toast } = useToast();

  const handleContact = async () => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please login to contact the seller.",
        variant: "destructive",
      });
      return;
    }
  };

  return (
    <Button className="flex-1" onClick={handleContact}>
      <MessageCircle className="mr-2 h-5 w-5" />
      Contact Seller
    </Button>
  );
}
