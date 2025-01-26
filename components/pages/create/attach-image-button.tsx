import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";

export default function AttachImageButton({
  setImages,
  type,
}: {
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  type: "product" | "post";
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="rounded-full hover:bg-primary/10 transition-colors"
      onClick={() => {
        const input = document.createElement("input");
        input.type = "file";
        input.multiple = true;
        input.accept = "image/*";
        input.onchange = (e) => {
          const files = Array.from((e.target as HTMLInputElement).files || []);
          setImages((prev) => [...prev, ...files]);
        };
        input.click();
      }}
    >
      <ImagePlus className="h-5 w-5" />
      <span className="sr-only">Add {type} images</span>
    </Button>
  );
}
