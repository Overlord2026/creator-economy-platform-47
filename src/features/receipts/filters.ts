import { AnyRDS } from './types';

export interface ReceiptFilter {
  entity_type?: string;
  entity_id?: string;
  action?: string;
  type?: string;
  date_from?: string;
  date_to?: string;
}

export function filterReceipts(receipts: any[], filter: ReceiptFilter): any[] {
  return receipts.filter(receipt => {
    // Filter by entity type
    if (filter.entity_type && receipt.entity_type !== filter.entity_type) {
      return false;
    }

    // Filter by specific entity ID
    if (filter.entity_id && receipt.entity_id !== filter.entity_id) {
      return false;
    }

    // Filter by action
    if (filter.action && receipt.action !== filter.action) {
      return false;
    }

    // Filter by receipt type
    if (filter.type && receipt.type !== filter.type) {
      return false;
    }

    // Filter by date range
    if (filter.date_from || filter.date_to) {
      const receiptDate = new Date(receipt.ts || receipt.timestamp || receipt.created_at);
      
      if (filter.date_from && receiptDate < new Date(filter.date_from)) {
        return false;
      }
      
      if (filter.date_to && receiptDate > new Date(filter.date_to)) {
        return false;
      }
    }

    return true;
  });
}

export function getEntityTypes(receipts: any[]): string[] {
  const types = new Set<string>();
  receipts.forEach(receipt => {
    if (receipt.entity_type) {
      types.add(receipt.entity_type);
    }
  });
  return Array.from(types).sort();
}

export function getActions(receipts: any[]): string[] {
  const actions = new Set<string>();
  receipts.forEach(receipt => {
    if (receipt.action) {
      actions.add(receipt.action);
    }
  });
  return Array.from(actions).sort();
}

export function getReceiptTypes(receipts: any[]): string[] {
  const types = new Set<string>();
  receipts.forEach(receipt => {
    if (receipt.type) {
      types.add(receipt.type);
    }
  });
  return Array.from(types).sort();
}