import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { colors } from "@/components/marketing/_shims/theme";
export default function ConnectionsPage() {
  return (
    <div className={`${colors.navyBg} text-white min-h-screen flex flex-col`}>
      <MarketingHeader />
      <main className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:py-16">
        <h1 className="text-3xl font-semibold">Connections</h1>
        <p className="mt-2 text-white/80">Connect your team and tools when you’re ready. For the demo, this page is UI-only.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {["School oversight", "Parent/guardian co-sign", "Agent pipeline", "Brand briefs", "Merch/Storefront", "CPA export"].map(x => (
            <div key={x} className="rounded-xl border border-white/10 bg-white/5 p-4">{x}</div>
          ))}
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
