export type Deal = {
  id: string;
  title: string;
  brand: string;
  athlete: string;
  amount: number;
  status: "draft" | "offer_locked" | "signed" | "settled";
  updatedAt: string;
};

export const deals: Deal[] = [
  { id:"dl-1001", title:"Instagram Shout-out", brand:"BrandCo", athlete:"A. Carter", amount:800,  status:"offer_locked", updatedAt:"2025-11-01T10:00:00Z" },
  { id:"dl-1002", title:"Podcast Read",       brand:"PodNet",  athlete:"J. Reed",   amount:1500, status:"signed",       updatedAt:"2025-11-02T12:30:00Z" },
  { id:"dl-1003", title:"Pop-up Signing",      brand:"Metro",   athlete:"S. Lee",    amount:500,  status:"draft",        updatedAt:"2025-10-28T09:00:00Z" },
  { id:"dl-1004", title:"TikTok Campaign",     brand:"State U", athlete:"M. Diaz",   amount:2200, status:"settled",      updatedAt:"2025-10-25T14:20:00Z" },
];

export function getDeal(id: string): Deal | undefined {
  return deals.find(d => d.id === id);
}

export function fmt(n: number){ return `$${n.toLocaleString()}`; }
