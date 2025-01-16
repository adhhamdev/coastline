"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { User } from "@supabase/supabase-js";

interface CreatePostProps {
  user: User;
}

export function CreatePost({ user }: CreatePostProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      // await createPost(formData);
      setContent("");
      formRef.current?.reset();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // useEffect(() => {
  //   const redirectToApp = () => {
  //     const isMobile = navigator.userAgent.includes("Mobile");
  //     if (isMobile) {
  //       window.location.href = `coastlineapp.${window.location.href}`;
  //       console.log("Redirecting to feed...");
  //     }
  //   };

  //   redirectToApp();
  // }, []);

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className={`p-2 border-b transition-all duration-200 ${
        isExpanded ? "shadow-md" : ""
      }`}
    >
      <div
        className={`flex gap-4 transition-all duration-200 ${
          isExpanded ? "flex-col items-start p-4" : "p-2"
        }`}
      >
        <div className="relative h-8 w-8 shrink-0 rounded-full bg-muted overflow-hidden">
          {user.user_metadata?.avatar_url && (
            <Image
              src={user.user_metadata.avatar_url}
              alt={user.user_metadata?.full_name || "User"}
              fill
              className="object-cover"
              sizes="32px"
            />
          )}
        </div>
        <div
          className={`flex-1 w-full ${
            isExpanded ? "space-y-4" : "flex items-center gap-4"
          }`}
        >
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className={`w-full bg-transparent border-none resize-none focus:outline-none transition-all duration-200 placeholder:text-lg ${
              isExpanded
                ? "min-h-[150px]"
                : "min-h-[32px] max-h-[32px] overflow-hidden whitespace-nowrap"
            }`}
            placeholder="What's on your mind?"
          />
          <input
            ref={fileInputRef}
            type="file"
            name="media"
            accept="image/*"
            multiple
            className="hidden"
          />
          <div
            className={`flex items-center gap-2 ${
              isExpanded ? "justify-end w-full" : ""
            }`}
          >
            {isExpanded && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setIsExpanded(false);
                  setContent("");
                }}
                className="text-muted-foreground"
              >
                Cancel
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => fileInputRef.current?.click()}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
            <Button
              type="submit"
              disabled={!content.trim() || isSubmitting}
              size={isExpanded ? "default" : "sm"}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
