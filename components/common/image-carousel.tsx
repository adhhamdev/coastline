"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ImageViewer } from "./image-viewer";
import { Gallery } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  showDownload?: boolean;
}

export function ImageCarousel({ images, alt, showDownload = false }: ImageCarouselProps) {
  return (
    <Gallery>
      <Carousel 
        opts={{
          align: "start",
        }}
        className="relative w-full"
      >
        <CarouselContent className="-ml-2">
          {images.map((image, index) => (
            <CarouselItem key={image} className="pl-2 basis-[85%]">
              <ImageViewer src={image} alt={`${alt} ${index + 1}`} showDownload={showDownload} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Gallery>
  );
}
