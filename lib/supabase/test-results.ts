import { createClient } from './client';

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
  created_at: string;
  is_premium: boolean;
}

export async function saveTestResult(testResultId: string): Promise<{ data: TestResult | null; error: Error | null }> {
  try {
    const supabase = createClient();
    
    // First, get the test result from the test_results table
    const { data: testResult, error: fetchError } = await supabase
      .from('test_results')
      .select('*')
      .eq('id', testResultId)
      .single();

    if (fetchError) throw fetchError;
    if (!testResult) throw new Error('Test result not found');

    // Update the test result to mark it as premium
    const { data: updatedResult, error: updateError } = await supabase
      .from('test_results')
      .update({ is_premium: true })
      .eq('id', testResultId)
      .select()
      .single();

    if (updateError) throw updateError;

    return { data: updatedResult, error: null };
  } catch (error) {
    console.error('Error saving test result:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error : new Error('Failed to save test result') 
    };
  }
}

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

export async function createTestResult(testData: Omit<TestResult, 'id' | 'created_at' | 'is_premium'>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('test_results')
    .insert([{
      ...testData,
      is_premium: false,
      created_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) throw error;
  return data as TestResult;
}
