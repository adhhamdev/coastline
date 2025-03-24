import ContactSellerButton from "@/components/pages/marketplace/product/contact-seller-button";
import ProductImages from "@/components/pages/marketplace/product/product-images";
import SaveProductButton from "@/components/pages/marketplace/product/save-product-button";
import SimilarProducts from "@/components/pages/marketplace/product/similar-products";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/lib/actions/auth";
import { createClient } from "@/utils/supabase/server";
import { formatDistanceToNow } from "date-fns";
import { Heart, MapPin, Share2, Star, UserIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage(props: ProductPageProps) {
  const params = await props.params;
  const user = await getUser();
  const supabase = await createClient();

  // Fetch product details with seller information
  const { data: product } = await supabase
    .from("products")
    .select(`*, profiles(*)`)
    .eq("id", params.id)
    .single();

  if (!product) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(price);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl pb-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="w-full">
            <ProductImages product={product} />
          </div>
          <div className="space-y-8">
            <div className="space-y-3">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                {product.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  className="transition-colors"
                  variant={
                    product.category === "gems" ? "default" : "secondary"
                  }
                >
                  {product.category}
                </Badge>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">
                  Listed{" "}
                  {formatDistanceToNow(new Date(product.created_at), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl md:text-3xl font-bold text-emerald-600 tracking-tight">
                  {formatPrice(product.price)}
                </span>
                {product.original_price && (
                  <span className="text-base md:text-lg text-muted-foreground line-through">
                    {formatPrice(product.original_price)}
                  </span>
                )}
              </div>
              {/* Action Buttons - Desktop */}
              <div className="hidden md:flex items-center gap-3">
                <ContactSellerButton currentUser={user} />
                <Button
                  variant="outline"
                  size="icon"
                  className="transition-all hover:bg-pink-50 hover:border-pink-200 hover:text-pink-500"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Seller Info */}
            <Card className="p-6 transition-shadow hover:shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <Link
                  href={`/${product.profiles.username}`}
                  className="flex items-center space-x-4 group"
                >
                  <Avatar className="h-14 w-14 transition-transform group-hover:scale-105">
                    <AvatarImage src={product.profiles.avatar_url} />
                    <AvatarFallback>
                      {product.profiles.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold group-hover:text-primary transition-colors">
                        {product.profiles.username}
                      </span>
                      {product.profiles.verified && (
                        <Badge
                          variant="secondary"
                          className="transition-colors"
                        >
                          <Star className="mr-1 h-3 w-3" /> Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {product.profiles.business_type}
                    </p>
                  </div>
                </Link>
                <div className="flex space-x-3">
                  <SaveProductButton />
                  <Button
                    variant="outline"
                    size="icon"
                    className="transition-colors hover:bg-secondary"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <UserIcon className="mr-1.5 h-4 w-4" />
                  <span>{product.profiles.followers_count || 0} followers</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-1.5 h-4 w-4" />
                  <span>{product.profiles.location}</span>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Description</h3>
              <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Similar Products */}
          <SimilarProducts user={user} product={product} />
        </div>
      </div>

      {/* Fixed Action Bar - Mobile Only */}
      <div className="fixed bottom-16 left-0 right-0 z-50 md:hidden">
        <div className="bg-background/80 backdrop-blur-md border-t">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center justify-end py-4 gap-4">
              <ContactSellerButton currentUser={user} />
              <Button
                variant="outline"
                size="icon"
                className="transition-all hover:bg-pink-50 hover:border-pink-200 hover:text-pink-500"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
