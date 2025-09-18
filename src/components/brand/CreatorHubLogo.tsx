import * as React from 'react';

type Props = { 
  variant?: 'mark' | 'lockup'; 
  className?: string; 
  ariaLabel?: string; 
};

export default function CreatorHubLogo({ 
  variant = 'lockup', 
  className = '', 
  ariaLabel = 'Creator Economy Hub' 
}: Props) {
  const src = variant === 'mark' ? '/creatorhub-icon.svg' : '/creatorhub-lockup.svg';
  
  return (
    <img 
      src={src} 
      alt="" 
      role="img" 
      aria-label={ariaLabel} 
      height={variant === 'mark' ? 28 : 32} 
      className={className} 
      style={{ display: 'inline-block' }} 
    />
  );
}