import { SupabaseClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';

export const getUser = unstable_cache(async (supabase: SupabaseClient<any>) => {
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return user;
});

export const getSubscription = unstable_cache(async (supabase: SupabaseClient<any>) => {
  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .maybeSingle();

  // agar error aaye aur row nahi mila toh null return kar dena (normal hai)
  if (error && error.code !== 'PGRST116') {
    console.error('Subscription fetch error:', error);
  }
  return subscription ?? null;
});

export const getUserDetails = unstable_cache(async (supabase: SupabaseClient<any>) => {
  const { data: userDetails, error } = await supabase
    .from('users')
    .select('*')
    .single();

  if (error) {
    console.error('User details fetch error:', error);
    return null;
  }
  return userDetails;
});

export const getProducts = unstable_cache(async (supabase: SupabaseClient<any>) => {
  const { data: products, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { referencedTable: 'prices' });

  if (error) {
    console.error('Products fetch error:', error);
    return [];
  }
  return products ?? [];
});