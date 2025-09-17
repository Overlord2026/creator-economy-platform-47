import React from 'react';

interface CategoryGridProps {
  children: React.ReactNode;
  className?: string;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 ${className}`}>
      {children}
    </div>
  );
};