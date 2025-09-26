import { Link, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Music, 
  Camera, 
  Users, 
  GraduationCap, 
  UserCheck, 
  Building, 
  Calculator 
} from "lucide-react";

export default function PersonasPage() {
  const [searchParams] = useSearchParams();
  const selectedType = searchParams.get('type');

  const personas = [
    {
      id: 'athlete',
      title: 'Athletes (HS/College/Pro)',
      icon: Trophy,
      description: 'NIL deals, endorsements, scholarship compliance',
      features: ['NIL compliance tracking', 'Multi-party approvals', 'Scholarship impact analysis', 'Revenue sharing calculations'],
      cta: 'Start Athletic Career Hub'
    },
    {
      id: 'entertainer', 
      title: 'Entertainers (Music/Film/Live)',
      icon: Music,
      description: 'Performance contracts, royalties, touring deals',
      features: ['Contract negotiations', 'Royalty tracking', 'Tour settlement', 'Rights management'],
      cta: 'Launch Entertainment Hub'
    },
    {
      id: 'creator',
      title: 'Creators/Influencers',
      icon: Camera,
      description: 'Brand partnerships, sponsorships, content deals',
      features: ['Brand deal management', 'Content licensing', 'Platform revenue tracking', 'FTC compliance'],
      cta: 'Create Content Hub'
    },
    {
      id: 'parent',
      title: 'Parents/Guardians',
      icon: Users,
      description: 'Oversight for minor earnings, family financial planning',
      features: ['Minor account oversight', 'Educational fund planning', 'Tax optimization', 'Compliance monitoring'],
      cta: 'Setup Family Oversight'
    },
    {
      id: 'school',
      title: 'Coaches/Schools',
      icon: GraduationCap,
      description: 'NIL compliance, student-athlete monitoring',
      features: ['NIL compliance dashboard', 'Student monitoring', 'Policy enforcement', 'Educational resources'],
      cta: 'Access School Portal'
    },
    {
      id: 'agent',
      title: 'Agents/Representatives',
      icon: UserCheck,
      description: 'Client management, deal negotiations, commission tracking',
      features: ['Client portfolio management', 'Deal pipeline tracking', 'Commission calculations', 'Contract templates'],
      cta: 'Launch Agent Dashboard'
    },
    {
      id: 'brand',
      title: 'Brands/Partners',
      icon: Building,
      description: 'Partnership management, campaign tracking, ROI analysis',
      features: ['Campaign management', 'Influencer discovery', 'Performance analytics', 'Contract automation'],
      cta: 'Start Brand Portal'
    },
    {
      id: 'pros',
      title: 'Service Professionals',
      icon: Calculator,
      description: 'Specialized services for creator economy clients',
      features: ['Creator tax expertise', 'Contract review services', 'Financial planning', 'Compliance consulting'],
      cta: 'Join Professional Network'
    }
  ];

  const selectedPersona = personas.find(p => p.id === selectedType);

  if (selectedPersona) {
    return (
      <div className="bg-[#0b1a2b] text-white min-h-screen">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <Link to="/personas" className="text-[#D4AF37] hover:underline mb-8 inline-block">
            ← Back to all personas
          </Link>
          
          <div className="flex items-center gap-4 mb-8">
            <selectedPersona.icon className="size-12 text-[#D4AF37]" />
            <div>
              <h1 className="text-3xl font-bold">{selectedPersona.title}</h1>
              <p className="text-white/80 text-lg">{selectedPersona.description}</p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-[#D4AF37]">Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {selectedPersona.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                      <span className="text-white/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-[#D4AF37]">Getting Started</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/80">
                  Experience the platform designed specifically for {selectedPersona.title.toLowerCase()}.
                </p>
                <div className="space-y-3">
                  <Button asChild className="w-full bg-[#D4AF37] text-[#0b1a2b] hover:bg-[#D4AF37]/90">
                    <Link to="#/demo/offerlock">{selectedPersona.cta}</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    <Link to="/pros">Find Specialized Professionals</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0b1a2b] text-white min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Path</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Each persona gets specialized tools, workflows, and compliance features designed for their unique needs in the creator economy.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {personas.map((persona) => (
            <Link key={persona.id} to={`/personas?type=${persona.id}`} className="group">
              <Card className="h-full border-white/10 bg-white/5 transition-all hover:translate-y-[-4px] hover:border-[#D4AF37]/50 hover:bg-white/10">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <persona.icon className="size-8 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                    <Badge variant="outline" className="border-[#D4AF37]/30 text-[#D4AF37]">
                      {persona.id}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-[#D4AF37] transition-colors">
                    {persona.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-sm mb-4">{persona.description}</p>
                  <div className="text-xs text-white/50">
                    Click to explore specialized features →
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild className="bg-[#D4AF37] text-[#0b1a2b] hover:bg-[#D4AF37]/90">
            <Link to="#/demo/offerlock">Try the Platform Demo</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}