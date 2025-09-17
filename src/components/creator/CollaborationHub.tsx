import React, { useState } from 'react';
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
  Plus
} from 'lucide-react';
import { toast } from 'sonner';

interface Creator {
  id: string;
  name: string;
  type: 'nil_athlete' | 'social_influencer' | 'entertainment' | 'business_leader';
  sport?: string;
  industry?: string;
  followers: number;
  engagement: number;
  location: string;
  platforms: string[];
  rating: number;
  collaborations: number;
  avgDealValue: number;
  availability: 'available' | 'busy' | 'booked';
  image: string;
  specialties: string[];
  recentCollabs: string[];
}

interface CollaborationOpportunity {
  id: string;
  title: string;
  type: 'brand_partnership' | 'content_collab' | 'event_appearance' | 'product_launch';
  participants: Creator[];
  budget: number;
  duration: string;
  status: 'proposed' | 'negotiating' | 'active' | 'completed';
  description: string;
  expectedReach: number;
  platforms: string[];
}

const creators: Creator[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    type: 'nil_athlete',
    sport: 'Basketball',
    followers: 145000,
    engagement: 6.8,
    location: 'Los Angeles, CA',
    platforms: ['Instagram', 'TikTok', 'Twitter'],
    rating: 4.9,
    collaborations: 23,
    avgDealValue: 12500,
    availability: 'available',
    image: '/placeholder-avatar.jpg',
    specialties: ['Fitness', 'Nutrition', 'Lifestyle'],
    recentCollabs: ['Nike Partnership', 'Protein Brand Collab', 'Workout App']
  },
  {
    id: '2',
    name: '@techguru_alex',
    type: 'social_influencer',
    industry: 'Technology',
    followers: 89000,
    engagement: 5.2,
    location: 'Austin, TX',
    platforms: ['YouTube', 'LinkedIn', 'Twitter'],
    rating: 4.7,
    collaborations: 31,
    avgDealValue: 8500,
    availability: 'busy',
    image: '/placeholder-avatar.jpg',
    specialties: ['Tech Reviews', 'Software', 'Gadgets'],
    recentCollabs: ['Apple Partnership', 'Software Demo', 'Tech Conference']
  },
  {
    id: '3',
    name: 'DJ Marcus Wave',
    type: 'entertainment',
    industry: 'Music',
    followers: 234000,
    engagement: 8.1,
    location: 'Miami, FL',
    platforms: ['Instagram', 'TikTok', 'YouTube'],
    rating: 4.8,
    collaborations: 18,
    avgDealValue: 15000,
    availability: 'available',
    image: '/placeholder-avatar.jpg',
    specialties: ['Music Production', 'Live Events', 'Brand Activation'],
    recentCollabs: ['Festival Partnership', 'Brand Soundtrack', 'Product Launch']
  },
  {
    id: '4',
    name: 'Dr. Emily Chen',
    type: 'business_leader',
    industry: 'Healthcare Tech',
    followers: 67000,
    engagement: 4.3,
    location: 'San Francisco, CA',
    platforms: ['LinkedIn', 'Twitter', 'YouTube'],
    rating: 4.9,
    collaborations: 12,
    avgDealValue: 25000,
    availability: 'available',
    image: '/placeholder-avatar.jpg',
    specialties: ['Healthcare Innovation', 'Leadership', 'Entrepreneurship'],
    recentCollabs: ['MedTech Conference', 'Startup Mentorship', 'Healthcare Summit']
  }
];

const collaborationOpportunities: CollaborationOpportunity[] = [
  {
    id: '1',
    title: 'Sustainable Fitness Brand Campaign',
    type: 'brand_partnership',
    participants: [creators[0], creators[2]],
    budget: 45000,
    duration: '3 months',
    status: 'proposed',
    description: 'Eco-friendly fitness brand seeking athlete-musician collaboration for workout music and sustainable activewear promotion.',
    expectedReach: 380000,
    platforms: ['Instagram', 'TikTok', 'YouTube']
  },
  {
    id: '2',
    title: 'Future of Work Tech Summit',
    type: 'event_appearance',
    participants: [creators[1], creators[3]],
    budget: 35000,
    duration: '2 days',
    status: 'negotiating',
    description: 'Panel discussion on technology disruption in healthcare and workplace innovation.',
    expectedReach: 125000,
    platforms: ['LinkedIn', 'YouTube', 'Twitter']
  },
  {
    id: '3',
    title: 'Youth Empowerment Content Series',
    type: 'content_collab',
    participants: [creators[0], creators[1], creators[2]],
    budget: 28000,
    duration: '6 weeks',
    status: 'active',
    description: 'Multi-creator series focusing on career development, technology skills, and creative expression for Gen Z.',
    expectedReach: 450000,
    platforms: ['TikTok', 'Instagram', 'YouTube']
  }
];

