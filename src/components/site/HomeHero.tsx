import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import analytics from '@/lib/analytics';
import { scrollToId, track } from "@/lib/cta";

export function HomeHero() {
  const [group, setGroup] = useState<"family" | "pro">("family");
  const navigate = useNavigate();
  
  useEffect(() => {
    const v = (localStorage.getItem("persona_group") as "family" | "pro") || "family";
    setGroup(v);
    const handler = (e: any) => setGroup(e.detail?.group ?? "family");
    window.addEventListener("persona-switched", handler);
    return () => window.removeEventListener("persona-switched", handler);
  }, []);

  if (group === "pro") {
    return (
      <section className="text-center space-y-6 py-16 px-4 relative z-10">
        <div className="absolute inset-0 pointer-events-none"></div>
        <div className="relative z-10 pointer-events-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground max-w-4xl mx-auto leading-tight">
            Creator Economy Professional Services
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Specialized tools for professionals serving creators—compliance, monetization, and growth management in one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="px-8 py-3 pointer-events-auto"
              onClick={() => { 
                analytics.track("hero.cta.clicked", { group: "pro", cta: "explore_tools" });
                track("hero.cta.clicked", { label: "Explore Tools", group: "pro" });
                // ✅ FIX: go to a real route
                navigate("/tools/value-calculator");
              }}
            >
              Explore Tools
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-3 pointer-events-auto"
              onClick={() => { 
                analytics.track('hero.cta.clicked', { group: 'pro', cta: 'book_demo' });
                track("hero.cta.clicked", { label: "Book a Demo", group: 'pro' });
                navigate("/meet?type=demo"); 
              }}
            >
              Book a Demo
            </Button>
          </div>
          <div className="text-sm text-muted-foreground/80 pt-4">
            Creator Financial Advisors · Entertainment Attorneys · Brand Protection · Compliance Specialists
          </div>
        </div>
      </section>
    );
  }

  // Creator Families and Individuals
  return (
    <section className="text-center space-y-6 py-16 px-4 relative z-10">
      <div className="absolute inset-0 pointer-events-none"></div>
      <div className="relative z-10 pointer-events-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground max-w-4xl mx-auto leading-tight">
          Creator Economy Hub—Monetize Your Talent
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          From NIL athletes to social media influencers—manage brand partnerships, protect your likeness, and build generational wealth with professional support.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="px-8 py-3 pointer-events-auto"
            onClick={() => { 
              analytics.track('hero.cta.clicked', { group: 'creator', cta: 'explore_creator_marketplace' });
              track("hero.cta.clicked", { label: "Explore Creator Marketplace", group: 'creator' });
              navigate("/creator-marketplace"); 
            }}
          >
            Explore Creator Marketplace
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="px-8 py-3 pointer-events-auto"
            onClick={() => { 
              analytics.track('hero.cta.clicked', { group: 'creator', cta: 'find_creator_professionals' });
              track("hero.cta.clicked", { label: "Find Creator Professionals", group: 'creator' });
              navigate("/professionals"); 
            }}
          >
            Find Creator Professionals
          </Button>
        </div>
        <div className="text-sm text-muted-foreground/80 pt-4">
          <Link to="/invite" className="underline hover:no-underline pointer-events-auto">
            I have an invitation
          </Link>
        </div>
      </div>
    </section>
  );
}