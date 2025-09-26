import { Routes, Route } from "react-router-dom";
import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import Landing from "@/pages/Landing";
import PersonasPage from "@/pages/marketing/PersonasPage";
import ProsPage from "@/pages/marketing/ProsPage";
import ConnectionsPage from "@/pages/marketing/ConnectionsPage";
import WhyReceiptsPage from "@/pages/marketing/WhyReceiptsPage";

export default function MarketingRoutes() {
  return (
    <div className="min-h-screen flex flex-col">
      <MarketingHeader />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/personas" element={<PersonasPage />} />
          <Route path="/pros" element={<ProsPage />} />
          <Route path="/pros/:id" element={<ProsPage />} />
          <Route path="/connections" element={<ConnectionsPage />} />
          <Route path="/why-receipts" element={<WhyReceiptsPage />} />
        </Routes>
      </main>
      <MarketingFooter />
    </div>
  );
}