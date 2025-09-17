
import { AdvisorSubscriptionTier } from "@/types/advisorSubscription";

export const advisorSubscriptionTiers: AdvisorSubscriptionTier[] = [
  {
    id: "free",
    name: "Free Tier",
    price: 0,
    description: "Basic listing in Creator Economy Marketplace",
    features: [
      { id: "feature-1", name: "Basic Creator Marketplace Listing", included: true },
      { id: "feature-2", name: "Limited Creator Lead Generation", included: true },
      { id: "feature-3", name: "Basic Creator Client Management", included: true },
      { id: "feature-4", name: "Standard Search Position", included: true },
      { id: "feature-5", name: "Creator-Specific Templates", included: false },
      { id: "feature-6", name: "Advanced Creator Matching", included: false },
      { id: "feature-7", name: "Priority Creator Support", included: false },
    ],
    active: true
  },
  {
    id: "standard",
    name: "Standard",
    price: 99,
    description: "Professional creator economy tools for growing practices",
    features: [
      { id: "feature-1", name: "Enhanced Creator Marketplace Listing", included: true },
      { id: "feature-2", name: "Creator Lead Generation & Matching", included: true },
      { id: "feature-3", name: "Full Creator Client Management", included: true },
      { id: "feature-4", name: "Priority Search Position", included: true },
      { id: "feature-5", name: "Creator-Specific Templates & Tools", included: true },
      { id: "feature-6", name: "Basic Creator Compliance Tools", included: true },
      { id: "feature-7", name: "Standard Creator Support", included: true },
    ],
    active: false
  },
  {
    id: "premium",
    name: "Premium",
    price: 1000,
    description: "Enterprise-grade creator economy platform for established professionals",
    features: [
      { id: "feature-1", name: "Premium Creator Marketplace Listing", included: true },
      { id: "feature-2", name: "Advanced Creator Matching & Discovery Algorithms", included: true },
      { id: "feature-3", name: "Enterprise Creator Client Management", included: true },
      { id: "feature-4", name: "Top Priority Listing in Creator Marketplace", included: true },
      { id: "feature-5", name: "Full Creator-Specific Template Library", included: true },
      { id: "feature-6", name: "Advanced Multi-State Compliance Automation", included: true },
      { id: "feature-7", name: "Priority Creator Support & Dedicated Rep", included: true },
    ],
    active: false
  }
];
