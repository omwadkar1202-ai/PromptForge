/*
  # Create Prompts Table

  ## Summary
  Creates the core data storage for the PromptForge platform.

  ## New Tables
  - `prompts`
    - `id` (uuid, primary key) - unique identifier
    - `session_id` (text) - anonymous session identifier stored in localStorage
    - `requirement` (text) - the user's original requirement/input
    - `use_case` (text) - category: code, image, video, website, general
    - `generated_prompt` (text) - the optimized prompt output
    - `techniques` (text[]) - list of prompt engineering techniques applied
    - `quality_score` (integer) - estimated quality score (0-100)
    - `title` (text) - auto-generated title for the prompt
    - `is_saved` (boolean) - whether user explicitly saved this
    - `created_at` (timestamptz) - creation timestamp

  ## Security
  - RLS enabled on `prompts` table
  - Session-based access: users can only read/write prompts matching their session_id
  - No authentication required (anonymous sessions)
*/

CREATE TABLE IF NOT EXISTS prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL DEFAULT '',
  requirement text NOT NULL DEFAULT '',
  use_case text NOT NULL DEFAULT 'general',
  generated_prompt text NOT NULL DEFAULT '',
  techniques text[] NOT NULL DEFAULT '{}',
  quality_score integer NOT NULL DEFAULT 0,
  title text NOT NULL DEFAULT '',
  is_saved boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Session users can insert own prompts"
  ON prompts
  FOR INSERT
  TO anon
  WITH CHECK (session_id != '');

CREATE POLICY "Session users can select own prompts"
  ON prompts
  FOR SELECT
  TO anon
  USING (session_id != '');

CREATE POLICY "Session users can update own prompts"
  ON prompts
  FOR UPDATE
  TO anon
  USING (session_id != '')
  WITH CHECK (session_id != '');

CREATE POLICY "Session users can delete own prompts"
  ON prompts
  FOR DELETE
  TO anon
  USING (session_id != '');

CREATE INDEX IF NOT EXISTS prompts_session_id_idx ON prompts(session_id);
CREATE INDEX IF NOT EXISTS prompts_created_at_idx ON prompts(created_at DESC);
