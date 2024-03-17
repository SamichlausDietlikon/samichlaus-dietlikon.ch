import { User } from "@supabase/supabase-js";
import { Tables } from "./database.types";

export type FullUser = Pick<User,"email"> & Tables<"users"> & Tables<"user_staff_roles">