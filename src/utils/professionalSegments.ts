import { ProfessionalDashboardConfig, ProfessionalSegment } from '@/types/professional';

// Professional segment configurations with dashboard layouts, permissions, and onboarding flows
export const PROFESSIONAL_SEGMENT_CONFIGS: Record<ProfessionalSegment, ProfessionalDashboardConfig> = {
  creator_financial_advisory: {
    segment: 'creator_financial_advisory',
    widgets: [
      'creator_client_overview',
      'creator_revenue_tracking',
      'nil_compliance_dashboard',
      'brand_monetization_metrics',
      'multi_state_tax_planning',
      'creator_referral_pipeline',
      'creator_meeting_scheduler'
    ],
    permissions: [
      'view_creator_data',
      'manage_creator_portfolios',
      'access_nil_tools',
      'multi_state_compliance',
      'creator_tax_planning',
      'send_secure_messages',
      'schedule_consultations'
    ],
    referral_settings: {
      accepts_inbound: true,
      accepts_outbound: true,
      fee_structure: 'percentage_based'
    },
    onboarding_steps: [
      'verify_credentials',
      'complete_creator_training',
      'setup_nil_compliance',
      'configure_multi_state_tracking',
      'creator_specialization_selection'
    ],
    required_documents: [
      'financial_advisor_license',
      'nil_compliance_certification',
      'multi_state_registrations',
      'creator_economy_training_cert'
    ],
    compliance_requirements: [
      'creator_privacy_protection',
      'nil_state_compliance',
      'brand_monetization_ethics',
      'multi_platform_disclosure'
    ]
  },

  creator_legal_services: {
    segment: 'creator_legal_services',
    widgets: [
      'creator_contract_dashboard',
      'ip_protection_tracking',
      'compliance_monitoring',
      'brand_protection_alerts',
      'creator_case_management',
      'legal_document_vault',
      'consultation_scheduler'
    ],
    permissions: [
      'draft_creator_contracts',
      'manage_ip_portfolios',
      'multi_state_legal_research',
      'brand_protection_enforcement',
      'nil_compliance_review',
      'entertainment_law_practice'
    ],
    referral_settings: {
      accepts_inbound: true,
      accepts_outbound: true,
      fee_structure: 'hourly_plus_success'
    },
    onboarding_steps: [
      'verify_bar_admission',
      'entertainment_law_training',
      'nil_compliance_certification',
      'ip_protection_specialization',
      'creator_industry_orientation'
    ],
    required_documents: [
      'bar_admission_certificate',
      'entertainment_law_certification',
      'ip_law_credentials',
      'nil_compliance_training'
    ],
    compliance_requirements: [
      'attorney_client_privilege',
      'creator_confidentiality',
      'multi_state_legal_compliance',
      'entertainment_industry_ethics'
    ]
  },

  creator_tax_compliance: {
    segment: 'creator_tax_compliance',
    widgets: [
      'multi_platform_income_tracking',
      'multi_state_tax_dashboard',
      'creator_expense_optimization',
      'quarterly_planning_tools',
      'brand_depreciation_tracker',
      'creator_audit_protection',
      'tax_consultation_calendar'
    ],
    permissions: [
      'multi_state_tax_filing',
      'creator_income_analysis',
      'brand_asset_valuation',
      'quarterly_tax_planning',
      'audit_defense_services',
      'expense_optimization_tools'
    ],
    referral_settings: {
      accepts_inbound: true,
      accepts_outbound: true,
      fee_structure: 'project_based'
    },
    onboarding_steps: [
      'verify_cpa_license',
      'creator_tax_specialization',
      'multi_state_registration',
      'brand_valuation_training',
      'creator_industry_bootcamp'
    ],
    required_documents: [
      'cpa_license',
      'creator_tax_certification',
      'multi_state_registrations',
      'brand_valuation_credentials'
    ],
    compliance_requirements: [
      'creator_confidentiality',
      'multi_state_tax_compliance',
      'brand_asset_ethics',
      'creator_income_reporting'
    ]
  },

  creator_brand_management: {
    segment: 'creator_brand_management',
    widgets: [
      'brand_portfolio_dashboard',
      'monetization_opportunities',
      'partnership_pipeline',
      'brand_protection_monitor',
      'creator_analytics_hub',
      'sponsorship_tracker',
      'brand_consultation_scheduler'
    ],
    permissions: [
      'brand_strategy_development',
      'partnership_negotiation',
      'monetization_optimization',
      'brand_protection_services',
      'creator_analytics_access',
      'sponsorship_management'
    ],
    referral_settings: {
      accepts_inbound: true,
      accepts_outbound: true,
      fee_structure: 'percentage_plus_retainer'
    },
    onboarding_steps: [
      'brand_management_certification',
      'creator_economy_training',
      'partnership_negotiation_skills',
      'brand_protection_protocols',
      'monetization_strategy_mastery'
    ],
    required_documents: [
      'brand_management_certification',
      'creator_industry_credentials',
      'partnership_portfolio',
      'brand_protection_training'
    ],
    compliance_requirements: [
      'brand_confidentiality',
      'partnership_ethics',
      'creator_representation_standards',
      'monetization_transparency'
    ]
  },

  creator_business_advisory: {
    segment: 'creator_business_advisory',
    widgets: [
      'creator_business_dashboard',
      'growth_strategy_tools',
      'business_formation_tracker',
      'creator_team_management',
      'business_analytics_hub',
      'strategic_planning_calendar',
      'advisory_consultation_portal'
    ],
    permissions: [
      'business_strategy_development',
      'creator_team_advisory',
      'business_formation_services',
      'growth_planning_tools',
      'strategic_partnership_advisory',
      'business_analytics_access'
    ],
    referral_settings: {
      accepts_inbound: true,
      accepts_outbound: true,
      fee_structure: 'retainer_plus_equity'
    },
    onboarding_steps: [
      'business_advisory_certification',
      'creator_business_training',
      'strategic_planning_mastery',
      'team_management_skills',
      'creator_industry_expertise'
    ],
    required_documents: [
      'business_advisory_credentials',
      'creator_business_certification',
      'strategic_planning_portfolio',
      'team_management_training'
    ],
    compliance_requirements: [
      'business_confidentiality',
      'strategic_advisory_ethics',
      'creator_business_standards',
      'growth_planning_transparency'
    ]
  },

  creator_insurance_risk: {
    segment: 'creator_insurance_risk',
    widgets: [
      'creator_risk_assessment',
      'liability_coverage_tracker',
      'brand_protection_insurance',
      'creator_claims_management',
      'risk_mitigation_dashboard',
      'insurance_consultation_portal',
      'coverage_optimization_tools'
    ],
    permissions: [
      'creator_risk_analysis',
      'liability_insurance_management',
      'brand_protection_coverage',
      'claims_processing_services',
      'risk_mitigation_planning',
      'insurance_portfolio_management'
    ],
    referral_settings: {
      accepts_inbound: true,
      accepts_outbound: true,
      fee_structure: 'commission_based'
    },
    onboarding_steps: [
      'insurance_license_verification',
      'creator_risk_specialization',
      'liability_coverage_training',
      'brand_protection_certification',
      'creator_industry_risk_assessment'
    ],
    required_documents: [
      'insurance_license',
      'creator_risk_certification',
      'liability_coverage_credentials',
      'brand_protection_training'
    ],
    compliance_requirements: [
      'insurance_ethics',
      'creator_coverage_standards',
      'risk_assessment_accuracy',
      'claims_processing_integrity'
    ]
  },

  nil_compliance_advisory: {
    segment: 'nil_compliance_advisory',
    widgets: [
      'nil_compliance_dashboard',
      'multi_state_tracker',
      'athlete_eligibility_monitor',
      'nil_deal_pipeline',
      'compliance_audit_tools',
      'nil_consultation_scheduler',
      'regulatory_update_center'
    ],
    permissions: [
      'nil_compliance_monitoring',
      'multi_state_regulatory_tracking',
      'athlete_eligibility_verification',
      'nil_deal_structuring',
      'compliance_audit_services',
      'regulatory_advisory_services'
    ],
    referral_settings: {
      accepts_inbound: true,
      accepts_outbound: true,
      fee_structure: 'compliance_fee_plus_success'
    },
    onboarding_steps: [
      'nil_compliance_certification',
      'multi_state_regulatory_training',
      'athlete_eligibility_mastery',
      'nil_deal_structuring_skills',
      'regulatory_update_protocols'
    ],
    required_documents: [
      'nil_compliance_certification',
      'multi_state_regulatory_credentials',
      'athlete_eligibility_training',
      'nil_deal_portfolio'
    ],
    compliance_requirements: [
      'nil_regulatory_compliance',
      'athlete_confidentiality',
      'multi_state_legal_adherence',
      'nil_deal_transparency'
    ]
  },

  entertainment_services: {
    segment: 'entertainment_services',
    widgets: [
      'entertainment_project_dashboard',
      'talent_management_tools',
      'entertainment_contract_tracker',
      'royalty_management_system',
      'entertainment_analytics_hub',
      'talent_consultation_portal',
      'industry_relationship_manager'
    ],
    permissions: [
      'entertainment_project_management',
      'talent_representation_services',
      'contract_negotiation_tools',
      'royalty_tracking_services',
      'entertainment_industry_analytics',
      'talent_advisory_services'
    ],
    referral_settings: {
      accepts_inbound: true,
      accepts_outbound: true,
      fee_structure: 'percentage_plus_retainer'
    },
    onboarding_steps: [
      'entertainment_industry_certification',
      'talent_management_training',
      'contract_negotiation_mastery',
      'royalty_management_skills',
      'industry_relationship_building'
    ],
    required_documents: [
      'entertainment_industry_credentials',
      'talent_management_certification',
      'contract_negotiation_portfolio',
      'royalty_management_training'
    ],
    compliance_requirements: [
      'entertainment_industry_ethics',
      'talent_confidentiality',
      'contract_transparency',
      'royalty_accuracy'
    ]
  },

  influencer_services: {
    segment: 'influencer_services',
    widgets: [
      'influencer_campaign_dashboard',
      'brand_partnership_tracker',
      'content_monetization_tools',
      'influencer_analytics_hub',
      'campaign_performance_monitor',
      'influencer_consultation_portal',
      'brand_relationship_manager'
    ],
    permissions: [
      'influencer_campaign_management',
      'brand_partnership_services',
      'content_monetization_optimization',
      'influencer_analytics_access',
      'campaign_performance_tracking',
      'brand_relationship_advisory'
    ],
    referral_settings: {
      accepts_inbound: true,
      accepts_outbound: true,
      fee_structure: 'commission_plus_retainer'
    },
    onboarding_steps: [
      'influencer_industry_certification',
      'brand_partnership_training',
      'content_monetization_mastery',
      'analytics_interpretation_skills',
      'brand_relationship_protocols'
    ],
    required_documents: [
      'influencer_industry_credentials',
      'brand_partnership_certification',
      'content_monetization_portfolio',
      'analytics_training_certificate'
    ],
    compliance_requirements: [
      'influencer_ethics',
      'brand_partnership_transparency',
      'content_monetization_standards',
      'ftc_compliance_adherence'
    ]
  },

  creator_wealth_management: {
    segment: 'creator_wealth_management',
    widgets: [
      'creator_wealth_dashboard',
      'income_diversification_tracker',
      'creator_investment_portfolio',
      'wealth_preservation_tools',
      'creator_tax_optimization',
      'wealth_consultation_scheduler',
      'financial_goal_tracker'
    ],
    permissions: [
      'creator_wealth_planning',
      'income_diversification_advisory',
      'investment_portfolio_management',
      'wealth_preservation_strategies',
      'tax_optimization_services',
      'financial_goal_planning'
    ],
    referral_settings: {
      accepts_inbound: true,
      accepts_outbound: true,
      fee_structure: 'aum_percentage'
    },
    onboarding_steps: [
      'wealth_management_certification',
      'creator_income_specialization',
      'investment_portfolio_training',
      'wealth_preservation_mastery',
      'creator_financial_planning'
    ],
    required_documents: [
      'wealth_management_credentials',
      'creator_income_certification',
      'investment_portfolio_training',
      'wealth_preservation_credentials'
    ],
    compliance_requirements: [
      'wealth_management_ethics',
      'creator_financial_confidentiality',
      'investment_fiduciary_standards',
      'wealth_preservation_transparency'
    ]
  },

  digital_asset_management: {
    segment: 'digital_asset_management',
    widgets: [
      'digital_asset_portfolio',
      'nft_management_dashboard',
      'crypto_income_tracker',
      'digital_rights_monitor',
      'blockchain_analytics_hub',
      'digital_asset_consultation',
      'crypto_tax_optimization'
    ],
    permissions: [
      'digital_asset_advisory',
      'nft_portfolio_management',
      'crypto_income_optimization',
      'digital_rights_protection',
      'blockchain_analytics_access',
      'crypto_tax_services'
    ],
    referral_settings: {
      accepts_inbound: true,
      accepts_outbound: true,
      fee_structure: 'percentage_plus_performance'
    },
    onboarding_steps: [
      'digital_asset_certification',
      'nft_management_training',
      'crypto_advisory_mastery',
      'digital_rights_expertise',
      'blockchain_analytics_skills'
    ],
    required_documents: [
      'digital_asset_credentials',
      'nft_management_certification',
      'crypto_advisory_training',
      'digital_rights_portfolio'
    ],
    compliance_requirements: [
      'digital_asset_ethics',
      'crypto_regulatory_compliance',
      'nft_authenticity_standards',
      'digital_rights_transparency'
    ]
  },

  creator_estate_planning: {
    segment: 'creator_estate_planning',
    widgets: [
      'creator_estate_dashboard',
      'brand_legacy_planner',
      'ip_succession_tracker',
      'creator_trust_management',
      'estate_tax_optimization',
      'legacy_consultation_portal',
      'succession_planning_tools'
    ],
    permissions: [
      'creator_estate_planning',
      'brand_legacy_advisory',
      'ip_succession_services',
      'trust_management_tools',
      'estate_tax_optimization',
      'succession_planning_advisory'
    ],
    referral_settings: {
      accepts_inbound: true,
      accepts_outbound: true,
      fee_structure: 'project_plus_percentage'
    },
    onboarding_steps: [
      'estate_planning_certification',
      'creator_legacy_specialization',
      'ip_succession_training',
      'trust_management_mastery',
      'creator_estate_expertise'
    ],
    required_documents: [
      'estate_planning_credentials',
      'creator_legacy_certification',
      'ip_succession_training',
      'trust_management_portfolio'
    ],
    compliance_requirements: [
      'estate_planning_ethics',
      'creator_legacy_confidentiality',
      'ip_succession_standards',
      'trust_management_transparency'
    ]
  }
};

