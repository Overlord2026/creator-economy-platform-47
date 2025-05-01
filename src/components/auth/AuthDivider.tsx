
import React from "react";

export const AuthDivider: React.FC = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-gray-700"></span>
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-[#121630] px-2 text-gray-400">Or continue with</span>
      </div>
    </div>
  );
};
