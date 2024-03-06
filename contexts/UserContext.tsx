"use client"

import { createClient } from '@/lib/supabase/client';
import { ReactNode, createContext, useState } from 'react';

// TODO: Add right user type
export const UserContext = createContext<{loading: boolean; user: any}|null>(null);

export function UserProvider({children}: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState(null)

  const supabase = createClient()
  // Check if session is active

  // If yes, read user data from custom users table

  // Merge data together and return

  return (
    <UserContext.Provider value={{ loading, user }}>
      {children}
    </UserContext.Provider>
  );
}