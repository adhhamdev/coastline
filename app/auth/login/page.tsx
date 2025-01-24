"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GoogleButton } from "@/components/pages/login/google-button";
import { OAuthSignIn } from "@/lib/actions/auth";
import { useToast } from "@/lib/hooks/use-toast";
import { useTransition } from "react";
import { MotionDiv } from "@/components/common/motion";
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
    <div className="relative min-h-screen flex">
      {/* Left Column - Greeting */}
      <div className="hidden lg:flex w-1/2 relative flex-col items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/homepage/sri-lanka-aerial.jpg"
            alt="Sri Lanka Aerial View"
            fill
            priority
            className="object-cover object-center"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" />
        </div>
        <div className="relative z-10 text-black p-8 space-y-14">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="w-32 h-32 mb-4 rounded-full border-2 border-primary/30 shadow-xl"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="currentColor"
              className="text-primary"
            />
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="currentColor"
              className="text-primary/70"
            />
          </svg>

          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-secondary to-slate-600 text-transparent bg-clip-text drop-shadow-xl">
              Welcome to Coastline
            </h1>
            <p className="text-xl">
              Discover the best of Sri Lankan businesses
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 bg-slate-200">
        <MotionDiv
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="w-full max-w-md"
        >
          <Card className="border-none shadow-lg">
            <MotionDiv variants={fadeInUp}>
              <CardHeader className="space-y-3">
                <CardTitle className="text-3xl font-bold text-center">
                  Sign In
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
    </div>
  );
}
