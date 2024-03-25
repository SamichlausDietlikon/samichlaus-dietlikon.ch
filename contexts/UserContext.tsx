"use client";

import { createClient } from "@/lib/supabase/client";
import { FullUser } from "@/types/common.types";
import { Enums } from "@/types/database.types";
import { User } from "@supabase/supabase-js";
import { useParams } from "next/navigation";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

export const UserContext = createContext<{
  loading: boolean;
  user: FullUser | User | null;
  refetch: boolean;
  setRefetch: Dispatch<SetStateAction<boolean>>;
}>({ loading: true, user: null, refetch: false, setRefetch: () => {} });

export function UserProvider({
  children,
  params,
}: {
  children: ReactNode;
  params?: { seasonId: string };
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FullUser | User | null>(null);
  const [refetch, setRefetch] = useState(false);

  const supabase = createClient();
  const {seasonId}: {seasonId: string} = useParams()

  async function getUser() {
    const { data, error } = await supabase.auth.getUser();

    if (!data.user) {
      setLoading(false);
      return;
    }

    setUser(data.user);

    // Go get custom user fields & then merge together
    // User as a parameter explicitly needed because state is not updated yet
    await getCustomUser(data.user);
  }

  async function getCustomUser(user: User) {
    const { data } = await supabase
      .from("users")
      .select()
      .eq("id", user.id)
      .limit(1)
      .maybeSingle();
    // const { data: userAdmin} = await supabase.from("user_admins").select("is_admin").eq("id", user.id).limit(1).maybeSingle();

    if (!data) {
      setLoading(false);
      return;
    }

    let staff_role: "admin"|Enums<"staff_roles">|null = null;
    let staff = false;

    const {data: userIsAdmin} = await supabase.from("user_admins").select().eq("id", user.id).maybeSingle()

    if(userIsAdmin) {
      staff_role = "admin"
      staff = true
    } 

    if(seasonId) {
      const {data: seasonMember} = await supabase.from("season_members").select().eq("user_id", user.id).eq("season_id", seasonId).maybeSingle()
      
      if(seasonMember) {
        staff_role = seasonMember.staff_role
        staff = true
      }
    }
    
    const {data: staffMember} = await supabase.from("season_members").select().eq("user_id", user.id).maybeSingle()
    
    if(staffMember) {
      staff = true
    }

    setUser({ email: user?.email, ...data, staff_role, staff});          
    setLoading(false);
    return
  }

  useEffect(() => {
    getUser();
  }, [refetch, supabase]);

  return (
    <UserContext.Provider value={{ loading, user, refetch, setRefetch }}>
      {children}
    </UserContext.Provider>
  );
}
