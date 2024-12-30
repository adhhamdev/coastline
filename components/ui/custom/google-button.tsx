import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface GoogleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function GoogleButton({ isLoading, ...props }: GoogleButtonProps) {
  return (
    <Button
      variant="outline"
      size="lg"
      className="w-full bg-white text-black font-normal flex items-center gap-2 h-12 rounded-full"
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Image src="/google.svg" alt="Google logo" width={18} height={18} />
      )}
      {isLoading ? "Connecting..." : "Sign in with Google"}
    </Button>
  );
}
