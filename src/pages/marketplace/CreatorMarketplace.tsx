import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Search,
  Filter,
  Star,
  MessageCircle,
  Calendar,
  DollarSign,
  TrendingUp,
  Award,
  MapPin,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  CheckCircle,
  Clock,
  Plus,
  Handshake,
  Building2,
  Briefcase,
  CreditCard,
  Target,
  Globe,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

interface CreatorProfile {
  id: string;
  name: string;
  username: string;
  type: 'nil_athlete' | 'social_influencer' | 'entertainment' | 'business_leader';
  category: string;
  followers: number;
  engagement: number;
  location: string;
  platforms: string[];
  rating: number;
  collaborations: number;
  avgDealValue: number;
  availability: 'available' | 'busy' | 'booked';
  hourlyRate: number;
  specialties: string[];
  recentWork: string[];
  portfolioItems: number;
  responseTime: string;
  successRate: number;
}

interface BrandPartnership {
  id: string;
  brand: string;
  title: string;
  category: string;
  budget: number;
  duration: string;
  requirements: string[];
  targetAudience: string;
  platforms: string[];
  applicationDeadline: string;
  status: 'open' | 'in_review' | 'selected' | 'completed';
  applicants: number;
  description: string;
  brandLogo: string;
  matchScore?: number;
}

interface ProfessionalService {
  id: string;
  provider: string;
  service: string;
  category: 'financial_advisor' | 'entertainment_attorney' | 'accountant' | 'brand_manager' | 'publicist';
  price: number;
  priceType: 'hourly' | 'fixed' | 'percentage';
  rating: number;
  reviews: number;
  experience: string;
  specialization: string[];
  availableSlots: number;
  responseTime: string;
  successRate: number;
  description: string;
  certifications: string[];
}

const creatorProfiles: CreatorProfile[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    username: '@sarahb_athlete',
    type: 'nil_athlete',
    category: 'Basketball Player',
    followers: 145000,
    engagement: 6.8,
    location: 'Los Angeles, CA',
    platforms: ['Instagram', 'TikTok', 'Twitter'],
    rating: 4.9,
    collaborations: 23,
    avgDealValue: 12500,
    availability: 'available',
    hourlyRate: 150,
    specialties: ['Fitness Content', 'Nutrition', 'Sports Gear', 'Lifestyle'],
    recentWork: ['Nike Campaign', 'Protein Brand Partnership', 'Fitness App Collab'],
    portfolioItems: 47,
    responseTime: '2 hours',
    successRate: 96
  },
  {
    id: '2',
    name: 'Alex Chen',
    username: '@techguru_alex',
    type: 'social_influencer',
    category: 'Tech Reviewer',
    followers: 89000,
    engagement: 5.2,
    location: 'San Francisco, CA',
    platforms: ['YouTube', 'LinkedIn', 'Twitter'],
    rating: 4.7,
    collaborations: 31,
    avgDealValue: 8500,
    availability: 'busy',
    hourlyRate: 125,
    specialties: ['Tech Reviews', 'Software Demos', 'Gadget Unboxings', 'B2B Content'],
    recentWork: ['Apple Partnership', 'Software Launch', 'Tech Conference'],
    portfolioItems: 62,
    responseTime: '4 hours',
    successRate: 94
  },
  {
    id: '3',
    name: 'Marcus Wave',
    username: '@djmarcuswave',
    type: 'entertainment',
    category: 'Music Producer/DJ',
    followers: 234000,
    engagement: 8.1,
    location: 'Miami, FL',
    platforms: ['Instagram', 'TikTok', 'YouTube', 'Spotify'],
    rating: 4.8,
    collaborations: 18,
    avgDealValue: 15000,
    availability: 'available',
    hourlyRate: 200,
    specialties: ['Music Production', 'Live Events', 'Brand Soundtracks', 'Audio Branding'],
    recentWork: ['Festival Partnership', 'Brand Soundtrack', 'Product Launch Music'],
    portfolioItems: 34,
    responseTime: '1 hour',
    successRate: 98
  }
];

