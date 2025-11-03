"use strict";
/**
 * SWAG Analyzer - Main Export
 * Strategic Wealth Alpha GPS™
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
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
exports.SWAGAnalyzer = exports.engines = void 0;
exports.createAnalyzer = createAnalyzer;
exports.createDefaultInput = createDefaultInput;
__exportStar(require("./models"), exports);
__exportStar(require("./phase_objective"), exports);
__exportStar(require("./monitoring"), exports);
__exportStar(require("./phase_shift"), exports);
__exportStar(require("./alt_models"), exports);
__exportStar(require("./receipts"), exports);
exports.engines = require("./engines");
// Main analyzer class
var SWAGAnalyzer = /** @class */ (function () {
    function SWAGAnalyzer() {
    }
    SWAGAnalyzer.prototype.analyze = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var simulate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('./engines/simulator'); })];
                    case 1:
                        simulate = (_a.sent()).simulate;
                        return [2 /*return*/, simulate()];
                }
            });
        });
    };
    SWAGAnalyzer.prototype.generateReceipt = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var makeOutcomeReceipt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('./receipts'); })];
                    case 1:
                        makeOutcomeReceipt = (_a.sent()).makeOutcomeReceipt;
                        return [2 /*return*/, makeOutcomeReceipt(data)];
                }
            });
        });
    };
    return SWAGAnalyzer;
}());
exports.SWAGAnalyzer = SWAGAnalyzer;
/**
 * Main SWAG Analyzer class - Entry point for all analysis
 */
