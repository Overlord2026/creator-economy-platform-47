import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const DebugComp: React.FC = () => {
  const [out, setOut] = useState<any>(null);
  const handle = async () => {
    try {
      const mod = await import('@/lib/receipts');
      const r = await mod.createReceiptClient({
        inputs: { action: 'debug', ts: new Date().toISOString() }
      });
      setOut(r);
      console.log('receipt created', r);
    } catch (err) {
      setOut({ error: String(err) });
      console.error(err);
    }
  };
  return (
    <div style={{ padding: 24 }}>
      <h2>Debug: create receipt</h2>
      <button onClick={handle}>Create Receipt (as current user)</button>
      <pre style={{ marginTop: 16 }}>{JSON.stringify(out, null, 2)}</pre>
    </div>
  );
};

export default DebugComp;
