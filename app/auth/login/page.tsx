'use client';

import { OAuthSignIn } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GoogleButton } from '@/components/ui/google-button';
import { useToast } from '@/hooks/use-toast';
import { useTransition } from 'react';

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleOAuth = () => {
    startTransition(async () => {
      const result = await OAuthSignIn();
      if (result?.error) {
        toast({
          variant: 'destructive',
          title: 'Login failed',
          description: result.error,
        });
      }
    });
  };

  return (
    <div className="w-full max-w-md px-4">
      <Card className="border-none shadow-none md:border md:shadow-sm">
        <CardHeader className="space-y-3">
          <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Welcome back! Choose your sign in method to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* OAuth Options */}
          <form action={handleOAuth} className="space-y-3">
            <GoogleButton type="submit" isLoading={isPending} />

            <Button
              className="w-full bg-[#1877F2] hover:bg-[#1874EA] text-white"
              size="lg"
              type="submit"
            >
              Continue with Facebook
            </Button>

            <Button
              className="w-full bg-black hover:bg-zinc-800 text-white"
              size="lg"
              type="submit"
            >
              Continue with Apple
            </Button>
          </form>

          {searchParams.error && (
            <p className="text-sm text-red-500 text-center">{searchParams.error}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}