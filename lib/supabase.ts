import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

export const supabase = createClient<Database>(process.env.SUPABASE_URL || "http://127.0.0.1:54321", process.env.SUPABASE_ANON_KEY || "")