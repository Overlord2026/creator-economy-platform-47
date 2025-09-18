import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { Plus, ExternalLink, Palette, Link as LinkIcon } from 'lucide-react';

export function Portfolio() {
  // Mock brand kits data
  const brandKits = [
    {
      id: 1,
      name: 'Tech Creator Kit',
      description: 'Professional tech content creation assets',
      status: 'active',
      lastUpdated: '2 days ago'
    },
    {
      id: 2,
      name: 'Lifestyle Brand Kit',
      description: 'Lifestyle and wellness content templates',
      status: 'draft',
      lastUpdated: '1 week ago'
    },
    {
      id: 3,
      name: 'Gaming Content Kit',
      description: 'Gaming and esports branded content',
      status: 'active',
      lastUpdated: '3 days ago'
    }
  ];

  const connections = [
    { platform: 'Instagram', status: 'connected', followers: '125K' },
    { platform: 'TikTok', status: 'connected', followers: '89K' },
    { platform: 'YouTube', status: 'pending', followers: '45K' },
    { platform: 'Twitter', status: 'disconnected', followers: '23K' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
          <p className="text-muted-foreground mt-2">
            Manage your brand kits and platform connections.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Brand Kit
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Brand Kits */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Brand Kits ({brandKits.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {brandKits.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No brand kits created yet</p>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Kit
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {brandKits.map((kit) => (
                    <div key={kit.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{kit.name}</h3>
                            <Badge 
                              variant={kit.status === 'active' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {kit.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {kit.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Updated {kit.lastUpdated}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Platform Connections */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5" />
                Connected Platforms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {connections.map((connection, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{connection.platform}</span>
                        <Badge 
                          variant={
                            connection.status === 'connected' ? 'default' :
                            connection.status === 'pending' ? 'secondary' : 'outline'
                          }
                          className="text-xs"
                        >
                          {connection.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {connection.followers} followers
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      {connection.status === 'connected' ? 'Manage' : 'Connect'}
                    </Button>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4" size="sm">
                <Plus className="h-3 w-3 mr-2" />
                Connect Platform
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Reach:</span>
                  <span className="font-medium">282K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Deals:</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completed:</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">This Month:</span>
                  <span className="font-medium">$8.5K</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}