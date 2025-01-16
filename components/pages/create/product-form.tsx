"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImagePlus, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/lib/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import { Product } from "@/lib/types/database.types";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

interface ProductFormProps {
  user: User;
}

export function ProductForm({ user }: ProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [productImages, setProductImages] = useState<File[]>([]);
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const productData = validateFormData(formData);
      const images = await uploadImages(productImages);
      await createProduct(productData, images);

      toast({
        title: "Success",
        description: "Your product has been created successfully.",
      });

      setProductImages([]);
      router.refresh();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateFormData = (formData: FormData) => {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const stock = parseInt(formData.get("stock") as string);
    const location = formData.get("location") as string;

    if (!title.trim()) throw new Error("Title cannot be empty");
    if (isNaN(price) || price <= 0)
      throw new Error("Price must be a valid positive number");
    if (isNaN(stock) || stock < 0)
      throw new Error("Stock must be a valid non-negative number");

    return { title, description, price, category, stock, location };
  };

  const uploadImages = async (files: File[]) => {
    const images: string[] = [];
    if (files.length > 0) {
      for (const file of files) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("product-images").getPublicUrl(filePath);

        images.push(publicUrl);
      }
    }
    return images;
  };

  const createProduct = async (
    data: ReturnType<typeof validateFormData>,
    images: string[]
  ) => {
    const productData: Partial<Product<false>> = {
      user: user.id,
      title: data.title,
      description: data.description.trim() || undefined,
      price: data.price,
      category: data.category,
      stock: data.stock,
      images: images.length > 0 ? images : undefined,
      location: data.location.trim() || undefined,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("products")
      .insert(productData)
      .select()
      .single();

    if (error) throw error;
  };

  const handleError = (error: unknown) => {
    console.error("Error creating product:", error);
    toast({
      title: "Error",
      description:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      variant: "destructive",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="flex-grow space-y-4 p-4 md:py-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Product title"
            className="text-lg focus-visible:ring-1"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Product description"
            className="min-h-[100px] resize-none text-lg focus-visible:ring-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              className="text-lg focus-visible:ring-1"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              min="0"
              placeholder="0"
              className="text-lg focus-visible:ring-1"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select name="category" defaultValue="other">
            <SelectTrigger className="text-lg focus-visible:ring-1">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gems">Gems</SelectItem>
              <SelectItem value="fishing">Fishing</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            placeholder="Product location"
            className="text-lg focus-visible:ring-1"
          />
        </div>

        {productImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 rounded-lg bg-muted/30 p-2">
            {productImages.map((file, index) => (
              <div
                key={index}
                className="group relative aspect-square rounded-lg overflow-hidden bg-muted ring-2 ring-background/50 transition-all hover:ring-primary"
              >
                <button
                  type="button"
                  onClick={() => {
                    const newFiles = [...productImages];
                    newFiles.splice(index, 1);
                    setProductImages(newFiles);
                  }}
                  className="absolute top-1 right-1 z-10 rounded-full bg-background/80 p-1 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <X className="h-4 w-4" />
                </button>
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sticky md:relative bottom-16 md:bottom-0 mt-auto flex items-center justify-between gap-2 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 md:p-0 md:pt-4">
        <div className="flex gap-2">
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
                const files = Array.from(
                  (e.target as HTMLInputElement).files || []
                );
                setProductImages((prev) => [...prev, ...files]);
              };
              input.click();
            }}
          >
            <ImagePlus className="h-5 w-5" />
            <span className="sr-only">Add product images</span>
          </Button>
        </div>

        <Button
          type="submit"
          size="lg"
          className="rounded-full px-8 transition-all hover:scale-105"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Product"
          )}
        </Button>
      </div>
    </form>
  );
}
