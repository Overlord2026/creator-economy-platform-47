import * as React from 'react';
import { Outlet } from 'react-router-dom';

export default function MarketingLayout() {
  return (
    <div className="min-h-screen bg-[#0b1220] text-slate-100">
      {/* header / nav goes here */}
      <header className="p-4 text-center">
        <span className="font-semibold">Creator NIL Demo</span> • HashRouter
      </header>

      {/* nested route content renders here */}
      <Outlet />

      {/* footer if you have one */}
    </div>
  );
}
