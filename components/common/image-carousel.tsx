"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ImageViewer } from "./image-viewer";

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export function ImageCarousel({ images, alt }: ImageCarouselProps) {
  return (
    <Carousel 
      opts={{
        align: "start",
      }}
      className="relative w-full"
    >
      <CarouselContent className="-ml-2">
        {images.map((image, index) => (
          <CarouselItem key={image} className="pl-2 basis-[85%]">
            <ImageViewer src={image} alt={`${alt} ${index + 1}`} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
