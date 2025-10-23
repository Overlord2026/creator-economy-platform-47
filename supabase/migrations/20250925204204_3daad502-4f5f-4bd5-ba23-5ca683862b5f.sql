-- Create missing tables for liquidity engines

-- Create liquidity_events table
CREATE TABLE public.liquidity_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID NOT NULL,
  fund_id UUID,
  event_type TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  amount NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for liquidity_events
ALTER TABLE public.liquidity_events ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for liquidity_events
CREATE POLICY "liquidity_events_select" 
ON public.liquidity_events 
FOR SELECT 
USING (is_org_member(org_id));

CREATE POLICY "liquidity_events_insert" 
ON public.liquidity_events 
FOR INSERT 
WITH CHECK (is_org_member(org_id));

CREATE POLICY "liquidity_events_update" 
ON public.liquidity_events 
FOR UPDATE 
USING (is_org_member(org_id))
WITH CHECK (is_org_member(org_id));

CREATE POLICY "liquidity_events_delete" 
ON public.liquidity_events 
FOR DELETE 
USING (is_org_member(org_id));

-- Create liquidity_scores table
CREATE TABLE public.liquidity_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID NOT NULL,
  fund_id UUID,
  score NUMERIC DEFAULT 0,
  score_type TEXT DEFAULT 'composite',
  calculated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for liquidity_scores
ALTER TABLE public.liquidity_scores ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for liquidity_scores
CREATE POLICY "liquidity_scores_select" 
ON public.liquidity_scores 
FOR SELECT 
USING (is_org_member(org_id));

CREATE POLICY "liquidity_scores_insert" 
ON public.liquidity_scores 
FOR INSERT 
WITH CHECK (is_org_member(org_id));

CREATE POLICY "liquidity_scores_update" 
ON public.liquidity_scores 
FOR UPDATE 
USING (is_org_member(org_id))
WITH CHECK (is_org_member(org_id));

CREATE POLICY "liquidity_scores_delete" 
ON public.liquidity_scores 
FOR DELETE 
USING (is_org_member(org_id));

-- Create fund_holdings_lookup table
CREATE TABLE public.fund_holdings_lookup (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID NOT NULL,
  fund_id UUID NOT NULL,
  holding_id UUID NOT NULL,
  as_of_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  weight NUMERIC DEFAULT 0,
  value NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for fund_holdings_lookup
ALTER TABLE public.fund_holdings_lookup ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for fund_holdings_lookup
CREATE POLICY "fund_holdings_lookup_select" 
ON public.fund_holdings_lookup 
FOR SELECT 
USING (is_org_member(org_id));

CREATE POLICY "fund_holdings_lookup_insert" 
ON public.fund_holdings_lookup 
FOR INSERT 
WITH CHECK (is_org_member(org_id));

CREATE POLICY "fund_holdings_lookup_update" 
ON public.fund_holdings_lookup 
FOR UPDATE 
USING (is_org_member(org_id))
WITH CHECK (is_org_member(org_id));

CREATE POLICY "fund_holdings_lookup_delete" 
ON public.fund_holdings_lookup 
FOR DELETE 
USING (is_org_member(org_id));

-- Create triggers for updated_at
CREATE TRIGGER update_liquidity_events_updated_at
BEFORE UPDATE ON public.liquidity_events
FOR EACH ROW
EXECUTE FUNCTION public.update_profiles_updated_at();