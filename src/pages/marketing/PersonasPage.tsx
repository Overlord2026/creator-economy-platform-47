import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { colors } from "@/components/marketing/_shims/theme";
import { Link, useLocation } from "react-router-dom";
const tiles: Array<[string, string, string[]]> = [
  ["Athlete (HS/College/Pro)", "athlete", ["OfferLock", "School approvals", "Parent co-sign"]],
  ["Entertainer (music, film, live)", "entertainer", ["Briefs", "Usage windows", "Merch"]],
  ["Creator/Influencer (YouTube/TikTok/IG)", "creator", ["Shoutouts", "Sessions", "Disclosure"]],
  ["Parent/Guardian", "parent", ["Scoped views", "Emergency card", "Co-sign"]],
  ["Coach/School", "school", ["Approvals", "Disclosure status", "Export packs"]],
  ["Agent/Rep", "agent", ["Pipeline", "Delta receipts", "E-sign"]],
  ["Brand/Partner", "brand", ["Briefs", "Approvals", "Settlement proof"]],
  ["Service Professional (Accountant • Attorney • Advisor)", "pros", ["Tax exports", "Contracts", "Compliance"]],
];
export default function PersonasPage() {
  const { search } = useLocation();
  const selected = new URLSearchParams(search).get("type") ?? "";
  return (
    <div className={`${colors.navyBg} text-white min-h-screen flex flex-col`}>
      <MarketingHeader />
      <main className="marketing-container flex-1 marketing-section">
        <h1 className="text-3xl font-semibold">Personas</h1>
        <p className="mt-2 text-white/80">Choose who you are — we’ll tailor the view.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tiles.map(([label, key, bullets]) => (
            <div key={key} className={`rounded-xl border p-4 ${selected===key ? "border-white/60 bg-white/10":"border-white/10 bg-white/5"}`}>
              <div className="flex items-center justify-between">
                <div className="font-semibold">{label}</div>
                <Link to={`/personas?type=${key}`} className="text-xs underline">Open</Link>
              </div>
              <ul className="mt-3 space-y-1 text-sm text-white/80">
                {bullets.map((b)=><li key={b}>• {b}</li>)}
              </ul>
              <div className="mt-3 text-xs opacity-70">Primary CTA points to <span className="opacity-100">#/demo/offerlock</span></div>
            </div>
          ))}
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
