-- Add missing name column to bank_accounts table
ALTER TABLE public.bank_accounts 
ADD COLUMN IF NOT EXISTS name TEXT;

-- Update existing records to use account_name as name
UPDATE public.bank_accounts 
SET name = account_name 
WHERE name IS NULL;

-- Add missing fields to bills table for better type safety
ALTER TABLE public.bills 
ADD COLUMN IF NOT EXISTS frequency TEXT DEFAULT 'monthly'::text,
ADD COLUMN IF NOT EXISTS is_auto_pay BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS reminder_days INTEGER DEFAULT 3;