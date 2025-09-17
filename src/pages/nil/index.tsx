import React from 'react';
import { Hero } from '@/components/landing/Hero';
import { ToolsGrid } from '@/components/landing/ToolsGrid';
import { 
  Calculator, 
  Building, 
  FileText, 
  DollarSign, 
  Shield, 
  TrendingUp, 
  Users, 
  CheckCircle 
} from 'lucide-react';

const nilTools = [
  {
    title: "Creator Brand Builder",
    description: "Build and manage your personal brand across all platforms",
    icon: Building,
    href: "/tools/brand-management"
  },
  {
    title: "Multi-Platform Analytics",
    description: "Track performance across Instagram, TikTok, YouTube, and more",
    icon: TrendingUp,
    href: "/analytics/multi-platform"
  },
  {
    title: "NIL Valuation Calculator",
    description: "Estimate your name, image, and likeness value",
    icon: Calculator,
    href: "/nil/calculator"
  },
  {
    title: "Professional Matching",
    description: "Connect with creator economy specialists",
    icon: Users,
    href: "/marketplace/professionals",
    featured: true
  },
  {
    title: "Contract Templates",
    description: "Creator-specific contract templates and compliance tools",
    icon: FileText,
    href: "/templates/creator-contracts"
  },
  {
    title: "Brand Protection Suite",
    description: "Monitor and protect your brand across the internet",
    icon: Shield,
    href: "/brand-protection"
  },
  {
    title: "Multi-State Compliance",
    description: "Stay compliant with regulations across all 50 states",
    icon: CheckCircle,
    href: "/compliance"
  },
  {
    title: "Monetization Tracker",
    description: "Track earnings and optimize revenue streams",
    icon: DollarSign,
    href: "/monetization/tracker"
  }
];

export default function NILIndex() {
  const handleDemoClick = () => {
    // TODO: Implement demo modal or redirect
    console.log('Demo clicked');
  };

  return (
    <div className="min-h-screen">
      <Hero
        title="Creator Economy Hub"
        subtitle="Navigate the creator economy with professional-grade tools designed for NIL athletes, influencers, content creators, and entertainment professionals"
        onCtaClick={handleDemoClick}
      />
      <ToolsGrid tools={nilTools} />
    </div>
  );
}