import { Link } from "react-router-dom";
import { colors } from "./_shims/theme";
export default function MarketingFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-white/80">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/demo/offerlock" className={`${colors.goldBg} inline-flex items-center rounded-md px-4 py-2 font-medium`}>
            Try the OfferLock demo
          </Link>
          <nav className="flex flex-wrap items-center gap-4">
            <Link to="/personas" className="hover:underline">/#/personas</Link>
            <span className="opacity-40">•</span>
            <Link to="/why-receipts" className="hover:underline">/#/why-receipts</Link>
            <span className="opacity-40">•</span>
            <Link to="/pros" className="hover:underline">/#/pros</Link>
          </nav>
        </div>
        <div className="mt-3 text-xs opacity-70">
          Built by compliance nerds. Designed for humans.
        </div>
      </div>
    </footer>
  );
}
