import { createBrowserClient as createSupabaseBrowserClient } from '@supabase/ssr'
import { Database } from '@/types_db'

type SupabaseClient = ReturnType<typeof createSupabaseBrowserClient<Database>>

export const createBrowserClient = (): SupabaseClient =>
  createSupabaseBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

// For backward compatibility
export const createClient = createBrowserClient
