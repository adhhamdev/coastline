import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const error_description = searchParams.get('error_description');
  
  // Handle OAuth errors
  if (error) {
    return NextResponse.redirect(
      `${origin}/auth/login?error=${encodeURIComponent(error_description || 'Authentication failed')}`
    );
  }

  if (code) {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error('Auth callback error:', error);
      return NextResponse.redirect(
        `${origin}/auth/login?error=${encodeURIComponent(error.message)}`
      );
    }
    
    if (data.session) {
      // Store provider tokens if available
      const providerToken = data.session.provider_token;
      const providerRefreshToken = data.session.provider_refresh_token;
      
      if (providerToken) {
        try {
          // Determine the provider based on the session data
          const provider = data.session.provider_token || 'unknown';
          
          // Store provider-specific tokens in user metadata
          await supabase.auth.updateUser({
            data: {
              [`${provider}_provider_token`]: providerToken,
              ...(providerRefreshToken && { 
                [`${provider}_provider_refresh_token`]: providerRefreshToken 
              }),
            },
          });
        } catch (updateError) {
          console.error('Failed to store provider token:', updateError);
          // Continue with the flow even if token storage fails
        }
      }
      
      // Successful authentication
      return NextResponse.redirect(`${origin}/`);
    }
  }

  // Return error if code is missing or authentication failed
  return NextResponse.redirect(
    `${origin}/auth/login?error=${encodeURIComponent('Authentication failed. Please try again.')}`
  );
}
