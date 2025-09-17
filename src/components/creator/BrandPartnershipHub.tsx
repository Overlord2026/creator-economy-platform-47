import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2,
  Search,
  Filter,
  Star,
  Calendar,
  DollarSign,
  Target,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  Zap,
  Award,
  Globe,
  Briefcase,
  Eye,
  Heart,
  Share2
} from 'lucide-react';
import { toast } from 'sonner';

interface Partnership {
  id: string;
  brand: string;
  title: string;
  category: string;
  subcategory: string;
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
  matchScore: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exclusivity: 'exclusive' | 'non_exclusive';
  paymentTerms: string;
  expectedReach: number;
  contentRequirements: string[];
  brandValues: string[];
  previousCampaigns: string[];
}

const partnerships: Partnership[] = [
  {
    id: '1',
    brand: 'Nike',
    title: 'Athletic Performance Revolution',
    category: 'Sports & Fitness',
    subcategory: 'Athletic Wear',
    budget: 75000,
    duration: '4 months',
    requirements: ['100K+ followers', 'Sports/Fitness content', 'High engagement rate', 'Athletic background'],
    targetAudience: 'Athletes and fitness enthusiasts aged 18-35',
    platforms: ['Instagram', 'TikTok', 'YouTube'],
    applicationDeadline: '2024-12-15',
    status: 'open',
    applicants: 89,
    description: 'Join Nike\'s revolutionary campaign showcasing the next generation of athletic performance. We\'re seeking authentic athletes who embody our "Just Do It" spirit to create compelling content that inspires others to push their limits.',
    brandLogo: '/nike-logo.png',
    matchScore: 95,
    difficulty: 'intermediate',
    exclusivity: 'exclusive',
    paymentTerms: 'Net 30',
    expectedReach: 2500000,
    contentRequirements: ['4 Instagram posts', '8 Instagram stories', '2 TikTok videos', '1 YouTube video'],
    brandValues: ['Innovation', 'Performance', 'Sustainability', 'Inclusivity'],
    previousCampaigns: ['Air Max Campaign 2023', 'Women\'s World Cup Partnership', 'NBA Finals Activation']
  },
  {
    id: '2',
    brand: 'Adobe Creative Cloud',
    title: 'Creator Empowerment Series',
    category: 'Technology',
    subcategory: 'Creative Software',
    budget: 45000,
    duration: '3 months',
    requirements: ['Creative portfolio', '50K+ followers', 'Design/Video skills', 'Tutorial creation experience'],
    targetAudience: 'Content creators, designers, and digital artists',
    platforms: ['YouTube', 'Instagram', 'LinkedIn', 'Behance'],
    applicationDeadline: '2024-12-10',
    status: 'open',
    applicants: 156,
    description: 'Partner with Adobe to create educational content that empowers the next generation of creators. Showcase Creative Cloud tools through engaging tutorials and inspire others to bring their creative visions to life.',
    brandLogo: '/adobe-logo.png',
    matchScore: 88,
    difficulty: 'advanced',
    exclusivity: 'non_exclusive',
    paymentTerms: 'Net 15',
    expectedReach: 1800000,
    contentRequirements: ['6 YouTube tutorials', '12 Instagram posts', '4 LinkedIn articles', '2 Behance case studies'],
    brandValues: ['Creativity', 'Innovation', 'Education', 'Community'],
    previousCampaigns: ['MAX Conference 2023', 'Creative Residency Program', 'Student Designer Spotlight']
  },
  {
    id: '3',
    brand: 'Spotify',
    title: 'Music Discovery Revolution',
    category: 'Entertainment',
    subcategory: 'Music Streaming',
    budget: 60000,
    duration: '5 months',
    requirements: ['Music industry connection', 'Audio content creation', '75K+ followers', 'Playlist curation experience'],
    targetAudience: 'Music lovers, artists, and playlist curators',
    platforms: ['Spotify', 'Instagram', 'TikTok', 'YouTube', 'Twitter'],
    applicationDeadline: '2024-12-20',
    status: 'open',
    applicants: 67,
    description: 'Join Spotify\'s mission to democratize music discovery. Create compelling content that highlights emerging artists, curates genre-defining playlists, and connects music lovers with their next favorite song.',
    brandLogo: '/spotify-logo.png',
    matchScore: 92,
    difficulty: 'intermediate',
    exclusivity: 'exclusive',
    paymentTerms: 'Net 45',
    expectedReach: 3200000,
    contentRequirements: ['Monthly playlist curation', '8 Instagram posts', '12 TikTok videos', '4 YouTube episodes'],
    brandValues: ['Discovery', 'Diversity', 'Artist Support', 'Innovation'],
    previousCampaigns: ['Wrapped 2023', 'Indie Artist Spotlight', 'Global Music Festival Series']
  },
  {
    id: '4',
    brand: 'Mastercard',
    title: 'Priceless Experiences Campaign',
    category: 'Financial Services',
    subcategory: 'Payment Solutions',
    budget: 85000,
    duration: '6 months',
    requirements: ['Business/Finance content', '200K+ followers', 'Professional credibility', 'Travel content'],
    targetAudience: 'Business professionals and frequent travelers',
    platforms: ['LinkedIn', 'Instagram', 'YouTube', 'Twitter'],
    applicationDeadline: '2024-12-25',
    status: 'open',
    applicants: 34,
    description: 'Showcase the priceless experiences that Mastercard enables around the world. Create content that highlights exclusive access, seamless payments, and the adventures that our cardholders enjoy globally.',
    brandLogo: '/mastercard-logo.png',
    matchScore: 76,
    difficulty: 'advanced',
    exclusivity: 'exclusive',
    paymentTerms: 'Net 30',
    expectedReach: 4100000,
    contentRequirements: ['6 LinkedIn posts', '8 Instagram posts', '3 YouTube videos', '12 Twitter threads'],
    brandValues: ['Trust', 'Innovation', 'Inclusion', 'Security'],
    previousCampaigns: ['Champions League Partnership', 'Small Business Support', 'Sustainability Initiative']
  }
];

