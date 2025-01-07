"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Loader2 } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/lib/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import { Post } from "@/lib/types/database.types";
import { User } from "@supabase/supabase-js";

interface PostFormProps {
  user: User;
  onSuccess?: () => void;
}

export function PostForm({ user, onSuccess }: PostFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const supabase = createClient();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const content = formData.get("content") as string;

      if (!content.trim()) {
        throw new Error("Content cannot be empty");
      }

      const images = await uploadImages(selectedFiles);
      await createPost(content, images);

      toast({
        title: "Success",
        description: "Your post has been created successfully.",
      });

      setSelectedFiles([]);
      onSuccess?.();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImages = async (files: File[]) => {
    const images: string[] = [];
    if (files.length > 0) {
      for (const file of files) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("post-images")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("post-images").getPublicUrl(filePath);

        images.push(publicUrl);
      }
    }
    return images;
  };

  const createPost = async (content: string, images: string[]) => {
    const postData: Partial<Post<false, false>> = {
      user: user.id,
      content,
      images: images.length > 0 ? images : undefined,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      likes_count: 0,
      comments_count: 0,
    };

    const { error, data } = await supabase
      .from("posts")
      .insert(postData)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const handleError = (error: unknown) => {
    console.error("Error creating post:", error);
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
        <Label htmlFor="content" className="sr-only">
          What&apos;s on your mind?
        </Label>
        <Textarea
          id="content"
          name="content"
          placeholder="What's on your mind?"
          className="min-h-[150px] resize-none border-none focus-visible:ring-0"
          required
        />
      </div>

      <div className="space-y-4">
        {selectedFiles.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {selectedFiles.map((file, index) => (
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
            onClick={() => document.getElementById("file-input")?.click()}
            disabled={isLoading}
          >
            <ImagePlus className="h-4 w-4" />
          </Button>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              setSelectedFiles([...selectedFiles, ...files]);
            }}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Post
      </Button>
    </form>
  );
}
