
export type ProfessionalType = 
  // Creator Economy Financial Advisors
  | "Creator Financial Advisor"
  | "NIL Financial Advisor"
  | "Entertainment Financial Advisor"
  | "Influencer Financial Advisor"
  | "Sports Financial Advisor"
  
  // Creator Economy Legal Specialists
  | "Entertainment Attorney"
  | "NIL Compliance Attorney"
  | "Brand Protection Attorney"
  | "Influencer Contract Attorney"
  | "Intellectual Property Attorney"
  
  // Creator Economy Accountants
  | "Influencer Accountant"
  | "Entertainment Tax Specialist"
  | "Creator Business Accountant"
  | "Multi-State Tax Professional"
  
  // Creator Brand & Business Services
  | "Brand Management Consultant"
  | "Social Media Business Manager"
  | "Creator Business Advisor"
  | "Monetization Strategist"
  | "Partnership & Sponsorship Specialist"
  
  // Creator Insurance & Risk Management
  | "Creator Liability Insurance Specialist"
  | "Entertainment Insurance Broker"
  | "Brand Protection Insurance Agent"
  
  // Creator Support Services
  | "Creator Healthcare Advocate"
  | "Creator Wealth Manager"
  | "Digital Asset Manager"
  | "Creator Estate Planning Specialist"
  | "Creator Philanthropy Advisor"
  
  // Traditional (maintained for existing clients)
  | "Tax Professional / Accountant"
  | "Estate Planning Attorney"
  | "Financial Advisor"
  | "Real Estate Agent / Property Manager"
  | "Insurance / LTC Specialist"
  | "Other";

// Creator Economy Professional Segments
export type ProfessionalSegment = 
  | 'creator_financial_advisory'
  | 'creator_legal_services'
  | 'creator_tax_compliance'
  | 'creator_brand_management'
  | 'creator_business_advisory'
  | 'creator_insurance_risk'
  | 'nil_compliance_advisory'
  | 'entertainment_services'
  | 'influencer_services'
  | 'creator_wealth_management'
  | 'digital_asset_management'
  | 'creator_estate_planning';

export interface Professional {
  id: string;
  name: string;
  type: ProfessionalType;
  segment?: ProfessionalSegment;
  company?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  notes?: string;
  rating?: number;
  specialties?: string[];
  certifications?: string[];
  custom_fields?: Record<string, any>;
  external_verification_id?: string;
  external_review_score?: number;
  featured?: boolean;
  sponsored?: boolean;
  show_email?: boolean;
  show_phone?: boolean;
  scheduling_url?: string;
  // New fields for wealth segment professionals
  min_client_assets?: number;
  typical_engagement_fee?: string;
  aum_minimums?: number;
  license_states?: string[];
  practice_areas?: string[];
  client_capacity?: number;
  accepts_referrals?: boolean;
  referral_fee_structure?: string;
  onboarding_process?: string;
  compliance_status?: 'pending' | 'verified' | 'flagged';
  marketplace_tier?: 'standard' | 'premium' | 'elite';
}

// Professional dashboard configuration
export interface ProfessionalDashboardConfig {
  segment: ProfessionalSegment;
  widgets: string[];
  permissions: string[];
  referral_settings: {
    accepts_inbound: boolean;
    accepts_outbound: boolean;
    fee_structure: string;
  };
  onboarding_steps: string[];
  required_documents: string[];
  compliance_requirements: string[];
}
