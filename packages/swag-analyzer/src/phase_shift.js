"use strict";
/**
 * SWAG Phase Shift Logic
 * Placeholder for phase transition and rebalancing logic
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextPhase = getNextPhase;
exports.shouldRebalance = shouldRebalance;
function getNextPhase(currentPhase, age, portfolioValue) {
    // Simplified phase transition logic
    if (age < 62)
        return 'GROWTH';
    if (age < 67)
        return 'INCOME_NOW';
    if (portfolioValue > 2000000)
        return 'LEGACY';
    return 'INCOME_LATER';
}
function shouldRebalance(currentAllocation, targetAllocation, threshold) {
    if (threshold === void 0) { threshold = 0.05; }
    return Object.keys(targetAllocation).some(function (asset) {
        var current = currentAllocation[asset] || 0;
        var target = targetAllocation[asset] || 0;
        return Math.abs(current - target) > threshold;
    });
}
