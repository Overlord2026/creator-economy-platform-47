/**
 * Client-side receipts helper: canonicalize, hash, and insert.
 * Assumes supabase client in src/lib/supabaseClient.ts and user is authenticated.
 */
import { supabase } from './supabaseClient';

function serialize(v: any): any {
  if (v === null || v === undefined) return null;
  if (typeof v === 'string') return v.normalize('NFC');
  if (typeof v === 'number' && Number.isFinite(v)) {
    if (Number.isInteger(v)) return v;
    return Number(Number(v).toFixed(6));
  }
  if (Array.isArray(v)) return v.map(serialize);
  if (typeof v === 'object') {
    const keys = Object.keys(v).sort();
    const out: any = {};
    for (const k of keys) out[k] = serialize(v[k]);
    return out;
  }
  return v;
}

export function stableStringify(value: any): string {
  return JSON.stringify(serialize(value));
}

export async function sha256Hex(text: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const bytes = new Uint8Array(hash);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function createReceiptClient({
  type = 'Decision-RDS',
  inputs,
  policyVersion = 'v0.1',
}: {
  type?: string;
  inputs: Record<string, any>;
  policyVersion?: string;
}) {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user ?? null;
  if (!user) throw new Error('Not authenticated');

  const canonicalStr = stableStringify(inputs);
  const hash = await sha256Hex(canonicalStr);
  const sha256_hash = `sha256:${hash}`;

  const receipt = {
    type,
    user_id: user.id,
    inputs_hash: sha256_hash,
    policy_version: policyVersion,
    payload: inputs,
    canonical: JSON.parse(canonicalStr),
    sha256_hash,
  };

  const { data, error } = await supabase.from('receipts').insert(receipt).select();
  if (error) throw error;
  return data?.[0];
}
