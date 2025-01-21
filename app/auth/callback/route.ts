import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    console.log(error, data);
    if (!error) {
      await supabase.auth.updateUser({
        data: { google_provider_token: data.session.provider_token },
      });
      return NextResponse.redirect(`${origin}/feed`);
    }
  }

  // Return error if code is missing or authentication failed
  return NextResponse.redirect(
    `${origin}/auth/login?error=Failed to sign in with Google. Please try again.`
  );
}
