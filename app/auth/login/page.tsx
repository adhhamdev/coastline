"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GoogleButton } from "@/components/ui/custom/google-button";
import { OAuthSignIn } from "@/lib/actions/auth";
import { useToast } from "@/lib/hooks/use-toast";
import { useTransition } from "react";
import { MotionDiv } from "@/components/common/motion";
import { Waves } from "lucide-react";
import Image from "next/image";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
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
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-primary via-primary/90 to-primary/70">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/homepage/sri-lanka-aerial.jpg"
          alt="Sri Lanka Aerial View"
          fill
          priority
          className="object-cover object-center opacity-10"
          sizes="100vw"
        />
      </div>

      {/* Waves Effect */}
      <Waves className="absolute bottom-0 left-0 w-full h-24 text-background/10" />

      <MotionDiv
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="backdrop-blur-sm bg-background/80 border-none shadow-2xl p-2">
          <MotionDiv variants={fadeInUp}>
            <CardHeader className="space-y-3">
              <CardTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                Welcome to Coastline
              </CardTitle>
              <CardDescription className="text-center text-base">
                Choose your sign in method to continue exploring Sri Lankan
                businesses.
              </CardDescription>
            </CardHeader>
          </MotionDiv>

          <CardContent className="space-y-6">
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

            {searchParams.error && (
              <MotionDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-500 text-center bg-red-100/10 p-3 rounded-lg"
              >
                {searchParams.error}
              </MotionDiv>
            )}
          </CardContent>
        </Card>
      </MotionDiv>
    </div>
  );
}
