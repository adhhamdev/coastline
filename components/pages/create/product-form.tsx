"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import createProduct from "@/lib/actions/pages/create/createProduct";
import { useToast } from "@/lib/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Loader2, PackagePlus, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import AttachImageButton from "./attach-image-button";

interface ProductFormProps {
  user: User;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      className="rounded-full px-8 transition-all hover:scale-105"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Creating...
        </>
      ) : (
        <>
          <PackagePlus className="h-4 w-4" />
          Create Product
        </>
      )}
    </Button>
  );
}

export function ProductForm({ user }: ProductFormProps) {
  const [productImages, setProductImages] = useState<File[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  async function handleAction(formData: FormData) {
    try {
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

      const supabase = createClient();
      const images: string[] = [];

      if (productImages.length > 0) {
        for (const file of productImages) {
          if (file.size > 2 * 1024 * 1024) {
            throw new Error("Each image must be less than 2MB");
          }

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

      const result = await createProduct(
        { title, description, price, category, stock, location },
        images,
        user.id
      );

      if (!result.success) {
        throw new Error(result.error?.message);
      }

      toast({
        title: "Success",
        description: "Your product has been created successfully.",
      });
      router.refresh();
    } catch (error) {
      console.error("Error creating product:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <form action={handleAction} className="flex flex-col h-full pb-14 md:pb-0">
      <div className="grow space-y-4 p-5 md:py-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Product title"
            className=" focus-visible:ring-1"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Product description"
            className="min-h-[100px] resize-none focus-visible:ring-1"
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
              className=" focus-visible:ring-1"
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
              className=" focus-visible:ring-1"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select name="category" defaultValue="other">
            <SelectTrigger className=" focus-visible:ring-1">
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
            className=" focus-visible:ring-1"
          />
        </div>

        {productImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 rounded-lg p-2">
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

      <div className="sticky m-2 bottom-[70px] md:bottom-3 flex items-center justify-between gap-2 p-4 md:p-3 rounded-lg border shadow-md bg-background/80 backdrop-blur-lg md:shadow-lg z-40">
        <div className="flex gap-2">
          <AttachImageButton setImages={setProductImages} type="product" />
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}
