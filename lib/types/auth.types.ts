export interface AuthUser {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: {
    avatar_url: string;
    email: string;
    email_verified: boolean;
    full_name: string;
    google_provider_token: string;
    iss: string;
    name: string;
    phone_verified: boolean;
    picture: string;
    provider_id: string;
    sub: string;
    website: string;
  };
  identities: {
    identity_id: string;
    id: string;
    user_id: string;
    identity_data: any[];
    provider: string;
    last_sign_in_at: string;
    created_at: string;
    updated_at: string;
    email: string;
  }[];
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
}
