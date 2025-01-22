"use client";

import { createClient } from "@/utils/supabase/client";
import { Download } from "lucide-react";
import Image from "next/image";
import "photoswipe/dist/photoswipe.css";
import { useState } from "react";
import { Item } from "react-photoswipe-gallery";
import { Button } from "../ui/button";

interface ImageViewerProps {
  src: string;
  alt: string;
  aspectRatio?: "square" | "video";
  className?: string;
  priority?: boolean;
  showDownload?: boolean;
}

export function ImageViewer({
  src,
  alt,
  aspectRatio = "square",
  className = "",
  priority = false,
  showDownload = false,
}: ImageViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>();

  const handleImageLoad = (e: any) => {
    setIsLoading(false);
    setDimensions({
      width: e.target.naturalWidth,
      height: e.target.naturalHeight,
    });
  };

  const handleDownload = async () => {
    const supabase = createClient();
    try {
      const imagePath = src.split("/").slice(-2).join("/");
      const { data, error } = await supabase.storage
        .from("post-images")
        .createSignedUrl(imagePath, 60);

      if (error) {
        throw error;
      }

      const link = document.createElement("a");
      link.href = data.signedUrl;
      link.download = imagePath.split("/").pop() || "image";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div className="group relative">
      <Item
        original={src}
        thumbnail={src}
        width={dimensions?.width || 1024}
        height={dimensions?.height || 768}
        caption={alt}
      >
        {({ ref, open }) => (
          <div
            ref={ref as React.Ref<HTMLDivElement>}
            onClick={open}
            className={`relative ${
              aspectRatio === "square" ? "aspect-square" : "aspect-video"
            } overflow-hidden rounded-lg bg-muted ${className}`}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover transition-transform group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              loading="lazy"
              onLoad={handleImageLoad}
            />
            {showDownload && !isLoading && (
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-2 top-2 z-10 opacity-0 bg-background/80 backdrop-blur-sm hover:bg-background/90 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload();
                }}
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </Item>
    </div>
  );
}
