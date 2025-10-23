import { Link } from "react-router-dom";
import { colors } from "./_shims/theme";
export default function MarketingHeader() {
  return (
    <header className={`${colors.navyBg} text-white border-b border-white/10`}>
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-semibold tracking-tight">Creator • NIL</Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link to="/personas" className="hover:underline">Personas</Link>
          <Link to="/pros" className="hover:underline">Service Pros</Link>
          <Link to="/connections" className="hover:underline">Connections</Link>
          <Link to="/why-receipts" className="hover:underline">Why Receipts</Link>
        </nav>
      </div>
    </header>
  );
}
