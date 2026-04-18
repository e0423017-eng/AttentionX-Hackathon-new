/*
  # Create video_jobs table for AttentionX

  1. New Tables
    - `video_jobs`
      - `id` (uuid, primary key)
      - `title` (text) - video title or file name
      - `video_url` (text) - URL or path to the video
      - `status` (text) - pending, processing, completed, failed
      - `clips_count` (integer) - number of clips generated
      - `duration_seconds` (integer) - original video duration
      - `clips` (jsonb) - array of generated clip metadata
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `video_jobs` table
    - Add policy for public read/insert (demo app - no auth required)
*/

CREATE TABLE IF NOT EXISTS video_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  video_url text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending',
  clips_count integer DEFAULT 0,
  duration_seconds integer DEFAULT 0,
  clips jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE video_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read video jobs"
  ON video_jobs FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can insert video jobs"
  ON video_jobs FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can update video jobs"
  ON video_jobs FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);
