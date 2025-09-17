
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export function FreeTierAdvisorBanner() {
  const navigate = useNavigate();
  
  return (
    <div className="mb-8 p-6 bg-[#0F0F2D] rounded-lg border border-gray-700">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            You're now listed in our Creator Economy Marketplace as a <Badge className="ml-1 bg-gray-600">Free Tier</Badge> Professional
          </h2>
        </div>
        
        <p className="text-gray-400">
          Creators can discover your specialized services but keep in mind:
        </p>
        
        <ul className="space-y-2 mb-2">
          <li className="flex items-start gap-2">
            <span className="text-[#1EAEDB] font-bold">•</span>
            <span>You'll appear after premium-tier professionals in creator searches</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#1EAEDB] font-bold">•</span>
            <span>Limited access to creator-specific templates and compliance tools</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#1EAEDB] font-bold">•</span>
            <span>Basic creator matching and discovery features only</span>
          </li>
        </ul>
        
        <p className="text-gray-400 mb-4">
          Upgrade to Standard or Premium to unlock enhanced creator visibility, specialized tools, and advanced matching features.
        </p>
        
        <div>
          <Button 
            variant="advisor" 
            onClick={() => navigate("/subscription")}
          >
            Upgrade Your Professional Tier
          </Button>
        </div>
      </div>
    </div>
  );
}
