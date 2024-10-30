'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Script from 'next/script';

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
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
          data-context="signin"
          data-ux_mode="popup"
          data-login_uri="https://coastlineapp.vercel.app/auth/callback"
          data-itp_support="true"
          data-use_fedcm_for_prompt="true">
        </div>

        <div className="g_id_signin"
          data-type="standard"
          data-shape="rectangular"
          data-theme="outline"
          data-text="signin_with"
          data-size="large"
          data-logo_alignment="left">
        </div>
      </CardContent>
      <Script
        src="https://accounts.google.com/gsi/client"
        async
      />
    </Card>
  );
}