const categories = [
  { id: 'all', name: 'All Categories', count: partnerships.length },
  { id: 'sports', name: 'Sports & Fitness', count: partnerships.filter(p => p.category === 'Sports & Fitness').length },
  { id: 'tech', name: 'Technology', count: partnerships.filter(p => p.category === 'Technology').length },
  { id: 'entertainment', name: 'Entertainment', count: partnerships.filter(p => p.category === 'Entertainment').length },
  { id: 'finance', name: 'Financial Services', count: partnerships.filter(p => p.category === 'Financial Services').length }
];

export const BrandPartnershipHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('match_score');

  const handleApplyPartnership = (partnershipId: string) => {
    toast.success('Application submitted successfully! The brand will review within 48 hours.');
  };

  const handleSavePartnership = (partnershipId: string) => {
    toast.success('Partnership saved to your watchlist!');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 75) return 'text-blue-600 bg-blue-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  const filteredPartnerships = partnerships.filter(partnership => {
    const matchesSearch = partnership.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         partnership.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         partnership.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || partnership.category.toLowerCase().includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Brand Partnership Hub</h2>
          <p className="text-gray-600">Discover and apply for brand partnerships across all creator categories</p>
        </div>
        <Button className="gap-2">
          <Briefcase className="h-4 w-4" />
          Submit Brand Partnership
        </Button>
      </div>

      {/* Partnership Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Partnerships</p>
                <p className="text-2xl font-bold text-blue-600">{partnerships.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-green-600">${(partnerships.reduce((sum, p) => sum + p.budget, 0) / 1000).toFixed(0)}K</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Match Score</p>
                <p className="text-2xl font-bold text-purple-600">{Math.round(partnerships.reduce((sum, p) => sum + p.matchScore, 0) / partnerships.length)}%</p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Expected Reach</p>
                <p className="text-2xl font-bold text-orange-600">{(partnerships.reduce((sum, p) => sum + p.expectedReach, 0) / 1000000).toFixed(1)}M</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="discover">Discover Partnerships</TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="active">Active Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search partnerships by brand, title, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-3">
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border rounded-lg"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name} ({cat.count})</option>
                    ))}
                  </select>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border rounded-lg"
                  >
                    <option value="match_score">Best Match</option>
                    <option value="budget">Highest Budget</option>
                    <option value="deadline">Deadline</option>
                    <option value="applicants">Fewest Applicants</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Partnership Listings */}
          <div className="space-y-4">
            {filteredPartnerships.map((partnership) => (
              <Card key={partnership.id} className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <Building2 className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{partnership.title}</h3>
                          <Badge className={getDifficultyColor(partnership.difficulty)}>
                            {partnership.difficulty}
                          </Badge>
                          <Badge variant={partnership.exclusivity === 'exclusive' ? 'default' : 'outline'}>
                            {partnership.exclusivity}
                          </Badge>
                        </div>
                        <p className="text-gray-600 font-medium">{partnership.brand}</p>
                        <p className="text-sm text-gray-500">{partnership.category} • {partnership.subcategory}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-lg text-sm font-medium ${getMatchScoreColor(partnership.matchScore)}`}>
                        {partnership.matchScore}% match
                      </div>
                      <p className="text-lg font-bold text-green-600 mt-1">
                        ${(partnership.budget / 1000).toFixed(0)}K
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-2">{partnership.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-semibold">{partnership.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Applicants</p>
                      <p className="font-semibold">{partnership.applicants} creators</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Expected Reach</p>
                      <p className="font-semibold">{(partnership.expectedReach / 1000000).toFixed(1)}M</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Deadline</p>
                      <p className="font-semibold">{partnership.applicationDeadline}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Key Requirements:</p>
                    <div className="flex flex-wrap gap-2">
                      {partnership.requirements.slice(0, 4).map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                      {partnership.requirements.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{partnership.requirements.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Platforms:</p>
                    <div className="flex gap-2">
                      {partnership.platforms.map((platform, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {partnership.targetAudience.split(' ')[0]} audience
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {partnership.paymentTerms}
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        {partnership.contentRequirements.length} deliverables
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSavePartnership(partnership.id)}
                        className="gap-1"
                      >
                        <Heart className="h-3 w-3" />
                        Save
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleApplyPartnership(partnership.id)}
                        className="gap-1"
                      >
                        <Zap className="h-3 w-3" />
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="applications">
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Track Your Applications</h3>
            <p className="text-gray-600 mb-4">
              Monitor the status of all your brand partnership applications in one place
            </p>
            <Button>View Application History</Button>
          </div>
        </TabsContent>

        <TabsContent value="active">
          <div className="text-center py-12">
            <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Active Campaigns</h3>
            <p className="text-gray-600 mb-4">
              Manage your ongoing brand partnerships and track campaign performance
            </p>
            <Button>Launch Campaign Dashboard</Button>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="text-center py-12">
            <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Partnership Analytics</h3>
            <p className="text-gray-600 mb-4">
              Analyze your partnership performance and optimize future applications
            </p>
            <Button>View Analytics Dashboard</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};