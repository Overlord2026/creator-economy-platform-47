import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight,
  Users,
  Star,
  Shield,
  Zap,
  TrendingUp,
  CheckCircle,
  DollarSign
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

          {/* Features Section */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" style={{ color: '#f5f7fa' }}>
                Everything You Need to Succeed
              </h2>
              <p className="text-lg max-w-3xl mx-auto" style={{ color: '#c6cfda' }}>
                From brand protection to revenue optimization, we provide the tools and expertise creators need to thrive in today's economy.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#d4af37' }}>
                  <Shield className="h-8 w-8" style={{ color: '#0a0d1e' }} />
                </div>
                <h3 className="text-xl font-semibold" style={{ color: '#f5f7fa' }}>Brand Protection</h3>
                <p style={{ color: '#c6cfda' }}>Secure your intellectual property and trademark with expert legal guidance.</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#d4af37' }}>
                  <TrendingUp className="h-8 w-8" style={{ color: '#0a0d1e' }} />
                </div>
                <h3 className="text-xl font-semibold" style={{ color: '#f5f7fa' }}>Revenue Growth</h3>
                <p style={{ color: '#c6cfda' }}>Maximize monetization opportunities across all platforms and partnerships.</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#d4af37' }}>
                  <Zap className="h-8 w-8" style={{ color: '#0a0d1e' }} />
                </div>
                <h3 className="text-xl font-semibold" style={{ color: '#f5f7fa' }}>Expert Network</h3>
                <p style={{ color: '#c6cfda' }}>Connect with vetted professionals who understand the creator economy.</p>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" style={{ color: '#f5f7fa' }}>
                How It Works
              </h2>
              <p className="text-lg max-w-3xl mx-auto" style={{ color: '#c6cfda' }}>
                Three simple steps to transform your creative passion into a sustainable business.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg" style={{ backgroundColor: '#d4af37', color: '#0a0d1e' }}>
                    1
                  </div>
                  <h3 className="text-xl font-semibold" style={{ color: '#f5f7fa' }}>Create Your Profile</h3>
                </div>
                <p style={{ color: '#c6cfda' }}>
                  Showcase your brand, audience, and goals. Our platform helps you highlight what makes you unique in the creator economy.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg" style={{ backgroundColor: '#d4af37', color: '#0a0d1e' }}>
                    2
                  </div>
                  <h3 className="text-xl font-semibold" style={{ color: '#f5f7fa' }}>Connect with Experts</h3>
                </div>
                <p style={{ color: '#c6cfda' }}>
                  Match with lawyers, accountants, marketers, and business advisors who specialize in working with creators like you.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg" style={{ backgroundColor: '#d4af37', color: '#0a0d1e' }}>
                    3
                  </div>
                  <h3 className="text-xl font-semibold" style={{ color: '#f5f7fa' }}>Scale Your Business</h3>
                </div>
                <p style={{ color: '#c6cfda' }}>
                  Launch new revenue streams, protect your assets, and build a sustainable creator business with ongoing support.
                </p>
              </div>
            </div>
          </section>

          {/* Success Stories */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" style={{ color: '#f5f7fa' }}>
                Creator Success Stories
              </h2>
              <p className="text-lg max-w-3xl mx-auto" style={{ color: '#c6cfda' }}>
                See how creators across industries have transformed their passion into profitable businesses.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-lg border border-white/10" style={{ backgroundColor: '#34485c' }}>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" style={{ color: '#d4af37' }} />
                  ))}
                </div>
                <p className="mb-4" style={{ color: '#c6cfda' }}>
                  "The legal team helped me secure my first major brand partnership worth $50K. The guidance on contract negotiation was invaluable."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full" style={{ backgroundColor: '#d4af37' }}></div>
                  <div>
                    <p className="font-semibold" style={{ color: '#f5f7fa' }}>Sarah M.</p>
                    <p className="text-sm" style={{ color: '#c6cfda' }}>Lifestyle Influencer</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 rounded-lg border border-white/10" style={{ backgroundColor: '#34485c' }}>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" style={{ color: '#d4af37' }} />
                  ))}
                </div>
                <p className="mb-4" style={{ color: '#c6cfda' }}>
                  "From trademark protection to tax optimization, this platform connected me with experts who understand creators. Revenue up 300%!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full" style={{ backgroundColor: '#d4af37' }}></div>
                  <div>
                    <p className="font-semibold" style={{ color: '#f5f7fa' }}>Marcus J.</p>
                    <p className="text-sm" style={{ color: '#c6cfda' }}>NIL Athlete</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Creator Categories Section */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" style={{ color: '#f5f7fa' }}>
                Creator Categories
              </h2>
              <p className="text-lg max-w-3xl mx-auto" style={{ color: '#c6cfda' }}>
                Join thousands of creators across diverse industries who are building sustainable businesses.
              </p>
            </div>
          </section>

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

          {/* Final CTA Section */}
          <section className="text-center space-y-6 py-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold" style={{ color: '#f5f7fa' }}>
              Ready to Monetize Your Creativity?
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#c6cfda' }}>
              Join the creator economy revolution. Connect with professionals who understand your industry and start building a sustainable business today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleStartCreating}
                size="lg"
                style={{ background: 'linear-gradient(to right, #d4af37, #f1e7c6)', color: '#0a0d1e' }}
                className="font-semibold px-12 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <DollarSign className="mr-2 h-5 w-5" />
                Start Earning Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={handleFindProfessional}
                variant="outline"
                size="lg"
                style={{ borderColor: '#d4af37', color: '#d4af37' }}
                className="hover:bg-[#d4af37] hover:text-[#0a0d1e] font-medium px-12 py-4 text-lg rounded-lg transition-all duration-200"
              >
                <Users className="mr-2 h-5 w-5" />
                Browse Professionals
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}