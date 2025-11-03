"use strict";
/**
 * SWAG Monitoring and Risk Management
 * Circuit breakers, thresholds, and breach evaluation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateThresholds = evaluateThresholds;
exports.breachState = breachState;
exports.reRiskStages = reRiskStages;
function evaluateThresholds(metrics, policy) {
    var breaches = Object.entries(policy.thresholds || {})
        .filter(function (_a) {
        var _b, _c;
        var k = _a[0], v = _a[1];
        if (v === undefined)
            return false;
        if (k.endsWith('_floor'))
            return ((_b = metrics[k.replace('_floor', '')]) !== null && _b !== void 0 ? _b : 0) < v;
        return ((_c = metrics[k]) !== null && _c !== void 0 ? _c : 0) >= v;
    })
        .map(function (_a) {
        var k = _a[0];
        return k;
    });
    return breaches;
}
// @claim-step: circuit-breaker and staged re-risk ladder
function breachState(sig, z, minDays) {
    if (z === void 0) { z = 2.0; }
    if (minDays === void 0) { minDays = 10; }
    return sig.ddZ >= z && sig.ddDays >= minDays;
}
function reRiskStages(state) {
    var stages = [];
    if (state.vol < 0.6 && state.breadth > 0.6)
        stages.push({ addPct: 0.4 });
    if (state.regime === 'RECOVERY')
        stages.push({ addPct: 0.6 });
    return stages;
}
