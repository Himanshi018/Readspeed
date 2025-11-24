import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export const createClient = (request: NextRequest) => {
  // Create a response that will be used to set cookies
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // Clone the request headers
          const newHeaders = new Headers(request.headers);
          
          // Create a new response with the updated cookies
          response = NextResponse.next({
            request: {
              headers: newHeaders,
            },
          });
          
          // Set the cookie on the response
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          // Clone the request headers
          const newHeaders = new Headers(request.headers);
          
          // Create a new response with the updated cookies
          response = NextResponse.next({
            request: {
              headers: newHeaders,
            },
          });
          
          // Delete the cookie by setting it with an expired date
          response.cookies.set({
            name,
            value: '',
            ...options,
            maxAge: 0,
            expires: new Date(0),
          });
        },
      },
    }
  );

  return { supabase, response };
};

export const updateSession = async (request: NextRequest) => {
  try {
    const { supabase, response } = createClient(request);
    
    // Refresh session if expired
    await supabase.auth.getUser();
    
    return response;
  } catch (e) {
    console.error('Error in updateSession:', e);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};