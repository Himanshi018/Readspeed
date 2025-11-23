/**
 * @deprecated Use the new client from `@/lib/supabase/client` instead.
 * This file will be removed in a future update.
 */
import { createClient as createBrowserClient } from '@supabase/supabase-js'

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export { createClient } from '@/lib/supabase/client'
