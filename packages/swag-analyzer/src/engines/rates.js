"use strict";
/**
 * Interest Rates Engine - Hull-White 1F and CIR Models
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatesEngine = void 0;
var seedrandom = require("seedrandom");
var RatesEngine = /** @class */ (function () {
    function RatesEngine(seed) {
        this.rng = seedrandom(seed || 'rates_default');
    }
    /**
     * Generate interest rate path using Hull-White 1-Factor model:
     * dr_t = [θ(t) - αr_t]dt + σdW_t
     */
    RatesEngine.prototype.generateHullWhitePath = function (config, nYears) {
        var _a = config.rates, alpha = _a.meanRev, sigma = _a.vol, theta = _a.longRun, r0 = _a.r0;
        var dt = 1 / 12; // Monthly steps
        var nSteps = nYears * 12;
        var shortRates = [];
        var longRates = [];
        var yieldCurve = [];
        var r = r0;
        for (var i = 0; i < nSteps; i++) {
            // Hull-White dynamics
            var dW = this.gaussianRandom() * Math.sqrt(dt);
            var dr = alpha * (theta - r) * dt + sigma * dW;
            r += dr;
            r = Math.max(0.001, r); // Floor at 0.1%
            if (i % 12 === 11) { // Annual observation
                shortRates.push(r);
                // Generate yield curve using Hull-White term structure
                var curve = this.generateYieldCurve(r, alpha, sigma, theta);
                yieldCurve.push(curve);
                longRates.push(curve[9]); // 10-year rate
            }
        }
        return {
            years: Array.from({ length: shortRates.length }, function (_, i) { return i; }),
            shortRates: shortRates,
            longRates: longRates,
            yieldCurve: yieldCurve
        };
    };
    /**
     * Generate interest rate path using CIR model:
     * dr_t = κ(θ - r_t)dt + σ√r_t dW_t
     */
    RatesEngine.prototype.generateCIRPath = function (config, nYears) {
        var _a = config.rates, kappa = _a.meanRev, sigma = _a.vol, theta = _a.longRun, r0 = _a.r0;
        var dt = 1 / 12;
        var nSteps = nYears * 12;
        var shortRates = [];
        var longRates = [];
        var yieldCurve = [];
        var r = r0;
        for (var i = 0; i < nSteps; i++) {
            var dW = this.gaussianRandom() * Math.sqrt(dt);
            var dr = kappa * (theta - r) * dt + sigma * Math.sqrt(Math.max(r, 0)) * dW;
            r += dr;
            r = Math.max(0.001, r); // Floor at 0.1%
            if (i % 12 === 11) {
                shortRates.push(r);
                // CIR yield curve (simplified)
                var curve = this.generateCIRYieldCurve(r, kappa, theta, sigma);
                yieldCurve.push(curve);
                longRates.push(curve[9]);
            }
        }
        return {
            years: Array.from({ length: shortRates.length }, function (_, i) { return i; }),
            shortRates: shortRates,
            longRates: longRates,
            yieldCurve: yieldCurve
        };
    };
    /**
     * Generate yield curve for Hull-White model
     */
    RatesEngine.prototype.generateYieldCurve = function (currentRate, alpha, sigma, theta) {
        var maturities = [0.25, 0.5, 1, 2, 3, 5, 7, 10, 20, 30]; // Years
        var curve = [];
        for (var _i = 0, maturities_1 = maturities; _i < maturities_1.length; _i++) {
            var T = maturities_1[_i];
            // Hull-White bond pricing formula (simplified)
            var B = (1 - Math.exp(-alpha * T)) / alpha;
            var A = Math.exp((theta - sigma * sigma / (2 * alpha * alpha)) * (B - T) -
                (sigma * sigma / (4 * alpha)) * B * B);
            var bondPrice = A * Math.exp(-B * currentRate);
            var yieldRate = -Math.log(bondPrice) / T;
            curve.push(Math.max(0.001, yieldRate));
        }
        return curve;
    };
    /**
     * Generate yield curve for CIR model
     */
    RatesEngine.prototype.generateCIRYieldCurve = function (currentRate, kappa, theta, sigma) {
        var maturities = [0.25, 0.5, 1, 2, 3, 5, 7, 10, 20, 30];
        var curve = [];
        for (var _i = 0, maturities_2 = maturities; _i < maturities_2.length; _i++) {
            var T = maturities_2[_i];
            // CIR bond pricing (analytical solution)
            var gamma = Math.sqrt(kappa * kappa + 2 * sigma * sigma);
            var B = 2 * (Math.exp(gamma * T) - 1) /
                ((gamma + kappa) * (Math.exp(gamma * T) - 1) + 2 * gamma);
            var A = Math.pow(2 * gamma * Math.exp((gamma + kappa) * T / 2) /
                ((gamma + kappa) * (Math.exp(gamma * T) - 1) + 2 * gamma), 2 * kappa * theta / (sigma * sigma));
            var bondPrice = A * Math.exp(-B * currentRate);
            var yieldRate = -Math.log(bondPrice) / T;
            curve.push(Math.max(0.001, yieldRate));
        }
        return curve;
    };
    /**
     * Generate rate scenarios for stress testing
     */
    RatesEngine.prototype.generateStressScenarios = function (config, nYears) {
        var baseConfig = __assign({}, config);
        var risingConfig = __assign(__assign({}, config), { rates: __assign(__assign({}, config.rates), { longRun: config.rates.longRun + 0.02 }) });
        var fallingConfig = __assign(__assign({}, config), { rates: __assign(__assign({}, config.rates), { longRun: config.rates.longRun - 0.015 }) });
        var volatileConfig = __assign(__assign({}, config), { rates: __assign(__assign({}, config.rates), { vol: config.rates.vol * 2 }) });
        return {
            base: this.generateHullWhitePath(baseConfig, nYears),
            rising: this.generateHullWhitePath(risingConfig, nYears),
            falling: this.generateHullWhitePath(fallingConfig, nYears),
            volatile: this.generateHullWhitePath(volatileConfig, nYears)
        };
    };
    /**
     * Calculate bond returns given rate changes
     */
    RatesEngine.prototype.calculateBondReturns = function (initialYield, finalYield, duration) {
        // Modified duration approximation
        var priceChange = -duration * (finalYield - initialYield);
        var incomeReturn = initialYield;
        return incomeReturn + priceChange;
    };
    RatesEngine.prototype.gaussianRandom = function () {
        var u1 = this.rng();
        var u2 = this.rng();
        return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    };
    return RatesEngine;
}());
exports.RatesEngine = RatesEngine;
