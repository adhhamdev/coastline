"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { ImageViewer } from "./image-viewer";

interface ImageSliderProps {
  images: string[];
  alt: string;
}

export function ImageSlider({ images, alt }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToImage = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const imageElement = container.children[index] as HTMLElement;
      if (imageElement) {
        container.scrollTo({
          left: imageElement.offsetLeft,
          behavior: "smooth",
        });
        setCurrentIndex(index);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      scrollToImage(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToImage(currentIndex - 1);
    }
  };

  return (
    <div className="relative group">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
      >
        {images.map((image, index) => (
          <div
            key={image}
            className="min-w-full flex-shrink-0 snap-center"
          >
            <ImageViewer src={image} alt={`${alt} ${index + 1}`} />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <>
          <Button
            variant="secondary"
            size="icon"
            className={`absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 ${
              currentIndex === 0 ? "hidden" : ""
            }`}
            onClick={handlePrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className={`absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 ${
              currentIndex === images.length - 1 ? "hidden" : ""
            }`}
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-primary"
                    : "bg-primary/30 hover:bg-primary/50"
                }`}
                onClick={() => scrollToImage(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
