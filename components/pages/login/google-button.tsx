import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { signInWithGoogle } from "@/lib/actions/auth";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useTransition } from "react";

export default function GoogleButton() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGoogleOAuth = () => {
    startTransition(async () => {
      const result = await signInWithGoogle();
      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: result.error,
        });
      }
    });
  };

  return (
    <Button
      variant="outline"
      size="lg"
      // className="w-full bg-white text-black font-normal flex items-center gap-2 h-12 rounded-full"
      disabled={isPending}
      formAction={handleGoogleOAuth}
      className="w-full rounded-full hover:scale-105 transition-transform duration-300"
    >
      {isPending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Image src="/google.svg" alt="Google logo" width={18} height={18} />
      )}
      {isPending ? "Connecting..." : "Sign in with Google"}
    </Button>
  );
}
