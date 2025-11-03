"use strict";
/**
 * Longevity Engine - Gompertz-Makeham mortality modeling
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
exports.LongevityEngine = void 0;
var seedrandom = require("seedrandom");
var LongevityEngine = /** @class */ (function () {
    function LongevityEngine(seed) {
        this.rng = seedrandom(seed || 'longevity_default');
    }
    /**
     * Generate longevity projections using Gompertz-Makeham model:
     * μ(x) = A + B*exp(C*x)
     * where μ(x) is mortality rate at age x
     */
    LongevityEngine.prototype.generateLongevityProjection = function (config, currentAge, maxAge) {
        if (maxAge === void 0) { maxAge = 120; }
        var _a = config.longevity, male = _a.male, gmA = _a.gmA, gmB = _a.gmB, gmC = _a.gmC;
        var projections = [];
        var survivalProb = 1.0;
        for (var age = currentAge; age <= maxAge; age++) {
            // Gompertz-Makeham mortality rate
            var mortalityRate = this.calculateMortalityRate(age, gmA, gmB, gmC, male);
            // Update survival probability
            if (age > currentAge) {
                survivalProb *= (1 - mortalityRate);
            }
            // Calculate remaining life expectancy
            var lifeExpectancy = this.calculateLifeExpectancy(age, gmA, gmB, gmC, male, maxAge);
            projections.push({
                age: age,
                survivalProbability: survivalProb,
                mortalityRate: mortalityRate,
                lifeExpectancyRemaining: lifeExpectancy
            });
        }
        return projections;
    };
    /**
     * Calculate mortality rate using Gompertz-Makeham model
     */
    LongevityEngine.prototype.calculateMortalityRate = function (age, A, B, C, isMale) {
        // Gender adjustment factors (simplified)
        var genderAdjustment = isMale ? 1.2 : 0.8;
        // Gompertz-Makeham formula with background mortality (A) and age-dependent term
        var mortalityRate = A + B * Math.exp(C * age);
        return Math.min(mortalityRate * genderAdjustment, 0.99); // Cap at 99%
    };
    /**
     * Calculate remaining life expectancy from current age
     */
    LongevityEngine.prototype.calculateLifeExpectancy = function (currentAge, A, B, C, isMale, maxAge) {
        var expectancy = 0;
        var survivalProb = 1.0;
        for (var age = currentAge + 1; age <= maxAge; age++) {
            var mortalityRate = this.calculateMortalityRate(age, A, B, C, isMale);
            survivalProb *= (1 - mortalityRate);
            expectancy += survivalProb;
        }
        return expectancy;
    };
    /**
     * Generate Monte Carlo longevity paths
     */
    LongevityEngine.prototype.generateLongevityPaths = function (config, currentAge, nPaths) {
        var _a = config.longevity, gmA = _a.gmA, gmB = _a.gmB, gmC = _a.gmC, male = _a.male;
        var paths = [];
        for (var pathIdx = 0; pathIdx < nPaths; pathIdx++) {
            var survivedToAge = [];
            var age = currentAge;
            var alive = true;
            while (alive && age < 120) {
                var mortalityRate = this.calculateMortalityRate(age, gmA, gmB, gmC, male);
                if (this.rng() < mortalityRate) {
                    alive = false;
                }
                else {
                    survivedToAge.push(age);
                    age++;
                }
            }
            paths.push({
                path: pathIdx,
                deathAge: age,
                survivedToAge: survivedToAge
            });
        }
        return paths;
    };
    /**
     * Calculate joint survival probability for couples
     */
    LongevityEngine.prototype.calculateJointSurvival = function (age1, age2, isMale1, isMale2, config, yearsAhead) {
        var _a = config.longevity, gmA = _a.gmA, gmB = _a.gmB, gmC = _a.gmC;
        var survivalProb1 = 1.0;
        var survivalProb2 = 1.0;
        for (var year = 0; year < yearsAhead; year++) {
            var mortality1 = this.calculateMortalityRate(age1 + year, gmA, gmB, gmC, isMale1);
            var mortality2 = this.calculateMortalityRate(age2 + year, gmA, gmB, gmC, isMale2);
            survivalProb1 *= (1 - mortality1);
            survivalProb2 *= (1 - mortality2);
        }
        var bothSurvive = survivalProb1 * survivalProb2;
        var oneSurvives = survivalProb1 + survivalProb2 - 2 * bothSurvive;
        var neitherSurvives = 1 - survivalProb1 - survivalProb2 + bothSurvive;
        return {
            bothSurvive: bothSurvive,
            oneSurvives: oneSurvives,
            neitherSurvives: neitherSurvives
        };
    };
    /**
     * Generate longevity stress scenarios
     */
    LongevityEngine.prototype.generateStressScenarios = function (config, currentAge) {
        var base = this.generateLongevityProjection(config, currentAge);
        // Longevity scenario: Reduce mortality rates by 20%
        var longevityConfig = __assign(__assign({}, config), { longevity: __assign(__assign({}, config.longevity), { gmA: config.longevity.gmA * 0.8, gmB: config.longevity.gmB * 0.8 }) });
        var longevity = this.generateLongevityProjection(longevityConfig, currentAge);
        // Short-lived scenario: Increase mortality rates by 20%
        var shortLivedConfig = __assign(__assign({}, config), { longevity: __assign(__assign({}, config.longevity), { gmA: config.longevity.gmA * 1.2, gmB: config.longevity.gmB * 1.2 }) });
        var shortLived = this.generateLongevityProjection(shortLivedConfig, currentAge);
        return {
            base: base,
            longevity: longevity,
            shortLived: shortLived
        };
    };
    /**
     * Calculate Social Security longevity adjustment
     */
    LongevityEngine.prototype.calculateSocialSecurityAdjustment = function (claimAge, fullRetirementAge) {
        if (claimAge < fullRetirementAge) {
            // Early retirement reduction
            var monthsEarly = (fullRetirementAge - claimAge) * 12;
            var reduction = Math.min(monthsEarly * 0.0055, 0.25); // Max 25% reduction
            return 1 - reduction;
        }
        else if (claimAge > fullRetirementAge) {
            // Delayed retirement credits
            var yearsDelayed = claimAge - fullRetirementAge;
            var increase = Math.min(yearsDelayed * 0.08, 0.32); // Max 32% increase (age 70)
            return 1 + increase;
        }
        return 1.0; // No adjustment at full retirement age
    };
    return LongevityEngine;
}());
exports.LongevityEngine = LongevityEngine;
