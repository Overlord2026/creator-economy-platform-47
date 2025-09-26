import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Receipt, 
  Shield, 
  Eye, 
  Lock,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Clock,
  Users,
  ArrowRight,
  Lightbulb,
  Scale
} from "lucide-react";

export default function WhyReceiptsPage() {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Dispute Resolution",
      description: "When deals go wrong, who can prove what actually happened?",
      scenario: "A brand claims a creator didn't meet delivery requirements. Without receipts, it's just he-said-she-said."
    },
    {
      icon: Eye,
      title: "Privacy vs. Transparency",
      description: "Parents need oversight, but creators deserve privacy.",
      scenario: "College athletes need parental approval for NIL deals, but don't want to share exact payment amounts."
    },
    {
      icon: Scale,
      title: "Compliance Documentation",
      description: "Proving compliance without revealing sensitive details.",
      scenario: "Schools need to verify NIL deals are compliant without accessing private financial information."
    }
  ];

  const solutionFeatures = [
    {
      icon: Receipt,
      title: "Content-Free Receipts",
      description: "Prove what happened without revealing sensitive details",
      example: "Receipt shows 'NIL deal approved by compliance team' without showing payment amount"
    },
    {
      icon: Shield,
      title: "Cryptographic Verification",
      description: "Mathematical proof that receipts haven't been tampered with",
      example: "Blockchain anchoring ensures receipts are immutable and independently verifiable"
    },
    {
      icon: Lock,
      title: "Privacy by Design",
      description: "Only share what's necessary with each party",
      example: "Parents see approval status, schools see compliance, creators keep payment details private"
    },
    {
      icon: Clock,
      title: "Timestamped Actions",
      description: "Every action is logged with precise timing",
      example: "Prove exactly when contracts were signed, payments were made, or approvals were given"
    }
  ];

  const useCases = [
    {
      persona: "College Athlete",
      scenario: "NIL Deal Compliance",
      challenge: "Need to prove deal compliance to school without revealing payment details",
      solution: "Receipt shows 'NIL compliance verified' with timestamp, without exposing private terms",
      stakeholders: ["Athlete", "School", "Parents", "NCAA"]
    },
    {
      persona: "Content Creator",
      scenario: "Brand Partnership Dispute",
      challenge: "Brand claims deliverables weren't met on time",
      solution: "Timestamped receipts prove exactly when content was delivered and approved",
      stakeholders: ["Creator", "Brand", "Agents", "Legal Teams"]
    },
    {
      persona: "Minor Creator",
      scenario: "Parental Oversight",
      challenge: "Parents need approval rights but creator wants earnings privacy",
      solution: "Parents get approval receipts, creator keeps earning details private",
      stakeholders: ["Minor", "Parents", "Platforms", "Tax Advisors"]
    }
  ];

  return (
    <div className="bg-[#0b1a2b] text-white min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm mb-6">
            <Receipt className="size-4" />
            <span className="opacity-80">Proof without oversharing • Mathematical certainty</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Why Receipts Matter</h1>
          <p className="text-white/80 text-xl max-w-3xl mx-auto">
            In the creator economy, trust is everything. But traditional contracts and handshake deals aren't enough when money, compliance, and reputations are on the line.
          </p>
        </div>

        {/* The Problem */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">The Problems We Solve</h2>
          
          <div className="grid gap-6 lg:grid-cols-3">
            {problems.map((problem, index) => (
              <Card key={index} className="border-red-500/20 bg-red-500/5">
                <CardHeader>
                  <problem.icon className="size-8 text-red-400 mb-2" />
                  <CardTitle className="text-red-400">{problem.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-white/80 text-sm">{problem.description}</p>
                  <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
                    <p className="text-red-200 text-xs italic">"{problem.scenario}"</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* The Solution */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">Our Solution: Smart Receipts</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {solutionFeatures.map((feature, index) => (
              <Card key={index} className="border-[#D4AF37]/20 bg-[#D4AF37]/5">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <feature.icon className="size-8 text-[#D4AF37]" />
                    <CardTitle className="text-[#D4AF37]">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-white/80 text-sm">{feature.description}</p>
                  <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded p-3">
                    <p className="text-[#D4AF37] text-xs">{feature.example}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Real-World Use Cases */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">Real-World Use Cases</h2>
          
          <div className="space-y-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="border-white/10 bg-white/5">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge className="bg-[#D4AF37] text-[#0b1a2b] mb-2">{useCase.persona}</Badge>
                      <CardTitle className="text-lg">{useCase.scenario}</CardTitle>
                    </div>
                    <Users className="size-6 text-[#D4AF37]" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium text-red-400 mb-2">Challenge:</h4>
                      <p className="text-white/70 text-sm">{useCase.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-400 mb-2">Solution:</h4>
                      <p className="text-white/70 text-sm">{useCase.solution}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Stakeholders:</h4>
                    <div className="flex flex-wrap gap-2">
                      {useCase.stakeholders.map((stakeholder, i) => (
                        <Badge key={i} variant="outline" className="border-white/20 text-white text-xs">
                          {stakeholder}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">How Receipt Generation Works</h2>
          
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="border-white/10 bg-white/5 text-center">
              <CardHeader>
                <div className="size-12 bg-[#D4AF37] text-[#0b1a2b] rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-lg">1</div>
                <CardTitle className="text-base">Action Occurs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 text-sm">Contract signed, payment made, content delivered</p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 text-center">
              <CardHeader>
                <div className="size-12 bg-[#D4AF37] text-[#0b1a2b] rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-lg">2</div>
                <CardTitle className="text-base">Receipt Generated</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 text-sm">Content-free proof of what happened, when, and by whom</p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 text-center">
              <CardHeader>
                <div className="size-12 bg-[#D4AF37] text-[#0b1a2b] rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-lg">3</div>
                <CardTitle className="text-base">Cryptographic Seal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 text-sm">Receipt is sealed and optionally anchored to blockchain</p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 text-center">
              <CardHeader>
                <div className="size-12 bg-[#D4AF37] text-[#0b1a2b] rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-lg">4</div>
                <CardTitle className="text-base">Selective Sharing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 text-sm">Each party sees only what they need to see</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Benefits Summary */}
        <div className="mb-16">
          <Card className="border-[#D4AF37]/20 bg-gradient-to-br from-[#D4AF37]/10 to-transparent">
            <CardHeader className="text-center">
              <Lightbulb className="size-12 text-[#D4AF37] mx-auto mb-4" />
              <CardTitle className="text-2xl text-[#D4AF37]">The Bottom Line</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white/90 text-center text-lg">
                Receipts transform trust from "take my word for it" to "here's mathematical proof."
              </p>
              
              <div className="grid gap-4 md:grid-cols-3 mt-8">
                <div className="text-center">
                  <CheckCircle2 className="size-8 text-green-400 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Dispute Prevention</h3>
                  <p className="text-white/70 text-sm">Clear proof prevents arguments before they start</p>
                </div>
                
                <div className="text-center">
                  <FileCheck className="size-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Compliance Made Easy</h3>
                  <p className="text-white/70 text-sm">Prove compliance without revealing private details</p>
                </div>
                
                <div className="text-center">
                  <Shield className="size-8 text-purple-400 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Privacy Protected</h3>
                  <p className="text-white/70 text-sm">Share proof, not private information</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-white/5 border border-white/10 rounded-lg p-8">
            <Receipt className="size-16 text-[#D4AF37] mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Experience Receipts in Action</h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              See how content-free receipts work in practice. Try our demo to understand the power of proof without oversharing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-[#D4AF37] text-[#0b1a2b] hover:bg-[#D4AF37]/90">
                <Link to="#/demo/offerlock">
                  Try the Demo <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Link to="/connections">
                  Learn About Connections
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}