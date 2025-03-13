"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Filter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

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
  activeTab?: string;
}

// Default filter values
const defaultFilters: FilterOptions = {
  products: {
    sortBy: "latest",
    priceRange: [0, 1000],
    inStock: false,
    category: "all",
  },
  posts: {
    sortBy: "latest",
    dateRange: [new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()],
    hasProduct: false,
  },
  users: {
    sortBy: "followers",
    followersRange: [0, 1000],
    hasProducts: false,
    hasPosts: false,
  },
};

export default function FilterDialog({ activeTab = "all" }: FilterDialogProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);

  // Parse filters from URL on component mount
  useEffect(() => {
    const currentFilters = { ...defaultFilters };

    // Parse product filters
    if (searchParams.has("productSort")) {
      currentFilters.products.sortBy =
        searchParams.get("productSort") || "latest";
    }
    if (searchParams.has("minPrice") && searchParams.has("maxPrice")) {
      currentFilters.products.priceRange = [
        parseInt(searchParams.get("minPrice") || "0", 10),
        parseInt(searchParams.get("maxPrice") || "1000", 10),
      ];
    }
    if (searchParams.has("inStock")) {
      currentFilters.products.inStock = searchParams.get("inStock") === "true";
    }
    if (searchParams.has("category")) {
      currentFilters.products.category = searchParams.get("category") || "all";
    }

    // Parse post filters
    if (searchParams.has("postSort")) {
      currentFilters.posts.sortBy = searchParams.get("postSort") || "latest";
    }
    if (searchParams.has("hasProduct")) {
      currentFilters.posts.hasProduct =
        searchParams.get("hasProduct") === "true";
    }

    // Parse user filters
    if (searchParams.has("userSort")) {
      currentFilters.users.sortBy = searchParams.get("userSort") || "followers";
    }
    if (searchParams.has("minFollowers") && searchParams.has("maxFollowers")) {
      currentFilters.users.followersRange = [
        parseInt(searchParams.get("minFollowers") || "0", 10),
        parseInt(searchParams.get("maxFollowers") || "1000", 10),
      ];
    }
    if (searchParams.has("hasProducts")) {
      currentFilters.users.hasProducts =
        searchParams.get("hasProducts") === "true";
    }
    if (searchParams.has("hasPosts")) {
      currentFilters.users.hasPosts = searchParams.get("hasPosts") === "true";
    }

    setFilters(currentFilters);
  }, [searchParams]);

  // Function to update search params while preserving existing ones
  const updateSearchParams = (updates: Record<string, string | null>) => {
    // Create a new URLSearchParams object from the current search params
    const params = new URLSearchParams(searchParams.toString());

    // Update or remove parameters based on the updates object
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Use startTransition to avoid blocking the UI during navigation
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
      setOpen(false); // Close dialog after applying filters
    });
  };

  const updateProductFilters = (
    updates: Partial<FilterOptions["products"]>
  ) => {
    const newFilters = {
      ...filters,
      products: { ...filters.products, ...updates },
    };
    setFilters(newFilters);

    // Prepare URL parameter updates
    const paramUpdates: Record<string, string | null> = {};

    if (updates.sortBy) {
      paramUpdates.productSort = updates.sortBy;
    }

    if (updates.priceRange) {
      paramUpdates.minPrice = updates.priceRange[0].toString();
      paramUpdates.maxPrice = updates.priceRange[1].toString();
    }

    if (updates.inStock !== undefined) {
      paramUpdates.inStock = updates.inStock.toString();
    }

    if (updates.category) {
      paramUpdates.category =
        updates.category === "all" ? null : updates.category;
    }
  };

  const updatePostFilters = (updates: Partial<FilterOptions["posts"]>) => {
    const newFilters = {
      ...filters,
      posts: { ...filters.posts, ...updates },
    };
    setFilters(newFilters);

    // Prepare URL parameter updates
    const paramUpdates: Record<string, string | null> = {};

    if (updates.sortBy) {
      paramUpdates.postSort = updates.sortBy;
    }

    if (updates.hasProduct !== undefined) {
      paramUpdates.hasProduct = updates.hasProduct.toString();
    }

    // Date range handling would go here
  };

  const updateUserFilters = (updates: Partial<FilterOptions["users"]>) => {
    const newFilters = {
      ...filters,
      users: { ...filters.users, ...updates },
    };
    setFilters(newFilters);

    // Prepare URL parameter updates
    const paramUpdates: Record<string, string | null> = {};

    if (updates.sortBy) {
      paramUpdates.userSort = updates.sortBy;
    }

    if (updates.followersRange) {
      paramUpdates.minFollowers = updates.followersRange[0].toString();
      paramUpdates.maxFollowers = updates.followersRange[1].toString();
    }

    if (updates.hasProducts !== undefined) {
      paramUpdates.hasProducts = updates.hasProducts.toString();
    }

    if (updates.hasPosts !== undefined) {
      paramUpdates.hasPosts = updates.hasPosts.toString();
    }
  };

  const applyFilters = () => {
    // Prepare all URL parameter updates based on current filter state
    const paramUpdates: Record<string, string | null> = {
      // Product filters
      productSort: filters.products.sortBy,
      minPrice: filters.products.priceRange[0].toString(),
      maxPrice: filters.products.priceRange[1].toString(),
      inStock: filters.products.inStock ? "true" : "false",
      category:
        filters.products.category === "all"
          ? null
          : filters.products.category || null,

      // Post filters
      postSort: filters.posts.sortBy,
      hasProduct: filters.posts.hasProduct ? "true" : "false",

      // User filters
      userSort: filters.users.sortBy,
      minFollowers: filters.users.followersRange[0].toString(),
      maxFollowers: filters.users.followersRange[1].toString(),
      hasProducts: filters.users.hasProducts ? "true" : "false",
      hasPosts: filters.users.hasPosts ? "true" : "false",
    };

    updateSearchParams(paramUpdates);
  };

  const clearAllFilters = () => {
    setFilters(defaultFilters);

    // Clear all filter-related URL parameters
    const params = new URLSearchParams(searchParams.toString());

    // List of all filter parameters to clear
    const filterParams = [
      "productSort",
      "minPrice",
      "maxPrice",
      "inStock",
      "category",
      "postSort",
      "hasProduct",
      "userSort",
      "minFollowers",
      "maxFollowers",
      "hasProducts",
      "hasPosts",
    ];

    // Remove each filter parameter
    filterParams.forEach((param) => {
      params.delete(param);
    });

    // Use startTransition to avoid blocking the UI during navigation
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
      setOpen(false); // Close dialog after clearing filters
    });
  };

  const clearProductFilters = () => {
    setFilters({
      ...filters,
      products: { ...defaultFilters.products },
    });

    // Clear product-related URL parameters
    const params = new URLSearchParams(searchParams.toString());
    ["productSort", "minPrice", "maxPrice", "inStock", "category"].forEach(
      (param) => {
        params.delete(param);
      }
    );

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const clearPostFilters = () => {
    setFilters({
      ...filters,
      posts: { ...defaultFilters.posts },
    });

    // Clear post-related URL parameters
    const params = new URLSearchParams(searchParams.toString());
    ["postSort", "hasProduct"].forEach((param) => {
      params.delete(param);
    });

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const clearUserFilters = () => {
    setFilters({
      ...filters,
      users: { ...defaultFilters.users },
    });

    // Clear user-related URL parameters
    const params = new URLSearchParams(searchParams.toString());
    [
      "userSort",
      "minFollowers",
      "maxFollowers",
      "hasProducts",
      "hasPosts",
    ].forEach((param) => {
      params.delete(param);
    });

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  // Check if there are any active filters
  const hasActiveFilters = () => {
    return Object.entries(searchParams.toString()).some(([key]) => {
      return [
        "productSort",
        "minPrice",
        "maxPrice",
        "inStock",
        "category",
        "postSort",
        "hasProduct",
        "userSort",
        "minFollowers",
        "maxFollowers",
        "hasProducts",
        "hasPosts",
      ].includes(key);
    });
  };

  // Determine which tab to show initially
  const initialTab = activeTab === "all" ? "products" : activeTab;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <DialogHeader className="pb-4 border-b">
          <DialogTitle>Filter Results</DialogTitle>
          <DialogDescription>
            Customize your search results by applying filters.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={initialTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="flex items-center justify-between mb-4 pb-1 border-b">
              <h3 className="text-sm font-medium">Product Filters</h3>
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
              <div className="space-y-2 pb-6 border-b">
                <Label className="text-sm">Sort By</Label>
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
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 pb-6 border-b">
                <Label className="text-sm">Price Range</Label>
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
                    <span>$1000</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 pb-6 border-b">
                <Switch
                  id="in-stock"
                  checked={filters.products.inStock}
                  onCheckedChange={(checked) =>
                    updateProductFilters({ inStock: checked })
                  }
                />
                <Label htmlFor="in-stock" className="text-sm">
                  In Stock Only
                </Label>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Category</Label>
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
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="home">Home & Garden</SelectItem>
                    <SelectItem value="beauty">Beauty & Health</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="posts">
            <div className="flex items-center justify-between mb-4 pb-1 border-b">
              <h3 className="text-sm font-medium">Post Filters</h3>
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
              <div className="space-y-2 pb-6 border-b">
                <Label className="text-sm">Sort By</Label>
                <Select
                  value={filters.posts.sortBy}
                  onValueChange={(value) =>
                    updatePostFilters({ sortBy: value })
                  }
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

              <div className="flex items-center space-x-2">
                <Switch
                  id="has-product"
                  checked={filters.posts.hasProduct}
                  onCheckedChange={(checked) =>
                    updatePostFilters({ hasProduct: checked })
                  }
                />
                <Label htmlFor="has-product" className="text-sm">
                  Posts with Products
                </Label>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <div className="flex items-center justify-between mb-4 pb-1 border-b">
              <h3 className="text-sm font-medium">User Filters</h3>
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
              <div className="space-y-2 pb-6 border-b">
                <Label className="text-sm">Sort By</Label>
                <Select
                  value={filters.users.sortBy}
                  onValueChange={(value) =>
                    updateUserFilters({ sortBy: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sort order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="followers">Most Followers</SelectItem>
                    <SelectItem value="recent">Recently Joined</SelectItem>
                    <SelectItem value="active">Most Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 pb-6 border-b">
                <Label className="text-sm">Followers Range</Label>
                <div className="pt-2">
                  <Slider
                    defaultValue={filters.users.followersRange}
                    max={1000}
                    step={1}
                    onValueChange={(value) =>
                      updateUserFilters({
                        followersRange: [value[0], value[1]],
                      })
                    }
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>{filters.users.followersRange[0]}</span>
                    <span>1000+</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 pb-2">
                  <Switch
                    id="has-products"
                    checked={filters.users.hasProducts}
                    onCheckedChange={(checked) =>
                      updateUserFilters({ hasProducts: checked })
                    }
                  />
                  <Label htmlFor="has-products" className="text-sm">
                    Has Products
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="has-posts"
                    checked={filters.users.hasPosts}
                    onCheckedChange={(checked) =>
                      updateUserFilters({ hasPosts: checked })
                    }
                  />
                  <Label htmlFor="has-posts" className="text-sm">
                    Has Posts
                  </Label>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-6 pt-4 border-t">
          <Button variant="outline" onClick={clearAllFilters}>
            Reset All
          </Button>
          <Button onClick={applyFilters}>Apply Filters</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
