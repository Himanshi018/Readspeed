import { createClient } from './client';
import { Database } from '@/types_db';

type Tables = Database['public']['Tables'] & { test_results: any };
type TestResultsInsert = Tables['test_results']['Insert'] | any;
type TestResultsUpdate = Tables['test_results']['Update'] | any;

export interface TestResult {
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
}

// CREATE
export async function createTestResult(
  testData: Omit<TestResult, 'id' | 'created_at' | 'is_premium'> & { is_premium?: boolean }
) {
  const supabase = createClient();
  const insertPayload: TestResultsInsert = {
    ...testData,
    is_premium: testData.is_premium ?? false,
    created_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('test_results')
    .insert(insertPayload)
    .select()
    .single();

  if (error) throw error;
  return data as TestResult;
}

// UPDATE
export async function saveTestResult(
  testResultId: string,
  updates: Partial<Omit<TestResult, 'id' | 'created_at'>>
) {
  try {
    const supabase = createClient();

   const updatePayload: any = {
  ...updates,
  updated_at: new Date().toISOString(),
};


    const { data, error } = await supabase
      .from('test_results')
      .update(updatePayload)
      .eq('id', testResultId)
      .select()
      .single();

    if (error) throw error;
    return { data: data as TestResult, error: null };
  } catch (error) {
    console.error('Error saving test result:', error);
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Failed to save test result'),
    };
  }
}

// GET
export async function getUserTestResults(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('test_results')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as TestResult[];
}