var SWAGAnalyzer = /** @class */ (function () {
    function SWAGAnalyzer(seed) {
        this.simulator = new MonteCarloSimulator(seed);
        this.phaseCalculator = new PhaseObjectiveCalculator();
    }
    /**
     * Run comprehensive SWAG analysis
     */
    SWAGAnalyzer.prototype.analyze = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var result, enhancedPhaseMetrics;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Validate input
                        this.validateInput(input);
                        return [4 /*yield*/, this.simulator.runAnalysis(input)];
                    case 1:
                        result = _a.sent();
                        enhancedPhaseMetrics = this.calculateEnhancedPhaseMetrics(result, input);
                        return [2 /*return*/, __assign(__assign({}, result), { phaseMetrics: enhancedPhaseMetrics })];
                }
            });
        });
    };
    /**
     * Run quick analysis with fewer Monte Carlo paths
     */
    SWAGAnalyzer.prototype.quickAnalyze = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var quickInput;
            return __generator(this, function (_a) {
                quickInput = __assign(__assign({}, input), { scenario: __assign(__assign({}, input.scenario), { nPaths: Math.min(100, input.scenario.nPaths) }) });
                return [2 /*return*/, this.analyze(quickInput)];
            });
        });
    };
    /**
     * Generate stress test scenarios only
     */
    SWAGAnalyzer.prototype.stressTest = function (input_1) {
        return __awaiter(this, arguments, void 0, function (input, scenarios) {
            var stressInput, result, stressTests;
            if (scenarios === void 0) { scenarios = ['market_crash', 'inflation_spike', 'longevity_shock', 'ltc_event']; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stressInput = __assign(__assign({}, input), { scenario: __assign(__assign({}, input.scenario), { nPaths: 500 // Focused stress testing
                             }) });
                        return [4 /*yield*/, this.simulator.runAnalysis(stressInput)];
                    case 1:
                        result = _a.sent();
                        stressTests = result.stressTests.filter(function (test) {
                            return scenarios.includes(test.scenario) || test.scenario.includes('stress');
                        });
                        return [2 /*return*/, {
                                householdId: result.householdId,
                                runId: result.runId,
                                timestamp: result.timestamp,
                                stressTests: stressTests,
                                summary: __assign(__assign({}, result.summary), { keyRisks: result.summary.keyRisks.filter(function (risk) {
                                        return scenarios.some(function (scenario) { return risk.toLowerCase().includes(scenario.toLowerCase()); });
                                    }) })
                            }];
                }
            });
        });
    };
    /**
     * Calculate phase transition recommendations
     */
    SWAGAnalyzer.prototype.analyzePhaseTransition = function (currentPhase, nextPhase, currentResult, projectedResult) {
        return this.phaseCalculator.calculatePhaseTransitionMetrics(currentPhase, nextPhase, currentResult.phaseMetrics[currentPhase], projectedResult.phaseMetrics[nextPhase]);
    };
    /**
     * Generate rebalancing recommendations based on outcome scores
     */
    SWAGAnalyzer.prototype.generateRebalancingRecommendations = function (result, targetScores) {
        var defaultTargets = {
            INCOME_NOW: 85,
            INCOME_LATER: 80,
            GROWTH: 75,
            LEGACY: 78
        };
        return this.phaseCalculator.generateRebalancingRecommendations(result.phaseMetrics, targetScores || defaultTargets);
    };
    /**
     * Create default scenario configuration
     */
    SWAGAnalyzer.createDefaultScenario = function () {
        return {
            nPaths: 1000,
            horizonYears: 30,
            blockLenMonths: 12,
            inflation: {
                mu: 0.025, // 2.5% long-run inflation
                phi: 0.3, // Moderate persistence
                sigma: 0.01 // 1% volatility
            },
            rates: {
                meanRev: 0.2, // 20% mean reversion speed
                vol: 0.015, // 1.5% rate volatility
                longRun: 0.03, // 3% long-run rate
                r0: 0.025 // Current rate
            },
            equity: {
                regimes: 2,
                trans: [[0.9, 0.1], [0.3, 0.7]], // Persistent regimes
                mu: [0.08, -0.05], // Bull/bear market returns
                sigma: [0.16, 0.25] // Volatilities by regime
            },
            privateCredit: {
                baseYield: 0.06,
                defaultProb: 0.02,
                recovery: 0.6,
                taxChar: 'interest'
            },
            infra: {
                baseYield: 0.05,
                rocPct: 0.3,
                depShield: true
            },
            crypto: {
                symbols: ['BTC', 'ETH'],
                vol: 0.6,
                corr: 0.3,
                unbondDays: 21,
                slashingProb: 0.001
            },
            ltc: {
                baseHazard: 0.01,
                age0: 65,
                inflation: 0.04,
                intensityDist: [0.6, 0.25, 0.1, 0.05] // None, mild, moderate, severe
            },
            longevity: {
                male: true,
                gmA: 0.0001,
                gmB: 0.0002,
                gmC: 0.08
            },
            taxes: {
                ordinary: 0.22,
                qualified: 0.15,
                ltg: 0.15,
                stg: 0.22,
                state: 0.05,
                ubti: false
            }
        };
    };
    /**
     * Validate analyzer input
     */
    SWAGAnalyzer.prototype.validateInput = function (input) {
        if (!input.householdId) {
            throw new Error('Household ID is required');
        }
        if (input.currentAge < 18 || input.currentAge > 100) {
            throw new Error('Current age must be between 18 and 100');
        }
        if (input.retirementAge <= input.currentAge) {
            throw new Error('Retirement age must be after current age');
        }
        if (input.initialPortfolio <= 0) {
            throw new Error('Initial portfolio value must be positive');
        }
        if (!input.scenario || input.scenario.nPaths < 100) {
            throw new Error('Scenario must specify at least 100 Monte Carlo paths');
        }
        // Validate risk profile
        if (!input.risk.epsilonByPhase) {
            throw new Error('Risk profile must include epsilon values for all phases');
        }
        for (var _i = 0, _a = ['INCOME_NOW', 'INCOME_LATER', 'GROWTH', 'LEGACY']; _i < _a.length; _i++) {
            var phaseId = _a[_i];
            if (!(phaseId in input.risk.epsilonByPhase)) {
                throw new Error("Risk profile missing epsilon for phase ".concat(phaseId));
            }
            if (!(phaseId in input.risk.budgets)) {
                throw new Error("Risk profile missing budgets for phase ".concat(phaseId));
            }
        }
    };
    /**
     * Calculate enhanced phase metrics using PhaseObjectiveCalculator
     */
    SWAGAnalyzer.prototype.calculateEnhancedPhaseMetrics = function (result, input) {
        var phaseTimeframes = {
            INCOME_NOW: { startYear: 0, endYear: 2 },
            INCOME_LATER: { startYear: 3, endYear: 12 },
            GROWTH: { startYear: 13, endYear: 25 },
            LEGACY: { startYear: 26, endYear: input.scenario.horizonYears }
        };
        var enhancedMetrics = {
            INCOME_NOW: {},
            INCOME_LATER: {},
            GROWTH: {},
            LEGACY: {}
        };
        for (var _i = 0, _a = Object.entries(phaseTimeframes); _i < _a.length; _i++) {
            var _b = _a[_i], phaseId = _b[0], timeframe = _b[1];
            enhancedMetrics[phaseId] = this.phaseCalculator.calculatePhaseOutcomes(phaseId, result.stressTests, input, timeframe);
        }
        return enhancedMetrics;
    };
    return SWAGAnalyzer;
}());
exports.SWAGAnalyzer = SWAGAnalyzer;
// Export convenience functions
function createAnalyzer(seed) {
    return new SWAGAnalyzer(seed);
}
function createDefaultInput(householdId) {
    return {
        householdId: householdId,
        currentAge: 45,
        retirementAge: 65,
        lifeExpectancy: 90,
        initialPortfolio: 1000000,
        holdings: [],
        cashflowNeeds: {
            INCOME_NOW: { schedule: [], essential: true, inflationProtected: true },
            INCOME_LATER: { schedule: [], essential: true, inflationProtected: true },
            GROWTH: { schedule: [], essential: false, inflationProtected: false },
            LEGACY: { schedule: [], essential: false, inflationProtected: false }
        },
        risk: {
            epsilonByPhase: {
                INCOME_NOW: 0.05,
                INCOME_LATER: 0.1,
                GROWTH: 0.15,
                LEGACY: 0.1
            },
            budgets: {
                INCOME_NOW: { bL: 0.1, bA: 0.8, bR: 0.1, bT: 0.05 },
                INCOME_LATER: { bL: 0.05, bA: 0.85, bR: 0.15, bT: 0.08 },
                GROWTH: { bL: 0.02, bA: 0.9, bR: 0.2, bT: 0.1 },
                LEGACY: { bL: 0.05, bA: 0.8, bR: 0.12, bT: 0.15 }
            },
            maxDrawdown: 0.25,
            confidenceLevel: 0.9
        },
        scenario: SWAGAnalyzer.createDefaultScenario()
    };
}
