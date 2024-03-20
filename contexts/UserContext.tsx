"use client"

import { createClient } from '@/lib/supabase/client';
import { FullUser } from '@/types/common.types';
import { User } from '@supabase/supabase-js';
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';

export const UserContext = createContext<{loading: boolean; user: FullUser | User | null; refetch: boolean, setRefetch: Dispatch<SetStateAction<boolean>>}>({loading: true, user: null, refetch: false, setRefetch: () => {}});

export function UserProvider({children, params}: { children: ReactNode, params?: { seasonId: string }}) {
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<FullUser | User | null>(null)
  const [refetch, setRefetch] = useState(false)

  const supabase = createClient()

  async function getUser() {
    const { data, error } = await supabase.auth.getUser()

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
    // const { data: userAdmin} = await supabase.from("user_admins").select("is_admin").eq("id", user.id).limit(1).maybeSingle();
    
    if (!data) {
      setLoading(false)
      return
    }

    // TODO: Check if user is tour manager in current season and then set staff_role accordingly

    // Merge all user data together
    setUser({ "email": user?.email, ...data, staff_role: "admin"})
    
    setLoading(false)
  }

  useEffect(() => {
    getUser()
  }, [refetch])

  return (
    <UserContext.Provider value={{ loading, user, refetch, setRefetch }}>
      {children}
    </UserContext.Provider>
  );
}