import { OAuth2Client } from 'google-auth-library';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const credential = searchParams.get('credential');

  const next = searchParams.get('next') ?? '/';

  // if (credential) {
  //   const supabase = createClient();
  //   const { error, data } = await supabase.auth.exchangeCodeForSession(credential);
  //   if (!error) {
  //     await supabase.auth.updateUser({
  //       data: { google_provider_token: data.session.provider_token },
  //     });
  //     const forwardedHost = request.headers.get('x-forwarded-host'); // original origin before load balancer
  //     const isLocalEnv = process.env.NODE_ENV === 'development';
  //     if (isLocalEnv) {
  //       // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
  //       return NextResponse.redirect(`${origin}${next}`);
  //     } else if (forwardedHost) {
  //       return NextResponse.redirect(`https://${forwardedHost}${next}`);
  //     } else {
  //       return NextResponse.redirect(`${origin}${next}`);
  //     }
  //   }
  // }

  const client = new OAuth2Client();
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: credential ?? '',
      audience:
        '176527091847-khbmsfdpph3glccpv6s73sjhuku3rjs2.apps.googleusercontent.com', // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    const userid = payload?.sub;
    // If the request specified a Google Workspace domain:
    // const domain = payload['hd'];
  }
  verify().catch((error) => {
    return NextResponse.redirect(
      `${origin}/auth/login?error=Failed to sign in with Google. Please try again.`
    );
  });

  // Return error if code is missing or authentication failed
}
