"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { toggleSavePost } from "@/lib/actions/pages/feed/toggleSavePost";
import { Bookmark } from "lucide-react";
import { useState } from "react";

interface SaveButtonProps {
  postId: string;
  userId?: string;
  initialSaved: boolean;
  revalidationPath?: string;
}

export default function SavePostButton({
  postId,
  userId,
  initialSaved,
  revalidationPath = "",
}: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(initialSaved);
  console.log("initialSaved ", postId, " ", initialSaved, isSaved);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!userId) {
      toast({
        title: "Error",
        description: "Please login to save posts",
        variant: "destructive",
      });
      return;
    }

    try {
      const saved = await toggleSavePost(postId, userId, revalidationPath);
      setIsSaved(saved);
      toast({
        title: saved ? "Post saved" : "Post unsaved",
        description: saved
          ? "Post has been added to your saved items"
          : "Post has been removed from your saved items",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save post",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="px-3"
      onClick={handleSave}
      aria-label={isSaved ? "Unsave post" : "Save post"}
      title={isSaved ? "Unsave" : "Save"}
    >
      <Bookmark
        className={`h-4 w-4 ${isSaved && "fill-primary text-primary"}`}
      />
    </Button>
  );
}
