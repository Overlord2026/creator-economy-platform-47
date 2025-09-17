import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Shield, 
  Camera, 
  Share2, 
  BarChart3, 
  Target,
  Palette,
  FileText,
  Users,
  DollarSign,
  Calendar,
  Settings,
  Plus,
  Eye,
  Edit3,
  Upload
} from 'lucide-react';
import { toast } from 'sonner';

interface BrandAsset {
  id: string;
  name: string;
  type: 'logo' | 'image' | 'video' | 'document';
  url: string;
  size: string;
  lastModified: string;
}

interface Campaign {
  id: string;
  name: string;
  platform: string;
  status: 'active' | 'paused' | 'completed';
  reach: string;
  engagement: string;
  budget: string;
}

const brandAssets: BrandAsset[] = [
  {
    id: '1',
    name: 'Profile Logo',
    type: 'logo',
    url: '/placeholder-logo.png',
    size: '2.1 MB',
    lastModified: '2 days ago'
  },
  {
    id: '2',
    name: 'Brand Guidelines',
    type: 'document',
    url: '/brand-guidelines.pdf',
    size: '5.4 MB',
    lastModified: '1 week ago'
  },
  {
    id: '3',
    name: 'Campaign Video',
    type: 'video',
    url: '/campaign-video.mp4',
    size: '45.2 MB',
    lastModified: '3 days ago'
  }
];

const activeCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Training Series',
    platform: 'Instagram',
    status: 'active',
    reach: '125K',
    engagement: '4.2%',
    budget: '$2,500'
  },
  {
    id: '2',
    name: 'Nike Partnership',
    platform: 'TikTok',
    status: 'active',
    reach: '89K',
    engagement: '7.8%',
    budget: '$5,000'
  },
  {
    id: '3',
    name: 'Nutrition Guide',
    platform: 'YouTube',
    status: 'completed',
    reach: '45K',
    engagement: '6.1%',
    budget: '$1,800'
  }
];

