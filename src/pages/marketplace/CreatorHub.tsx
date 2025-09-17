import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Users, 
  Shield, 
  Award, 
  Instagram, 
  Youtube, 
  Twitter,
  Linkedin,
  Video,
  Camera,
  Heart,
  MessageCircle,
  Share2,
  BarChart3,
  DollarSign,
  Star,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CreatorTemplateLibrary } from '@/components/creator/CreatorTemplateLibrary';
import { CreatorProfessionalMatching } from '@/components/creator/CreatorProfessionalMatching';
import { CreatorAnalytics } from '@/components/creator/CreatorAnalytics';
import { CollaborationHub } from '@/components/creator/CollaborationHub';

interface SocialMediaMetrics {
  platform: string;
  icon: React.ComponentType<any>;
  followers: string;
  engagement: string;
  growth: string;
  color: string;
}

const socialMetrics: SocialMediaMetrics[] = [
  {
    platform: 'Instagram',
    icon: Instagram,
    followers: '125K',
    engagement: '4.2%',
    growth: '+12%',
    color: 'text-pink-500'
  },
  {
    platform: 'TikTok',
    icon: Video,
    followers: '89K',
    engagement: '7.8%',
    growth: '+28%',
    color: 'text-black'
  },
  {
    platform: 'YouTube',
    icon: Youtube,
    followers: '45K',
    engagement: '6.1%',
    growth: '+15%',
    color: 'text-red-500'
  },
  {
    platform: 'Twitter',
    icon: Twitter,
    followers: '32K',
    engagement: '3.4%',
    growth: '+8%',
    color: 'text-blue-400'
  }
];

const creatorTypes = [
  {
    id: 'nil-athletes',
    name: 'NIL Athletes',
    description: 'College athletes monetizing name, image, and likeness',
    count: '2,847',
    growth: '+43%',
    color: 'bg-green-500'
  },
  {
    id: 'social-influencers',
    name: 'Social Media Influencers',
    description: 'Content creators with engaged audiences',
    count: '8,293',
    growth: '+67%',
    color: 'bg-purple-500'
  },
  {
    id: 'entertainment',
    name: 'Entertainment Industry',
    description: 'Musicians, actors, and entertainment professionals',
    count: '1,652',
    growth: '+24%',
    color: 'bg-blue-500'
  },
  {
    id: 'business-leaders',
    name: 'Business Leaders',
    description: 'Executives and thought leaders building personal brands',
    count: '934',
    growth: '+31%',
    color: 'bg-orange-500'
  }
];

