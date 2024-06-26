import { createClient } from '@supabase/supabase-js';

import { Database } from '../../utils/types/supabase';

export const supabase = createClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