// Helper functions for professional segment management
export function getProfessionalSegmentConfig(segment: ProfessionalSegment): ProfessionalDashboardConfig {
  return PROFESSIONAL_SEGMENT_CONFIGS[segment];
}

export function getSegmentsByRole(userRole: string): ProfessionalSegment[] {
  const segmentMap: Record<string, ProfessionalSegment[]> = {
    'creator_financial_advisor': ['creator_financial_advisory', 'creator_wealth_management'],
    'entertainment_attorney': ['creator_legal_services', 'entertainment_services'],
    'nil_compliance_attorney': ['nil_compliance_advisory', 'creator_legal_services'],
    'influencer_accountant': ['creator_tax_compliance', 'influencer_services'],
    'brand_manager': ['creator_brand_management', 'creator_business_advisory'],
    'creator_business_advisor': ['creator_business_advisory', 'creator_wealth_management'],
    'creator_insurance_specialist': ['creator_insurance_risk'],
    'digital_asset_manager': ['digital_asset_management', 'creator_wealth_management'],
    'creator_estate_planner': ['creator_estate_planning', 'creator_legal_services']
  };

  return segmentMap[userRole] || ['creator_financial_advisory'];
}

export function getCreatorSpecialties(segment: ProfessionalSegment): string[] {
  const specialtyMap: Record<ProfessionalSegment, string[]> = {
    creator_financial_advisory: [
      'NIL Financial Planning',
      'Multi-State Tax Strategy',
      'Brand Monetization Advisory',
      'Creator Income Diversification',
      'Entertainment Industry Wealth Management'
    ],
    creator_legal_services: [
      'NIL Contract Negotiation',
      'Entertainment Law',
      'Brand Protection & IP',
      'Influencer Agreement Drafting',
      'Multi-State Compliance'
    ],
    creator_tax_compliance: [
      'Multi-Platform Income Reporting',
      'Multi-State Tax Filing',
      'Brand Asset Depreciation',
      'Creator Expense Optimization',
      'Quarterly Tax Planning'
    ],
    creator_brand_management: [
      'Brand Strategy Development',
      'Partnership Negotiation',
      'Monetization Optimization',
      'Brand Protection Services',
      'Sponsorship Management'
    ],
    creator_business_advisory: [
      'Creator Business Formation',
      'Growth Strategy Planning',
      'Team Management Advisory',
      'Strategic Partnership Development',
      'Business Analytics Optimization'
    ],
    creator_insurance_risk: [
      'Creator Liability Coverage',
      'Brand Protection Insurance',
      'Entertainment Industry Risk',
      'IP Insurance Solutions',
      'Creator Business Coverage'
    ],
    nil_compliance_advisory: [
      'NCAA Compliance Monitoring',
      'Multi-State NIL Regulations',
      'Athlete Eligibility Verification',
      'NIL Deal Structuring',
      'Regulatory Update Services'
    ],
    entertainment_services: [
      'Talent Management',
      'Entertainment Project Advisory',
      'Royalty Management',
      'Industry Relationship Building',
      'Entertainment Contract Services'
    ],
    influencer_services: [
      'Brand Partnership Management',
      'Content Monetization Strategy',
      'Campaign Performance Optimization',
      'FTC Compliance Advisory',
      'Platform Growth Strategy'
    ],
    creator_wealth_management: [
      'Creator Investment Planning',
      'Income Diversification Strategy',
      'Wealth Preservation Planning',
      'Financial Goal Setting',
      'Creator Retirement Planning'
    ],
    digital_asset_management: [
      'NFT Portfolio Management',
      'Crypto Income Strategy',
      'Digital Rights Protection',
      'Blockchain Analytics',
      'Crypto Tax Optimization'
    ],
    creator_estate_planning: [
      'Brand Legacy Planning',
      'IP Succession Strategy',
      'Creator Trust Management',
      'Estate Tax Optimization',
      'Digital Asset Succession'
    ]
  };

  return specialtyMap[segment] || [];
}

