"use strict";
/**
 * Returns Engine - Regime-switching equity, private credit, infrastructure, crypto
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
exports.ReturnsEngine = void 0;
var seedrandom = require("seedrandom");
var ReturnsEngine = /** @class */ (function () {
    function ReturnsEngine(seed) {
        this.rng = seedrandom(seed || 'returns_default');
    }
    /**
     * Generate multi-asset return paths with regime switching
     */
    ReturnsEngine.prototype.generateReturnPaths = function (config, nYears) {
        var equity = this.generateEquityReturns(config, nYears);
        var bonds = this.generateBondReturns(config, nYears);
        var privateCredit = this.generatePrivateCreditReturns(config, nYears);
        var infrastructure = this.generateInfrastructureReturns(config, nYears);
        var crypto = this.generateCryptoReturns(config, nYears);
        return {
            years: Array.from({ length: nYears }, function (_, i) { return i; }),
            equity: equity.returns,
            bonds: bonds,
            privateCredit: privateCredit,
            infrastructure: infrastructure,
            crypto: crypto,
            regimeStates: equity.regimes
        };
    };
    /**
     * Generate regime-switching equity returns
     */
    ReturnsEngine.prototype.generateEquityReturns = function (config, nYears) {
        var _a = config.equity, nRegimes = _a.regimes, trans = _a.trans, mu = _a.mu, sigma = _a.sigma;
        var returns = [];
        var regimeStates = [];
        // Start in regime 0
        var currentRegime = 0;
        regimeStates.push(currentRegime);
        for (var t = 0; t < nYears; t++) {
            // Regime transition
            if (t > 0) {
                var rand = this.rng();
                var cumProb = 0;
                for (var j = 0; j < nRegimes; j++) {
                    cumProb += trans[currentRegime][j];
                    if (rand < cumProb) {
                        currentRegime = j;
                        break;
                    }
                }
                regimeStates.push(currentRegime);
            }
            // Generate return for current regime
            var regimeReturn = mu[currentRegime] + sigma[currentRegime] * this.gaussianRandom();
            returns.push(regimeReturn);
        }
        return { returns: returns, regimes: regimeStates };
    };
    /**
     * Generate bond returns (simplified duration-based model)
     */
    ReturnsEngine.prototype.generateBondReturns = function (config, nYears) {
        var returns = [];
        var duration = 5; // Average duration
        var baseYield = 0.03; // Base yield
        for (var t = 0; t < nYears; t++) {
            // Assume rate changes drive bond returns
            var rateChange = 0.005 * this.gaussianRandom(); // ±0.5% rate moves
            var priceReturn = -duration * rateChange;
            var incomeReturn = baseYield;
            returns.push(incomeReturn + priceReturn);
        }
        return returns;
    };
    /**
     * Generate private credit returns with default risk
     */
    ReturnsEngine.prototype.generatePrivateCreditReturns = function (config, nYears) {
        var _a = config.privateCredit, baseYield = _a.baseYield, defaultProb = _a.defaultProb, recovery = _a.recovery;
        var returns = [];
        for (var t = 0; t < nYears; t++) {
            var annualReturn = baseYield;
            // Default event
            if (this.rng() < defaultProb) {
                var lossGivenDefault = 1 - recovery;
                annualReturn = -lossGivenDefault;
            }
            else {
                // Add spread volatility
                var spreadVol = 0.02;
                var spreadShock = spreadVol * this.gaussianRandom();
                annualReturn += spreadShock;
            }
            returns.push(annualReturn);
        }
        return returns;
    };
    /**
     * Generate infrastructure returns with yield + appreciation
     */
    ReturnsEngine.prototype.generateInfrastructureReturns = function (config, nYears) {
        var _a = config.infra, baseYield = _a.baseYield, rocPct = _a.rocPct;
        var returns = [];
        for (var t = 0; t < nYears; t++) {
            // Income component
            var incomeReturn = baseYield;
            // Return of capital
            var rocReturn = baseYield * rocPct;
            // Capital appreciation (linked to inflation + real growth)
            var appreciationVol = 0.08;
            var appreciation = 0.02 + appreciationVol * this.gaussianRandom();
            var totalReturn = incomeReturn + rocReturn + appreciation;
            returns.push(totalReturn);
        }
        return returns;
    };
    /**
     * Generate crypto returns with high volatility and correlation
     */
    ReturnsEngine.prototype.generateCryptoReturns = function (config, nYears) {
        var _a = config.crypto, vol = _a.vol, corr = _a.corr;
        var returns = [];
        for (var t = 0; t < nYears; t++) {
            // Crypto-specific factor
            var cryptoFactor = vol * this.gaussianRandom();
            // Correlation with equity markets (assumed equity vol ~0.16)
            var equityFactor = 0.16 * this.gaussianRandom();
            var correlatedReturn = corr * equityFactor + Math.sqrt(1 - corr * corr) * cryptoFactor;
            // Add mean return assumption
            var meanReturn = 0.08; // High expected return for crypto
            var totalReturn = meanReturn + correlatedReturn;
            returns.push(totalReturn);
        }
        return returns;
    };
    /**
     * Generate stress test scenarios
     */
    ReturnsEngine.prototype.generateStressScenarios = function (config, nYears) {
        var base = this.generateReturnPaths(config, nYears);
        // Market crash: First year -30% equity, then recovery
        var crashConfig = __assign({}, config);
        var marketCrash = this.generateReturnPaths(crashConfig, nYears);
        marketCrash.equity[0] = -0.30;
        // Persistent low returns
        var lowReturnsConfig = __assign(__assign({}, config), { equity: __assign(__assign({}, config.equity), { mu: config.equity.mu.map(function (m) { return m - 0.03; }) }) });
        var lowReturns = this.generateReturnPaths(lowReturnsConfig, nYears);
        // High inflation scenario affects real returns
        var highInflation = __assign({}, base);
        // Reduce real returns across all assets
        for (var i = 0; i < nYears; i++) {
            highInflation.equity[i] -= 0.02;
            highInflation.bonds[i] -= 0.02;
        }
        // Credit crisis: Higher default rates
        var creditCrisisConfig = __assign(__assign({}, config), { privateCredit: __assign(__assign({}, config.privateCredit), { defaultProb: config.privateCredit.defaultProb * 3 }) });
        var creditCrisis = this.generateReturnPaths(creditCrisisConfig, nYears);
        return {
            base: base,
            marketCrash: marketCrash,
            lowReturns: lowReturns,
            highInflation: highInflation,
            creditCrisis: creditCrisis
        };
    };
    /**
     * Calculate portfolio return given asset returns and weights
     */
    ReturnsEngine.prototype.calculatePortfolioReturn = function (assetReturns, weights) {
        var portfolioReturn = 0;
        for (var _i = 0, _a = Object.entries(weights); _i < _a.length; _i++) {
            var _b = _a[_i], asset = _b[0], weight = _b[1];
            if (assetReturns[asset] !== undefined) {
                portfolioReturn += weight * assetReturns[asset];
            }
        }
        return portfolioReturn;
    };
    ReturnsEngine.prototype.gaussianRandom = function () {
        var u1 = this.rng();
        var u2 = this.rng();
        return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    };
    return ReturnsEngine;
}());
exports.ReturnsEngine = ReturnsEngine;
