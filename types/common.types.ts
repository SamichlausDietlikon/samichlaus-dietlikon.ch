import { User } from "@supabase/supabase-js";
import { Tables } from "./database.types";

export type FullUser = User & Tables<"users"> & Tables<"user_staff_roles">