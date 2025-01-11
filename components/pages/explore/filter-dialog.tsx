"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface FilterOptions {
  products: {
    sortBy: string;
    priceRange: [number, number];
    inStock?: boolean;
    category?: string;
  };
  posts: {
    sortBy: string;
    dateRange: [Date, Date];
    hasProduct?: boolean;
  };
  users: {
    sortBy: string;
    followersRange: [number, number];
    hasProducts?: boolean;
    hasPosts?: boolean;
  };
}

interface FilterDialogProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  activeTab: "all" | "products" | "users" | "posts";
}

export default function FilterDialog({
  filters,
  onFiltersChange,
  activeTab,
}: FilterDialogProps) {
  const updateProductFilters = (
    updates: Partial<FilterOptions["products"]>
  ) => {
    onFiltersChange({
      ...filters,
      products: { ...filters.products, ...updates },
    });
  };

  const updatePostFilters = (updates: Partial<FilterOptions["posts"]>) => {
    onFiltersChange({
      ...filters,
      posts: { ...filters.posts, ...updates },
    });
  };

  const updateUserFilters = (updates: Partial<FilterOptions["users"]>) => {
    onFiltersChange({
      ...filters,
      users: { ...filters.users, ...updates },
    });
  };

  const clearProductFilters = () => {
    onFiltersChange({
      ...filters,
      products: {
        sortBy: "latest",
        priceRange: [0, 1000],
        inStock: false,
        category: "all",
      },
    });
  };

  const clearPostFilters = () => {
    onFiltersChange({
      ...filters,
      posts: {
        sortBy: "latest",
        dateRange: [
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          new Date(),
        ],
        hasProduct: false,
      },
    });
  };

  const clearUserFilters = () => {
    onFiltersChange({
      ...filters,
      users: {
        sortBy: "followers",
        followersRange: [0, 10000],
        hasProducts: false,
        hasPosts: false,
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          title="Filter"
          variant="outline"
          size="icon"
          className="shrink-0"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Results</DialogTitle>
        </DialogHeader>
        <Tabs
          defaultValue={activeTab === "all" ? "products" : activeTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Product Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearProductFilters}
                className="h-8 text-muted-foreground hover:text-foreground"
              >
                Clear filters
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Sort By</Label>
              <Select
                value={filters.products.sortBy}
                onValueChange={(value) =>
                  updateProductFilters({ sortBy: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sort order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Price Range</Label>
              <div className="pt-2">
                <Slider
                  defaultValue={filters.products.priceRange}
                  max={1000}
                  step={1}
                  onValueChange={(value) =>
                    updateProductFilters({ priceRange: [value[0], value[1]] })
                  }
                />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>${filters.products.priceRange[0]}</span>
                  <span>${filters.products.priceRange[1]}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={filters.products.category}
                onValueChange={(value) =>
                  updateProductFilters({ category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="gems">Gems</SelectItem>
                  <SelectItem value="fishing">Fishing</SelectItem>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="home">Home & Garden</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="in-stock">In Stock Only</Label>
              <Switch
                id="in-stock"
                checked={filters.products.inStock}
                onCheckedChange={(checked) =>
                  updateProductFilters({ inStock: checked })
                }
              />
            </div>
          </TabsContent>

          <TabsContent value="posts" className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Post Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearPostFilters}
                className="h-8 text-muted-foreground hover:text-foreground"
              >
                Clear filters
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Sort By</Label>
              <Select
                value={filters.posts.sortBy}
                onValueChange={(value) => updatePostFilters({ sortBy: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sort order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="comments">Most Comments</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="has-product">Has Product</Label>
              <Switch
                id="has-product"
                checked={filters.posts.hasProduct}
                onCheckedChange={(checked) =>
                  updatePostFilters({ hasProduct: checked })
                }
              />
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">User Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearUserFilters}
                className="h-8 text-muted-foreground hover:text-foreground"
              >
                Clear filters
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Sort By</Label>
              <Select
                value={filters.users.sortBy}
                onValueChange={(value) => updateUserFilters({ sortBy: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sort order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="followers">Most Followers</SelectItem>
                  <SelectItem value="joined">Recently Joined</SelectItem>
                  <SelectItem value="active">Most Active</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Followers Range</Label>
              <div className="pt-2">
                <Slider
                  defaultValue={filters.users.followersRange}
                  max={10000}
                  step={100}
                  onValueChange={(value) =>
                    updateUserFilters({ followersRange: [value[0], value[1]] })
                  }
                />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>{filters.users.followersRange[0]}</span>
                  <span>{filters.users.followersRange[1]}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="has-products">Has Products</Label>
              <Switch
                id="has-products"
                checked={filters.users.hasProducts}
                onCheckedChange={(checked) =>
                  updateUserFilters({ hasProducts: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="has-posts">Has Posts</Label>
              <Switch
                id="has-posts"
                checked={filters.users.hasPosts}
                onCheckedChange={(checked) =>
                  updateUserFilters({ hasPosts: checked })
                }
              />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