const brandPartnerships: BrandPartnership[] = [
  {
    id: '1',
    brand: 'Nike',
    title: 'Athletic Performance Campaign',
    category: 'Sports & Fitness',
    budget: 50000,
    duration: '3 months',
    requirements: ['100K+ followers', 'Sports/Fitness content', 'High engagement'],
    targetAudience: 'Athletes aged 18-35',
    platforms: ['Instagram', 'TikTok', 'YouTube'],
    applicationDeadline: '2024-12-15',
    status: 'open',
    applicants: 47,
    description: 'Seeking authentic athletes and fitness creators to showcase our latest performance gear through engaging content and real workout demonstrations.',
    brandLogo: '/nike-logo.png',
    matchScore: 94
  },
  {
    id: '2',
    brand: 'Adobe Creative Cloud',
    title: 'Creator Empowerment Series',
    category: 'Technology & Creative',
    budget: 35000,
    duration: '2 months',
    requirements: ['Creative content', 'Design/Video skills', 'Professional portfolio'],
    targetAudience: 'Content creators and designers',
    platforms: ['YouTube', 'Instagram', 'LinkedIn'],
    applicationDeadline: '2024-12-10',
    status: 'open',
    applicants: 32,
    description: 'Partner with us to create educational content showcasing Creative Cloud tools and inspiring other creators to elevate their work.',
    brandLogo: '/adobe-logo.png',
    matchScore: 87
  },
  {
    id: '3',
    brand: 'Spotify',
    title: 'Music Discovery Campaign',
    category: 'Entertainment & Music',
    budget: 40000,
    duration: '4 months',
    requirements: ['Music industry experience', 'Audio content creation', 'Strong following'],
    targetAudience: 'Music lovers and artists',
    platforms: ['Spotify', 'Instagram', 'TikTok', 'YouTube'],
    applicationDeadline: '2024-12-20',
    status: 'open',
    applicants: 28,
    description: 'Join our campaign to highlight emerging artists and create playlists that resonate with diverse audiences across multiple genres.',
    brandLogo: '/spotify-logo.png',
    matchScore: 91
  }
];

const professionalServices: ProfessionalService[] = [
  {
    id: '1',
    provider: 'Jennifer Martinez, CFA',
    service: 'Creator Financial Advisory',
    category: 'financial_advisor',
    price: 200,
    priceType: 'hourly',
    rating: 4.9,
    reviews: 156,
    experience: '8 years',
    specialization: ['NIL Compliance', 'Tax Optimization', 'Investment Planning', 'Revenue Diversification'],
    availableSlots: 12,
    responseTime: '2 hours',
    successRate: 97,
    description: 'Specialized financial advisory for creators, athletes, and entertainers. Expert in NIL regulations, creator economy taxation, and building sustainable wealth from content monetization.',
    certifications: ['CFA', 'CFP', 'NIL Compliance Certified']
  },
  {
    id: '2',
    provider: 'David Kim, Esq.',
    service: 'Entertainment Law & Contracts',
    category: 'entertainment_attorney',
    price: 350,
    priceType: 'hourly',
    rating: 4.8,
    reviews: 203,
    experience: '12 years',
    specialization: ['Contract Negotiation', 'Intellectual Property', 'Brand Protection', 'Licensing Deals'],
    availableSlots: 8,
    responseTime: '4 hours',
    successRate: 99,
    description: 'Entertainment attorney specializing in creator economy legal matters. Extensive experience with influencer contracts, brand partnerships, and IP protection.',
    certifications: ['CA State Bar', 'Entertainment Law Specialist', 'IP Law Certified']
  },
  {
    id: '3',
    provider: 'Rachel Thompson, CPA',
    service: 'Creator Tax & Accounting',
    category: 'accountant',
    price: 150,
    priceType: 'hourly',
    rating: 4.7,
    reviews: 89,
    experience: '6 years',
    specialization: ['Creator Tax Filing', 'Business Structure', 'Expense Optimization', 'Multi-State Compliance'],
    availableSlots: 15,
    responseTime: '3 hours',
    successRate: 95,
    description: 'CPA specializing in creator and influencer taxation. Expert in handling complex multi-state income, business deductions, and tax planning for content creators.',
    certifications: ['CPA License', 'Creator Economy Specialist', 'Multi-State Tax Certified']
  }
];

