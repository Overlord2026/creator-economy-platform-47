import React from 'react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { CategoryGrid } from '@/components/dashboard/CategoryGrid';
import { 
  ArrowRight,
  Users
} from 'lucide-react';

const categories = [
  { 
    title: 'NIL Athletes', 
    description: 'College athletes monetizing name, image, and likeness', 
    value: '2,847', 
    trend: { value: '+43%', positive: true }, 
    dotColor: '#22c55e' 
  },
  { 
    title: 'Social Media Influencers', 
    description: 'Content creators with engaged audiences', 
    value: '8,293', 
    trend: { value: '+67%', positive: true }, 
    dotColor: '#a855f7' 
  },
  { 
    title: 'Entertainment Industry', 
    description: 'Musicians, actors, and entertainment professionals', 
    value: '—', 
    trend: { value: '+24%', positive: true }, 
    dotColor: '#3b82f6' 
  },
  { 
    title: 'Business Leaders', 
    description: 'Executives building personal brands', 
    value: '—', 
    trend: { value: '+31%', positive: true }, 
    dotColor: '#f97316' 
  },
];

export default function NILIndex() {
  const handleCardClick = (title: string) => {
    console.log(`Navigate to ${title} section`);
    // TODO: Add navigation to specific segments when routes exist
  };

  return (
    <div className="min-h-screen bg-[#0a0d1e]">
      <div className="container mx-auto px-6 py-12 space-y-12">
        <PageHeader
          title="Creator Economy Hub"
          subtitle="Where creators connect with professionals to build, protect, and monetize their brands."
          primaryCta={
            <Button 
              className="bg-gradient-to-r from-[#d4af37] to-[#f1e7c6] text-[#0a0d1e] font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              aria-label="Start creating your brand"
            >
              Start Creating
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          }
          secondaryCta={
            <Button 
              variant="outline"
              className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0d1e] font-medium px-8 py-3 rounded-lg transition-all duration-200"
              aria-label="Find professional services"
            >
              <Users className="mr-2 h-4 w-4" />
              Find Professionals
            </Button>
          }
        />

        <CategoryGrid>
          {categories.map((category) => (
            <StatCard
              key={category.title}
              title={category.title}
              description={category.description}
              value={category.value}
              trend={category.trend}
              dotColor={category.dotColor}
              onClick={() => handleCardClick(category.title)}
            />
          ))}
        </CategoryGrid>
      </div>
    </div>
  );
}