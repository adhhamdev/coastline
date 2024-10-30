'use client';

import { handleOAuth } from '@/actions/auth';
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
        <CardTitle>Welcome</CardTitle>
        <CardDescription>
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form action={handleSubmit}>
          <GoogleButton type="submit" isLoading={isPending} />
        </form>
        {searchParams.error && (
          <p className="text-sm text-red-500 text-center">{searchParams.error}</p>
        )}
      </CardContent>
    </Card>
  );
}