export default function CreatorMarketplace() {
  const [activeTab, setActiveTab] = useState('creators');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleConnectCreator = (creatorId: string) => {
    toast.success('Connection request sent! They\'ll be notified.');
  };

  const handleApplyPartnership = (partnershipId: string) => {
    toast.success('Application submitted! Brand will review within 48 hours.');
  };

  const handleBookService = (serviceId: string) => {
    toast.info('Payment integration required. Please connect Supabase to enable booking and payments.');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'nil_athlete': return '🏆';
      case 'social_influencer': return '📱';
      case 'entertainment': return '🎭';
      case 'business_leader': return '💼';
      default: return '👤';
    }
  };

  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'financial_advisor': return <DollarSign className="h-5 w-5 text-green-500" />;
      case 'entertainment_attorney': return <Briefcase className="h-5 w-5 text-blue-500" />;
      case 'accountant': return <Calculator className="h-5 w-5 text-purple-500" />;
      case 'brand_manager': return <Target className="h-5 w-5 text-orange-500" />;
      case 'publicist': return <Globe className="h-5 w-5 text-pink-500" />;
      default: return <Users className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Creator Collaboration Marketplace | Connect, Partner, Grow</title>
        <meta name="description" content="The ultimate marketplace for creator collaborations, brand partnerships, and professional services in the creator economy." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Creator Collaboration Marketplace
                </h1>
                <p className="text-gray-600 mt-2">
                  Connect with creators, find brand partnerships, and access professional services
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  List Your Services
                </Button>
                <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600">
                  <Handshake className="h-4 w-4" />
                  Start Collaborating
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Creators</p>
                    <p className="text-2xl font-bold text-purple-600">2,847</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Brand Partnerships</p>
                    <p className="text-2xl font-bold text-blue-600">156</p>
                  </div>
                  <Building2 className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-600">$2.4M</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold text-orange-600">94%</p>
                  </div>
                  <Award className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Marketplace Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="creators">Creator Network</TabsTrigger>
              <TabsTrigger value="partnerships">Brand Partnerships</TabsTrigger>
              <TabsTrigger value="services">Professional Services</TabsTrigger>
              <TabsTrigger value="payments">Revenue & Payments</TabsTrigger>
            </TabsList>

            {/* Creator Network Tab */}
            <TabsContent value="creators" className="space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex gap-4 items-center">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search creators by name, category, or specialties..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <select 
                      value={selectedCategory} 
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 border rounded-lg"
                    >
                      <option value="all">All Categories</option>
                      <option value="nil_athlete">NIL Athletes</option>
                      <option value="social_influencer">Social Influencers</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="business_leader">Business Leaders</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Creator Profiles */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creatorProfiles.map((creator) => (
                  <Card key={creator.id} className="hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-2xl">
                            {getTypeIcon(creator.type)}
                          </div>
                          <Badge className="absolute -bottom-1 -right-1 text-xs px-1 py-0">
                            {creator.type === 'nil_athlete' ? 'A' : 
                             creator.type === 'social_influencer' ? 'I' :
                             creator.type === 'entertainment' ? 'E' : 'B'}
                          </Badge>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{creator.name}</h3>
                          <p className="text-sm text-gray-600">{creator.username}</p>
                          <p className="text-sm text-gray-500">{creator.category}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-gray-500">Followers</p>
                          <p className="font-semibold">{(creator.followers / 1000).toFixed(0)}K</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Engagement</p>
                          <p className="font-semibold">{creator.engagement}%</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Rating</p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500" />
                            <span className="font-semibold">{creator.rating}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-500">Rate</p>
                          <p className="font-semibold">${creator.hourlyRate}/hr</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {creator.specialties.slice(0, 3).map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          <p>Response: {creator.responseTime}</p>
                          <p>Success: {creator.successRate}%</p>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => handleConnectCreator(creator.id)}
                          className="gap-1"
                        >
                          <MessageCircle className="h-3 w-3" />
                          Connect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Brand Partnerships Tab */}
            <TabsContent value="partnerships" className="space-y-6">
              <div className="space-y-4">
                {brandPartnerships.map((partnership) => (
                  <Card key={partnership.id} className="hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Building2 className="h-8 w-8 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{partnership.title}</h3>
                            <p className="text-gray-600">{partnership.brand}</p>
                            <p className="text-sm text-gray-500">{partnership.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="mb-2">
                            ${(partnership.budget / 1000).toFixed(0)}K Budget
                          </Badge>
                          {partnership.matchScore && (
                            <div className="text-sm">
                              <span className="text-green-600 font-medium">{partnership.matchScore}% match</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{partnership.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Duration</p>
                          <p className="font-semibold">{partnership.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Applicants</p>
                          <p className="font-semibold">{partnership.applicants} creators</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Deadline</p>
                          <p className="font-semibold">{partnership.applicationDeadline}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-2">Requirements:</p>
                        <div className="flex flex-wrap gap-2">
                          {partnership.requirements.map((req, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {partnership.platforms.map((platform, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                        <Button 
                          onClick={() => handleApplyPartnership(partnership.id)}
                          className="gap-2"
                        >
                          <Zap className="h-4 w-4" />
                          Apply Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Professional Services Tab */}
            <TabsContent value="services" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {professionalServices.map((service) => (
                  <Card key={service.id} className="hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          {getServiceIcon(service.category)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{service.service}</h3>
                          <p className="text-gray-600">{service.provider}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">{service.rating}</span>
                            <span className="text-sm text-gray-500">({service.reviews} reviews)</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">
                            ${service.price}{service.priceType === 'hourly' ? '/hr' : service.priceType === 'percentage' ? '%' : ''}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-700 text-sm mb-4">{service.description}</p>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-gray-500">Experience</p>
                          <p className="font-semibold">{service.experience}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Success Rate</p>
                          <p className="font-semibold">{service.successRate}%</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Response Time</p>
                          <p className="font-semibold">{service.responseTime}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Available Slots</p>
                          <p className="font-semibold">{service.availableSlots}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-2">Specializations:</p>
                        <div className="flex flex-wrap gap-1">
                          {service.specialization.slice(0, 3).map((spec, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button 
                        className="w-full gap-2" 
                        onClick={() => handleBookService(service.id)}
                      >
                        <Calendar className="h-4 w-4" />
                        Book Consultation
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Revenue & Payments Tab */}
            <TabsContent value="payments" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Revenue Sharing System
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Collaborative Deal Revenue</h4>
                        <p className="text-2xl font-bold text-blue-600">$47,500</p>
                        <p className="text-sm text-blue-700">From 3 active collaborations</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Nike X Sarah Partnership</p>
                            <p className="text-sm text-gray-600">Your share: 60%</p>
                          </div>
                          <span className="font-semibold text-green-600">$15,000</span>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Adobe Creative Collab</p>
                            <p className="text-sm text-gray-600">Your share: 40%</p>
                          </div>
                          <span className="font-semibold text-green-600">$14,000</span>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Spotify Music Campaign</p>
                            <p className="text-sm text-gray-600">Your share: 50%</p>
                          </div>
                          <span className="font-semibold text-green-600">$18,500</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Payment Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                        <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="font-medium text-gray-900 mb-2">Payment Integration Required</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Connect Supabase to enable secure payments, revenue sharing, and financial tracking for collaborative deals.
                        </p>
                        <Button className="gap-2">
                          <Plus className="h-4 w-4" />
                          Setup Payment System
                        </Button>
                      </div>
                      
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 className="font-medium text-yellow-900 mb-2">Features Coming Soon:</h4>
                        <ul className="text-sm text-yellow-800 space-y-1">
                          <li>• Automated revenue splitting</li>
                          <li>• Escrow services for deals</li>
                          <li>• Multi-currency support</li>
                          <li>• Tax documentation</li>
                          <li>• Payment scheduling</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

function Calculator(props: any) {
  return <div {...props}>Calc</div>;
}