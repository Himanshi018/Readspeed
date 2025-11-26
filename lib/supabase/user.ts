import { createClient } from '@/utils/supabase/client';

export interface UserProfile {
  id: string;
  updated_at?: string | null;
  username?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  website?: string | null;
  is_premium?: boolean;
  premium_until?: string | null;
  created_at?: string;
  email: string;
}

// ----------------------------------
// GET CURRENT USER
// ----------------------------------
export async function getCurrentUser() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) throw error;
  return data.user;
}

// ----------------------------------
// GET PROFILE
// ----------------------------------
export async function getUserProfile(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data as UserProfile;
}

// ----------------------------------
// SAVE PREMIUM FOREVER
// ----------------------------------
export async function savePremiumStatus() {
  const user = await getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  const supabase = createClient();

  const { data, error } = await supabase
    .from('profiles')
    .update({
      is_premium: true,
      premium_until: null, // lifetime premium
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ----------------------------------
// PROFILE UPDATE (Generic)
// ----------------------------------
export async function updateUserProfile(
  userId: string,
  updates: Record<string, any>
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
