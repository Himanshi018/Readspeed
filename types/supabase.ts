import { Database } from '@/types_db';

type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

declare global {
  namespace Supabase {
    type Profile = Tables<'profiles'>;
    type TestResult = Tables<'test_results'>;
    
    interface Database {
      public: {
        Tables: {
          profiles: {
            Row: {
              id: string;
              email: string;
              full_name: string | null;
              is_premium: boolean;
              premium_until: string | null;
              created_at: string;
              updated_at: string;
            };
            Insert: {
              id: string;
              email: string;
              full_name?: string | null;
              is_premium?: boolean;
              premium_until?: string | null;
              created_at?: string;
              updated_at?: string;
            };
            Update: {
              id?: string;
              email?: string;
              full_name?: string | null;
              is_premium?: boolean;
              premium_until?: string | null;
              updated_at?: string;
            };
          };
          test_results: {
            Row: {
              id: string;
              user_id: string;
              wpm: number;
              accuracy: number;
              comprehension: number;
              reading_level: string;
              percentile: number;
              test_duration: number;
              words_read: number;
              is_premium: boolean;
              created_at: string;
            };
            Insert: {
              id?: string;
              user_id: string;
              wpm: number;
              accuracy: number;
              comprehension: number;
              reading_level: string;
              percentile: number;
              test_duration: number;
              words_read: number;
              is_premium?: boolean;
              created_at?: string;
            };
            Update: {
              id?: string;
              user_id?: string;
              wpm?: number;
              accuracy?: number;
              comprehension?: number;
              reading_level?: string;
              percentile?: number;
              test_duration?: number;
              words_read?: number;
              is_premium?: boolean;
              created_at?: string;
            };
          };
        };
      };
    }
  }
}
