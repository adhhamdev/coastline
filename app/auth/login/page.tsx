'use client';

import { handleOAuth, login } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from "lucide-react";
import Link from 'next/link';
import { useTransition } from 'react';

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const { error } = await login(formData);
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Login failed',
          description: error,
        });
      }
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Welcome back! Please login to your account.
        </CardDescription>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-emerald-600 hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </form>
      <form action={handleOAuth}>
        <Button type="submit" className="w-full">
          Login with Google
        </Button>
      </form>
      {searchParams.error && (
        <p className="text-sm text-red-500 text-center mt-4">{searchParams.error}</p>
      )}
    </Card>
  )
}