import React from "react";
import { Link } from "react-router-dom";
import { deals, fmt } from "@/lib/demo/deals";

const NAVY = "#0B2239";

const statusColor: Record<string,string> = {
  draft: "text-white/70",
  offer_locked: "text-amber-300",
  signed: "text-emerald-300",
  settled: "text-blue-300",
};

export default function DealsList(){
  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 text-white" style={{background:NAVY}}>
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-extrabold">Deals</h1>
        <p className="mt-2 text-white/80">Browse your recent offers, contracts, and settlements.</p>

        <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-white/70">
              <tr>
                <th className="px-3 py-2 text-left">Title</th>
                <th className="px-3 py-2 text-left">Brand</th>
                <th className="px-3 py-2 text-left">Athlete</th>
                <th className="px-3 py-2 text-right">Amount</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {deals.map(d=>(
                <tr key={d.id} className="hover:bg-white/5">
                  <td className="px-3 py-2">{d.title}</td>
                  <td className="px-3 py-2">{d.brand}</td>
                  <td className="px-3 py-2">{d.athlete}</td>
                  <td className="px-3 py-2 text-right">{fmt(d.amount)}</td>
                  <td className={`px-3 py-2 ${statusColor[d.status] || "text-white/70"}`}>{d.status}</td>
                  <td className="px-3 py-2 text-right">
                    <Link to={`/deals/${d.id}`} className="rounded-md border border-[var(--gold)] px-2 py-1 text-xs font-semibold text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black">Open</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-sm text-white/60">Demo data only — wire to real endpoints later.</div>
      </div>
    </main>
  );
}
