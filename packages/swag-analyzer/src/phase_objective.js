"use strict";
/**
 * SWAG Phase Objective Calculator
 * Computes outcome metrics and composite scores
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.outcomeScore = outcomeScore;
exports.computeOutcomeMetrics = computeOutcomeMetrics;
// @claim-step: composite OutcomeScore aligned to defined goal outcomes
function outcomeScore(m, w) {
    if (w === void 0) { w = { ISP: 0.35, DGBP: 0.25, ATE: 0.15, LCI: 0.25 }; }
    return w.ISP * m.ISP - w.DGBP * m.DGBP + w.ATE * m.ATE + w.LCI * m.LCI;
}
function computeOutcomeMetrics(a) {
    var m = {
        ISP: a.isp,
        DGBP: a.dgbp,
        LCR: a.lcr,
        LCI: a.lci,
        ATE: a.ate,
        OS: 0
    };
    m.OS = outcomeScore(m);
    return m;
}
