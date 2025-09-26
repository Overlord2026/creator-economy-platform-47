import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  Scale, 
  TrendingUp, 
  Shield, 
  Star, 
  MapPin, 
  Clock,
  CheckCircle2
} from "lucide-react";

export default function ProsPage() {
  const { id } = useParams();

  const professionals = [
    {
      id: 'sarah-chen-cpa',
      name: 'Sarah Chen, CPA',
      title: 'Creator Tax Specialist',
      location: 'Los Angeles, CA',
      rating: 4.9,
      specialties: ['NIL Tax Planning', 'Multi-State Compliance', 'Revenue Optimization'],
      experience: '8+ years',
      clients: 150,
      description: 'Specializing in creator economy taxation with deep expertise in NIL compliance and multi-platform revenue optimization.',
      services: [
        'NIL tax strategy and compliance',
        'Multi-state tax planning',
        'Revenue stream optimization',
        'Quarterly tax planning',
        'Audit representation'
      ],
      rates: '$250-400/hour',
      availability: 'Available this week'
    },
    {
      id: 'michael-torres-esq',
      name: 'Michael Torres, Esq.',
      title: 'Entertainment Attorney',
      location: 'Nashville, TN',
      rating: 4.8,
      specialties: ['Contract Negotiation', 'IP Protection', 'Deal Structure'],
      experience: '12+ years',
      clients: 89,
      description: 'Entertainment law specialist focusing on creator contracts, IP protection, and complex deal negotiations.',
      services: [
        'Contract review and negotiation',
        'Intellectual property protection',
        'Deal structure optimization',
        'Rights management',
        'Dispute resolution'
      ],
      rates: '$300-500/hour',
      availability: 'Available next week'
    },
    {
      id: 'jennifer-kim-cfp',
      name: 'Jennifer Kim, CFP',
      title: 'Creator Wealth Advisor',
      location: 'Austin, TX',
      rating: 4.9,
      specialties: ['Investment Planning', 'Estate Planning', 'Risk Management'],
      experience: '10+ years',
      clients: 67,
      description: 'Financial planning specialist for high-earning creators with focus on wealth preservation and growth strategies.',
      services: [
        'Comprehensive financial planning',
        'Investment portfolio management',
        'Estate planning strategies',
        'Insurance optimization',
        'Retirement planning'
      ],
      rates: '$200-350/hour',
      availability: 'Available this week'
    }
  ];

  if (id) {
    const pro = professionals.find(p => p.id === id);
    if (!pro) {
      return (
        <div className="bg-[#0b1a2b] text-white min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Professional Not Found</h1>
            <Link to="/pros" className="text-[#D4AF37] hover:underline">← Back to professionals</Link>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-[#0b1a2b] text-white min-h-screen">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <Link to="/pros" className="text-[#D4AF37] hover:underline mb-8 inline-block">
            ← Back to all professionals
          </Link>
          
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-white/10 bg-white/5">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl text-[#D4AF37]">{pro.name}</CardTitle>
                      <p className="text-lg text-white/80">{pro.title}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-white/60">
                        <div className="flex items-center gap-1">
                          <MapPin className="size-4" />
                          {pro.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="size-4 fill-[#D4AF37] text-[#D4AF37]" />
                          {pro.rating}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="size-4" />
                          {pro.experience}
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-[#D4AF37] text-[#0b1a2b]">
                      Verified Pro
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 mb-6">{pro.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3 text-[#D4AF37]">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {pro.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="border-white/20 text-white">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 text-[#D4AF37]">Services</h3>
                    <ul className="space-y-2">
                      {pro.services.map((service, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="size-4 text-[#D4AF37]" />
                          <span className="text-white/80">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-white/10 bg-white/5">
                <CardHeader>
                  <CardTitle className="text-[#D4AF37]">Book Consultation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/80">Rates</span>
                      <span className="font-medium">{pro.rates}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Availability</span>
                      <span className="font-medium text-green-400">{pro.availability}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Total Clients</span>
                      <span className="font-medium">{pro.clients}+</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <Button className="w-full bg-[#D4AF37] text-[#0b1a2b] hover:bg-[#D4AF37]/90">
                      Schedule Consultation
                    </Button>
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-white/5">
                <CardHeader>
                  <CardTitle className="text-[#D4AF37]">Client Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-b border-white/10 pb-4">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="size-4 fill-[#D4AF37] text-[#D4AF37]" />
                        ))}
                      </div>
                      <p className="text-sm text-white/80">"Exceptional expertise in creator taxation. Saved me thousands on my NIL deals."</p>
                      <p className="text-xs text-white/60 mt-1">- College Athlete</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="size-4 fill-[#D4AF37] text-[#D4AF37]" />
                        ))}
                      </div>
                      <p className="text-sm text-white/80">"Professional, responsive, and truly understands the creator economy."</p>
                      <p className="text-xs text-white/60 mt-1">- Content Creator</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0b1a2b] text-white min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Trusted Service Professionals</h1>
          <p className="text-white/80 text-lg max-w-3xl mx-auto">
            Connect with verified accountants, attorneys, and advisors who specialize in the creator economy, NIL compliance, and talent management.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <Card className="border-white/10 bg-white/5 text-center">
            <CardHeader>
              <Calculator className="size-12 text-[#D4AF37] mx-auto mb-2" />
              <CardTitle>Tax Specialists</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/70">CPAs specializing in creator taxation, NIL compliance, and multi-state planning.</p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 text-center">
            <CardHeader>
              <Scale className="size-12 text-[#D4AF37] mx-auto mb-2" />
              <CardTitle>Entertainment Lawyers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/70">Attorneys focused on creator contracts, IP protection, and deal negotiations.</p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 text-center">
            <CardHeader>
              <TrendingUp className="size-12 text-[#D4AF37] mx-auto mb-2" />
              <CardTitle>Wealth Advisors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/70">Financial planners with expertise in creator wealth management and estate planning.</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Featured Professionals</h2>
          
          <div className="space-y-4">
            {professionals.map((pro) => (
              <Link key={pro.id} to={`/pros/${pro.id}`} className="block group">
                <Card className="border-white/10 bg-white/5 transition-all hover:translate-y-[-2px] hover:border-[#D4AF37]/50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold group-hover:text-[#D4AF37] transition-colors">
                            {pro.name}
                          </h3>
                          <Badge className="bg-[#D4AF37] text-[#0b1a2b]">
                            Verified
                          </Badge>
                        </div>
                        
                        <p className="text-white/80 mb-2">{pro.title}</p>
                        
                        <div className="flex items-center gap-6 mb-3 text-sm text-white/60">
                          <div className="flex items-center gap-1">
                            <MapPin className="size-4" />
                            {pro.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="size-4 fill-[#D4AF37] text-[#D4AF37]" />
                            {pro.rating}
                          </div>
                          <div className="flex items-center gap-1">
                            <Shield className="size-4" />
                            {pro.clients}+ clients
                          </div>
                        </div>
                        
                        <p className="text-white/70 mb-3">{pro.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {pro.specialties.map((specialty, index) => (
                            <Badge key={index} variant="outline" className="border-white/20 text-white text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-right ml-6">
                        <div className="text-sm text-white/60 mb-1">From</div>
                        <div className="font-semibold">{pro.rates}</div>
                        <div className="text-sm text-green-400 mt-2">{pro.availability}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="bg-white/5 border border-white/10 rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">Ready to connect with a professional?</h3>
            <p className="text-white/80 mb-6">Join our network and get matched with the right specialist for your needs.</p>
            <Button className="bg-[#D4AF37] text-[#0b1a2b] hover:bg-[#D4AF37]/90">
              Join Professional Network
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}