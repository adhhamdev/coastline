import ContentVisibility from "@/components/pages/create/content-visibility";
import { PostForm } from "@/components/pages/create/post-form";
import { ProductForm } from "@/components/pages/create/product-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import protectPage from "@/lib/helpers/protectPage";
import { createClient } from "@/utils/supabase/server";
import { MessageSquare, ShoppingBag } from "lucide-react";

export default async function CreatePage() {
  const user = await protectPage();
  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("username, full_name, avatar_url")
    .eq("id", user?.id)
    .single();

  return (
    <div className="md:container md:mx-auto flex flex-col justify-end items-center md:py-8">
      <Card className="w-full h-[100dvh] md:h-auto md:max-w-2xl m-0 md:m-4 border-0 rounded-none md:rounded-lg md:shadow-2xl">
        <CardHeader className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm supports-backdrop-filter:bg-background/60 border-b space-y-3 px-4 md:px-6 mb-6 md:mb-0">
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
            <ContentVisibility />
          </div>
        </CardHeader>
        <CardContent className="p-0 md:p-6 grow">
          <Tabs
            defaultValue="post"
            className="h-[calc(100dvh-4rem)] md:h-auto flex flex-col"
          >
            <TabsList className="mx-4 grid grid-cols-2">
              <TabsTrigger
                value="post"
                className="data-[state=active]:bg-primary/10 transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5 md:h-4 md:w-4 mr-2" />
                Post
              </TabsTrigger>
              <TabsTrigger
                value="product"
                className="data-[state=active]:bg-primary/10 transition-colors"
              >
                <ShoppingBag className="h-3.5 w-3.5 md:h-4 md:w-4 mr-2" />
                Product
              </TabsTrigger>
            </TabsList>
            <TabsContent value="post" className="mt-0 grow">
              <PostForm user={user} />
            </TabsContent>
            <TabsContent value="product" className="mt-0 grow">
              <ProductForm user={user} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
