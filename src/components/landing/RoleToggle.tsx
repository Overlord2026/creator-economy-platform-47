import { useState } from 'react';
import { landing } from '../../data/landing';
import { track } from '../../lib/track';

export default function RoleToggle(
  {onChange}:{onChange:(seg:'creators'|'schools')=>void}
){
  const [seg,setSeg]=useState<'creators'|'schools'>(landing.hero.defaultSegment);
  function pick(next:'creators'|'schools'){ setSeg(next); onChange(next); track('role_toggle',{next}); }
  const base="px-3 py-2 rounded-full text-sm border";
  const active="bg-[#D4AF37] text-[#0B1C2C] border-[#D4AF37]";
  const ghost="bg-transparent text-[#EAEFF6] border-[#D4AF37] opacity-80";
  return (
    <div className="flex gap-2" role="tablist" aria-label="Audience">
      <button role="tab" aria-selected={seg==='creators'} className={`${base} ${seg==='creators'?active:ghost}`} onClick={()=>pick('creators')}>Creators/Athletes</button>
      <button role="tab" aria-selected={seg==='schools'}  className={`${base} ${seg==='schools'?active:ghost}`}  onClick={()=>pick('schools')}>Schools/Brands</button>
    </div>
  )
}
