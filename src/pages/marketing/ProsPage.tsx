import { Link } from "react-router-dom";
import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { colors } from "@/components/marketing/_shims/theme";
const PROS = [
  { id: "acct-1", role: "Accountant", name: "Harper & Co. CPAs", focus: "Creator taxes • NIL reporting" },
  { id: "atty-1", role: "Attorney",   name: "Mason Legal",        focus: "Contracts • IP • Licensing" },
  { id: "adv-1", role: "Advisor",     name: "Boutique Family Office", focus: "Budget • Cash flow • Planning" },
];
export default function ProsPage() {
  return (
    <div className={`${colors.navyBg} text-white min-h-screen flex flex-col`}>
      <MarketingHeader />
      <main className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:py-16">
        <h1 className="text-3xl font-semibold">Service Pros</h1>
        <p className="mt-2 text-white/80">Find accountants, attorneys, and advisors who get creator work.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {PROS.map((p)=>(
            <Link to={`/pros/${p.id}`} key={p.id} className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/20">
              <div className="text-xs opacity-70">{p.role}</div>
              <div className="mt-1 font-semibold">{p.name}</div>
              <div className="text-white/80">{p.focus}</div>
            </Link>
          ))}
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
