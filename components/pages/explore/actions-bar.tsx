"use client";

import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import FilterDialog from "./filter-dialog";

export default function ExploreActionsBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, setIsPending] = useState(false);
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const updateSearchParams = useCallback(
    (name: string, value: string | null) => {
      setIsPending(true);
      const params = new URLSearchParams(searchParams.toString());
      if (value === null) {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      router.push(`${pathname}?${params.toString()}`);
      setIsPending(false);
    },
    [pathname, router, searchParams]
  );

  // Update search params when debounced search value changes
  useEffect(() => {
    updateSearchParams("search", debouncedSearchValue || null);
  }, [debouncedSearchValue, updateSearchParams]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex items-center justify-between gap-4 px-4 md:px-6">
      <div className="relative w-full">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearch}
          className="w-full pl-9 pr-4 [&::-webkit-search-cancel-button]:hover:cursor-pointer [&::-webkit-search-cancel-button]:appearance-auto"
        />
      </div>
      <div className="flex gap-2">
        <FilterDialog />
      </div>
    </div>
  );
}
