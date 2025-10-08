import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { sb } from '@/lib/supabase-relaxed';

/**
 * DynamicLandingController - Routes users to appropriate pages based on segment and profile
 * Uses segment, advisor_id, utm parameters, and user role to determine the best landing experience
 */
export const DynamicLandingController: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userProfile, isAuthenticated, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && isAuthenticated && userProfile) {
      const params = new URLSearchParams(location.search);
      
      // Check if we're on a landing page that requires segment-specific routing
      const needsRouting = location.pathname === "/" ||
                           location.pathname === "/login" || 
                           location.pathname === "/onboarding";

      // Don't run routing logic if we're not on a landing page
      if (!needsRouting) {
        return;
      }

      // Extract basic routing parameters
      const role = userProfile?.role;
      const isNewLogin = params.get("newLogin") === "true";
      
      // Route based on user role first
      if (role === "advisor" || role === "admin" || role === "system_administrator") {
        navigate("/creator", { replace: true });
        return;
      }

      // For first time login, go to onboarding
      if (isNewLogin) {
        navigate("/onboarding", { replace: true });
        return;
      }

      // Default landing for authenticated users
      navigate("/creator", { replace: true });
    }
  }, [isLoading, isAuthenticated, userProfile, location.pathname, navigate, location.search]);


  return <>{children}</>;
};