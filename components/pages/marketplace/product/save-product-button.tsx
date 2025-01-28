"use client";

import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { useState } from "react";

export default function SaveProductButton() {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <Button variant="outline" size="icon" onClick={() => setIsSaved(!isSaved)}>
      <Bookmark
        className={`h-5 w-5 ${isSaved ? "fill-current text-emerald-600" : ""}`}
      />
    </Button>
  );
}
