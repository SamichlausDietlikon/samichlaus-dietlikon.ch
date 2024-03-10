"use client"

import { createClient } from '@/lib/supabase/client';
import { Tables } from '@/types/database.types';
import { User } from '@supabase/supabase-js';
import { ReactNode, createContext, useEffect, useState } from 'react';

// TODO: Add right user type
export const UserContext = createContext<{loading: boolean; user: any}>({loading: true, user: null});

export function UserProvider({children}: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User & Tables<"users"> & Tables<"user_staff_roles"> | User | null>(null)

  const supabase = createClient()

  async function getUser() {
    const { data, error } = await supabase.auth.getUser()

    console.log(data.user, !data.user);
    

    if (!data.user) {
      setLoading(false)
      return
    }

    setUser(data.user)

    // Go get custom user fields & then merge together
    // User as a parameter explicitly needed because state is not updated yet
    await getCustomUser(data.user)
  }

  async function getCustomUser(user: User) {
    const { data } = await supabase.from("users").select().eq("id", user!.id).limit(1).maybeSingle()
    const { data: role } = await supabase.from("user_staff_roles").select().eq("user_id", user!.id).limit(1).maybeSingle()

    if (!data || !role) {
      setLoading(false)
      return
    }

    // Merge all user data together
    setUser({...user as User, ...role, ...data})
    
    setLoading(false)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <UserContext.Provider value={{ loading, user }}>
      {children}
    </UserContext.Provider>
  );
}