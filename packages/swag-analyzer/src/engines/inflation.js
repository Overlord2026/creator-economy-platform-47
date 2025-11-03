"use strict";
/**
 * Inflation Engine - CPI AR(1) and Ornstein-Uhlenbeck Models
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
exports.InflationEngine = void 0;
var seedrandom = require("seedrandom");
var InflationEngine = /** @class */ (function () {
    function InflationEngine(seed) {
        this.rng = seedrandom(seed || 'inflation_default');
    }
    /**
     * Generate inflation path using AR(1) model:
     * r_t = μ + φ(r_{t-1} - μ) + ε_t
     */
    InflationEngine.prototype.generateAR1Path = function (config, nYears) {
        var _a = config.inflation, mu = _a.mu, phi = _a.phi, sigma = _a.sigma;
        var rates = [mu]; // Start at long-run mean
        var cumulativeInflation = 1.0;
        var cumulativeInflationPath = [cumulativeInflation];
        for (var t = 1; t < nYears; t++) {
            var shock = this.gaussianRandom() * sigma;
            var rate = mu + phi * (rates[t - 1] - mu) + shock;
            rates.push(Math.max(-0.1, rate)); // Floor at -10% deflation
            cumulativeInflation *= (1 + rate);
            cumulativeInflationPath.push(cumulativeInflation);
        }
        return {
            years: Array.from({ length: nYears }, function (_, i) { return i; }),
            rates: rates,
            cumulativeInflation: cumulativeInflationPath
        };
    };
    /**
     * Generate inflation path using Ornstein-Uhlenbeck process:
     * dr_t = κ(θ - r_t)dt + σdW_t
     */
    InflationEngine.prototype.generateOUPath = function (config, nYears, dt) {
        if (dt === void 0) { dt = 1 / 12; }
        var _a = config.inflation, theta = _a.mu, sigma = _a.sigma;
        var kappa = 1 - config.inflation.phi; // Convert from AR(1) to OU parameterization
        var nSteps = Math.floor(nYears / dt);
        var rates = [];
        var r = theta; // Start at long-run mean
        var cumulativeInflation = 1.0;
        var cumulativeInflationPath = [];
        for (var i = 0; i < nSteps; i++) {
            var dW = this.gaussianRandom() * Math.sqrt(dt);
            var dr = kappa * (theta - r) * dt + sigma * dW;
            r += dr;
            r = Math.max(-0.1, r); // Floor at -10%
            if (i % 12 === 11) { // Annual observation
                rates.push(r);
                cumulativeInflation *= Math.pow(1 + r, dt * 12);
                cumulativeInflationPath.push(cumulativeInflation);
            }
        }
        return {
            years: Array.from({ length: rates.length }, function (_, i) { return i; }),
            rates: rates,
            cumulativeInflation: cumulativeInflationPath
        };
    };
    /**
     * Generate multiple inflation scenarios for stress testing
     */
    InflationEngine.prototype.generateStressScenarios = function (config, nYears) {
        var baseConfig = __assign({}, config);
        var lowConfig = __assign(__assign({}, config), { inflation: __assign(__assign({}, config.inflation), { mu: config.inflation.mu - 0.015 }) });
        var highConfig = __assign(__assign({}, config), { inflation: __assign(__assign({}, config.inflation), { mu: config.inflation.mu + 0.02 }) });
        var volatileConfig = __assign(__assign({}, config), { inflation: __assign(__assign({}, config.inflation), { sigma: config.inflation.sigma * 2 }) });
        return {
            base: this.generateAR1Path(baseConfig, nYears),
            low: this.generateAR1Path(lowConfig, nYears),
            high: this.generateAR1Path(highConfig, nYears),
            volatile: this.generateAR1Path(volatileConfig, nYears)
        };
    };
    /**
     * Calculate real return given nominal return and inflation
     */
    InflationEngine.prototype.toRealReturn = function (nominalReturn, inflationRate) {
        return (1 + nominalReturn) / (1 + inflationRate) - 1;
    };
    /**
     * Adjust cashflow need for inflation
     */
    InflationEngine.prototype.adjustForInflation = function (baseAmount, inflationPath, year) {
        if (year >= inflationPath.cumulativeInflation.length) {
            return baseAmount * inflationPath.cumulativeInflation[inflationPath.cumulativeInflation.length - 1];
        }
        return baseAmount * inflationPath.cumulativeInflation[year];
    };
    InflationEngine.prototype.gaussianRandom = function () {
        // Box-Muller transform
        var u1 = this.rng();
        var u2 = this.rng();
        return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    };
    return InflationEngine;
}());
exports.InflationEngine = InflationEngine;
