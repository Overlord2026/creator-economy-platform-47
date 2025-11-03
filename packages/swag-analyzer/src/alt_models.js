"use strict";
/**
 * SWAG Alternative Asset Models
 * ETAY, SEAY, and LiquidityVaR computations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ETAY = ETAY;
exports.SEAY = SEAY;
exports.liquidityVaR = liquidityVaR;
// @claim-step: ETAY/SEAY and LiquidityVaR computations
function ETAY(comp, rates, feeDrag) {
    if (feeDrag === void 0) { feeDrag = 0; }
    var _a = comp.interest, interest = _a === void 0 ? 0 : _a, _b = comp.qualified, qualified = _b === void 0 ? 0 : _b, _c = comp.ltg, ltg = _c === void 0 ? 0 : _c, _d = comp.stg, stg = _d === void 0 ? 0 : _d;
    return (interest * (1 - rates.ordinary) + qualified * (1 - rates.qualified) +
        ltg * (1 - rates.ltg) + stg * (1 - rates.stg)) - feeDrag;
}
function SEAY(stakingAPR, tax, slashingProb, unbondDays, dailyPenaltyBps) {
    var afterTax = stakingAPR * (1 - tax);
    var latencyPenalty = (unbondDays * dailyPenaltyBps) / 10000 + slashingProb * stakingAPR;
    return afterTax - latencyPenalty;
}
function liquidityVaR(_a) {
    var _b = _a.secondaryHaircut, secondaryHaircut = _b === void 0 ? 0 : _b, _c = _a.gateProb, gateProb = _c === void 0 ? 0 : _c, _d = _a.delayDays, delayDays = _d === void 0 ? 0 : _d, _e = _a.dailyPenaltyBps, dailyPenaltyBps = _e === void 0 ? 0 : _e;
    return secondaryHaircut + gateProb * (delayDays * (dailyPenaltyBps / 10000));
}
