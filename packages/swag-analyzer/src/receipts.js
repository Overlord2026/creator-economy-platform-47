"use strict";
/**
 * SWAG Receipt Generation
 * Cryptographic receipts for outcome and monitoring data
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.canonical = canonical;
exports.makeOutcomeReceipt = makeOutcomeReceipt;
exports.makeMonitoringReceipt = makeMonitoringReceipt;
// Canonical receipts (hashing placeholder — wire to crypto.createHash in Node env)
function canonical(o) {
    return JSON.stringify(o, Object.keys(o).sort());
}
function makeOutcomeReceipt(payload) {
    var _a, _b, _c, _d, _e, _f;
    var body = {
        policyHash: (_a = payload.policyHash) !== null && _a !== void 0 ? _a : 'policy#dev',
        modelHash: (_b = payload.modelHash) !== null && _b !== void 0 ? _b : 'model#dev',
        regimeState: (_c = payload.regimeState) !== null && _c !== void 0 ? _c : 'UNKNOWN',
        phaseMetrics: payload.phaseMetrics,
        trades: (_d = payload.trades) !== null && _d !== void 0 ? _d : [],
        lotDeltas: (_e = payload.lotDeltas) !== null && _e !== void 0 ? _e : [],
        seed: (_f = payload.seed) !== null && _f !== void 0 ? _f : 'seed#dev',
        ts: new Date().toISOString()
    };
    // Replace with real SHA-256: crypto.createHash('sha256').update(canonical(body)).digest('hex')
    var hash = 'sha256#mock';
    return { body: body, hash: hash };
}
function makeMonitoringReceipt(payload) {
    var _a, _b;
    var body = {
        phase: payload.phase,
        metrics: payload.metrics,
        proposal: payload.proposal,
        osDelta: (_a = payload.osDelta) !== null && _a !== void 0 ? _a : null,
        riskDelta: (_b = payload.riskDelta) !== null && _b !== void 0 ? _b : null,
        ts: new Date().toISOString()
    };
    var hash = 'sha256#mock';
    return { body: body, hash: hash };
}
