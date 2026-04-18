import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Clip {
  id: string;
  title: string;
  hook: string;
  startTime: number;
  endTime: number;
  engagementScore: number;
  emotion: string;
  caption: string;
}

export interface VideoJob {
  id: string;
  title: string;
  video_url: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  clips_count: number;
  duration_seconds: number;
  clips: Clip[];
  created_at: string;
  updated_at: string;
}
