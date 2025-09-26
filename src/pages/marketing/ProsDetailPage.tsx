import { useParams, Link } from "react-router-dom";
import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { colors } from "@/components/marketing/_shims/theme";
export default function ProsDetailPage() {
  const { id } = useParams();
  return (
    <div className={`${colors.navyBg} text-white min-h-screen flex flex-col`}>
      <MarketingHeader />
      <main className="marketing-container flex-1 marketing-section max-w-3xl">
        <Link to="/pros" className="text-sm underline">← Back to Pros</Link>
        <h1 className="mt-3 text-3xl font-semibold">Profile</h1>
        <p className="mt-2 text-white/80">This is a demo profile for <code>{id}</code>. Replace with live directory later.</p>
        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="font-semibold">Services</div>
          <ul className="mt-2 list-disc pl-5 text-white/80">
            <li>Creator taxes / NIL reporting</li>
            <li>Contract review and e-sign guidance</li>
            <li>Budget & settlement exports</li>
          </ul>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
