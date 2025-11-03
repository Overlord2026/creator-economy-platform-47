"use strict";
/**
 * SWAG Demo Script
 * Demonstrates breach and recovery scenarios with receipts
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDemo = runDemo;
var index_1 = require("./index");
var receipts_1 = require("./receipts");
function runDemo() {
    return __awaiter(this, void 0, void 0, function () {
        var analyzer, baseInput, breachInput, breachResult, breachReceipt, _i, _a, _b, phase, metrics, recoveryInput, recoveryResult, recoveryReceipt, _c, _d, _e, phase, metrics, phases, _f, phases_1, phase, breachOS, recoveryOS, improvement, _g, phases_2, phase, breachDGBP;
        var _h, _j, _k;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    console.log('🚀 SWAG Analyzer Demo - Breach & Recovery Scenarios');
                    console.log('=' * 60);
                    analyzer = new index_1.SWAGAnalyzer('demo_seed_2024');
                    baseInput = __assign(__assign({}, createDefaultInput('demo_household_001')), { initialPortfolio: 2000000, currentAge: 55, retirementAge: 65, lifeExpectancy: 90 });
                    // Scenario 1: Market Breach (High DGBP)
                    console.log('\n📉 Running BREACH Scenario (Market Crash)...');
                    breachInput = __assign(__assign({}, baseInput), { scenario: __assign(__assign({}, baseInput.scenario), { equity: __assign(__assign({}, baseInput.scenario.equity), { mu: [-0.15, -0.30], sigma: [0.35, 0.45] // High volatility
                             }) }) });
                    return [4 /*yield*/, analyzer.analyze(breachInput)];
                case 1:
                    breachResult = _l.sent();
                    breachReceipt = (0, receipts_1.makeOutcomeReceipt)({
                        policyHash: 'breach_policy_001',
                        modelHash: 'swag_v1_breach',
                        regimeState: 'bear_market',
                        phaseMetrics: breachResult.phaseMetrics,
                        trades: ['defensive_rebalance', 'ltc_insurance_increase'],
                        lotDeltas: { equity: -0.15, bonds: +0.10, cash: +0.05 },
                        seed: 'demo_seed_2024'
                    });
                    console.log('\n📋 BREACH RECEIPT:');
                    console.log('Hash:', breachReceipt.hash);
                    console.log('Phase Scores:');
                    for (_i = 0, _a = Object.entries(breachResult.phaseMetrics); _i < _a.length; _i++) {
                        _b = _a[_i], phase = _b[0], metrics = _b[1];
                        console.log("  ".concat(phase, ": OS=").concat(metrics.OS.toFixed(2), ", DGBP=").concat((metrics.DGBP * 100).toFixed(1), "%"));
                    }
                    // Scenario 2: Recovery (Low DGBP, High ISP)
                    console.log('\n📈 Running RECOVERY Scenario (Bull Market)...');
                    recoveryInput = __assign(__assign({}, baseInput), { scenario: __assign(__assign({}, baseInput.scenario), { equity: __assign(__assign({}, baseInput.scenario.equity), { mu: [0.12, 0.08], sigma: [0.12, 0.16] // Lower volatility
                             }) }) });
                    return [4 /*yield*/, analyzer.analyze(recoveryInput)];
                case 2:
                    recoveryResult = _l.sent();
                    recoveryReceipt = (0, receipts_1.makeOutcomeReceipt)({
                        policyHash: 'recovery_policy_001',
                        modelHash: 'swag_v1_recovery',
                        regimeState: 'bull_market',
                        phaseMetrics: recoveryResult.phaseMetrics,
                        trades: ['growth_rebalance', 'ltc_premium_optimization'],
                        lotDeltas: { equity: +0.10, bonds: -0.05, infrastructure: +0.03, crypto: +0.02 },
                        seed: 'demo_seed_2024'
                    });
                    console.log('\n📋 RECOVERY RECEIPT:');
                    console.log('Hash:', recoveryReceipt.hash);
                    console.log('Phase Scores:');
                    for (_c = 0, _d = Object.entries(recoveryResult.phaseMetrics); _c < _d.length; _c++) {
                        _e = _d[_c], phase = _e[0], metrics = _e[1];
                        console.log("  ".concat(phase, ": OS=").concat(metrics.OS.toFixed(2), ", ISP=").concat((metrics.ISP * 100).toFixed(1), "%"));
                    }
                    // Comparison Summary
                    console.log('\n📊 BREACH vs RECOVERY COMPARISON:');
                    console.log('=' * 40);
                    phases = ['income_now', 'income_later', 'growth', 'legacy'];
                    for (_f = 0, phases_1 = phases; _f < phases_1.length; _f++) {
                        phase = phases_1[_f];
                        breachOS = ((_h = breachResult.phaseMetrics[phase]) === null || _h === void 0 ? void 0 : _h.OS) || 0;
                        recoveryOS = ((_j = recoveryResult.phaseMetrics[phase]) === null || _j === void 0 ? void 0 : _j.OS) || 0;
                        improvement = recoveryOS - breachOS;
                        console.log("".concat(phase.toUpperCase(), ": ").concat(breachOS.toFixed(2), " \u2192 ").concat(recoveryOS.toFixed(2), " (\u0394").concat(improvement.toFixed(2), ")"));
                    }
                    // Risk Alerts
                    console.log('\n⚠️  RISK ALERTS:');
                    for (_g = 0, phases_2 = phases; _g < phases_2.length; _g++) {
                        phase = phases_2[_g];
                        breachDGBP = ((_k = breachResult.phaseMetrics[phase]) === null || _k === void 0 ? void 0 : _k.DGBP) || 0;
                        if (breachDGBP > 0.15) {
                            console.log("  ".concat(phase, ": High drawdown risk (").concat((breachDGBP * 100).toFixed(1), "%)"));
                        }
                    }
                    console.log('\n✅ Demo completed! Receipts generated for audit trail.');
                    return [2 /*return*/, {
                            breachReceipt: breachReceipt,
                            recoveryReceipt: recoveryReceipt,
                            breachResult: breachResult,
                            recoveryResult: recoveryResult
                        }];
            }
        });
    });
}
// Run if called directly
if (require.main === module) {
    runDemo().catch(console.error);
}
