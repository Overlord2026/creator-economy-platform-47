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
    title: "Creator Economy Hub",
    description: "Access the full creator marketplace and professional network",
    icon: Building,
    href: "/marketplace/creators",
    featured: true
  },
  {
    title: "Multi-Platform Social Media Management",
    description: "Manage Instagram, TikTok, YouTube, Twitter and more from one dashboard",
    icon: TrendingUp,
    href: "/tools/brand-management"
  },
  {
    title: "NIL Valuation & Deal Tracking",
    description: "Estimate your NIL value and track all monetization deals",
    icon: Calculator,
    href: "/nil/calculator"
  },
  {
    title: "Creator Financial Advisors",
    description: "Connect with advisors who specialize in creator economy",
    icon: Users,
    href: "/marketplace/professionals"
  },
  {
    title: "Entertainment Attorneys",
    description: "Legal specialists for influencers, athletes, and content creators",
    icon: FileText,
    href: "/marketplace/attorneys"
  },
  {
    title: "Brand Protection & Likeness Monitoring",
    description: "AI-powered monitoring to protect your brand and likeness across the web",
    icon: Shield,
    href: "/tools/brand-management"
  },
  {
    title: "Multi-State NIL Compliance",
    description: "Stay compliant with NIL regulations across all 50 states automatically",
    icon: CheckCircle,
    href: "/compliance"
  },
  {
    title: "Creator Monetization Suite",
    description: "Track all revenue streams: sponsorships, merchandise, appearances, and more",
    icon: DollarSign,
    href: "/tools/brand-management"
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