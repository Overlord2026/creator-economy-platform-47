import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Eye,
  Heart,
  Share2,
  MessageCircle,
  Target,
  Calendar,
  Globe,
  Award
} from 'lucide-react';

interface PlatformMetrics {
  platform: string;
  followers: number;
  engagement: number;
  reach: number;
  impressions: number;
  growth: number;
  revenue: number;
}

interface CollaborationMetric {
  id: string;
  partner: string;
  type: 'nil_athlete' | 'influencer' | 'entertainment' | 'business';
  campaign: string;
  performance: number;
  revenue: number;
  engagement: number;
}

const platformMetrics: PlatformMetrics[] = [
  {
    platform: 'Instagram',
    followers: 125000,
    engagement: 4.2,
    reach: 89500,
    impressions: 234000,
    growth: 12,
    revenue: 15750
  },
  {
    platform: 'TikTok',
    followers: 89000,
    engagement: 7.8,
    reach: 156000,
    impressions: 445000,
    growth: 28,
    revenue: 12400
  },
  {
    platform: 'YouTube',
    followers: 45000,
    engagement: 6.1,
    reach: 34500,
    impressions: 125000,
    growth: 15,
    revenue: 8900
  },
  {
    platform: 'Twitter',
    followers: 32000,
    engagement: 3.4,
    reach: 28000,
    impressions: 67000,
    growth: 8,
    revenue: 3200
  }
];

const collaborationMetrics: CollaborationMetric[] = [
  {
    id: '1',
    partner: 'Sarah Johnson (Basketball)',
    type: 'nil_athlete',
    campaign: 'Fitness Apparel Collab',
    performance: 94,
    revenue: 8500,
    engagement: 6.7
  },
  {
    id: '2',
    partner: '@fitnessguru_mike',
    type: 'influencer',
    campaign: 'Supplement Partnership',
    performance: 87,
    revenue: 12000,
    engagement: 5.2
  },
  {
    id: '3',
    partner: 'DJ Pulse (Music Producer)',
    type: 'entertainment',
    campaign: 'Workout Playlist Series',
    performance: 92,
    revenue: 6750,
    engagement: 8.1
  },
  {
    id: '4',
    partner: 'Alex Chen (Tech CEO)',
    type: 'business',
    campaign: 'Productivity App Promo',
    performance: 76,
    revenue: 15000,
    engagement: 4.8
  }
];

