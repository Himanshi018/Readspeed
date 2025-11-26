// types_db.ts
export type Database = {
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
          id?: string;
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
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          price_id: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          price_id: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          price_id?: string;
          status?: string;
          created_at?: string;
        };
      };
      prices: {
        Row: {
          id: string;
          amount: number;
          currency: string;
          interval: string;
          trial_period_days: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          amount: number;
          currency: string;
          interval: string;
          trial_period_days?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          amount?: number;
          currency?: string;
          interval?: string;
          trial_period_days?: number | null;
          created_at?: string;
        };
      };
    };
    Enums: Record<string, never>;
  };
};

// Generic helpers
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];

// Example exports
export type TestResult = Tables<'test_results'>;
export type Profile = Tables<'profiles'>;
export type Subscription = Tables<'subscriptions'>;
export type Price = Tables<'prices'>;
