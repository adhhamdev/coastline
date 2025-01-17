"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import createPost from "@/lib/actions/pages/create/createPost";
import { useToast } from "@/lib/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { ImagePlus, Loader2, MessageCirclePlus, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";

interface PostFormProps {
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
          Posting...
        </>
      ) : (
        <>
          <MessageCirclePlus className="h-4 w-4" />
          Post
        </>
      )}
    </Button>
  );
}

export function PostForm({ user }: PostFormProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  async function handleAction(formData: FormData) {
    try {
      const content = formData.get("content") as string;
      if (!content.trim()) {
        throw new Error("Content cannot be empty");
      }

      const supabase = createClient();
      const images: string[] = [];

      if (selectedFiles.length > 0) {
        for (const file of selectedFiles) {
          if (file.size > 2 * 1024 * 1024) {
            throw new Error("Each image must be less than 2MB");
          }

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

      const result = await createPost(content, images, user.id);

      if (!result.success) {
        throw new Error(result.error?.message);
      }

      toast({
        title: "Success",
        description: "Your post has been created successfully.",
      });

      setSelectedFiles([]);
      router.refresh();
    } catch (error) {
      console.error("Error creating post:", error);
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
    <form action={handleAction} className="flex flex-col h-full">
      <div className="flex-grow space-y-4">
        <div className="relative p-4">
          <Label htmlFor="content" className="sr-only">
            What&apos;s on your mind?
          </Label>
          <Textarea
            id="content"
            name="content"
            placeholder="What's on your mind?"
            className="min-h-[250px] resize-none border-none"
            required
          />
        </div>

        {selectedFiles.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 rounded-lg bg-muted/30 p-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="group relative aspect-square rounded-lg overflow-hidden bg-muted ring-2 ring-background/50 transition-all hover:ring-primary"
              >
                <button
                  type="button"
                  onClick={() => {
                    const newFiles = [...selectedFiles];
                    newFiles.splice(index, 1);
                    setSelectedFiles(newFiles);
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

      <div className="sticky bottom-16 mt-auto flex items-center justify-between gap-2 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 md:p-0 md:pt-4">
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
                setSelectedFiles((prev) => [...prev, ...files]);
              };
              input.click();
            }}
          >
            <ImagePlus className="h-5 w-5" />
            <span className="sr-only">Add images</span>
          </Button>
        </div>

        <SubmitButton />
      </div>
    </form>
  );
}