export default function CreatorHub() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

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

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Creator Economy Hub
                </h1>
                <p className="text-gray-600 mt-2">
                  Where creators connect with professionals to build, protect, and monetize their brands
                </p>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleFindProfessional} variant="outline" className="gap-2">
                  <Users className="h-4 w-4" />
                  Find Professionals
                </Button>
                <Button onClick={handleStartCreating} className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600">
                  <Star className="h-4 w-4" />
                  Start Creating
                </Button>
              </div>
            </div>
          </div>

          {/* Creator Categories Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {creatorTypes.map((type) => (
              <Card key={type.id} className="hover:shadow-lg transition-all cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-3 h-3 rounded-full ${type.color}`}></div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {type.growth}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{type.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{type.count}</span>
                    <span className="text-sm text-gray-500">active creators</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="social-management">Social Media</TabsTrigger>
              <TabsTrigger value="brand-protection">Brand Protection</TabsTrigger>
              <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="professionals">Professionals</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Social Media Metrics */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Multi-Platform Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {socialMetrics.map((metric) => (
                        <div key={metric.platform} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <metric.icon className={`h-5 w-5 ${metric.color}`} />
                              <span className="font-medium">{metric.platform}</span>
                            </div>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              {metric.growth}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className="text-gray-500">Followers</p>
                              <p className="font-semibold">{metric.followers}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Engagement</p>
                              <p className="font-semibold">{metric.engagement}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start gap-2" variant="outline">
                      <Camera className="h-4 w-4" />
                      Schedule Content
                    </Button>
                    <Button className="w-full justify-start gap-2" variant="outline">
                      <Shield className="h-4 w-4" />
                      Check Brand Protection
                    </Button>
                    <Button className="w-full justify-start gap-2" variant="outline">
                      <DollarSign className="h-4 w-4" />
                      Track Monetization
                    </Button>
                    <Button className="w-full justify-start gap-2" variant="outline">
                      <Users className="h-4 w-4" />
                      Connect with Professionals
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Creator Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="flex-1">New brand partnership opportunity in Sports & Fitness</span>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="flex-1">Professional template updated: NIL Contract v2.1</span>
                      <span className="text-sm text-gray-500">5 hours ago</span>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="flex-1">New compliance alert: California NIL regulations updated</span>
                      <span className="text-sm text-gray-500">1 day ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="social-management" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="h-5 w-5" />
                    Multi-Platform Social Media Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Connected Platforms */}
                    <div>
                      <h3 className="font-semibold mb-4">Connected Platforms</h3>
                      <div className="space-y-3">
                        {socialMetrics.map((metric) => (
                          <div key={metric.platform} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <metric.icon className={`h-5 w-5 ${metric.color}`} />
                              <div>
                                <p className="font-medium">{metric.platform}</p>
                                <p className="text-sm text-gray-500">{metric.followers} followers</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              Connected
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Content Scheduler */}
                    <div>
                      <h3 className="font-semibold mb-4">Content Scheduler</h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Camera className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">Workout Tuesday</span>
                          </div>
                          <p className="text-sm text-gray-600">Scheduled for Instagram & TikTok</p>
                          <p className="text-xs text-blue-600 mt-1">Tomorrow at 6:00 AM</p>
                        </div>
                        <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Heart className="h-4 w-4 text-purple-600" />
                            <span className="font-medium">Brand Collaboration</span>
                          </div>
                          <p className="text-sm text-gray-600">Nike partnership announcement</p>
                          <p className="text-xs text-purple-600 mt-1">Thursday at 12:00 PM</p>
                        </div>
                        <Button className="w-full" variant="outline">
                          <Camera className="h-4 w-4 mr-2" />
                          Schedule New Content
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="brand-protection" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Brand Protection & Likeness Monitoring
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Brand Monitoring */}
                    <div>
                      <h3 className="font-semibold mb-4">Brand Monitoring Alerts</h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Eye className="h-4 w-4 text-green-600" />
                            <span className="font-medium">All Clear</span>
                          </div>
                          <p className="text-sm text-gray-600">No unauthorized usage detected</p>
                          <p className="text-xs text-green-600 mt-1">Last scan: 2 hours ago</p>
                        </div>
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-4 w-4 text-yellow-600" />
                            <span className="font-medium">Review Required</span>
                          </div>
                          <p className="text-sm text-gray-600">3 potential trademark conflicts found</p>
                          <Button size="sm" variant="outline" className="mt-2">
                            Review Now
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Monetization Tracking */}
                    <div>
                      <h3 className="font-semibold mb-4">Monetization Tracking</h3>
                      <div className="space-y-3">
                        <div className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Active Deals</span>
                            <Badge>7</Badge>
                          </div>
                          <p className="text-sm text-gray-600">Total value: $45,750</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Pending Payments</span>
                            <Badge variant="outline">3</Badge>
                          </div>
                          <p className="text-sm text-gray-600">Expected: $12,500</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">This Month</span>
                            <Badge className="bg-green-500">+23%</Badge>
                          </div>
                          <p className="text-sm text-gray-600">Revenue: $18,250</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates">
              <CreatorTemplateLibrary />
            </TabsContent>

            <TabsContent value="collaborations">
              <CollaborationHub />
            </TabsContent>

            <TabsContent value="analytics">
              <CreatorAnalytics />
            </TabsContent>

            <TabsContent value="professionals">
              <CreatorProfessionalMatching />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}