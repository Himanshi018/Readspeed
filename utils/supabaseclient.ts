// supabase.client.ts  (poora file yeh se replace kar de)

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Yeh client server components ke liye hai (account/page.tsx jo use kar raha hai)
export const createClient = () => {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // ignore
          }
        },
      },
    }
  )
}

// Optional: agar koi aur file mein purana browser client chahiye
// import { createBrowserClient } from '@supabase/supabase-js'
// export const supabaseBrowser = createBrowserClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// )