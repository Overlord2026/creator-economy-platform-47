import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { CategoryGrid } from '@/components/dashboard/CategoryGrid';

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
    value: '1,652', 
    trend: { value: '+24%', positive: true }, 
    dotColor: '#3b82f6' 
  },
  { 
    title: 'Business Leaders', 
    description: 'Executives building personal brands', 
    value: '934', 
    trend: { value: '+31%', positive: true }, 
    dotColor: '#f97316' 
  },
];

export default function CreatorHub() {
  const navigate = useNavigate();

  const handleCardClick = (title: string) => {
    console.log(`Navigate to ${title} section`);
    // TODO: Add navigation to specific segments when routes exist
  };

  const handleStartCreating = () => {
    navigate('/creators/onboarding');
  };

  const handleFindProfessional = () => {
    navigate('/marketplace/professionals');
  };

  return (
    <>
      <Helmet>
        <title>Creator Economy Hub | Connect, Create, Monetize</title>
        <meta name="description" content="The premier platform for creators to monetize their brand, connect with professionals, and grow their business across all platforms." />
      </Helmet>

      <div className="min-h-screen bg-[#0a0d1e]" style={{ backgroundColor: '#0a0d1e' }}>
        <div className="container mx-auto px-6 py-12 space-y-12" style={{ backgroundColor: '#0a0d1e' }}>
          <PageHeader
            title="Creator Economy Hub"
            subtitle="Where creators connect with professionals to build, protect, and monetize their brands."
            primaryCta={
              <Button 
                onClick={handleStartCreating}
                style={{ background: 'linear-gradient(to right, #d4af37, #f1e7c6)', color: '#0a0d1e' }}
                className="font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                aria-label="Start creating your brand"
              >
                Start Creating
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            }
            secondaryCta={
              <Button 
                onClick={handleFindProfessional}
                variant="outline"
                style={{ borderColor: '#d4af37', color: '#d4af37' }}
                className="hover:bg-[#d4af37] hover:text-[#0a0d1e] font-medium px-8 py-3 rounded-lg transition-all duration-200"
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
    </>
  );
}