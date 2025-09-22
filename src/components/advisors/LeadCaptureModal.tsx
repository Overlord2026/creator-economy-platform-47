'use client';
import * as React from 'react';

export function LeadCaptureModal({ open = false, onClose }: { open?: boolean; onClose?: () => void }) {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal className="fixed inset-0 z-50 grid place-items-center bg-black/50">
      <div className="w-[520px] rounded-lg bg-white p-6 text-black">
        <h2 className="mb-3 text-lg font-semibold">Capture Lead (demo)</h2>
        <p className="text-sm text-gray-700">This environment uses demo fixtures when the <code>leads</code> table is missing. Writes are disabled.</p>
        <div className="mt-6 flex justify-end">
          <button className="rounded bg-black px-3 py-2 text-white" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
export default LeadCaptureModal;