import { FilterOptions } from "@/components/pages/explore/filter-dialog";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

interface params {
    filters: FilterOptions;
    debouncedSearch: string;
    setSearchResults: React.Dispatch<
      React.SetStateAction<{
        products: any[];
        users: any[];
        posts: any[];
      }>
    >;
}

const search = async ({filters, debouncedSearch, setSearchResults}: params) => {
    try {
      let productsQuery = supabase
        .from("products")
        .select("*, user: profiles(*)");

      // Apply product filters
      if (filters.products.category && filters.products.category !== "all") {
        productsQuery = productsQuery.eq(
          "category",
          filters.products.category
        );
      }

      if (filters.products.inStock) {
        productsQuery = productsQuery.gt("stock", 0);
      }

      if (
        filters.products.priceRange &&
        filters.products.priceRange[1] !== 0
      ) {
        productsQuery = productsQuery
          .gte("price", filters.products.priceRange[0])
          .lte("price", filters.products.priceRange[1]);
      }

      // Apply product sorting
      switch (filters.products.sortBy) {
        case "price-low":
          productsQuery = productsQuery.order("price", { ascending: true });
          break;
        case "price-high":
          productsQuery = productsQuery.order("price", { ascending: false });
          break;
        case "popular":
          productsQuery = productsQuery.order("sold", {
            ascending: false,
          });
          break;
        default:
          productsQuery = productsQuery.order("created_at", {
            ascending: false,
          });
      }

      let usersQuery = supabase.from("profiles").select();

      // Apply user filters
      if (filters.users.hasProducts) {
        usersQuery = usersQuery.gt("products_count", 0);
      }

      if (filters.users.hasPosts) {
        usersQuery = usersQuery.gt("posts_count", 0);
      }

      if (filters.users.followersRange) {
        usersQuery = usersQuery
          .gte("followers_count", filters.users.followersRange[0])
          .lte("followers_count", filters.users.followersRange[1]);
      }

      // Apply user sorting
      switch (filters.users.sortBy) {
        case "followers":
          usersQuery = usersQuery.order("followers_count", {
            ascending: false,
          });
          break;
        case "joined":
          usersQuery = usersQuery.order("created_at", { ascending: false });
          break;
        case "active":
          usersQuery = usersQuery.order("last_active", { ascending: false });
          break;
      }

      let postsQuery = supabase
        .from("posts")
        .select("*, user:profiles(*), product:products(*)");

      // Apply post filters
      if (filters.posts.hasProduct) {
        postsQuery = postsQuery.not("product", "is", null);
      }

      if (filters.posts.dateRange) {
        postsQuery = postsQuery
          .gte("created_at", filters.posts.dateRange[0].toISOString())
          .lte("created_at", filters.posts.dateRange[1].toISOString());
      }

      // Apply post sorting
      switch (filters.posts.sortBy) {
        case "popular":
          postsQuery = postsQuery.order("likes_count", { ascending: false });
          break;
        case "comments":
          postsQuery = postsQuery.order("comments_count", {
            ascending: false,
          });
          break;
        default:
          postsQuery = postsQuery.order("created_at", { ascending: false });
      }

      // Add search filters if query exists
      if (debouncedSearch) {
        productsQuery = productsQuery.textSearch("title", debouncedSearch, {
          type: "websearch",
          config: "english",
        });

        usersQuery = usersQuery.textSearch("username", debouncedSearch);

        postsQuery = postsQuery.textSearch("content", debouncedSearch, {
          type: "websearch",
          config: "english",
        });
      }

      // Apply limits
      productsQuery = productsQuery.limit(10);
      usersQuery = usersQuery.limit(10);
      postsQuery = postsQuery.limit(10);

      const [productsRes, usersRes, postsRes] = await Promise.all([
        productsQuery,
        usersQuery,
        postsQuery,
      ]);

      console.log("Products:", productsRes);
      setSearchResults({
        products: productsRes.data || [],
        users: usersRes.data || [],
        posts: postsRes.data || [],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  export default search;