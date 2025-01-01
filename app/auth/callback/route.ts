import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const userAgent = request.headers.get('user-agent') || '';
  
  // Check if the request is from a mobile app
  const isMobileApp = userAgent.toLowerCase().includes('coastlineapp');
  console.log(userAgent, isMobileApp);
  
  if (code) {
    const supabase = createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      await supabase.auth.updateUser({
        data: { google_provider_token: data.session.provider_token },
      });

      // If it's a mobile app request, redirect to the app's URL scheme
      if (isMobileApp) {
        return NextResponse.redirect(`coastlineapp.https://coastlineapp.vercel.app`);
      }

      return NextResponse.redirect(`${origin}/feed`);
    }
  }

  // Return error if code is missing or authentication failed
  return NextResponse.redirect(
    `${origin}/auth/login?error=Failed to sign in with Google. Please try again.`
  );
}
