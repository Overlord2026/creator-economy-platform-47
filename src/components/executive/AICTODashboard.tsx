
// src/components/executive/AICTODashboard.tsx
import * as React from 'react';
import { supabase } from '@/lib/supabase';
import type { ReceiptRow } from '@/lib/receipts';

type Props = { orgId?: string };

export default function AICTODashboard({ orgId: orgIdProp }: Props) {
  const [rows, setRows] = React.useState<ReceiptRow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        let orgId = orgIdProp;
        if (!orgId) {
          const { data: ures, error: uerr } = await supabase.auth.getUser();
          if (uerr) throw uerr;
          const userId = ures?.user?.id;
          if (!userId) throw new Error('No authenticated user');
          const metaOrgId = (ures?.user?.app_metadata as any)?.org_id as string | undefined;
          if (metaOrgId) orgId = metaOrgId;
          if (!orgId) {
            const { data: m } = await supabase
              .from('org_members')
              .select('org_id')
              .eq('user_id', userId)
              .order('inserted_at', { ascending: false })
              .limit(1)
              .maybeSingle();
            orgId = m?.org_id as string | undefined;
          }
        }
        if (!orgId) throw new Error('Missing org_id');

        const { data, error } = await supabase
          .from('receipts')
          .select('id, type, payload, user_id, created_at')
          .eq('org_id', orgId)
          .order('created_at', { ascending: false })
          .limit(200);

        if (error) throw error;
        setRows((data ?? []) as ReceiptRow[]);
      } catch (e: any) {
        setError(e?.message ?? String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, [orgIdProp]);

  const counts = React.useMemo(() => {
    const map = new Map<string, number>();
    rows.forEach(r => map.set(r.type, (map.get(r.type) ?? 0) + 1));
    return Array.from(map.entries()).sort((a,b)=>b[1]-a[1]);
  }, [rows]);

  if (loading) return <div className="p-4 text-sm">Loading…</div>;
  if (error) return <div className="p-4 text-sm text-red-600">Error: {error}</div>;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">AI CTO Dashboard</h2>

      <div>
        <h3 className="font-medium mb-2">Top Actions</h3>
        <div className="grid md:grid-cols-3 gap-3">
          {counts.map(([type, n]) => (
            <div key={type} className="border rounded p-3">
              <div className="text-sm text-muted-foreground">Action</div>
              <div className="text-lg font-semibold">{type}</div>
              <div className="text-sm mt-1">{n} event{n===1?'':'s'}</div>
            </div>
          ))}
          {counts.length === 0 && <div className="text-sm text-muted-foreground">No activity yet.</div>}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Latest Activity</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 pr-3">When</th>
                <th className="py-2 pr-3">Action</th>
                <th className="py-2 pr-3">Entity</th>
                <th className="py-2 pr-3">Entity ID</th>
                <th className="py-2 pr-3">User</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 25).map((r) => (
                <tr key={r.id} className="border-b last:border-0">
                  <td className="py-2 pr-3">{new Date(r.created_at).toLocaleString()}</td>
                  <td className="py-2 pr-3">{r.type}</td>
                  <td className="py-2 pr-3">{r.payload?.entity ?? ''}</td>
                  <td className="py-2 pr-3">{r.payload?.entity_id ?? ''}</td>
                  <td className="py-2 pr-3">{r.user_id ?? ''}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td className="py-3 text-muted-foreground" colSpan={5}>No receipts yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
