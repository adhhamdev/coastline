"use client";

import { createClient } from "@/utils/supabase/client";
import { Download } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import "react-medium-image-zoom/dist/styles.css";
import Zoom from "react-medium-image-zoom";
import { useState } from "react";

interface ImageViewerProps {
  src: string;
  alt: string;
  aspectRatio?: "square" | "video";
  className?: string;
  priority?: boolean;
}

export function ImageViewer({
  src,
  alt,
  aspectRatio = "square",
  className = "",
  priority = false,
}: ImageViewerProps) {
  const supabase = createClient();
  const [isZoomed, setIsZoomed] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const imagePath = src.split("/").slice(-2).join("/");
      const { data, error } = await supabase.storage
        .from("post-images")
        .download(imagePath);

      if (error) throw error;

      const url = window.URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = imagePath.split("/").pop() || "image";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div className="relative group">
      <Zoom
        ZoomContent={({ img }) => (
          <div className="relative">
            {img}
            <Button
              size="icon"
              variant="secondary"
              className="fixed top-4 right-4 z-[999] bg-background/80 backdrop-blur-sm hover:bg-background/90"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        )}
      >
        <div
          className={`relative ${
            aspectRatio === "square" ? "aspect-square" : "aspect-video"
          } rounded-lg bg-muted overflow-hidden ${className}`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
          />
        </div>
      </Zoom>
    </div>
  );
}
