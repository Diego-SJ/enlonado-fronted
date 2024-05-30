import { SUPABASE_PROJECT_URL, SUPABASE_API_KEY } from '@/constants/credentials'
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_API_KEY)
