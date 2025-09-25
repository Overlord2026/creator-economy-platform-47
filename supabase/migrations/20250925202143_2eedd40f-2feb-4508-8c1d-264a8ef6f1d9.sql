-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  first_name TEXT,
  last_name TEXT,
  middle_name TEXT,
  title TEXT,
  suffix TEXT,
  email TEXT,
  phone TEXT,
  gender TEXT,
  marital_status TEXT,
  date_of_birth DATE,
  date_of_birth_date DATE,
  investor_type TEXT,
  role TEXT DEFAULT 'user',
  permissions JSONB DEFAULT '[]'::jsonb,
  two_factor_enabled BOOLEAN DEFAULT false,
  tenant_id UUID,
  client_segment TEXT,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_profiles_updated_at();

-- Create dd_packages table
CREATE TABLE public.dd_packages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  package_data JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security for dd_packages
ALTER TABLE public.dd_packages ENABLE ROW LEVEL SECURITY;

-- Create policies for dd_packages
CREATE POLICY "dd_packages_select" 
ON public.dd_packages 
FOR SELECT 
USING (is_org_member(org_id));

CREATE POLICY "dd_packages_insert" 
ON public.dd_packages 
FOR INSERT 
WITH CHECK (is_org_member(org_id));

CREATE POLICY "dd_packages_update" 
ON public.dd_packages 
FOR UPDATE 
USING (is_org_member(org_id));

CREATE POLICY "dd_packages_delete" 
ON public.dd_packages 
FOR DELETE 
USING (is_org_member(org_id));

-- Create trigger for dd_packages timestamp updates
CREATE TRIGGER update_dd_packages_updated_at
BEFORE UPDATE ON public.dd_packages
FOR EACH ROW
EXECUTE FUNCTION public.update_profiles_updated_at();