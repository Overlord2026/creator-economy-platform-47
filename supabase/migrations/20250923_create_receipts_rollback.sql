-- Rollback for migration 20250923_create_receipts.sql
BEGIN;
DROP TRIGGER IF EXISTS receipts_updated_at ON public.receipts;
DROP FUNCTION IF EXISTS public.update_receipts_updated_at();
DROP TABLE IF EXISTS public.receipts CASCADE;
COMMIT;
