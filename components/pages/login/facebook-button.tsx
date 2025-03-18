import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { signInWithFacebook } from "@/lib/actions/auth";
import { useTransition } from "react";

export default function FacebookButton() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleFacebookOAuth = () => {
    startTransition(async () => {
      const result = await signInWithFacebook();
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
      className="w-full bg-[#1877F2] hover:bg-[#1874EA] hover:scale-105 text-white rounded-full transition-all duration-300"
      size="lg"
      type="submit"
      disabled={isPending}
      formAction={handleFacebookOAuth}
    >
      Continue with Facebook
    </Button>
  );
}
