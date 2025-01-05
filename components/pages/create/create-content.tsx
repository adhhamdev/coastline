"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/lib/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Globe2, ImagePlus, Loader2, Lock } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CreateContentProps {
  user: User;
}

interface Profile {
  username: string;
  full_name: string;
  avatar_url: string;
}

export default function CreateContent({ user }: CreateContentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [visibility, setVisibility] = useState("public");
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    async function getProfile() {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, full_name, avatar_url')
        .eq('id', user.id)
        .single();
      
      if (!error && data) {
        setProfile(data);
      }
    }
    
    getProfile();
  }, [user.id, supabase]);

  const handleCreatePost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const content = formData.get("content") as string;

      // Upload images if any
      const mediaUrls = [];
      for (const file of selectedFiles) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("posts")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("posts").getPublicUrl(filePath);

        mediaUrls.push(publicUrl);
      }

      // Create post
      const { error } = await supabase.from("posts").insert({
        user_id: user.id,
        content,
        media_urls: mediaUrls,
        visibility,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your post has been created.",
      });

      router.push("/feed");
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full h-[100dvh] md:h-auto md:max-w-2xl m-0 md:m-4 border-0 md:border rounded-none md:rounded-lg">
      <CardHeader className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b space-y-3">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback>{profile?.username?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {profile?.full_name || profile?.username || user.email}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-2">
            <Select defaultValue={visibility} onValueChange={setVisibility}>
              <SelectTrigger className="h-9 text-sm bg-muted/50 hover:bg-muted">
                {visibility === "public" ? (
                  <div className="flex items-center gap-2">
                    <Globe2 className="h-4 w-4" />
                    <span>Public</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    <span>Private</span>
                  </div>
                )}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">
                  <div className="flex items-center gap-2">
                    <Globe2 className="h-4 w-4" />
                    <span>Public</span>
                  </div>
                </SelectItem>
                <SelectItem value="private">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    <span>Private</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              type="submit"
              form="create-form"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Post
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 md:p-6">
        <Tabs defaultValue="post" className="h-[calc(100dvh-4rem)] md:h-auto">
          <TabsList className="w-full sticky top-0 z-10 bg-background rounded-none md:rounded-md grid grid-cols-2">
            <TabsTrigger value="post">Post</TabsTrigger>
            <TabsTrigger value="product">Product</TabsTrigger>
          </TabsList>
          <TabsContent value="post" className="mt-0 p-4 md:p-0">
            <form
              id="create-form"
              onSubmit={handleCreatePost}
              className="space-y-4"
            >
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
                    onClick={() =>
                      document.getElementById("file-input")?.click()
                    }
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
            </form>
          </TabsContent>
          <TabsContent value="product" className="mt-0 p-4 md:p-0">
            <div className="flex items-center justify-center h-[50vh]">
              <p className="text-muted-foreground">
                Product creation coming soon...
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