export const CollaborationHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'nil_athlete': return '🏆';
      case 'social_influencer': return '📱';
      case 'entertainment': return '🎭';
      case 'business_leader': return '💼';
      default: return '👤';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'nil_athlete': return 'bg-green-500';
      case 'social_influencer': return 'bg-purple-500';
      case 'entertainment': return 'bg-blue-500';
      case 'business_leader': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'text-green-600 bg-green-50 border-green-200';
      case 'busy': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'booked': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'proposed': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'negotiating': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'completed': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleConnectCreator = (creatorId: string) => {
    toast.success('Connection request sent!');
  };

  const handleProposeCollaboration = () => {
    if (selectedCreators.length === 0) {
      toast.error('Please select at least one creator to collaborate with');
      return;
    }
    toast.success(`Collaboration proposed with ${selectedCreators.length} creator(s)`);
    setSelectedCreators([]);
  };

  const filteredCreators = creators.filter(creator => {
    const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         creator.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || creator.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Cross-Category Collaboration Hub</h2>
          <p className="text-gray-600">Connect and collaborate across NIL athletes, influencers, entertainment, and business leaders</p>
        </div>
        <Button 
          onClick={handleProposeCollaboration} 
          disabled={selectedCreators.length === 0}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Propose Collaboration ({selectedCreators.length})
        </Button>
      </div>

      {/* Collaboration Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Collaborations</p>
                <p className="text-2xl font-bold text-blue-600">7</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">$127K</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Combined Reach</p>
                <p className="text-2xl font-bold text-purple-600">2.1M</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
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

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discover">Discover Creators</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="my-collaborations">My Collaborations</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-4 items-center">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search creators by name, specialties, or industry..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select 
                  value={filterType} 
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border rounded-lg"
                >
                  <option value="all">All Types</option>
                  <option value="nil_athlete">NIL Athletes</option>
                  <option value="social_influencer">Social Influencers</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="business_leader">Business Leaders</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Creator Directory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCreators.map((creator) => (
              <Card key={creator.id} className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                        {getTypeIcon(creator.type)}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full ${getTypeColor(creator.type)} flex items-center justify-center text-white text-xs font-bold`}>
                        {creator.type === 'nil_athlete' ? 'A' : 
                         creator.type === 'social_influencer' ? 'I' :
                         creator.type === 'entertainment' ? 'E' : 'B'}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{creator.name}</h3>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedCreators.includes(creator.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCreators([...selectedCreators, creator.id]);
                              } else {
                                setSelectedCreators(selectedCreators.filter(id => id !== creator.id));
                              }
                            }}
                            className="w-4 h-4"
                          />
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        {creator.sport || creator.industry} • <MapPin className="inline h-3 w-3" /> {creator.location}
                      </p>
                      
                      <div className="flex items-center gap-4 mb-3 text-sm">
                        <span>{(creator.followers / 1000).toFixed(0)}K followers</span>
                        <span>{creator.engagement}% engagement</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span>{creator.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <Badge className={getAvailabilityColor(creator.availability)}>
                          {creator.availability.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          Avg deal: ${(creator.avgDealValue / 1000).toFixed(0)}K
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {creator.specialties.slice(0, 3).map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {creator.platforms.slice(0, 3).map((platform, index) => (
                            <div key={index} className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                              {platform === 'Instagram' && <Instagram className="h-3 w-3" />}
                              {platform === 'YouTube' && <Youtube className="h-3 w-3" />}
                              {platform === 'Twitter' && <Twitter className="h-3 w-3" />}
                              {platform === 'LinkedIn' && <Linkedin className="h-3 w-3" />}
                              {platform === 'TikTok' && <span className="text-xs">TT</span>}
                            </div>
                          ))}
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-6">
          <div className="space-y-4">
            {collaborationOpportunities.map((opportunity) => (
              <Card key={opportunity.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-lg">{opportunity.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{opportunity.description}</p>
                    </div>
                    <Badge className={getStatusColor(opportunity.status)}>
                      {opportunity.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Budget</p>
                      <p className="font-semibold">${opportunity.budget.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-semibold">{opportunity.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Expected Reach</p>
                      <p className="font-semibold">{(opportunity.expectedReach / 1000).toFixed(0)}K</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Participants</p>
                      <p className="font-semibold">{opportunity.participants.length} creators</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Collaborating Creators:</p>
                      <div className="flex gap-2">
                        {opportunity.participants.map((creator, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                            <span className="text-lg">{getTypeIcon(creator.type)}</span>
                            <span className="text-sm font-medium">{creator.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {opportunity.platforms.map((platform, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button size="sm">Join Collaboration</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-collaborations" className="space-y-6">
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your Collaborations</h3>
            <p className="text-gray-600 mb-4">
              Track and manage all your active and past collaborations across different creator categories
            </p>
            <Button>View Collaboration History</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};