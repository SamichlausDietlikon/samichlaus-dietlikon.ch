"use client"

import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"

export default function Callback() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    getUserFromSession()
  }, [])

  async function getUserFromSession() {
    const supabase = createClient()
    const { data: {user}, error } = await supabase.auth.refreshSession();

    setUser(user);
  }

  return (
    <p>Welcome to the app {user?.email}</p>
  )
}