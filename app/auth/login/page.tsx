'use client';

import { handleOAuth } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from "lucide-react";
import { useTransition } from 'react';

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = () => {
    startTransition(async () => {
      const result = await handleOAuth();
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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Welcome back! Please login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form action={handleSubmit}>
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              "Continue with Google"
            )}
          </Button>
        </form>
        <p className="text-sm text-muted-foreground text-center">
          Don&apos;t have an account? No worries!<br />
          You can sign up using Google too.
        </p>
        {searchParams.error && (
          <p className="text-sm text-red-500 text-center">{searchParams.error}</p>
        )}
      </CardContent>
    </Card>
  );
}