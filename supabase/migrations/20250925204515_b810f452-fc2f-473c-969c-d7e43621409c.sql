-- Create additional missing tables for BFO platform

-- Create prospect_invitations table
CREATE TABLE public.prospect_invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID NOT NULL,
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending',
  invited_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '7 days'),
  activated_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS for prospect_invitations
ALTER TABLE public.prospect_invitations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for prospect_invitations
CREATE POLICY "prospect_invitations_select" 
ON public.prospect_invitations 
FOR SELECT 
USING (is_org_member(org_id));

CREATE POLICY "prospect_invitations_insert" 
ON public.prospect_invitations 
FOR INSERT 
WITH CHECK (is_org_member(org_id));

CREATE POLICY "prospect_invitations_update" 
ON public.prospect_invitations 
FOR UPDATE 
USING (is_org_member(org_id))
WITH CHECK (is_org_member(org_id));

CREATE POLICY "prospect_invitations_delete" 
ON public.prospect_invitations 
FOR DELETE 
USING (is_org_member(org_id));

-- Create meeting_notes table
CREATE TABLE public.meeting_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  meeting_date TIMESTAMP WITH TIME ZONE,
  attendees JSONB DEFAULT '[]',
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for meeting_notes
ALTER TABLE public.meeting_notes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for meeting_notes
CREATE POLICY "meeting_notes_select" 
ON public.meeting_notes 
FOR SELECT 
USING (is_org_member(org_id));

CREATE POLICY "meeting_notes_insert" 
ON public.meeting_notes 
FOR INSERT 
WITH CHECK (is_org_member(org_id));

CREATE POLICY "meeting_notes_update" 
ON public.meeting_notes 
FOR UPDATE 
USING (is_org_member(org_id))
WITH CHECK (is_org_member(org_id));

CREATE POLICY "meeting_notes_delete" 
ON public.meeting_notes 
FOR DELETE 
USING (is_org_member(org_id));

-- Create insurance_submissions table
CREATE TABLE public.insurance_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID NOT NULL,
  risk_hash TEXT NOT NULL,
  intake JSONB NOT NULL DEFAULT '{}',
  status TEXT DEFAULT 'pending',
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for insurance_submissions
ALTER TABLE public.insurance_submissions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for insurance_submissions
CREATE POLICY "insurance_submissions_select" 
ON public.insurance_submissions 
FOR SELECT 
USING (is_org_member(org_id));

CREATE POLICY "insurance_submissions_insert" 
ON public.insurance_submissions 
FOR INSERT 
WITH CHECK (is_org_member(org_id));

CREATE POLICY "insurance_submissions_update" 
ON public.insurance_submissions 
FOR UPDATE 
USING (is_org_member(org_id))
WITH CHECK (is_org_member(org_id));

CREATE POLICY "insurance_submissions_delete" 
ON public.insurance_submissions 
FOR DELETE 
USING (is_org_member(org_id));

-- Create investment_offerings table
CREATE TABLE public.investment_offerings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  firm TEXT,
  minimum_investment TEXT,
  performance TEXT,
  category_id TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for investment_offerings
ALTER TABLE public.investment_offerings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for investment_offerings
CREATE POLICY "investment_offerings_select" 
ON public.investment_offerings 
FOR SELECT 
USING (is_org_member(org_id));

CREATE POLICY "investment_offerings_insert" 
ON public.investment_offerings 
FOR INSERT 
WITH CHECK (is_org_member(org_id));

CREATE POLICY "investment_offerings_update" 
ON public.investment_offerings 
FOR UPDATE 
USING (is_org_member(org_id))
WITH CHECK (is_org_member(org_id));

CREATE POLICY "investment_offerings_delete" 
ON public.investment_offerings 
FOR DELETE 
USING (is_org_member(org_id));

-- Create transaction_classifications table
CREATE TABLE public.transaction_classifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID NOT NULL,
  transaction_id TEXT NOT NULL,
  classification TEXT NOT NULL,
  confidence NUMERIC DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for transaction_classifications
ALTER TABLE public.transaction_classifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for transaction_classifications
CREATE POLICY "transaction_classifications_select" 
ON public.transaction_classifications 
FOR SELECT 
USING (is_org_member(org_id));

CREATE POLICY "transaction_classifications_insert" 
ON public.transaction_classifications 
FOR INSERT 
WITH CHECK (is_org_member(org_id));

CREATE POLICY "transaction_classifications_update" 
ON public.transaction_classifications 
FOR UPDATE 
USING (is_org_member(org_id))
WITH CHECK (is_org_member(org_id));

CREATE POLICY "transaction_classifications_delete" 
ON public.transaction_classifications 
FOR DELETE 
USING (is_org_member(org_id));