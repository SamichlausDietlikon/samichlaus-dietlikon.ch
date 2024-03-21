import { User } from "@supabase/supabase-js";
import { Tables } from "./database.types";

export type FullUser = Pick<User, "email"> &
  Tables<"users"> & { staff_role: "admin" | "tour_manager" | "staff" | null };
