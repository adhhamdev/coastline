'use client';

import type { Database } from '@/lib/database.types';
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createContext, useContext, useEffect, useState } from 'react';

type SupabaseContext = {
  supabase: SupabaseClient<Database>;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createClientComponentClient());

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => { });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <Context.Provider value={{ supabase }}>
      {children}
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider');
  }
  return context;
};