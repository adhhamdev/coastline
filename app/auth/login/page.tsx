'use client';

import { handleOAuth } from '@/actions/auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
      <CardContent className='flex flex-col items-center justify-center'>
        <div id="g_id_onload"
          data-client_id="176527091847-khbmsfdpph3glccpv6s73sjhuku3rjs2.apps.googleusercontent.com"
          data-context="use"
          data-ux_mode="popup"
          data-login_uri="https://coastlineapp.vercel.app/auth/callback"
          data-close_on_tap_outside="false"
          data-itp_support="true">
        </div>

        <div className="g_id_signin w-full"
          data-type="standard"
          data-shape="pill"
          data-theme="outline"
          data-text="continue_with"
          data-size="large"
          data-logo_alignment="left">
        </div>
      </CardContent>
    </Card>
  );
}