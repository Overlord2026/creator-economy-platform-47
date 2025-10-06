'use client';
import * as React from 'react';
import { Outlet } from 'react-router-dom';

export default function MarketingLayout() {
  // Put your marketing header/footer/chrome here
  return (
    <div>
      {/* header / nav */}
      <Outlet /> {/* children from App.tsx render here */}
      {/* footer */}
    </div>
  );
}
