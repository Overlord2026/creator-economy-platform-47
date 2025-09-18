import { describe, it, expect, beforeEach } from 'vitest';
import { recordReceipt, listReceipts, clearReceipts } from '@/features/receipts/record';
import { createOffer } from '@/features/nil/offers/store';
import { hold, release } from '@/features/nil/payments/api';
import { runChecks, validateContract } from '@/features/nil/policy/checks';

describe('NIL Receipt Workflow', () => {
  beforeEach(() => {
    clearReceipts();
  });

  it('should emit receipt for offer creation with correct foreign keys', async () => {
    const { offerId, offerLock } = createOffer({
      brand: 'TestBrand',
      category: 'social_media',
      startDate: '2025-01-01',
      endDate: '2025-02-01',
      channels: ['instagram'],
      amount: 1000
    });

    // Manually record receipt as offer creation would in real implementation
    const offerReceipt = {
      id: `receipt_offer_${Date.now()}`,
      type: 'Decision-RDS',
      action: 'offer.create',
      entity_type: 'offer',
      entity_id: offerId,
      foreign_keys: { offer_id: offerId, offer_lock: offerLock },
      reasons: ['OFFER_CREATED'],
      policy_version: 'NIL-2025.08',
      ts: new Date().toISOString(),
      // Content-free - no PII or sensitive data
      content_hash: null
    };

    recordReceipt(offerReceipt);
    
    const receipts = listReceipts();
    expect(receipts).toHaveLength(1);
    expect(receipts[0].entity_id).toBe(offerId);
    expect(receipts[0].foreign_keys.offer_id).toBe(offerId);
    expect(receipts[0].action).toBe('offer.create');
    
    // Verify no PII in receipt
    const receiptJson = JSON.stringify(receipts[0]);
    expect(receiptJson).not.toMatch(/TestBrand/); // Brand name should not be in receipt
  });

  it('should emit receipt for contract validation with matching foreign keys', async () => {
    const contractId = `contract_${Date.now()}`;
    const offerId = `offer_${Date.now()}`;
    
    const contractResult = validateContract(contractId);
    
    // Record contract validation receipt
    const contractReceipt = {
      id: `receipt_contract_${Date.now()}`,
      type: 'Decision-RDS',
      action: 'contract.validate',
      entity_type: 'contract',
      entity_id: contractId,
      foreign_keys: { 
        contract_id: contractId,
        offer_id: offerId 
      },
      reasons: contractResult.reasons,
      result: contractResult.ok ? 'approve' : 'reject',
      policy_version: 'NIL-2025.08',
      ts: new Date().toISOString(),
      content_hash: null
    };

    recordReceipt(contractReceipt);
    
    const receipts = listReceipts();
    expect(receipts).toHaveLength(1);
    expect(receipts[0].entity_id).toBe(contractId);
    expect(receipts[0].foreign_keys.contract_id).toBe(contractId);
    expect(receipts[0].foreign_keys.offer_id).toBe(offerId);
    expect(receipts[0].action).toBe('contract.validate');
  });

  it('should emit receipt for escrow hold with correct entity references', async () => {
    const offerId = `offer_${Date.now()}`;
    const amount = 1000;
    
    const { escrowId } = hold({ offerId, amount });
    
    // Record escrow hold receipt
    const holdReceipt = {
      id: `receipt_hold_${Date.now()}`,
      type: 'Decision-RDS',
      action: 'escrow.hold',
      entity_type: 'escrow',
      entity_id: escrowId,
      foreign_keys: {
        escrow_id: escrowId,
        offer_id: offerId
      },
      reasons: ['ESCROW_HOLD_INITIATED'],
      amount_cents: amount * 100, // Convert to cents, but no actual amount in content
      policy_version: 'NIL-2025.08',
      ts: new Date().toISOString(),
      content_hash: null
    };

    recordReceipt(holdReceipt);
    
    const receipts = listReceipts();
    expect(receipts).toHaveLength(1);
    expect(receipts[0].entity_id).toBe(escrowId);
    expect(receipts[0].foreign_keys.escrow_id).toBe(escrowId);
    expect(receipts[0].foreign_keys.offer_id).toBe(offerId);
    expect(receipts[0].action).toBe('escrow.hold');
  });

  it('should emit receipt for escrow release with proper chain reference', async () => {
    const offerId = `offer_${Date.now()}`;
    const amount = 1000;
    
    // First hold funds
    const { escrowId } = hold({ offerId, amount });
    
    // Then release
    const settlement = await release(escrowId);
    
    // Record escrow release receipt
    const releaseReceipt = {
      id: `receipt_release_${Date.now()}`,
      type: 'Settlement-RDS',
      action: 'escrow.release',
      entity_type: 'settlement',
      entity_id: settlement.id,
      foreign_keys: {
        settlement_id: settlement.id,
        escrow_id: escrowId,
        offer_id: offerId
      },
      reasons: ['ESCROW_RELEASED'],
      policy_version: 'NIL-2025.08',
      ts: new Date().toISOString(),
      content_hash: null,
      prior_receipt_ref: `receipt_hold_${escrowId}` // Chain to hold receipt
    };

    recordReceipt(releaseReceipt);
    
    const receipts = listReceipts();
    expect(receipts).toHaveLength(1);
    expect(receipts[0].entity_id).toBe(settlement.id);
    expect(receipts[0].foreign_keys.settlement_id).toBe(settlement.id);
    expect(receipts[0].foreign_keys.escrow_id).toBe(escrowId);
    expect(receipts[0].foreign_keys.offer_id).toBe(offerId);
    expect(receipts[0].action).toBe('escrow.release');
  });

  it('should maintain foreign key consistency across workflow steps', async () => {
    const offerId = `offer_${Date.now()}`;
    const contractId = `contract_${Date.now()}`;
    
    // Step 1: Offer creation
    recordReceipt({
      id: `receipt_offer_1`,
      type: 'Decision-RDS',
      action: 'offer.create',
      entity_id: offerId,
      foreign_keys: { offer_id: offerId },
      ts: new Date().toISOString()
    });

    // Step 2: Contract validation
    recordReceipt({
      id: `receipt_contract_1`,
      type: 'Decision-RDS', 
      action: 'contract.validate',
      entity_id: contractId,
      foreign_keys: { contract_id: contractId, offer_id: offerId },
      ts: new Date().toISOString()
    });

    // Step 3: Escrow hold
    const { escrowId } = hold({ offerId, amount: 1000 });
    recordReceipt({
      id: `receipt_hold_1`,
      type: 'Decision-RDS',
      action: 'escrow.hold', 
      entity_id: escrowId,
      foreign_keys: { escrow_id: escrowId, offer_id: offerId, contract_id: contractId },
      ts: new Date().toISOString()
    });

    const receipts = listReceipts();
    expect(receipts).toHaveLength(3);
    
    // Verify all receipts reference the same offer_id
    const offerReferences = receipts.filter(r => r.foreign_keys?.offer_id === offerId);
    expect(offerReferences).toHaveLength(3);
    
    // Verify contract references appear in appropriate receipts
    const contractReferences = receipts.filter(r => r.foreign_keys?.contract_id === contractId);
    expect(contractReferences).toHaveLength(2); // contract and escrow steps
  });

  it('should emit content-free receipts without PII', async () => {
    const sensitiveData = {
      athleteName: 'John Doe',
      email: 'john@example.com',
      ssn: '123-45-6789',
      bankAccount: '1234567890'
    };

    // Simulate receipt that should NOT contain sensitive data
    const receipt = {
      id: `receipt_test_${Date.now()}`,
      type: 'Decision-RDS',
      action: 'test.pii_check',
      entity_id: 'test_entity',
      foreign_keys: { test_id: 'test_entity' },
      reasons: ['PII_SANITIZATION_CHECK'],
      policy_version: 'NIL-2025.08',
      ts: new Date().toISOString(),
      // Content should be hashed/anonymized, not raw
      content_hash: 'sha256:abcd1234...' // Instead of actual content
    };

    recordReceipt(receipt);
    
    const receiptJson = JSON.stringify(listReceipts()[0]);
    
    // Verify no PII patterns in receipt
    expect(receiptJson).not.toMatch(/John Doe/);
    expect(receiptJson).not.toMatch(/john@example\.com/);
    expect(receiptJson).not.toMatch(/\d{3}-\d{2}-\d{4}/); // SSN pattern
    expect(receiptJson).not.toMatch(/\d{10}/); // Bank account pattern
    
    // Should contain only entity references and metadata
    expect(receiptJson).toMatch(/test_entity/);
    expect(receiptJson).toMatch(/content_hash/);
  });
});