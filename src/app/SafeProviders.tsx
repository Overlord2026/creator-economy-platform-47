import React from "react";
import { BOOTSTRAP_MODE } from "@/config/bootstrap";
// Your existing providers (import paths may differ — if a path 404s, tell me and I'll swap it)
import AuthProvider from "@/context/AuthContext";
import EntitlementsProvider from "@/context/EntitlementsContext";

export default function SafeProviders({ children }: { children: React.ReactNode }) {
  if (BOOTSTRAP_MODE) {
    // In bootstrap, render nothing heavy. This avoids the "useState null" crash in host envs.
    return <>{children}</>;
  }
  // Full provider chain when we’re ready
  return (
    <AuthProvider>
      <EntitlementsProvider>
        {children}
      </EntitlementsProvider>
    </AuthProvider>
  );
}
