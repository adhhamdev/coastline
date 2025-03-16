"use client";

<<<<<<< HEAD
import Image from "next/image";
import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Download from "yet-another-react-lightbox/plugins/download";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
=======
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
>>>>>>> remove-zoom
import LightboxImage from "./lightbox-image";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  showDownload?: boolean;
}

export function ImageCarousel({
  images,
  alt,
  showDownload = false,
}: ImageCarouselProps) {
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Load CSS only when the lightbox is opened
  useEffect(() => {
    if (open) {
    }
  }, [open]);

  const handleImageClick = (index: number) => {
    setPhotoIndex(index);
    setOpen(true);
<<<<<<< HEAD
=======

    // Dynamically import the Download plugin only when needed
    if (showDownload && !lightboxLoaded) {
      import("yet-another-react-lightbox/plugins/download");
      setLightboxLoaded(true);
    }
>>>>>>> remove-zoom
  };

  // Create slides with download URLs for the lightbox
  const slides = images.map((src) => {
    const filename = src.split("/").pop() || "image";
    return {
      src,
      download: showDownload ? { url: `${src}?download`, filename } : false,
    };
  });

  // Configure plugins
  const getPlugins = () => {
    const plugins = [Zoom];
    if (showDownload) {
      plugins.push(Download);
    }
    return plugins;
  };

  return (
    <>
      <div className="relative w-full overflow-x-auto">
        <div className="flex snap-x snap-mandatory space-x-2 pb-2">
          {images.map((image, index) => (
            <div
              key={image}
              className="relative flex-none snap-center w-[85%] first:pl-0"
              onClick={() => handleImageClick(index)}
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                <Image
                  src={image}
                  alt={`${alt} ${index + 1}`}
                  fill
                  className="object-cover transition-transform hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={photoIndex}
          slides={slides}
<<<<<<< HEAD
          plugins={getPlugins()}
=======
          plugins={
            showDownload
              ? [require("yet-another-react-lightbox/plugins/download").default]
              : []
          }
>>>>>>> remove-zoom
          render={{ slide: LightboxImage }}
          zoom={{ scrollToZoom: false }}
        />
      )}
    </>
  );
}
