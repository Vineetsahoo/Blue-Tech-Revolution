import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';
import { env } from '../config/env';

export const supabase = createClient<Database>(
  env.supabase.url,
  env.supabase.anonKey
);