export default function BrandManagement() {
  const [activeTab, setActiveTab] = useState('overview');
  const [uploadedFiles, setUploadedFiles] = useState<BrandAsset[]>(brandAssets);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const newAsset: BrandAsset = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          type: file.type.startsWith('image/') ? 'image' : 'document',
          url: URL.createObjectURL(file),
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          lastModified: 'Just now'
        };
        setUploadedFiles(prev => [...prev, newAsset]);
      });
      toast.success('Files uploaded successfully!');
    }
  };

  const getBrandScore = () => {
    // Calculate brand score based on assets, campaigns, and engagement
    const assetScore = Math.min(uploadedFiles.length * 10, 40);
    const campaignScore = activeCampaigns.filter(c => c.status === 'active').length * 15;
    const engagementScore = 25; // Base engagement score
    return Math.min(assetScore + campaignScore + engagementScore, 100);
  };

  return (
    <>
      <Helmet>
        <title>Brand Management Suite | Creator Economy Hub</title>
        <meta name="description" content="Comprehensive brand management tools for creators to build, protect, and monetize their personal brand." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Brand Management Suite</h1>
                <p className="text-gray-600 mt-1">Build, protect, and monetize your creator brand</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
                <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600">
                  <Plus className="h-4 w-4" />
                  New Campaign
                </Button>
              </div>
            </div>
          </div>

          {/* Brand Score Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Brand Health Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                  <div className="relative w-32 h-32 mx-auto">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-gray-200"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - getBrandScore() / 100)}`}
                        className="text-green-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">{getBrandScore()}</span>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2">Overall Score</p>
                </div>
                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Palette className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Brand Assets</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{uploadedFiles.length}</p>
                    <p className="text-sm text-gray-600">Active assets</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Campaigns</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">
                      {activeCampaigns.filter(c => c.status === 'active').length}
                    </p>
                    <p className="text-sm text-gray-600">Active campaigns</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">Protection</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-600">98%</p>
                    <p className="text-sm text-gray-600">Coverage active</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="assets">Assets</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="contracts">Contracts</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="protection">Protection</TabsTrigger>
              <TabsTrigger value="monetization">Monetization</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Camera className="h-5 w-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="font-medium">New brand asset uploaded</p>
                        <p className="text-sm text-gray-600">Profile Logo v2.1</p>
                      </div>
                      <span className="text-xs text-gray-500">2h ago</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <p className="font-medium">Campaign performance update</p>
                        <p className="text-sm text-gray-600">Summer Training Series</p>
                      </div>
                      <span className="text-xs text-gray-500">4h ago</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Shield className="h-5 w-5 text-purple-600" />
                      <div className="flex-1">
                        <p className="font-medium">Brand protection scan completed</p>
                        <p className="text-sm text-gray-600">No violations found</p>
                      </div>
                      <span className="text-xs text-gray-500">6h ago</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Total Reach</p>
                        <p className="text-2xl font-bold text-blue-600">259K</p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Engagement Rate</p>
                        <p className="text-2xl font-bold text-green-600">6.1%</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Brand Value</p>
                        <p className="text-2xl font-bold text-purple-600">$45K</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="assets" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Brand Assets
                    </CardTitle>
                    <div className="flex gap-2">
                      <input
                        type="file"
                        multiple
                        accept="image/*,video/*,.pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <Button asChild variant="outline">
                        <label htmlFor="file-upload" className="cursor-pointer gap-2">
                          <Upload className="h-4 w-4" />
                          Upload Assets
                        </label>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {uploadedFiles.map((asset) => (
                      <div key={asset.id} className="p-4 border rounded-lg hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline">
                            {asset.type.charAt(0).toUpperCase() + asset.type.slice(1)}
                          </Badge>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit3 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <h3 className="font-medium mb-2">{asset.name}</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Size: {asset.size}</p>
                          <p>Modified: {asset.lastModified}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="campaigns" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="h-5 w-5" />
                    Active Campaigns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeCampaigns.map((campaign) => (
                      <div key={campaign.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-medium">{campaign.name}</h3>
                            <p className="text-sm text-gray-600">{campaign.platform}</p>
                          </div>
                          <Badge 
                            variant={campaign.status === 'active' ? 'default' : 'outline'}
                            className={campaign.status === 'active' ? 'bg-green-500' : ''}
                          >
                            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Reach</p>
                            <p className="font-semibold">{campaign.reach}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Engagement</p>
                            <p className="font-semibold">{campaign.engagement}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Budget</p>
                            <p className="font-semibold">{campaign.budget}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contracts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Universal Contract Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Active Contracts */}
                    <div>
                      <h3 className="font-semibold mb-4">Active Contracts</h3>
                      <div className="space-y-3">
                        <div className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">Nike Partnership Agreement</h4>
                              <p className="text-sm text-gray-600">Brand Partnership • 12 months</p>
                            </div>
                            <Badge className="bg-green-500">Active</Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div>
                              <p className="text-gray-500">Value</p>
                              <p className="font-semibold">$25,000</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Remaining</p>
                              <p className="font-semibold">8 months</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Compliance</p>
                              <p className="font-semibold text-green-600">✓ 100%</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">Supplement Collab Contract</h4>
                              <p className="text-sm text-gray-600">Influencer Partnership • 6 months</p>
                            </div>
                            <Badge className="bg-green-500">Active</Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div>
                              <p className="text-gray-500">Value</p>
                              <p className="font-semibold">$12,000</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Remaining</p>
                              <p className="font-semibold">4 months</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Compliance</p>
                              <p className="font-semibold text-green-600">✓ 98%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contract Templates & Tools */}
                    <div>
                      <h3 className="font-semibold mb-4">Contract Templates</h3>
                      <div className="space-y-3">
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <h4 className="font-medium text-blue-900 mb-2">NIL Athlete Templates</h4>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>• NCAA Compliant Partnership Agreement</li>
                            <li>• Social Media Endorsement Contract</li>
                            <li>• Appearance & Event Agreement</li>
                            <li>• Merchandise Licensing Deal</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                          <h4 className="font-medium text-purple-900 mb-2">Influencer Templates</h4>
                          <ul className="text-sm text-purple-800 space-y-1">
                            <li>• Brand Partnership Agreement</li>
                            <li>• Content Collaboration Contract</li>
                            <li>• Affiliate Marketing Agreement</li>
                            <li>• Platform-Specific Terms</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                          <h4 className="font-medium text-orange-900 mb-2">Entertainment Templates</h4>
                          <ul className="text-sm text-orange-800 space-y-1">
                            <li>• Music Licensing Agreement</li>
                            <li>• Performance Contract</li>
                            <li>• Brand Soundtrack Deal</li>
                            <li>• Event Appearance Agreement</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">AI Contract Review</h4>
                        <p className="text-sm text-gray-600">Automated compliance checking and risk assessment</p>
                      </div>
                      <Button className="gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Contract for Review
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Brand Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
                    <p className="text-gray-600 mb-4">
                      Comprehensive analytics for your brand performance across all platforms
                    </p>
                    <Button className="gap-2">
                      <TrendingUp className="h-4 w-4" />
                      View Full Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="protection" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Brand Protection Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-900">Protection Active</span>
                      </div>
                      <p className="text-sm text-green-800">
                        Your brand is being monitored across 15+ platforms for unauthorized usage
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-2">Trademark Status</h3>
                        <Badge className="bg-green-500">Registered</Badge>
                        <p className="text-sm text-gray-600 mt-2">
                          Your brand name and logo are protected
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-2">Copyright Protection</h3>
                        <Badge className="bg-blue-500">Active</Badge>
                        <p className="text-sm text-gray-600 mt-2">
                          Your content is monitored for infringement
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monetization" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Monetization Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        <span className="font-medium">This Month</span>
                      </div>
                      <p className="text-2xl font-bold text-green-600">$18,250</p>
                      <p className="text-sm text-gray-600">+23% from last month</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Active Deals</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">7</p>
                      <p className="text-sm text-gray-600">Total value: $45,750</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-5 w-5 text-purple-600" />
                        <span className="font-medium">Pending</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-600">$12,500</p>
                      <p className="text-sm text-gray-600">Expected this week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}