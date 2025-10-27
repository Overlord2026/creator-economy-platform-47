'use client';
import React from 'react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  return (
    <div className="min-h-screen text-white bg-[#0b1a2b]">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-semibold">Creator • NIL — Dashboard</h1>
        <p className="mt-2 text-white/80">UI-only dashboard stub (replace with real widgets).</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h2 className="font-semibold mb-2">My Deals</h2>
            <ul className="text-white/80 list-disc pl-5">
              <li>Upcoming: Brand A — Promo Post</li>
              <li>Pending: Podcast Guest Spot</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h2 className="font-semibold mb-2">Earnings</h2>
            <div className="text-3xl font-bold">$4,250</div>
            <div className="text-white/60 text-sm">Last 30 days</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h2 className="font-semibold mb-2">Quick Links</h2>
            <ul className="text-white/80 space-y-2">
              <li><Link to="/demo/offerlock" className="underline">Open OfferLock</Link></li>
              <li><Link to="/pros" className="underline">Browse Service Pros</Link></li>
              <li><Link to="/" className="underline">Home</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
