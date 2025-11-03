"use strict";
/**
 * Test suite for SWAG Analyzer Monte Carlo Simulator
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
var simulator_1 = require("../src/engines/simulator");
var index_1 = require("../src/index");
describe('MonteCarloSimulator', function () {
    var simulator;
    var testInput;
    beforeEach(function () {
        // Use fixed seed for reproducible tests
        simulator = new simulator_1.MonteCarloSimulator('test_seed_123');
        // Create test input
        var baseInput = (0, index_1.createDefaultInput)('test_household_123');
        testInput = __assign(__assign({}, baseInput), { scenario: __assign(__assign({}, baseInput.scenario), { nPaths: 100, horizonYears: 20 }) });
    });
    describe('Economic Scenario Generation', function () {
        test('should generate consistent scenarios with fixed seed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var scenarios1, scenarios2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, simulator.generateEconomicScenarios(testInput.scenario, 10)];
                    case 1:
                        scenarios1 = _a.sent();
                        return [4 /*yield*/, simulator.generateEconomicScenarios(testInput.scenario, 10)];
                    case 2:
                        scenarios2 = _a.sent();
                        expect(scenarios1).toHaveLength(100);
                        expect(scenarios2).toHaveLength(100);
                        // With same seed, first scenarios should be identical
                        expect(scenarios1[0].inflation.rates[0]).toBeCloseTo(scenarios2[0].inflation.rates[0], 6);
                        expect(scenarios1[0].returns.equity[0]).toBeCloseTo(scenarios2[0].returns.equity[0], 6);
                        return [2 /*return*/];
                }
            });
        }); });
        test('should generate paths of correct length', function () { return __awaiter(void 0, void 0, void 0, function () {
            var scenarios;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, simulator.generateEconomicScenarios(testInput.scenario, 15)];
                    case 1:
                        scenarios = _a.sent();
                        expect(scenarios[0].inflation.rates).toHaveLength(15);
                        expect(scenarios[0].rates.shortRates).toHaveLength(15);
                        expect(scenarios[0].returns.equity).toHaveLength(15);
                        return [2 /*return*/];
                }
            });
        }); });
        test('should generate realistic economic values', function () { return __awaiter(void 0, void 0, void 0, function () {
            var scenarios, _i, _a, scenario;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, simulator.generateEconomicScenarios(testInput.scenario, 10)];
                    case 1:
                        scenarios = _b.sent();
                        for (_i = 0, _a = scenarios.slice(0, 10); _i < _a.length; _i++) { // Test first 10 scenarios
                            scenario = _a[_i];
                            // Inflation rates should be reasonable (-5% to +15%)
                            scenario.inflation.rates.forEach(function (rate) {
                                expect(rate).toBeGreaterThan(-0.05);
                                expect(rate).toBeLessThan(0.15);
                            });
                            // Interest rates should be non-negative
                            scenario.rates.shortRates.forEach(function (rate) {
                                expect(rate).toBeGreaterThanOrEqual(0.001);
                            });
                            // Equity returns should be within reasonable bounds (-50% to +100%)
                            scenario.returns.equity.forEach(function (ret) {
                                expect(ret).toBeGreaterThan(-0.5);
                                expect(ret).toBeLessThan(1.0);
                            });
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Portfolio Return Calculation', function () {
        test('should calculate weighted portfolio returns correctly', function () {
            var allocation = {
                equity: 0.6,
                bonds: 0.3,
                cash: 0.1,
                privateCredit: 0,
                infrastructure: 0,
                crypto: 0
            };
            var marketReturns = {
                equity: [0.1, 0.05, -0.02],
                bonds: [0.03, 0.04, 0.06],
                privateCredit: [0.06],
                infrastructure: [0.05],
                crypto: [0.15],
                regimeStates: [0, 0, 1]
            };
            var portfolioReturn = simulator.calculatePortfolioReturn(allocation, marketReturns, 0);
            var expectedReturn = 0.6 * 0.1 + 0.3 * 0.03 + 0.1 * 0.02; // 0.02 cash return
            expect(portfolioReturn).toBeCloseTo(expectedReturn, 4);
        });
        test('should handle missing asset returns gracefully', function () {
            var allocation = {
                equity: 0.5,
                bonds: 0.3,
                nonExistentAsset: 0.2,
                cash: 0,
                privateCredit: 0,
                infrastructure: 0,
                crypto: 0
            };
            var marketReturns = {
                equity: [0.08],
                bonds: [0.04],
                privateCredit: [0],
                infrastructure: [0],
                crypto: [0]
            };
            var portfolioReturn = simulator.calculatePortfolioReturn(allocation, marketReturns, 0);
            var expectedReturn = 0.5 * 0.08 + 0.3 * 0.04; // Missing asset treated as 0 return
            expect(portfolioReturn).toBeCloseTo(expectedReturn, 4);
        });
    });
    describe('Cashflow Calculations', function () {
        test('should calculate contributions during working years', function () {
            var currentAge = 45;
            var portfolioValue = 500000;
            var mockInflationPath = { rates: [0.025], cumulativeInflation: [1.0] };
            var _a = simulator.calculateCashflows(testInput, currentAge, portfolioValue, mockInflationPath, 0), contributions = _a.contributions, withdrawals = _a.withdrawals;
            expect(contributions).toBeGreaterThan(0);
            expect(withdrawals).toBe(0); // Not retired yet
            expect(contributions).toBeLessThanOrEqual(50000); // Contribution cap
        });
        test('should calculate withdrawals during retirement', function () {
            var currentAge = 67; // Retired
            var portfolioValue = 1000000;
            var mockInflationPath = { rates: [0.025], cumulativeInflation: [1.0] };
            // Add some cashflow needs
            var retirementInput = __assign(__assign({}, testInput), { cashflowNeeds: __assign(__assign({}, testInput.cashflowNeeds), { INCOME_NOW: {
                        schedule: [{ t: 0, amt: 60000 }],
                        essential: true,
                        inflationProtected: true
                    } }) });
            var _a = simulator.calculateCashflows(retirementInput, currentAge, portfolioValue, mockInflationPath, 0), contributions = _a.contributions, withdrawals = _a.withdrawals;
            expect(contributions).toBe(0); // No contributions in retirement
            expect(withdrawals).toBeGreaterThan(0);
        });
    });
    describe('Full Analysis Run', function () {
        test('should complete analysis without errors', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, simulator.runAnalysis(testInput)];
                    case 1:
                        result = _a.sent();
                        expect(result).toBeDefined();
                        expect(result.householdId).toBe('test_household_123');
                        expect(result.runId).toMatch(/^swag_\d+_[a-z0-9]+$/);
                        expect(result.timestamp).toBeInstanceOf(Date);
                        expect(result.phaseAllocations).toHaveLength(4);
                        expect(result.stressTests.length).toBeGreaterThan(0);
                        expect(result.summary).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should generate phase allocations for all SWAG phases', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, phaseIds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, simulator.runAnalysis(testInput)];
                    case 1:
                        result = _a.sent();
                        phaseIds = result.phaseAllocations.map(function (pa) { return pa.phaseId; });
                        expect(phaseIds).toContain('INCOME_NOW');
                        expect(phaseIds).toContain('INCOME_LATER');
                        expect(phaseIds).toContain('GROWTH');
                        expect(phaseIds).toContain('LEGACY');
                        // Each allocation should sum to approximately 1.0
                        result.phaseAllocations.forEach(function (allocation) {
                            var totalWeight = Object.values(allocation.allocation).reduce(function (sum, weight) { return sum + weight; }, 0);
                            expect(totalWeight).toBeCloseTo(1.0, 2);
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        test('should produce reasonable final metrics', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, simulator.runAnalysis(testInput)];
                    case 1:
                        result = _a.sent();
                        expect(result.summary.overallScore).toBeGreaterThanOrEqual(0);
                        expect(result.summary.overallScore).toBeLessThanOrEqual(100);
                        expect(result.summary.percentiles.p50).toBeGreaterThanOrEqual(0);
                        expect(result.summary.keyRisks).toBeInstanceOf(Array);
                        expect(result.summary.recommendations).toBeInstanceOf(Array);
                        return [2 /*return*/];
                }
            });
        }); });
        test('should handle stress scenarios correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, stressScenarios, uniqueScenarios, baseResults, stressResults;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, simulator.runAnalysis(testInput)];
                    case 1:
                        result = _a.sent();
                        stressScenarios = result.stressTests.map(function (test) { return test.scenario; });
                        uniqueScenarios = __spreadArray([], new Set(stressScenarios), true);
                        // Should have base case plus stress scenarios
                        expect(uniqueScenarios.length).toBeGreaterThan(1);
                        expect(uniqueScenarios).toContain('base_case');
                        baseResults = result.stressTests.filter(function (test) { return test.scenario === 'base_case'; });
                        stressResults = result.stressTests.filter(function (test) { return test.scenario !== 'base_case'; });
                        expect(baseResults.length).toBeGreaterThan(0);
                        expect(stressResults.length).toBeGreaterThan(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Error Handling', function () {
        test('should handle empty portfolio gracefully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var invalidInput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        invalidInput = __assign(__assign({}, testInput), { initialPortfolio: 0 });
                        return [4 /*yield*/, expect(simulator.runAnalysis(invalidInput)).rejects.toThrow()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should handle very short time horizons', function () { return __awaiter(void 0, void 0, void 0, function () {
            var shortInput, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shortInput = __assign(__assign({}, testInput), { scenario: __assign(__assign({}, testInput.scenario), { horizonYears: 1 }) });
                        return [4 /*yield*/, simulator.runAnalysis(shortInput)];
                    case 1:
                        result = _a.sent();
                        expect(result.stressTests[0].cashflows).toHaveLength(1);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
describe('SWAGAnalyzer Integration', function () {
    var analyzer;
    var testInput;
    beforeEach(function () {
        analyzer = new index_1.SWAGAnalyzer('integration_test_seed');
        var baseInput = (0, index_1.createDefaultInput)('integration_test_household');
        testInput = __assign(__assign({}, baseInput), { scenario: __assign(__assign({}, baseInput.scenario), { nPaths: 50 // Faster for integration tests
             }) });
    });
    test('should perform quick analysis', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, analyzer.quickAnalyze(testInput)];
                case 1:
                    result = _a.sent();
                    expect(result).toBeDefined();
                    expect(result.summary.overallScore).toBeGreaterThanOrEqual(0);
                    expect(result.summary.overallScore).toBeLessThanOrEqual(100);
                    return [2 /*return*/];
            }
        });
    }); });
    test('should generate rebalancing recommendations', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, recommendations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, analyzer.analyze(testInput)];
                case 1:
                    result = _a.sent();
                    recommendations = analyzer.generateRebalancingRecommendations(result);
                    expect(recommendations).toBeInstanceOf(Array);
                    recommendations.forEach(function (rec) {
                        expect(rec.phaseId).toMatch(/^(INCOME_NOW|INCOME_LATER|GROWTH|LEGACY)$/);
                        expect(rec.priority).toMatch(/^(high|medium|low)$/);
                        expect(rec.recommendations).toBeInstanceOf(Array);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    test('should handle stress testing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var stressResult;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, analyzer.stressTest(testInput, ['market_crash', 'inflation_spike'])];
                case 1:
                    stressResult = _b.sent();
                    expect(stressResult.stressTests).toBeDefined();
                    expect((_a = stressResult.summary) === null || _a === void 0 ? void 0 : _a.keyRisks).toBeInstanceOf(Array);
                    return [2 /*return*/];
            }
        });
    }); });
});
