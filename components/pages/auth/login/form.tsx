"use client";
import { MotionDiv } from "@/components/common/motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { OAuthSignIn } from "@/lib/actions/auth";
import { useTransition } from "react";
import { GoogleButton } from "../../login/google-button";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleOAuth = () => {
    startTransition(async () => {
      const result = await OAuthSignIn();
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
    <form action={handleOAuth} className="space-y-4">
      <MotionDiv variants={fadeInUp} className="space-y-4">
        <GoogleButton
          type="submit"
          isLoading={isPending}
          className="w-full rounded-full hover:scale-105 transition-transform duration-300"
        />

        <Button
          className="w-full bg-[#1877F2] hover:bg-[#1874EA] hover:scale-105 text-white rounded-full transition-all duration-300"
          size="lg"
          type="submit"
        >
          Continue with Facebook
        </Button>

        <Button
          className="w-full bg-black hover:bg-zinc-800 hover:scale-105 text-white rounded-full transition-all duration-300"
          size="lg"
          type="submit"
        >
          Continue with Apple
        </Button>
      </MotionDiv>
    </form>
  );
}
