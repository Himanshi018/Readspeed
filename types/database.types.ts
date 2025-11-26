export type test_results = {
  id: string
  user_id: string | null
  wpm: number | null
  accuracy: number | null
  comprehension: number | null
  reading_level: string | null
  percentile: number | null
  test_duration: number | null
  words_read: number | null
  is_premium: boolean | null
  created_at: string
  updated_at: string | null   // <-- yeh line add kar de
}