import { createClient as createClientComponent } from './supabase/client';
import { createClient as createServerClient } from './supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';

// This is the main client that will be used throughout the app
export const supabase = {
  // Client-side client (for browser)
  client: createClientComponent(),
  // Server-side client (for server components, API routes, etc.)
  server: createServerClient(),
};

// Type for the Supabase client that works with our queries
export type TypedSupabaseClient = SupabaseClient;

// Re-export the client types for convenience
export * from '@supabase/supabase-js';

// Helper functions that use the untyped client
export const getUser = async (supabase: TypedSupabaseClient) => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const getSubscription = async (supabase: TypedSupabaseClient) => {
  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .maybeSingle();

  if (error && error.code !== 'PGRST116') {
    console.error('Subscription fetch error:', error);
  }
  return subscription ?? null;
};

export const getUserDetails = async (supabase: TypedSupabaseClient) => {
  const { data: userDetails, error } = await supabase
    .from('users')
    .select('*')
    .single();

  if (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
  return userDetails;
};
