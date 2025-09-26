import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { colors } from "@/components/marketing/_shims/theme";
export default function WhyReceiptsPage() {
  return (
    <div className={`${colors.navyBg} text-white min-h-screen flex flex-col`}>
      <MarketingHeader />
      <main className="marketing-container flex-1 marketing-section max-w-3xl">
        <h1 className="text-3xl font-semibold">Why receipts?</h1>
        <p className="mt-3 text-white/80">
          A receipt here is a private, content-light proof of what happened and why (no oversharing).
          It’s useful for compliance, audits, and resolving disputes — partners see what they need, not what they don’t.
        </p>
        <ul className="mt-6 list-disc pl-5 text-white/80">
          <li>Offer → E-Sign → Settlement steps each leave a small private proof</li>
          <li>Parents/Schools/Brands can view scoped status without seeing sensitive amounts</li>
          <li>Exports for accountants/attorneys are one click when you’re ready</li>
        </ul>
      </main>
      <MarketingFooter />
    </div>
  );
}
