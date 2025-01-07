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
import { ImagePlus, Loader2 } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/lib/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import { Product } from "@/lib/types/database.types";
import { User } from "@supabase/supabase-js";

interface ProductFormProps {
  user: User;
  onSuccess?: () => void;
}

export function ProductForm({ user, onSuccess }: ProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [productImages, setProductImages] = useState<File[]>([]);
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
      onSuccess?.();
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" placeholder="Product title" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Product description"
          className="min-h-[100px] resize-none"
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
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select name="category" defaultValue="other">
          <SelectTrigger>
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
        <Input id="location" name="location" placeholder="Product location" />
      </div>

      <div className="space-y-4">
        {productImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {productImages.map((file, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden"
              >
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() =>
              document.getElementById("product-image-input")?.click()
            }
            disabled={isLoading}
          >
            <ImagePlus className="h-4 w-4" />
          </Button>
          <input
            id="product-image-input"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              setProductImages([...productImages, ...files]);
            }}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Product
      </Button>
    </form>
  );
}
