"use strict";
/**
 * Bootstrap Engine - Block bootstrap for sequence-of-returns risk
 */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootstrapEngine = void 0;
var seedrandom = require("seedrandom");
var BootstrapEngine = /** @class */ (function () {
    function BootstrapEngine(seed) {
        this.rng = seedrandom(seed || 'bootstrap_default');
    }
    /**
     * Generate bootstrap return sequences to capture sequence-of-returns risk
     */
    BootstrapEngine.prototype.generateBootstrapSequences = function (historicalReturns, nSequences, sequenceLength, blockLength) {
        if (blockLength === void 0) { blockLength = 12; }
        var sequences = [];
        for (var seq = 0; seq < nSequences; seq++) {
            var sequence = this.generateBlockBootstrapSequence(historicalReturns, sequenceLength, blockLength);
            sequences.push(sequence);
        }
        return sequences;
    };
    /**
     * Generate single block bootstrap sequence
     * Preserves short-term return correlations by sampling blocks instead of individual returns
     */
    BootstrapEngine.prototype.generateBlockBootstrapSequence = function (historicalReturns, targetLength, blockLength) {
        var sequence = [];
        var maxStartIndex = historicalReturns.length - blockLength;
        while (sequence.length < targetLength) {
            // Randomly select a starting point for the block
            var startIndex = Math.floor(this.rng() * maxStartIndex);
            // Extract the block
            for (var i = 0; i < blockLength && sequence.length < targetLength; i++) {
                sequence.push(historicalReturns[startIndex + i]);
            }
        }
        return sequence.slice(0, targetLength);
    };
    /**
     * Generate bootstrap sequences for multiple asset classes
     */
    BootstrapEngine.prototype.generateMultiAssetBootstrap = function (historicalData, config, nSequences, sequenceLength) {
        var blockLenMonths = config.blockLenMonths;
        var results = [];
        for (var seq = 0; seq < nSequences; seq++) {
            // Generate correlated bootstrap by using same block starting points
            var equity = this.generateCorrelatedBootstrapSequence(historicalData.equity, sequenceLength, blockLenMonths);
            var bonds = this.generateCorrelatedBootstrapSequence(historicalData.bonds, sequenceLength, blockLenMonths, equity.blockIndices // Use same block structure
            );
            var alternatives = this.generateCorrelatedBootstrapSequence(historicalData.alternatives, sequenceLength, blockLenMonths, equity.blockIndices);
            results.push({
                sequence: seq,
                equity: equity.returns,
                bonds: bonds.returns,
                alternatives: alternatives.returns
            });
        }
        return results;
    };
    /**
     * Generate correlated bootstrap sequence maintaining cross-asset correlations
     */
    BootstrapEngine.prototype.generateCorrelatedBootstrapSequence = function (historicalReturns, targetLength, blockLength, predefinedBlocks) {
        var returns = [];
        var blockIndices = [];
        var maxStartIndex = historicalReturns.length - blockLength;
        var blockIndex = 0;
        while (returns.length < targetLength) {
            var startIndex = void 0;
            if (predefinedBlocks && blockIndex < predefinedBlocks.length) {
                // Use predefined block to maintain correlation
                startIndex = predefinedBlocks[blockIndex];
            }
            else {
                // Generate new random block
                startIndex = Math.floor(this.rng() * maxStartIndex);
                blockIndices.push(startIndex);
            }
            // Extract the block
            for (var i = 0; i < blockLength && returns.length < targetLength; i++) {
                var returnIndex = (startIndex + i) % historicalReturns.length;
                returns.push(historicalReturns[returnIndex]);
            }
            blockIndex++;
        }
        return {
            returns: returns.slice(0, targetLength),
            blockIndices: predefinedBlocks || blockIndices
        };
    };
    /**
     * Generate stress test bootstrap focusing on crisis periods
     */
    BootstrapEngine.prototype.generateCrisisBootstrap = function (historicalReturns, crisisPeriods, nSequences, sequenceLength, crisisWeight // 30% of blocks from crisis periods
    ) {
        if (crisisWeight === void 0) { crisisWeight = 0.3; }
        var sequences = [];
        for (var seq = 0; seq < nSequences; seq++) {
            var sequence = [];
            while (sequence.length < sequenceLength) {
                var blockReturns = void 0;
                if (this.rng() < crisisWeight && crisisPeriods.length > 0) {
                    // Sample from crisis period
                    blockReturns = this.sampleCrisisBlock(historicalReturns, crisisPeriods);
                }
                else {
                    // Sample from normal periods
                    blockReturns = this.sampleNormalBlock(historicalReturns, crisisPeriods);
                }
                // Add block to sequence
                for (var _i = 0, blockReturns_1 = blockReturns; _i < blockReturns_1.length; _i++) {
                    var ret = blockReturns_1[_i];
                    if (sequence.length < sequenceLength) {
                        sequence.push(ret);
                    }
                }
            }
            sequences.push(sequence);
        }
        return sequences;
    };
    /**
     * Sample block from crisis periods
     */
    BootstrapEngine.prototype.sampleCrisisBlock = function (historicalReturns, crisisPeriods) {
        var period = crisisPeriods[Math.floor(this.rng() * crisisPeriods.length)];
        var blockLength = Math.min(12, period.end - period.start); // Max 12 months
        var startIndex = period.start + Math.floor(this.rng() * (period.end - period.start - blockLength));
        return historicalReturns.slice(startIndex, startIndex + blockLength);
    };
    /**
     * Sample block from non-crisis periods
     */
    BootstrapEngine.prototype.sampleNormalBlock = function (historicalReturns, crisisPeriods) {
        var blockLength = 12;
        var attempts = 0;
        var maxAttempts = 100;
        var _loop_1 = function () {
            var startIndex_1 = Math.floor(this_1.rng() * (historicalReturns.length - blockLength));
            var endIndex = startIndex_1 + blockLength;
            // Check if block overlaps with any crisis period
            var inCrisis = crisisPeriods.some(function (period) {
                return (startIndex_1 >= period.start && startIndex_1 <= period.end) ||
                    (endIndex >= period.start && endIndex <= period.end);
            });
            if (!inCrisis) {
                return { value: historicalReturns.slice(startIndex_1, endIndex) };
            }
            attempts++;
        };
        var this_1 = this;
        while (attempts < maxAttempts) {
            var state_1 = _loop_1();
            if (typeof state_1 === "object")
                return state_1.value;
        }
        // Fallback: return random block
        var startIndex = Math.floor(this.rng() * (historicalReturns.length - blockLength));
        return historicalReturns.slice(startIndex, startIndex + blockLength);
    };
    /**
     * Calculate sequence-of-returns risk metrics
     */
    BootstrapEngine.prototype.analyzeSequenceRisk = function (portfolioReturns, withdrawalRate, initialValue) {
        var portfolioValue = initialValue;
        var annualWithdrawal = initialValue * withdrawalRate;
        var maxValue = initialValue;
        var maxDrawdown = 0;
        var timeToDepletion = null;
        var withdrawalsSustained = 0;
        for (var year = 0; year < portfolioReturns.length; year++) {
            // Beginning of year withdrawal
            portfolioValue -= annualWithdrawal;
            withdrawalsSustained++;
            if (portfolioValue <= 0) {
                timeToDepletion = year;
                break;
            }
            // Investment return
            portfolioValue *= (1 + portfolioReturns[year]);
            // Track drawdown
            maxValue = Math.max(maxValue, portfolioValue);
            var currentDrawdown = (maxValue - portfolioValue) / maxValue;
            maxDrawdown = Math.max(maxDrawdown, currentDrawdown);
        }
        return {
            finalValue: Math.max(0, portfolioValue),
            timeToDepletion: timeToDepletion,
            maxDrawdown: maxDrawdown,
            withdrawalsSustained: withdrawalsSustained
        };
    };
    /**
     * Generate return scenarios with different sequence-of-returns patterns
     */
    BootstrapEngine.prototype.generateSequenceScenarios = function (baseReturns, nYears) {
        var sortedReturns = __spreadArray([], baseReturns, true).sort(function (a, b) { return b - a; });
        var midpoint = Math.floor(nYears / 2);
        // Favorable: Best returns first
        var favorable = __spreadArray(__spreadArray([], sortedReturns.slice(0, midpoint), true), sortedReturns.slice(midpoint).reverse(), true).slice(0, nYears);
        // Unfavorable: Worst returns first
        var unfavorable = __spreadArray([], favorable, true).reverse();
        // Volatile: Alternate between high and low returns
        var volatile = [];
        var highs = sortedReturns.slice(0, Math.floor(baseReturns.length / 2));
        var lows = sortedReturns.slice(Math.floor(baseReturns.length / 2));
        for (var i = 0; i < nYears; i++) {
            if (i % 2 === 0) {
                volatile.push(highs[i % highs.length]);
            }
            else {
                volatile.push(lows[i % lows.length]);
            }
        }
        // Recovery: Large negative return followed by strong recovery
        var recovery = __spreadArray([], baseReturns, true);
        recovery[0] = -0.35; // 35% crash
        recovery[1] = 0.25; // 25% recovery
        recovery[2] = 0.15; // 15% recovery
        return {
            favorable: favorable,
            unfavorable: unfavorable,
            volatile: volatile,
            recovery: recovery
        };
    };
    return BootstrapEngine;
}());
exports.BootstrapEngine = BootstrapEngine;
