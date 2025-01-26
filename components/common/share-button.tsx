"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

interface ShareButtonProps {
  type: string;
  contentId: string;
  url: string;
  title: string;
}

export function ShareButton({ type, contentId, url, title }: ShareButtonProps) {
  const handleShare = async () => {
    try {
      await navigator.share({
        title: title,
        text: "Check out this " + type,
        url: `${window.location.origin}/${type}/${contentId}`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <Button
      title="Share"
      variant="ghost"
      size="sm"
      className="px-3"
      onClick={handleShare}
    >
      <Share2 className="h-4 w-4" />
    </Button>
  );
}