export const CreatorAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeFrame, setTimeFrame] = useState('30d');

  const totalFollowers = platformMetrics.reduce((sum, platform) => sum + platform.followers, 0);
  const totalRevenue = platformMetrics.reduce((sum, platform) => sum + platform.revenue, 0);
  const avgEngagement = platformMetrics.reduce((sum, platform) => sum + platform.engagement, 0) / platformMetrics.length;
  const totalCollabRevenue = collaborationMetrics.reduce((sum, collab) => sum + collab.revenue, 0);

  const getCollaborationIcon = (type: string) => {
    switch (type) {
      case 'nil_athlete': return '🏆';
      case 'influencer': return '📱';
      case 'entertainment': return '🎭';
      case 'business': return '💼';
      default: return '🤝';
    }
  };

  const getCollaborationColor = (type: string) => {
    switch (type) {
      case 'nil_athlete': return 'bg-green-500';
      case 'influencer': return 'bg-purple-500';
      case 'entertainment': return 'bg-blue-500';
      case 'business': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Creator Analytics Dashboard</h2>
          <p className="text-gray-600">Comprehensive performance tracking across all platforms and collaborations</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={timeFrame === '7d' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeFrame('7d')}
          >
            7 Days
          </Button>
          <Button 
            variant={timeFrame === '30d' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeFrame('30d')}
          >
            30 Days
          </Button>
          <Button 
            variant={timeFrame === '90d' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeFrame('90d')}
          >
            90 Days
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Followers</p>
                <p className="text-2xl font-bold">{(totalFollowers / 1000).toFixed(0)}K</p>
                <p className="text-xs text-green-600">+{Math.round(platformMetrics.reduce((sum, p) => sum + p.growth, 0) / platformMetrics.length)}% growth</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold">${(totalRevenue / 1000).toFixed(0)}K</p>
                <p className="text-xs text-green-600">+23% vs last month</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Engagement</p>
                <p className="text-2xl font-bold">{avgEngagement.toFixed(1)}%</p>
                <p className="text-xs text-green-600">Above industry avg</p>
              </div>
              <Heart className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Collab Revenue</p>
                <p className="text-2xl font-bold">${(totalCollabRevenue / 1000).toFixed(0)}K</p>
                <p className="text-xs text-blue-600">{collaborationMetrics.length} active partnerships</p>
              </div>
              <Award className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Platform Overview</TabsTrigger>
          <TabsTrigger value="collaborations">Cross-Category Collabs</TabsTrigger>
          <TabsTrigger value="monetization">Monetization</TabsTrigger>
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Platform Performance Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platformMetrics.map((platform, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{platform.platform}</h3>
                      <Badge className={platform.growth > 15 ? 'bg-green-500' : platform.growth > 5 ? 'bg-yellow-500' : 'bg-gray-500'}>
                        +{platform.growth}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500">Followers</p>
                        <p className="font-semibold">{(platform.followers / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Engagement</p>
                        <p className="font-semibold">{platform.engagement}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Reach</p>
                        <p className="font-semibold">{(platform.reach / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Impressions</p>
                        <p className="font-semibold">{(platform.impressions / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Revenue</p>
                        <p className="font-semibold">${(platform.revenue / 1000).toFixed(1)}K</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collaborations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Cross-Category Collaboration Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {collaborationMetrics.map((collab) => (
                  <div key={collab.id} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-3 h-3 rounded-full ${getCollaborationColor(collab.type)}`}></div>
                      <span className="text-lg">{getCollaborationIcon(collab.type)}</span>
                      <div className="flex-1">
                        <h3 className="font-medium">{collab.partner}</h3>
                        <p className="text-sm text-gray-600">{collab.campaign}</p>
                      </div>
                      <Badge variant="outline">
                        {collab.type.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500">Performance</p>
                        <p className="font-semibold text-green-600">{collab.performance}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Revenue</p>
                        <p className="font-semibold">${collab.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Engagement</p>
                        <p className="font-semibold">{collab.engagement}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monetization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Universal Brand Monetization Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Revenue Streams</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Brand Partnerships</span>
                      <span className="font-semibold">${(totalRevenue * 0.6 / 1000).toFixed(1)}K</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Collaborations</span>
                      <span className="font-semibold">${(totalCollabRevenue / 1000).toFixed(1)}K</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Merchandise</span>
                      <span className="font-semibold">${(totalRevenue * 0.2 / 1000).toFixed(1)}K</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Appearances</span>
                      <span className="font-semibold">${(totalRevenue * 0.15 / 1000).toFixed(1)}K</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Contract Status</h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Active Contracts</span>
                        <Badge className="bg-green-500">7</Badge>
                      </div>
                      <p className="text-xs text-gray-600">Total value: $45,750</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Pending Negotiations</span>
                        <Badge variant="outline">3</Badge>
                      </div>
                      <p className="text-xs text-gray-600">Potential value: $28,500</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Compliance Status</span>
                        <Badge className="bg-green-500">98%</Badge>
                      </div>
                      <p className="text-xs text-gray-600">All contracts compliant</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Growth Opportunities</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Untapped Platforms</p>
                      <p className="text-xs text-blue-700">LinkedIn: +$12K potential</p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm font-medium text-green-900">Cross-Category Expansion</p>
                      <p className="text-xs text-green-700">Business partnerships: +$25K</p>
                    </div>
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <p className="text-sm font-medium text-purple-900">International Markets</p>
                      <p className="text-xs text-purple-700">EU expansion: +$18K potential</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                AI-Powered Performance Predictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4">Next 30 Days Forecast</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Follower Growth</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">+12.5K</p>
                      <p className="text-sm text-gray-600">Predicted across all platforms</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-medium">Revenue Projection</span>
                      </div>
                      <p className="text-2xl font-bold text-green-600">$67.2K</p>
                      <p className="text-sm text-gray-600">Including new collaborations</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Optimization Recommendations</h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span className="text-sm font-medium">High Priority</span>
                      </div>
                      <p className="text-sm text-gray-600">Increase TikTok posting frequency by 40%</p>
                      <p className="text-xs text-green-600 mt-1">Potential: +$8.5K revenue</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                        <span className="text-sm font-medium">Medium Priority</span>
                      </div>
                      <p className="text-sm text-gray-600">Collaborate with 2 more NIL athletes</p>
                      <p className="text-xs text-green-600 mt-1">Potential: +$15K revenue</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span className="text-sm font-medium">Low Priority</span>
                      </div>
                      <p className="text-sm text-gray-600">Expand into LinkedIn content</p>
                      <p className="text-xs text-green-600 mt-1">Potential: +$4.2K revenue</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};