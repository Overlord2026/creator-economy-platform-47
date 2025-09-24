
import * as React from 'react';
import { insertReceipt } from '@/lib/receipts';
import { supabase } from '@/lib/supabase';

type Props = {
  /** Optional: if your page already knows the org id, pass it in */
  orgId?: string;
};

export default function BookUploadForm({ orgId: orgIdProp }: Props) {
  const [bookId, setBookId] = React.useState<string>('');
  const [title, setTitle] = React.useState<string>('');
  const [note, setNote] = React.useState<string>('');
  const [busy, setBusy] = React.useState(false);
  const [msg, setMsg] = React.useState<string | null>(null);

  async function resolveOrgId(userId: string): Promise<string> {
    // Prefer orgId from app_metadata or prop
    const { data: userRes, error: userErr } = await supabase.auth.getUser();
    if (userErr) throw userErr;
    const metaOrgId = (userRes?.user?.app_metadata as any)?.org_id as string | undefined;

    let orgId = orgIdProp ?? metaOrgId;
    if (orgId) return orgId;

    // Fallback: latest org membership
    const { data: m, error: mErr } = await supabase
      .from('org_members')
      .select('org_id')
      .eq('user_id', userId)
      .order('inserted_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (mErr) throw mErr;
    if (!m?.org_id) throw new Error('Missing org_id — user must belong to an organization.');
    return m.org_id as string;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);

    try {
      const { data: ures, error: uerr } = await supabase.auth.getUser();
      if (uerr) throw uerr;
      const userId = ures?.user?.id;
      if (!userId) throw new Error('No authenticated user.');

      const orgId = await resolveOrgId(userId);

      // Build your receipt payload (entity + entity_id are required)
      const payload = {
        entity: 'book',
        entity_id: String(bookId),
        title: title || undefined,
        note: note || undefined,
      };

      // Write the receipt (inputs_hash + policy_version added automatically)
      await insertReceipt({
        org_id: orgId,
        user_id: userId,
        type: 'BOOK_UPLOAD',
        payload,
      });

      setMsg('Receipt logged ✔');
      setBookId('');
      setTitle('');
      setNote('');
    } catch (err: any) {
      setMsg(err?.message || String(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 p-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Book ID</label>
        <input
          className="border rounded px-3 py-2"
          placeholder="e.g. 12345"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Title (optional)</label>
        <input
          className="border rounded px-3 py-2"
          placeholder="Book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Note (optional)</label>
        <input
          className="border rounded px-3 py-2"
          placeholder="Internal note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={busy || !bookId}
        className="inline-flex items-center justify-center rounded bg-black text-white px-4 py-2 disabled:opacity-50"
      >
        {busy ? 'Saving…' : 'Log Book Upload'}
      </button>

      {msg && <p className="text-sm mt-2">{msg}</p>}
    </form>
  );
}
