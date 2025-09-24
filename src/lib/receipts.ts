

import { supabase } from '@/lib/supabase';

/** JSON payload you store inside receipts.payload */
export type ReceiptPayload = {
  entity?: string;
  entity_id?: string;
  // add anything else you need for evidence / context
  [k: string]: any;
};

/** Row shape for the new receipts table */
export interface ReceiptRow {
  id: string;
  org_id: string;
  user_id: string;          // was actor_id
  type: string;             // was action
  payload: ReceiptPayload;  // now holds entity + entity_id (+ extras)
  canonical?: any;
  inputs_hash: string;      // sha256:<hex> of canonicalized payload
  policy_version: string;   // e.g., rds-v1
  created_at: string;
}

export const RECEIPT_POLICY_VERSION = 'rds-v1';

/* ---------------------------------------------------------------------------------------------- */
/* Canonicalization & hashing                                                                     */
/* ---------------------------------------------------------------------------------------------- */

/** Deep-sort object keys so JSON.stringify is stable/deterministic */
function sortKeys(obj: any): any {
  if (Array.isArray(obj)) return obj.map(sortKeys);
  if (obj && typeof obj === 'object') {
    return Object.keys(obj)
      .sort()
      .reduce((acc, k) => {
        acc[k] = sortKeys(obj[k]);
        return acc;
      }, {} as any);
  }
  return obj;
}

/** Stable JSON string */
export function canonicalStringify(obj: any): string {
  return JSON.stringify(sortKeys(obj));
}

/** SHA-256 hex of a string (uses WebCrypto; supported in modern Node & browsers) */
export async function sha256Hex(str: string): Promise<string> {
  const data = new TextEncoder().encode(str);
  // @ts-ignore - globalThis.crypto exists in browser and Node >=19
  const hashBuffer: ArrayBuffer = await globalThis.crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(hashBuffer)].map(b => b.toString(16).padStart(2, '0')).join('');
}

/** Build inputs_hash for a payload (prefix with 'sha256:') */
export async function buildInputsHash(payload: ReceiptPayload): Promise<string> {
  return `sha256:${await sha256Hex(canonicalStringify(payload))}`;
}

/* ---------------------------------------------------------------------------------------------- */
/* Validation                                                                                     */
/* ---------------------------------------------------------------------------------------------- */

function ensureEntityKeys(payload: ReceiptPayload): void {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Receipt payload must be an object.');
  }
  if (!payload.entity) {
    throw new Error('Receipt payload missing required "entity".');
  }
  if (!payload.entity_id) {
    throw new Error('Receipt payload missing required "entity_id".');
  }
}

/* ---------------------------------------------------------------------------------------------- */
/* Public API                                                                                     */
/* ---------------------------------------------------------------------------------------------- */

/**
 * Insert a receipt row (new schema).
 * - Adds inputs_hash + policy_version automatically.
 * - Throws if payload is missing entity/entity_id.
 */
export async function insertReceipt(args: {
  org_id: string;
  user_id: string;          // old: actor_id
  type: string;             // old: action
  payload: ReceiptPayload;  // MUST include entity + entity_id
  canonical?: any;
}): Promise<ReceiptRow> {
  ensureEntityKeys(args.payload);

  const inputs_hash = await buildInputsHash(args.payload);
  const policy_version = RECEIPT_POLICY_VERSION;

  const { data, error } = await supabase
    .from('receipts')
    .insert([{
      org_id: args.org_id,
      user_id: args.user_id,
      type: args.type,
      payload: args.payload,
      canonical: args.canonical ?? null,
      inputs_hash,
      policy_version,
    }])
    .select()
    .single();

  if (error) throw error;
  return data as ReceiptRow;
}

/**
 * Convenience for migrating legacy callers that still pass old field names.
 * (Avoid using long-term; prefer insertReceipt above.)
 */
export async function insertReceiptFromLegacy(args: {
  org_id: string;
  actor_id: string;         // will map to user_id
  action: string;           // will map to type
  entity: string;
  entity_id: string;
  canonical?: any;
  // any extra legacy fields go into payloadExtras
  payloadExtras?: Record<string, any>;
}): Promise<ReceiptRow> {
  const payload: ReceiptPayload = {
    entity: args.entity,
    entity_id: args.entity_id,
    ...(args.payloadExtras ?? {}),
  };
  return insertReceipt({
    org_id: args.org_id,
    user_id: args.actor_id,
    type: args.action,
    payload,
    canonical: args.canonical,
  });
}

/** List recent receipts for an org (optionally filter by type) */
export async function listRecentReceipts(params: {
  org_id: string;
  limit?: number;
  typeEquals?: string;
}): Promise<ReceiptRow[]> {
  const { org_id, limit = 50, typeEquals } = params;

  let query = supabase
    .from('receipts')
    .select('id, org_id, user_id, type, payload, canonical, inputs_hash, policy_version, created_at')
    .eq('org_id', org_id)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (typeEquals) {
    query = query.eq('type', typeEquals);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as ReceiptRow[];
}

/** List receipts for a specific entity (uses JSONB contains on payload.entity_id) */
export async function listReceiptsByEntity(org_id: string, entity_id: string, limit = 50): Promise<ReceiptRow[]> {
  const { data, error } = await supabase
    .from('receipts')
    .select('id, org_id, user_id, type, payload, canonical, inputs_hash, policy_version, created_at')
    .eq('org_id', org_id)
    .contains('payload', { entity_id })
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as ReceiptRow[];
}

/** Fetch a single receipt by id */
export async function getReceiptById(id: string): Promise<ReceiptRow | null> {
  const { data, error } = await supabase
    .from('receipts')
    .select('id, org_id, user_id, type, payload, canonical, inputs_hash, policy_version, created_at')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // not found
  return (data as ReceiptRow) ?? null;
}

/* ---------------------------------------------------------------------------------------------- */
/* UI helpers (optional)                                                                          */
/* ---------------------------------------------------------------------------------------------- */

export type ReceiptListItem = Pick<ReceiptRow, 'id' | 'type' | 'payload' | 'user_id' | 'created_at'>;

/** Shape rows for simple list UIs (maps new fields to legacy names where helpful) */
export function toListItem(r: ReceiptRow): ReceiptListItem & {
  action: string;        // alias of type (for legacy UIs)
  entity?: string;
  entity_id?: string;
} {
  return {
    id: r.id,
    type: r.type,
    user_id: r.user_id,
    created_at: r.created_at,
    payload: r.payload,
    // helpful aliases for old components:
    action: r.type,
    entity: r.payload?.entity,
    entity_id: r.payload?.entity_id,
  };
}

