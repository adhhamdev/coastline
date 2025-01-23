"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/lib/hooks/use-toast";
import { Profile } from "@/lib/types/database.types";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface EditProfileHeaderProps {
  user: User;
  profile: Profile;
}

export default function EditProfileHeader({
  user,
  profile,
}: EditProfileHeaderProps) {
  const [banner, setBanner] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    const file = supabase.storage
      .from("banners")
      .getPublicUrl(profile.banner_url || "").data.publicUrl;
    setBanner(file);
  }, [profile]);

  async function handleImageUpload(
    event: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "banner"
  ) {
    try {
      setIsUpdating(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/${Math.random()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from("banners")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          [`${type}_url`]: filePath,
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: `${
          type === "avatar" ? "Profile picture" : "Cover photo"
        } updated successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="relative">
      {/* Cover Photo */}
      <div className="h-48 w-full relative bg-gradient-to-r from-blue-100 to-blue-200 rounded-t-lg">
        {banner && (
          <Image
            src={banner}
            alt="Cover"
            className="w-full h-full object-cover"
            width={1000}
            height={500}
            priority
          />
        )}
        <label
          htmlFor="cover-upload"
          className="absolute bottom-4 right-4 cursor-pointer"
        >
          <div className="bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/90 p-2 rounded-full">
            <Camera className="h-5 w-5" />
          </div>
          <input
            id="cover-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(e, "banner")}
            disabled={isUpdating}
          />
        </label>
      </div>

      {/* Profile Picture */}
      <div className="container max-w-3xl mx-auto px-4">
        <div className="relative -mt-20">
          <div className="relative group inline-block">
            <Avatar className="h-32 w-32 rounded-full ring-4 ring-background">
              <AvatarImage src={profile?.avatar_url || ""} />
              <AvatarFallback className="text-4xl">
                {user.email?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <label
              htmlFor="avatar-upload"
              className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Camera className="h-8 w-8 text-white" />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, "avatar")}
                disabled={isUpdating}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
