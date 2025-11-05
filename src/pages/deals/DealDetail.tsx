import React from "react";
import { Link, useParams } from "react-router-dom";
import { getDeal, fmt } from "@/lib/demo/deals";

const NAVY = "#0B2239";

export default function DealDetail(){
  const { id } = useParams();
  const deal = id ? getDeal(id) : undefined;

  if(!deal){
    return (
      <main className="min-h-screen p-8 text-white" style={{background:NAVY}}>
        <div className="mx-auto max-w-3xl">
          <p className="text-white/80">Deal not found.</p>
          <div className="mt-3">
            <Link to="/deals" className="rounded-md border border-[var(--gold)] px-3 py-1.5 text-sm font-semibold text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black">Back to deals</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 text-white" style={{background:NAVY}}>
      <div className="mx-auto max-w-3xl">
        <div className="flex items-baseline justify-between gap-3">
          <h1 className="text-3xl font-extrabold">{deal.title}</h1>
          <span className="rounded-full border border-white/20 px-2 py-0.5 text-xs text-white/70">{deal.status}</span>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Info label="Brand" value={deal.brand}/>
          <Info label="Athlete" value={deal.athlete}/>
          <Info label="Amount" value={fmt(deal.amount)}/>
          <Info label="Last update" value={new Date(deal.updatedAt).toLocaleString()}/>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link to="/demo/offerlock" className="rounded-md border border-[var(--gold)] px-3 py-1.5 text-sm font-semibold text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black">Open in OfferLock</Link>
          <Link to="/deals" className="rounded-md border border-white/20 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10">Back to list</Link>
        </div>

        <p className="mt-6 text-sm text-white/70">This is a demo detail view. Add documents, messages, approvals, and receipts here.</p>
      </div>
    </main>
  );
}

function Info({label, value}:{label:string; value:string}){
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs text-white/60">{label}</div>
      <div className="mt-1 text-base font-semibold">{value}</div>
    </div>
  );
}
