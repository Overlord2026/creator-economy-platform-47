import React from 'react';

interface LogoProps {
  variant?: 'tree' | 'hero' | 'default';
  className?: string;
  useTenantLogo?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  variant = 'default', 
  className = '', 
  useTenantLogo = true 
}) => {
  return (
    <div className={`font-bold text-primary ${className}`}>
      CreatorHub
    </div>
  );
};

export default Logo;