
// src/components/education/admin/GuideUploadForm.tsx
import * as React from 'react';
import { insertReceipt } from '@/lib/receipts';
import { sb } from '@/lib/supabase-relaxed';

type Props = { orgId?: string };

export default function GuideUploadForm({ orgId: orgIdProp }: Props) {
  const [guideId, setGuideId] = React.useState<string>('');
  const [title, setTitle] = React.useState<string>('');
  const [note, setNote] = React.useState<string>('');
  const [busy, setBusy] = React.useState(false);
  const [msg, setMsg] = React.useState<string | null>(null);

  async function resolveOrgId(userId: string): Promise<string> {
    const { data: ures, error: uerr } = await sb.auth.getUser();
    if (uerr) throw uerr;
    const metaOrgId = (ures?.user?.app_metadata as any)?.org_id as string | undefined;

    let orgId = orgIdProp ?? metaOrgId;
    if (orgId) return orgId;

    const { data: memberData, error: mErr } = await (supabase as any)
      .from('org_members')
      .select('org_id')
      .eq('user_id', userId)
      .order('inserted_at', { ascending: false })
      .limit(1);
    const m = memberData?.[0];

    if (mErr) throw mErr;
    if (!m?.org_id) throw new Error('Missing org_id — user must belong to an organization.');
    return m.org_id as string;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const { data: ures, error: uerr } = await sb.auth.getUser();
      if (uerr) throw uerr;
      const userId = ures?.user?.id;
      if (!userId) throw new Error('No authenticated user.');
      const orgId = await resolveOrgId(userId);

      const payload = {
        entity: 'guide',
        entity_id: String(guideId),
        title: title || undefined,
        note: note || undefined,
      };

      await insertReceipt({
        org_id: orgId,
        user_id: userId,
        type: 'GUIDE_UPLOAD',
        payload,
      });

      setMsg('Guide receipt logged ✔');
      setGuideId(''); setTitle(''); setNote('');
    } catch (err: any) {
      setMsg(err?.message ?? String(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 p-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Guide ID</label>
        <input className="border rounded px-3 py-2" required value={guideId} onChange={e=>setGuideId(e.target.value)} />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Title (optional)</label>
        <input className="border rounded px-3 py-2" value={title} onChange={e=>setTitle(e.target.value)} />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Note (optional)</label>
        <input className="border rounded px-3 py-2" value={note} onChange={e=>setNote(e.target.value)} />
      </div>
      <button type="submit" disabled={busy || !guideId} className="rounded bg-black text-white px-4 py-2 disabled:opacity-50">
        {busy ? 'Saving…' : 'Log Guide Upload'}
      </button>
      {msg && <p className="text-sm mt-2">{msg}</p>}
    </form>
  );
}
