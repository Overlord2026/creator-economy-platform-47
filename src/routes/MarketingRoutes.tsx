import { Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/marketing/LandingPage";
import PersonasPage from "@/pages/marketing/PersonasPage";
import ProsPage from "@/pages/marketing/ProsPage";
import ProsDetailPage from "@/pages/marketing/ProsDetailPage";
import ConnectionsPage from "@/pages/marketing/ConnectionsPage";
import WhyReceiptsPage from "@/pages/marketing/WhyReceiptsPage";

export default function MarketingRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/personas" element={<PersonasPage />} />
      <Route path="/pros" element={<ProsPage />} />
      <Route path="/pros/:id" element={<ProsDetailPage />} />
      <Route path="/connections" element={<ConnectionsPage />} />
      <Route path="/why-receipts" element={<WhyReceiptsPage />} />
    </Routes>
  );
}
