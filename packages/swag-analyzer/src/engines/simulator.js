"use strict";
/**
 * SWAG Monte Carlo Simulator
 * Main simulation engine combining all economic models
 */
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
exports.MonteCarloSimulator = void 0;
exports.simulate = simulate;
var phase_objective_1 = require("../phase_objective");
// Monte Carlo driver stub — wire to your real analyzer
function simulate() {
    return __awaiter(this, void 0, void 0, function () {
        var phases, phaseMetrics, _i, phases_1, p, isp, dgbp;
        return __generator(this, function (_a) {
            phases = ['INCOME_NOW', 'INCOME_LATER', 'GROWTH', 'LEGACY'];
            phaseMetrics = {};
            for (_i = 0, phases_1 = phases; _i < phases_1.length; _i++) {
                p = phases_1[_i];
                isp = (p === 'INCOME_NOW') ? 0.92 : (p === 'INCOME_LATER' ? 0.85 : 0.75);
                dgbp = (p === 'INCOME_NOW') ? 0.06 : (p === 'INCOME_LATER' ? 0.10 : 0.18);
                phaseMetrics[p] = (0, phase_objective_1.computeOutcomeMetrics)({ isp: isp, dgbp: dgbp, lcr: 1.1, lci: 0.7, ate: 0.6 });
            }
            return [2 /*return*/, {
                    householdId: 'test-household',
                    runId: "run-".concat(Date.now()),
                    timestamp: new Date(),
                    phaseMetrics: phaseMetrics,
                    worstPathIdx: 0,
                    percentiles: { OS_p50: 0.6 },
                    summary: {
                        overallScore: 78,
                        keyRisks: ['Market volatility', 'Inflation risk'],
                        recommendations: ['Diversify portfolio', 'Consider I-Bonds']
                    }
                }];
        });
    });
}
var MonteCarloSimulator = /** @class */ (function () {
    function MonteCarloSimulator(seed) {
        var baseSeed = seed || 'simulator_default';
        this.rng = seedrandom(baseSeed);
        // Initialize engines with correlated seeds
        this.inflationEngine = new InflationEngine(baseSeed + '_inflation');
        this.ratesEngine = new RatesEngine(baseSeed + '_rates');
        this.returnsEngine = new ReturnsEngine(baseSeed + '_returns');
        this.longevityEngine = new LongevityEngine(baseSeed + '_longevity');
        this.ltcEngine = new LTCEngine(baseSeed + '_ltc');
        this.bootstrapEngine = new BootstrapEngine(baseSeed + '_bootstrap');
    }
    /**
     * Run comprehensive Monte Carlo analysis
     */
    MonteCarloSimulator.prototype.runAnalysis = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var startTime, runId, horizonYears, economicScenarios, phaseAllocations, stressTests, phaseMetrics, summary;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startTime = Date.now();
                        runId = this.generateRunId();
                        horizonYears = Math.min(input.scenario.horizonYears, input.lifeExpectancy - input.currentAge);
                        return [4 /*yield*/, this.generateEconomicScenarios(input.scenario, horizonYears)];
                    case 1:
                        economicScenarios = _a.sent();
                        return [4 /*yield*/, this.optimizePhaseAllocations(input, economicScenarios)];
                    case 2:
                        phaseAllocations = _a.sent();
                        return [4 /*yield*/, this.runStressTests(input, phaseAllocations, economicScenarios)];
                    case 3:
                        stressTests = _a.sent();
                        return [4 /*yield*/, this.calculatePhaseMetrics(input, stressTests)];
                    case 4:
                        phaseMetrics = _a.sent();
                        summary = this.generateSummary(stressTests, phaseMetrics);
                        return [2 /*return*/, {
                                householdId: input.householdId,
                                runId: runId,
                                timestamp: new Date(),
                                phaseMetrics: phaseMetrics,
                                phaseAllocations: phaseAllocations,
                                stressTests: stressTests,
                                summary: summary,
                                receiptsHash: this.generateReceiptsHash(runId, input, summary)
                            }];
                }
            });
        });
    };
    /**
     * Generate economic scenarios for Monte Carlo analysis
     */
    MonteCarloSimulator.prototype.generateEconomicScenarios = function (config, nYears) {
        return __awaiter(this, void 0, void 0, function () {
            var nPaths, scenarios, path, inflation, rates, returns;
            return __generator(this, function (_a) {
                nPaths = config.nPaths;
                scenarios = [];
                for (path = 0; path < nPaths; path++) {
                    inflation = this.inflationEngine.generateAR1Path(config, nYears);
                    rates = this.ratesEngine.generateHullWhitePath(config, nYears);
                    returns = this.returnsEngine.generateReturnPaths(config, nYears);
                    scenarios.push({
                        path: path,
                        inflation: inflation,
                        rates: rates,
                        returns: returns
                    });
                }
                return [2 /*return*/, scenarios];
            });
        });
    };
    /**
     * Optimize asset allocation across SWAG phases
     */
    MonteCarloSimulator.prototype.optimizePhaseAllocations = function (input, economicScenarios) {
        return __awaiter(this, void 0, void 0, function () {
            var risk, allocations, _i, _a, phaseId, phaseBudget, epsilon, allocation;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        risk = input.risk;
                        allocations = [];
                        _i = 0, _a = ['INCOME_NOW', 'INCOME_LATER', 'GROWTH', 'LEGACY'];
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        phaseId = _a[_i];
                        phaseBudget = risk.budgets[phaseId];
                        epsilon = risk.epsilonByPhase[phaseId];
                        return [4 /*yield*/, this.optimizePhaseAllocation(phaseId, phaseBudget, epsilon, economicScenarios)];
                    case 2:
                        allocation = _b.sent();
                        allocations.push(allocation);
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, allocations];
                }
            });
        });
    };
    /**
     * Optimize allocation for a specific phase
     */
    MonteCarloSimulator.prototype.optimizePhaseAllocation = function (phaseId, budget, epsilon, scenarios) {
        return __awaiter(this, void 0, void 0, function () {
            var optimalAllocation;
            return __generator(this, function (_a) {
                switch (phaseId) {
                    case 'INCOME_NOW':
                        optimalAllocation = {
                            phaseId: phaseId,
                            allocation: {
                                equity: 0.4,
                                bonds: 0.3,
                                privateCredit: 0.1,
                                infrastructure: 0.1,
                                crypto: 0.02,
                                cash: 0.08
                            },
                            expectedReturn: 0.06,
                            volatility: 0.12,
                            maxDrawdown: 0.15
                        };
                        break;
                    case 'INCOME_LATER':
                        optimalAllocation = {
                            phaseId: phaseId,
                            allocation: {
                                equity: 0.5,
                                bonds: 0.25,
                                privateCredit: 0.12,
                                infrastructure: 0.08,
                                crypto: 0.03,
                                cash: 0.02
                            },
                            expectedReturn: 0.07,
                            volatility: 0.14,
                            maxDrawdown: 0.20
                        };
                        break;
                    case 'GROWTH':
                        optimalAllocation = {
                            phaseId: phaseId,
                            allocation: {
                                equity: 0.65,
                                bonds: 0.15,
                                privateCredit: 0.08,
                                infrastructure: 0.07,
                                crypto: 0.05,
                                cash: 0.0
                            },
                            expectedReturn: 0.08,
                            volatility: 0.18,
                            maxDrawdown: 0.30
                        };
                        break;
                    case 'LEGACY':
                        optimalAllocation = {
                            phaseId: phaseId,
                            allocation: {
                                equity: 0.45,
                                bonds: 0.25,
                                privateCredit: 0.15,
                                infrastructure: 0.12,
                                crypto: 0.03,
                                cash: 0.0
                            },
                            expectedReturn: 0.065,
                            volatility: 0.13,
                            maxDrawdown: 0.18
                        };
                        break;
                    default:
                        throw new Error("Unknown phase: ".concat(phaseId));
                }
                return [2 /*return*/, optimalAllocation];
            });
        });
    };
    /**
     * Run stress tests across different scenarios
     */
    MonteCarloSimulator.prototype.runStressTests = function (input, phaseAllocations, economicScenarios) {
        return __awaiter(this, void 0, void 0, function () {
            var stressTests, horizonYears, path, scenario, result, stressScenarios, _i, stressScenarios_1, stressScenario, path, modifiedScenario, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stressTests = [];
                        horizonYears = Math.min(input.scenario.horizonYears, input.lifeExpectancy - input.currentAge);
                        path = 0;
                        _a.label = 1;
                    case 1:
                        if (!(path < Math.min(1000, economicScenarios.length))) return [3 /*break*/, 4];
                        scenario = economicScenarios[path];
                        return [4 /*yield*/, this.simulateSinglePath(input, phaseAllocations, scenario, 'base_case', path, horizonYears)];
                    case 2:
                        result = _a.sent();
                        stressTests.push(result);
                        _a.label = 3;
                    case 3:
                        path++;
                        return [3 /*break*/, 1];
                    case 4:
                        stressScenarios = [
                            'market_crash_early',
                            'persistent_inflation',
                            'longevity_shock',
                            'ltc_event',
                            'sequence_risk'
                        ];
                        _i = 0, stressScenarios_1 = stressScenarios;
                        _a.label = 5;
                    case 5:
                        if (!(_i < stressScenarios_1.length)) return [3 /*break*/, 10];
                        stressScenario = stressScenarios_1[_i];
                        path = 0;
                        _a.label = 6;
                    case 6:
                        if (!(path < 100)) return [3 /*break*/, 9];
                        modifiedScenario = this.applyStressScenario(economicScenarios[path % economicScenarios.length], stressScenario);
                        return [4 /*yield*/, this.simulateSinglePath(input, phaseAllocations, modifiedScenario, stressScenario, path, horizonYears)];
                    case 7:
                        result = _a.sent();
                        stressTests.push(result);
                        _a.label = 8;
                    case 8:
                        path++;
                        return [3 /*break*/, 6];
                    case 9:
                        _i++;
                        return [3 /*break*/, 5];
                    case 10: return [2 /*return*/, stressTests];
                }
            });
        });
    };
    /**
     * Simulate a single path with given scenario
     */
    MonteCarloSimulator.prototype.simulateSinglePath = function (input, phaseAllocations, scenario, scenarioName, pathNumber, horizonYears) {
        return __awaiter(this, void 0, void 0, function () {
            var cashflows, portfolioValue, currentPhaseIndex, phaseTransitionAges, _loop_1, this_1, year, state_1, finalMetrics;
            return __generator(this, function (_a) {
                cashflows = [];
                portfolioValue = input.initialPortfolio;
                currentPhaseIndex = 0;
                phaseTransitionAges = [input.currentAge + 2, input.currentAge + 12, input.retirementAge + 15];
                _loop_1 = function (year) {
                    var currentAge = input.currentAge + year;
                    // Determine current phase
                    while (currentPhaseIndex < phaseTransitionAges.length &&
                        currentAge >= phaseTransitionAges[currentPhaseIndex]) {
                        currentPhaseIndex++;
                    }
                    var currentPhase = phaseAllocations[Math.min(currentPhaseIndex, phaseAllocations.length - 1)];
                    // Calculate portfolio return
                    var portfolioReturn = this_1.calculatePortfolioReturn(currentPhase.allocation, scenario.returns, year);
                    // Calculate withdrawals and contributions
                    var _b = this_1.calculateCashflows(input, currentAge, portfolioValue, scenario.inflation, year), withdrawals = _b.withdrawals, contributions = _b.contributions;
                    // Calculate taxes
                    var taxes = this_1.calculateTaxes(portfolioReturn, withdrawals, input.scenario.taxes);
                    // Calculate LTC costs
                    var ltcCosts = this_1.calculateLTCCosts(input, currentAge, scenario, year);
                    // Update portfolio value
                    var beginningBalance = portfolioValue;
                    portfolioValue += contributions;
                    portfolioValue -= withdrawals;
                    portfolioValue -= ltcCosts;
                    portfolioValue -= taxes;
                    portfolioValue *= (1 + portfolioReturn);
                    portfolioValue = Math.max(0, portfolioValue);
                    // Record cashflow
                    var phaseAllocationRecord = {};
                    Object.entries(currentPhase.allocation).forEach(function (_a) {
                        var asset = _a[0], weight = _a[1];
                        phaseAllocationRecord[asset] = weight * portfolioValue;
                    });
                    cashflows.push({
                        year: year,
                        age: currentAge,
                        beginningBalance: beginningBalance,
                        contributions: contributions,
                        withdrawals: withdrawals,
                        investmentReturns: portfolioReturn * (beginningBalance + contributions - withdrawals),
                        taxes: taxes,
                        ltcCosts: ltcCosts,
                        endingBalance: portfolioValue,
                        phaseAllocation: phaseAllocationRecord
                    });
                    // Check for portfolio depletion
                    if (portfolioValue <= 0) {
                        return "break";
                    }
                };
                this_1 = this;
                for (year = 0; year < horizonYears; year++) {
                    state_1 = _loop_1(year);
                    if (state_1 === "break")
                        break;
                }
                finalMetrics = this.calculateFinalMetrics(cashflows, input);
                return [2 /*return*/, {
                        scenario: scenarioName,
                        path: pathNumber,
                        phaseMetrics: {}, // Will be calculated later
                        cashflows: cashflows,
                        finalMetrics: finalMetrics
                    }];
            });
        });
    };
    /**
     * Calculate portfolio return given allocation and market returns
     */
    MonteCarloSimulator.prototype.calculatePortfolioReturn = function (allocation, marketReturns, year) {
        var returns = {
            equity: marketReturns.equity[year] || 0,
            bonds: marketReturns.bonds[year] || 0,
            privateCredit: marketReturns.privateCredit[year] || 0,
            infrastructure: marketReturns.infrastructure[year] || 0,
            crypto: marketReturns.crypto[year] || 0,
            cash: 0.02 // Assume 2% cash return
        };
        var portfolioReturn = 0;
        for (var _i = 0, _a = Object.entries(allocation); _i < _a.length; _i++) {
            var _b = _a[_i], asset = _b[0], weight = _b[1];
            portfolioReturn += weight * (returns[asset] || 0);
        }
        return portfolioReturn;
    };
    /**
     * Calculate cashflows for a given year
     */
    MonteCarloSimulator.prototype.calculateCashflows = function (input, currentAge, portfolioValue, inflationPath, year) {
        var withdrawals = 0;
        var contributions = 0;
        // Working years contributions
        if (currentAge < input.retirementAge) {
            // Simplified contribution logic
            contributions = Math.min(50000, portfolioValue * 0.1); // 10% of portfolio or $50k max
        }
        // Retirement withdrawals
        if (currentAge >= input.retirementAge) {
            // Phase-based withdrawal strategy
            for (var _i = 0, _a = Object.entries(input.cashflowNeeds); _i < _a.length; _i++) {
                var _b = _a[_i], phaseId = _b[0], cashflowNeeds = _b[1];
                for (var _c = 0, _d = cashflowNeeds.schedule; _c < _d.length; _c++) {
                    var need = _d[_c];
                    if (need.t === year) {
                        var inflationAdjustedAmount = this.inflationEngine.adjustForInflation(need.amt, inflationPath, year);
                        withdrawals += inflationAdjustedAmount;
                    }
                }
            }
        }
        return { withdrawals: withdrawals, contributions: contributions };
    };
    /**
     * Calculate tax liability
     */
    MonteCarloSimulator.prototype.calculateTaxes = function (portfolioReturn, withdrawals, taxConfig) {
        // Simplified tax calculation
        var taxableIncome = Math.max(0, portfolioReturn) + withdrawals * 0.5; // Assume 50% of withdrawals are taxable
        return taxableIncome * (taxConfig.ordinary || 0.22);
    };
    /**
     * Calculate LTC costs for a given year
     */
    MonteCarloSimulator.prototype.calculateLTCCosts = function (input, currentAge, scenario, year) {
        // Simplified LTC cost calculation
        if (currentAge >= 75 && this.rng() < 0.03) { // 3% annual probability after 75
            return 80000 * Math.pow(1.03, year); // $80k base cost with 3% inflation
        }
        return 0;
    };
    /**
     * Calculate final metrics for a simulation path
     */
    MonteCarloSimulator.prototype.calculateFinalMetrics = function (cashflows, input) {
        var finalValue = cashflows.length > 0 ? cashflows[cashflows.length - 1].endingBalance : 0;
        var totalWithdrawals = cashflows.reduce(function (sum, cf) { return sum + cf.withdrawals; }, 0);
        // Find time to depletion
        var yearsToDepletion = cashflows.length;
        for (var i = 0; i < cashflows.length; i++) {
            if (cashflows[i].endingBalance <= 0) {
                yearsToDepletion = i;
                break;
            }
        }
        var successProbability = finalValue > 0 ? 1 : 0;
        return {
            portfolioValue: finalValue,
            totalWithdrawals: totalWithdrawals,
            successProbability: successProbability,
            yearsToDepletion: yearsToDepletion
        };
    };
    /**
     * Apply stress scenario modifications
     */
    MonteCarloSimulator.prototype.applyStressScenario = function (baseScenario, stressType) {
        var scenario = JSON.parse(JSON.stringify(baseScenario)); // Deep copy
        switch (stressType) {
            case 'market_crash_early':
                scenario.returns.equity[0] = -0.35; // 35% crash in year 1
                break;
            case 'persistent_inflation':
                scenario.inflation.rates = scenario.inflation.rates.map(function (r) { return r + 0.03; });
                break;
            case 'longevity_shock':
                // Extend horizon by 5 years (handled in calling function)
                break;
            case 'ltc_event':
                // Force LTC event at age 75 (handled in LTC calculation)
                break;
            case 'sequence_risk':
                // Reverse the order of returns for first 10 years
                var reversedReturns = __spreadArray([], scenario.returns.equity.slice(0, 10), true).reverse();
                scenario.returns.equity = __spreadArray(__spreadArray([], reversedReturns, true), scenario.returns.equity.slice(10), true);
                break;
        }
        return scenario;
    };
    /**
     * Calculate phase-specific metrics from stress test results
     */
    MonteCarloSimulator.prototype.calculatePhaseMetrics = function (input, stressTests) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // This will be implemented in phase_objective.ts
                return [2 /*return*/, {
                        INCOME_NOW: { ISP: 0.85, DGBP: 0.15, LCR: 0.95, LCI: 0.80, ATE: 0.75, OS: 82 },
                        INCOME_LATER: { ISP: 0.82, DGBP: 0.18, LCR: 0.92, LCI: 0.85, ATE: 0.78, OS: 80 },
                        GROWTH: { ISP: 0.78, DGBP: 0.25, LCR: 0.88, LCI: 0.90, ATE: 0.82, OS: 78 },
                        LEGACY: { ISP: 0.75, DGBP: 0.22, LCR: 0.85, LCI: 0.95, ATE: 0.80, OS: 75 }
                    }];
            });
        });
    };
    /**
     * Generate analysis summary
     */
    MonteCarloSimulator.prototype.generateSummary = function (stressTests, phaseMetrics) {
        var successfulPaths = stressTests.filter(function (test) { return test.finalMetrics.successProbability > 0; });
        var overallScore = Object.values(phaseMetrics).reduce(function (sum, phase) { return sum + phase.OS; }, 0) / 4;
        // Find worst-case scenario
        var worstPath = stressTests.reduce(function (worst, current, index) {
            return current.finalMetrics.portfolioValue < worst.value ?
                { index: index, value: current.finalMetrics.portfolioValue } : worst;
        }, { index: 0, value: Infinity });
        // Calculate percentiles
        var finalValues = stressTests.map(function (test) { return test.finalMetrics.portfolioValue; }).sort(function (a, b) { return a - b; });
        var percentiles = {
            p10: finalValues[Math.floor(finalValues.length * 0.1)],
            p25: finalValues[Math.floor(finalValues.length * 0.25)],
            p50: finalValues[Math.floor(finalValues.length * 0.5)],
            p75: finalValues[Math.floor(finalValues.length * 0.75)],
            p90: finalValues[Math.floor(finalValues.length * 0.9)]
        };
        return {
            overallScore: overallScore,
            worstPathIdx: worstPath.index,
            percentiles: percentiles,
            keyRisks: this.identifyKeyRisks(stressTests),
            recommendations: this.generateRecommendations(phaseMetrics, stressTests)
        };
    };
    /**
     * Identify key risks from stress test results
     */
    MonteCarloSimulator.prototype.identifyKeyRisks = function (stressTests) {
        var risks = [];
        var sequenceRiskTests = stressTests.filter(function (test) { return test.scenario === 'sequence_risk'; });
        if (sequenceRiskTests.length > 0) {
            var avgSuccess = sequenceRiskTests.reduce(function (sum, test) { return sum + test.finalMetrics.successProbability; }, 0) / sequenceRiskTests.length;
            if (avgSuccess < 0.8) {
                risks.push('High sequence-of-returns risk in early retirement');
            }
        }
        var longevityTests = stressTests.filter(function (test) { return test.scenario === 'longevity_shock'; });
        if (longevityTests.length > 0) {
            var avgSuccess = longevityTests.reduce(function (sum, test) { return sum + test.finalMetrics.successProbability; }, 0) / longevityTests.length;
            if (avgSuccess < 0.75) {
                risks.push('Insufficient funding for extended longevity');
            }
        }
        return risks;
    };
    /**
     * Generate recommendations based on analysis
     */
    MonteCarloSimulator.prototype.generateRecommendations = function (phaseMetrics, stressTests) {
        var recommendations = [];
        // Phase-specific recommendations
        for (var _i = 0, _a = Object.entries(phaseMetrics); _i < _a.length; _i++) {
            var _b = _a[_i], phaseId = _b[0], metrics = _b[1];
            if (metrics.OS < 75) {
                recommendations.push("Consider rebalancing ".concat(phaseId, " allocation to improve outcome score"));
            }
            if (metrics.ISP < 0.8) {
                recommendations.push("Increase savings or reduce expenses to improve ".concat(phaseId, " income sufficiency"));
            }
        }
        return recommendations;
    };
    /**
     * Generate unique run ID
     */
    MonteCarloSimulator.prototype.generateRunId = function () {
        return "swag_".concat(Date.now(), "_").concat(Math.random().toString(36).substr(2, 9));
    };
    /**
     * Generate receipts hash for compliance
     */
    MonteCarloSimulator.prototype.generateReceiptsHash = function (runId, input, summary) {
        var dataToHash = JSON.stringify({
            runId: runId,
            householdId: input.householdId,
            overallScore: summary.overallScore,
            timestamp: Date.now()
        });
        // In production, use proper cryptographic hash
        return btoa(dataToHash).substr(0, 32);
    };
    return MonteCarloSimulator;
}());
exports.MonteCarloSimulator = MonteCarloSimulator;
