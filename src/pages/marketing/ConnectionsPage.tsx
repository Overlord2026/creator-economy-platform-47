import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Network, 
  Users, 
  Handshake, 
  TrendingUp,
  Shield,
  CheckCircle2,
  ArrowRight,
  Globe,
  MessageSquare,
  Calendar
} from "lucide-react";

export default function ConnectionsPage() {
  const connectionTypes = [
    {
      title: "Creator-to-Creator",
      icon: Users,
      description: "Connect with fellow creators for collaborations, cross-promotions, and knowledge sharing",
      features: ["Collaboration matching", "Revenue sharing tools", "Joint project management", "Cross-platform promotion"],
      examples: ["YouTuber + TikToker collabs", "Musician + Visual artist partnerships", "Gaming streamers team formation"]
    },
    {
      title: "Creator-to-Brand",
      icon: Handshake,
      description: "Streamlined partnerships between creators and brands with transparent deal management",
      features: ["Brand discovery", "Deal negotiation tools", "Performance tracking", "Payment automation"],
      examples: ["Sponsored content deals", "Product placement partnerships", "Long-term ambassador programs"]
    },
    {
      title: "Creator-to-Professional",
      icon: Network,
      description: "Access specialized professionals who understand the creator economy",
      features: ["Professional matching", "Service booking", "Project collaboration", "Compliance support"],
      examples: ["Tax planning sessions", "Legal contract reviews", "Financial advisory services"]
    }
  ];

  const networkFeatures = [
    {
      icon: Shield,
      title: "Trust & Verification",
      description: "All connections are verified with reputation scores and proof-of-work histories"
    },
    {
      icon: MessageSquare,
      title: "Smart Matching",
      description: "AI-powered matching based on goals, audience overlap, and collaboration history"
    },
    {
      icon: TrendingUp,
      title: "Performance Insights",
      description: "Track collaboration success rates and revenue impact across your network"
    },
    {
      icon: Calendar,
      title: "Integrated Workflows",
      description: "Seamless project management from initial contact to final deliverables"
    }
  ];

  return (
    <div className="bg-[#0b1a2b] text-white min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm mb-6">
            <Globe className="size-4" />
            <span className="opacity-80">Global creator network • Verified connections</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Creator Connections</h1>
          <p className="text-white/80 text-lg max-w-3xl mx-auto">
            Build meaningful partnerships in the creator economy. Connect with other creators, brands, and specialized professionals through our verified network.
          </p>
        </div>

        {/* Connection Types */}
        <div className="space-y-8 mb-16">
          <h2 className="text-2xl font-semibold text-center">How Connections Work</h2>
          
          <div className="grid gap-8 lg:grid-cols-3">
            {connectionTypes.map((type, index) => (
              <Card key={index} className="border-white/10 bg-white/5">
                <CardHeader className="text-center">
                  <type.icon className="size-12 text-[#D4AF37] mx-auto mb-4" />
                  <CardTitle className="text-[#D4AF37]">{type.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-white/80 text-sm">{type.description}</p>
                  
                  <div>
                    <h4 className="font-medium mb-2 text-white">Key Features:</h4>
                    <ul className="space-y-1">
                      {type.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                          <CheckCircle2 className="size-3 text-[#D4AF37]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 text-white">Examples:</h4>
                    <div className="space-y-1">
                      {type.examples.map((example, i) => (
                        <div key={i} className="text-xs text-white/60 bg-white/5 rounded px-2 py-1">
                          {example}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Network Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-center mb-8">Network Features</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {networkFeatures.map((feature, index) => (
              <Card key={index} className="border-white/10 bg-white/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <feature.icon className="size-8 text-[#D4AF37] mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-white/70 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-center mb-8">Success Stories</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <Badge className="w-fit bg-[#D4AF37] text-[#0b1a2b]">Creator Collab</Badge>
                <CardTitle className="text-lg">$2.3M Joint Campaign</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 text-sm">
                  Two gaming creators connected through our platform launched a joint merchandise line, generating $2.3M in first-quarter sales.
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <Badge className="w-fit bg-[#D4AF37] text-[#0b1a2b]">Brand Partnership</Badge>
                <CardTitle className="text-lg">3x Engagement Boost</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 text-sm">
                  A beauty influencer's partnership with a sustainable brand resulted in 300% higher engagement compared to traditional sponsored posts.
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <Badge className="w-fit bg-[#D4AF37] text-[#0b1a2b]">Pro Services</Badge>
                <CardTitle className="text-lg">$180K Tax Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 text-sm">
                  A music creator connected with a specialized tax attorney, restructuring their business to save $180K annually.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Sections */}
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37]/10 to-transparent">
            <CardHeader>
              <CardTitle className="text-[#D4AF37]">Join the Network</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white/80">
                Connect with thousands of verified creators, brands, and professionals. Start building meaningful partnerships today.
              </p>
              <div className="space-y-3">
                <Button className="w-full bg-[#D4AF37] text-[#0b1a2b] hover:bg-[#D4AF37]/90">
                  Join Creator Network
                </Button>
                <Button asChild variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  <Link to="/personas">
                    Explore Personas <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-[#D4AF37]">For Service Professionals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white/80">
                Reach creator economy clients who need specialized expertise. Join our verified professional network.
              </p>
              <div className="space-y-3">
                <Button asChild variant="outline" className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10">
                  <Link to="/pros">Browse Professionals</Link>
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  Apply as Professional
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/5 border border-white/10 rounded-lg p-8">
            <Network className="size-16 text-[#D4AF37] mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Ready to expand your network?</h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Experience the power of verified connections in the creator economy. Build partnerships that drive real results.
            </p>
            <Button asChild className="bg-[#D4AF37] text-[#0b1a2b] hover:bg-[#D4AF37]/90">
              <Link to="#/demo/offerlock">
                Try Platform Demo <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}