alter table if exists public.job_applications
  add column if not exists cv_file_name text,
  add column if not exists cv_file_content_type text,
  add column if not exists cover_letter_file_url text,
  add column if not exists cover_letter_file_path text,
  add column if not exists cover_letter_file_name text,
  add column if not exists cover_letter_file_content_type text;
