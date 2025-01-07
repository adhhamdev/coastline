"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PostForm } from "./post-form";
import { ProductForm } from "./product-form";

interface CreateContentProps {
  user: User;
  profile: Profile | null;
}

interface Profile {
  username: string;
  full_name: string;
  avatar_url: string;
}

export default function CreateContent({ user, profile }: CreateContentProps) {
  const [visibility, setVisibility] = useState("public");
  const router = useRouter();

  const handleSuccess = () => {
    router.refresh();
  };

  return (
    <Card className="w-full h-[100dvh] md:h-auto md:max-w-2xl m-0 md:m-4 border-0 md:border rounded-none md:rounded-lg">
      <CardHeader className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b space-y-3">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback>
                {profile?.username?.[0]?.toUpperCase() ||
                  user.email?.[0]?.toUpperCase()}
              </AvatarFallback>
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
            <PostForm user={user} onSuccess={handleSuccess} />
          </TabsContent>
          <TabsContent value="product" className="mt-0 p-4 md:p-0">
            <ProductForm user={user} onSuccess={handleSuccess} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