export function getSegmentDisplayName(segment: ProfessionalSegment): string {
  const displayNames: Record<ProfessionalSegment, string> = {
    creator_financial_advisory: 'Creator Financial Advisory',
    creator_legal_services: 'Creator Legal Services',
    creator_tax_compliance: 'Creator Tax & Compliance',
    creator_brand_management: 'Creator Brand Management',
    creator_business_advisory: 'Creator Business Advisory',
    creator_insurance_risk: 'Creator Insurance & Risk',
    nil_compliance_advisory: 'NIL Compliance Advisory',
    entertainment_services: 'Entertainment Services',
    influencer_services: 'Influencer Services',
    creator_wealth_management: 'Creator Wealth Management',
    digital_asset_management: 'Digital Asset Management',
    creator_estate_planning: 'Creator Estate Planning'
  };

  return displayNames[segment] || segment;
}

// Default segment configuration factory
export function createDefaultSegmentConfig(segment: ProfessionalSegment): ProfessionalDashboardConfig {
  return {
    segment,
    widgets: ['dashboard_overview', 'client_management', 'consultation_scheduler'],
    permissions: ['basic_access', 'client_communication'],
    referral_settings: {
      accepts_inbound: true,
      accepts_outbound: false,
      fee_structure: 'consultation_based'
    },
    onboarding_steps: ['verify_credentials', 'complete_training'],
    required_documents: ['professional_license'],
    compliance_requirements: ['basic_ethics', 'client_confidentiality']
  };
}

// Legacy function for backward compatibility
export function getDefaultSegmentForRole(userRole: string): ProfessionalSegment {
  const segments = getSegmentsByRole(userRole);
  return segments[0] || 'creator_financial_advisory';
}