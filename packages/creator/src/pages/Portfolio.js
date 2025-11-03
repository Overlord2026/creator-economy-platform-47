"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Portfolio = Portfolio;
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
function Portfolio() {
    // Mock brand kits data
    var brandKits = [
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
    var connections = [
        { platform: 'Instagram', status: 'connected', followers: '125K' },
        { platform: 'TikTok', status: 'connected', followers: '89K' },
        { platform: 'YouTube', status: 'pending', followers: '45K' },
        { platform: 'Twitter', status: 'disconnected', followers: '23K' }
    ];
    return (<div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
          <p className="text-muted-foreground mt-2">
            Manage your brand kits and platform connections.
          </p>
        </div>
        <button_1.Button>
          <lucide_react_1.Plus className="h-4 w-4 mr-2"/>
          New Brand Kit
        </button_1.Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Brand Kits */}
        <div className="lg:col-span-2">
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle className="flex items-center gap-2">
                <lucide_react_1.Palette className="h-5 w-5"/>
                Brand Kits ({brandKits.length})
              </card_1.CardTitle>
            </card_1.CardHeader>
            <card_1.CardContent>
              {brandKits.length === 0 ? (<div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No brand kits created yet</p>
                  <button_1.Button variant="outline">
                    <lucide_react_1.Plus className="h-4 w-4 mr-2"/>
                    Create Your First Kit
                  </button_1.Button>
                </div>) : (<div className="space-y-4">
                  {brandKits.map(function (kit) { return (<div key={kit.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{kit.name}</h3>
                            <badge_1.Badge variant={kit.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                              {kit.status}
                            </badge_1.Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {kit.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Updated {kit.lastUpdated}
                          </p>
                        </div>
                        <button_1.Button variant="ghost" size="sm">
                          <lucide_react_1.ExternalLink className="h-3 w-3"/>
                        </button_1.Button>
                      </div>
                    </div>); })}
                </div>)}
            </card_1.CardContent>
          </card_1.Card>
        </div>

        {/* Platform Connections */}
        <div>
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle className="flex items-center gap-2">
                <lucide_react_1.Link className="h-5 w-5"/>
                Connected Platforms
              </card_1.CardTitle>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="space-y-3">
                {connections.map(function (connection, index) { return (<div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{connection.platform}</span>
                        <badge_1.Badge variant={connection.status === 'connected' ? 'default' :
                connection.status === 'pending' ? 'secondary' : 'outline'} className="text-xs">
                          {connection.status}
                        </badge_1.Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {connection.followers} followers
                      </p>
                    </div>
                    <button_1.Button variant="ghost" size="sm">
                      {connection.status === 'connected' ? 'Manage' : 'Connect'}
                    </button_1.Button>
                  </div>); })}
              </div>
              
              <button_1.Button variant="outline" className="w-full mt-4" size="sm">
                <lucide_react_1.Plus className="h-3 w-3 mr-2"/>
                Connect Platform
              </button_1.Button>
            </card_1.CardContent>
          </card_1.Card>

          {/* Quick Stats */}
          <card_1.Card className="mt-4">
            <card_1.CardHeader>
              <card_1.CardTitle className="text-base">Quick Stats</card_1.CardTitle>
            </card_1.CardHeader>
            <card_1.CardContent>
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
            </card_1.CardContent>
          </card_1.Card>
        </div>
      </div>
    </div>);
}
