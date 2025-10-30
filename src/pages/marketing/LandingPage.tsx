import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Github, ShieldCheck, Zap, Wrench, LineChart, GitPullRequest, Bell, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { useScrollToHash } from "@/lib/useScrollToHash";

export default function LandingPage() {
  useScrollToHash();
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <SiteHeader />
      <Hero />
      <Logos />
      <Features />
      <HowItWorks />
      <ValueProps />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <SiteFooter />
    </div>
  );
}

// Header / Navigation Bar
function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="font-semibold">Creator NIL</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link to="/#features" className="text-slate-600 hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-white">Features</Link>
          <Link to="/#how" className="text-slate-600 hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-white">How it works</Link>
          <Link to="/#pricing" className="text-slate-600 hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-white">Pricing</Link>
          <Link to="/#faq" className="text-slate-600 hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-white">FAQ</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <Link to="/signin" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-white">Sign in</Link>
          </Button>
          <Button asChild className="group">
            <Link to="/signup" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-white">
              Sign up
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

// Hero Section
function Hero() {
  return (
    <section className="relative overflow-hidden border-b bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 12 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }} 
            className="text-4xl font-extrabold tracking-tight sm:text-5xl"
          >
            Unlock the value of your <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Name, Image & Likeness</span>.
          </motion.h1>
          <p className="mt-5 max-w-xl text-lg text-slate-600">
            Creator NIL is a platform that empowers creators to monetize their personal brand through streamlined sponsorship deals and partnerships.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-11 px-6">
              <Link to="/signup" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-white">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 px-6">
              <Link to="/contact" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-white">Learn More</Link>
            </Button>
          </div>
          <ul className="mt-6 grid grid-cols-1 gap-2 text-sm text-slate-600 sm:grid-cols-2">
            {[
              "Find and manage sponsorships",
              "No middlemen or hidden fees",
              "Secure contracts & payments",
              "Insights into your impact",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#D4AF37]" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          {/* Placeholder for hero image or illustration */}
          <div className="relative h-64 w-full rounded-2xl border bg-slate-100 shadow-sm sm:h-80">
            <span className="absolute inset-0 flex items-center justify-center text-slate-400">[Hero Image]</span>
          </div>
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-yellow-200/40 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}

// Logos / Trust Indicators
function Logos() {
  return (
    <section className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 flex flex-wrap items-center justify-center gap-6 opacity-75">
        {/* TODO: Insert sponsor/partner logos if available */}
        <span className="text-sm text-slate-500">Trusted by 100+ creators and brands</span>
      </div>
    </section>
  );
}

// Features Section
function Features() {
  return (
    <section id="features" className="border-b bg-white scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Key Features</h2>
        <p className="mt-2 max-w-2xl text-slate-600">Our platform provides everything you need to make the most of your NIL opportunities.</p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-[#0b1a2b] p-3">
              <Zap className="h-6 w-6 text-[#D4AF37]" />
            </div>
            <h3 className="text-lg font-semibold">Find Sponsorships</h3>
            <p className="mt-2 text-slate-600">Browse and get matched with NIL opportunities from brands that fit your audience.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-[#0b1a2b] p-3">
              <ShieldCheck className="h-6 w-6 text-[#D4AF37]" />
            </div>
            <h3 className="text-lg font-semibold">Secure & Compliant</h3>
            <p className="mt-2 text-slate-600">We ensure contracts and payments are secure and NCAA-compliant for student-athletes.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-[#0b1a2b] p-3">
              <LineChart className="h-6 w-6 text-[#D4AF37]" />
            </div>
            <h3 className="text-lg font-semibold">Insights & Growth</h3>
            <p className="mt-2 text-slate-600">Track your earnings and measure engagement with built-in analytics dashboards.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// How It Works Section
function HowItWorks() {
  const steps = [
    { icon: Wrench, title: "Sign Up", desc: "Create your profile to join the platform." },
    { icon: Sparkles, title: "Connect", desc: "Get matched with brands or browse sponsorship deals." },
    { icon: Check, title: "Earn", desc: "Sign contracts and start earning from NIL opportunities." },
  ];
  return (
    <section id="how" className="border-b bg-white scroll-mt-24">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold">How it works</h2>
        <ol className="mt-8 flex flex-col gap-8 sm:flex-row">
          {steps.map((step, idx) => (
            <li key={idx} className="flex-1 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#0b1a2b] text-white">
                <step.icon className="h-6 w-6 text-[#D4AF37]" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-slate-600">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// Why Choose Us / Value Proposition Section
function ValueProps() {
  const bullets = [
    "Connect with reputable brands directly",
    "Maintain control of your brand and image",
    "Track all deals and earnings in one place",
    "No hidden fees or middlemen",
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="rounded-2xl border bg-white p-6 shadow-sm md:p-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold">Why creators choose Creator NIL</h3>
            <p className="mt-2 max-w-xl text-slate-600">Focus on growing your personal brand while we handle the rest. Creator NIL takes care of the details so you can maximize your earnings and opportunities.</p>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#D4AF37]" /> {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// Pricing Section
function Pricing() {
  return (
    <section id="pricing" className="border-t bg-white scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold">Simple, transparent pricing</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-slate-600">No upfront costs. Free to join, with optional upgrades as you grow.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <PriceCard
            name="Free"
            price="$0"
            blurb="For new creators starting out"
            features={["Access marketplace", "Standard support", "Community resources"]}
            cta="Join for free"
            to="/signup?plan=free"
          />
          <PriceCard
            name="Pro"
            price="$49"
            tag="Most Popular"
            blurb="For growing creators ready for more"
            features={["Featured profile", "Advanced analytics", "Priority support"]}
            cta="Upgrade to Pro"
            to="/signup?plan=pro"
            highlighted
          />
          <PriceCard
            name="Enterprise"
            price="Custom"
            blurb="For agencies & large programs"
            features={["Dedicated account manager", "Custom integrations", "Bulk onboarding"]}
            cta="Contact us"
            to="/contact"
          />
        </div>
      </div>
    </section>
  );
}

function PriceCard({
  name, price, blurb, features, cta, highlighted, tag, to,
}: {
  name: string; price: string; blurb: string; features: string[];
  cta: string; highlighted?: boolean; tag?: string; to?: string;
}) {
  return (
    <Card className={`relative ${highlighted ? "border-slate-900 shadow-md" : "shadow-sm"}`}>
      {tag && <span className="absolute right-3 top-3 rounded-full bg-slate-900 px-2 py-1 text-xs font-semibold text-white">{tag}</span>}
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
        <div className="mt-1 text-3xl font-extrabold">
          {price}{price !== "Custom" && <span className="text-base font-normal text-slate-500">/mo</span>}
        </div>
        <p className="text-sm text-slate-600">{blurb}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-slate-700">
          {features.map(f => (
            <li key={f} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#D4AF37]" /> {f}
            </li>
          ))}
        </ul>
        {to ? (
          <Button asChild className="mt-6 w-full" variant={highlighted ? "default" : "outline"}>
            <Link to={to} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-white">{cta}</Link>
          </Button>
        ) : (
          <Button className="mt-6 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-white" variant={highlighted ? "default" : "outline"}>
            {cta}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// Testimonials Section
function Testimonials() {
  const quotes = [
    { name: "Alex J.", role: "College Athlete", quote: "I signed multiple endorsement deals within weeks of joining. The process was seamless!" },
    { name: "Jamie L.", role: "Content Creator", quote: "Creator NIL opened up opportunities I never had access to before. It's a game changer." },
  ];
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold">Trusted by creators nationwide</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {quotes.map((q) => (
            <Card key={q.name} className="shadow-sm">
              <CardContent className="pt-6 text-slate-700">
                “{q.quote}”
                <div className="mt-4 text-sm text-slate-500">— {q.name}, {q.role}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQ() {
  const faqs = [
    { q: "What is the Creator NIL platform?", a: "Creator NIL is an online marketplace that connects creators (like student-athletes and influencers) with brand sponsorship opportunities. It streamlines the process of finding, negotiating, and managing name-image-likeness deals." },
    { q: "Who can join?", a: "Any creator who wants to monetize their name, image, and likeness can join. This includes student-athletes, content creators, and influencers looking for sponsorship or partnership deals." },
    { q: "What does it cost to use?", a: "Signing up and using Creator NIL is free for creators. We may take a small commission or fee from successful deals to sustain the platform, but there are no upfront charges." },
    { q: "How do I get started?", a: "Simply sign up and create your profile. Once your profile is set up, you can browse available sponsorship opportunities or get matched with interested brands. From there, you can negotiate terms and finalize deals all through our platform." },
  ];
  return (
    <section id="faq" className="bg-[#0b1a2b] text-white px-4 py-16 scroll-mt-24">
      <h2 className="text-center text-3xl font-bold">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="mt-6 space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-b border-white/25">
            <AccordionTrigger className="text-left hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1a2b]">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="mt-2 text-white/80">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

// Final Call-to-Action Section
function CTA() {
  return (
    <section className="border-y bg-white">
      <div className="mx-auto max-w-5xl px-4 py-16 text-center">
        <h3 className="text-3xl font-bold">Ready to unlock your NIL potential?</h3>
        <p className="mx-auto mt-2 max-w-2xl text-slate-600">
          Get started today. Create your profile and start connecting with brands that value what you have to offer.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/signup" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-white">Sign up now</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/contact" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-white">Contact us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

// Footer
function SiteFooter() {
  return (
    <footer className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="font-semibold">Creator NIL</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">Empowering creators through name, image &amp; likeness.</p>
          </div>
          <div className="text-sm text-slate-600">
            <div className="font-semibold text-slate-900">Product</div>
            <ul className="mt-2 space-y-1">
              <li><Link to="#features" className="hover:underline hover:text-[#D4AF37]">Features</Link></li>
              <li><Link to="#pricing" className="hover:underline hover:text-[#D4AF37]">Pricing</Link></li>
              <li><Link to="#how" className="hover:underline hover:text-[#D4AF37]">How it works</Link></li>
            </ul>
          </div>
          <div className="text-sm text-slate-600">
            <div className="font-semibold text-slate-900">Company</div>
            <ul className="mt-2 space-y-1">
              <li><Link to="/contact" className="hover:underline hover:text-[#D4AF37]">Contact</Link></li>
              <li><a href="#" className="hover:underline hover:text-[#D4AF37]">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline hover:text-[#D4AF37]">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-sm text-slate-500">
          © ${new Date().getFullYear()} Creator NIL. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
