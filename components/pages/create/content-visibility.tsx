"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Globe2, Lock } from "lucide-react";
import { useState } from "react";

export default function ContentVisibility() {
  const [visibility, setVisibility] = useState("public");

  return (
    <div>
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
  );
}
