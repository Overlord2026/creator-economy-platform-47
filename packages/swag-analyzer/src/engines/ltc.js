"use strict";
/**
 * Long-Term Care (LTC) Engine - Hazard models for onset, care intensity, and costs
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
exports.LTCEngine = void 0;
var seedrandom = require("seedrandom");
var LTCEngine = /** @class */ (function () {
    function LTCEngine(seed) {
        this.rng = seedrandom(seed || 'ltc_default');
    }
    /**
     * Generate LTC cost projections using hazard rate models
     */
    LTCEngine.prototype.generateLTCProjections = function (config, currentAge, gender, maxAge) {
        if (maxAge === void 0) { maxAge = 100; }
        var _a = config.ltc, baseHazard = _a.baseHazard, age0 = _a.age0, inflation = _a.inflation, intensityDist = _a.intensityDist;
        var projections = [];
        var cumulativeCost = 0;
        var hasLTCNeed = false;
        var careIntensity = 0;
        for (var age = currentAge; age <= maxAge; age++) {
            // Calculate age-specific hazard rate
            var hazardRate = this.calculateLTCHazardRate(age, baseHazard, age0, gender);
            // Determine LTC onset probability
            var onsetProbability = 0;
            if (!hasLTCNeed) {
                onsetProbability = hazardRate;
                if (this.rng() < onsetProbability) {
                    hasLTCNeed = true;
                    // Sample care intensity from distribution
                    careIntensity = this.sampleCareIntensity(intensityDist);
                }
            }
            else {
                // Already has LTC need, may progress or improve
                careIntensity = this.updateCareIntensity(careIntensity, age);
            }
            // Calculate annual cost based on care intensity
            var annualCost = this.calculateAnnualCost(careIntensity, age, currentAge, inflation);
            cumulativeCost += annualCost;
            projections.push({
                age: age,
                onsetProbability: onsetProbability,
                careIntensity: careIntensity,
                annualCost: annualCost,
                cumulativeCost: cumulativeCost
            });
        }
        return projections;
    };
    /**
     * Calculate LTC hazard rate based on age and gender
     * Uses exponential model: h(t) = h₀ * exp(α * (age - age₀))
     */
    LTCEngine.prototype.calculateLTCHazardRate = function (age, baseHazard, age0, gender) {
        // Gender adjustment: women have higher LTC risk
        var genderMultiplier = gender === 'female' ? 1.3 : 1.0;
        // Exponential age progression
        var ageEffect = Math.exp(0.08 * (age - age0)); // 8% annual increase
        var hazardRate = baseHazard * genderMultiplier * ageEffect;
        return Math.min(hazardRate, 0.4); // Cap at 40% annual probability
    };
    /**
     * Sample care intensity from distribution
     * 0 = No care, 0.33 = Mild, 0.66 = Moderate, 1.0 = Severe
     */
    LTCEngine.prototype.sampleCareIntensity = function (intensityDist) {
        var rand = this.rng();
        var cumProb = 0;
        for (var i = 0; i < intensityDist.length; i++) {
            cumProb += intensityDist[i];
            if (rand < cumProb) {
                return i / (intensityDist.length - 1); // Normalize to [0,1]
            }
        }
        return 1.0; // Default to severe care
    };
    /**
     * Update care intensity over time (progression/improvement)
     */
    LTCEngine.prototype.updateCareIntensity = function (currentIntensity, age) {
        // Slight progression bias with age
        var progressionProb = 0.05 + (age - 65) * 0.002; // Increases with age
        var improvementProb = 0.03; // Small chance of improvement
        var rand = this.rng();
        if (rand < progressionProb) {
            // Progress to higher intensity
            return Math.min(currentIntensity + 0.33, 1.0);
        }
        else if (rand < progressionProb + improvementProb) {
            // Improve to lower intensity
            return Math.max(currentIntensity - 0.33, 0);
        }
        return currentIntensity; // No change
    };
    /**
     * Calculate annual LTC cost based on care intensity
     */
    LTCEngine.prototype.calculateAnnualCost = function (careIntensity, currentAge, baseAge, inflation) {
        // Base annual costs by care level (2024 dollars)
        var baseCosts = {
            homeHealth: 65000, // Home health aide
            adultDaycare: 25000, // Adult day services
            assistedLiving: 55000, // Assisted living facility
            nursingHome: 120000 // Nursing home
        };
        var annualCost = 0;
        if (careIntensity === 0) {
            annualCost = 0;
        }
        else if (careIntensity <= 0.33) {
            // Mild care: Mix of home health and adult daycare
            annualCost = baseCosts.homeHealth * 0.3 + baseCosts.adultDaycare * 0.7;
        }
        else if (careIntensity <= 0.66) {
            // Moderate care: Assisted living or more intensive home care
            annualCost = baseCosts.assistedLiving;
        }
        else {
            // Severe care: Nursing home
            annualCost = baseCosts.nursingHome;
        }
        // Adjust for inflation
        var yearsFromBase = currentAge - baseAge;
        var inflationFactor = Math.pow(1 + inflation, yearsFromBase);
        return annualCost * inflationFactor;
    };
    /**
     * Generate LTC event scenarios for stress testing
     */
    LTCEngine.prototype.generateLTCEventScenarios = function (config, currentAge, gender) {
        var _this = this;
        var base = this.generateLTCProjections(config, currentAge, gender);
        // No LTC scenario
        var noLTC = base.map(function (p) { return (__assign(__assign({}, p), { onsetProbability: 0, careIntensity: 0, annualCost: 0, cumulativeCost: 0 })); });
        // Early onset scenario (age 70)
        var earlyOnsetConfig = __assign(__assign({}, config), { ltc: __assign(__assign({}, config.ltc), { baseHazard: config.ltc.baseHazard * 3 }) });
        var earlyOnset = this.generateLTCProjections(earlyOnsetConfig, currentAge, gender);
        // Severe need scenario (immediate nursing home level care)
        var severeNeed = this.generateLTCProjections(config, currentAge, gender);
        // Force severe care starting at age 75
        severeNeed.forEach(function (p) {
            if (p.age >= 75) {
                p.careIntensity = 1.0;
                p.annualCost = _this.calculateAnnualCost(1.0, p.age, currentAge, config.ltc.inflation);
            }
        });
        // Spouse also needs care scenario (doubled costs)
        var spouseNeed = this.generateLTCProjections(config, currentAge, gender);
        spouseNeed.forEach(function (p) {
            if (p.age >= 80) {
                p.annualCost *= 1.8; // Not quite double due to some economies of scale
                p.cumulativeCost *= 1.8;
            }
        });
        return {
            noLTC: noLTC,
            earlyOnset: earlyOnset,
            severeNeed: severeNeed,
            spouseNeed: spouseNeed
        };
    };
    /**
     * Calculate LTC insurance benefit value
     */
    LTCEngine.prototype.calculateLTCInsuranceBenefit = function (dailyBenefit, benefitPeriod, // In years
    eliminationPeriod, // In days
    inflationProtection, inflation, currentAge, projectedAge) {
        // Adjust benefit for inflation if protected
        var adjustedBenefit = dailyBenefit;
        if (inflationProtection) {
            var yearsAhead = projectedAge - currentAge;
            adjustedBenefit = dailyBenefit * Math.pow(1 + inflation, yearsAhead);
        }
        // Calculate annual benefit (minus elimination period)
        var daysPerYear = 365;
        var eliminationDays = Math.min(eliminationPeriod, daysPerYear);
        var coverageDays = daysPerYear - eliminationDays;
        var annualBenefit = adjustedBenefit * coverageDays;
        var totalBenefit = annualBenefit * benefitPeriod;
        return totalBenefit;
    };
    /**
     * Calculate present value of LTC risk
     */
    LTCEngine.prototype.calculateLTCRiskPresentValue = function (projections, discountRate, currentAge) {
        var presentValue = 0;
        projections.forEach(function (projection) {
            var yearsAhead = projection.age - currentAge;
            var discountFactor = Math.pow(1 + discountRate, -yearsAhead);
            var expectedCost = projection.onsetProbability * projection.annualCost;
            presentValue += expectedCost * discountFactor;
        });
        return presentValue;
    };
    /**
     * Monte Carlo simulation of LTC events
     */
    LTCEngine.prototype.simulateLTCEvents = function (config, currentAge, gender, nSimulations) {
        var results = [];
        var _loop_1 = function (sim) {
            var projections = this_1.generateLTCProjections(config, currentAge, gender, 100);
            var onsetAge;
            var totalCost = 0;
            var peakIntensity = 0;
            var durationYears = 0;
            var inCare = false;
            projections.forEach(function (projection) {
                if (projection.careIntensity > 0 && !inCare) {
                    onsetAge = projection.age;
                    inCare = true;
                }
                if (inCare) {
                    totalCost += projection.annualCost;
                    peakIntensity = Math.max(peakIntensity, projection.careIntensity);
                    durationYears++;
                }
            });
            results.push({
                simulation: sim,
                onsetAge: onsetAge,
                totalCost: totalCost,
                peakIntensity: peakIntensity,
                durationYears: durationYears
            });
        };
        var this_1 = this;
        for (var sim = 0; sim < nSimulations; sim++) {
            _loop_1(sim);
        }
        return results;
    };
    return LTCEngine;
}());
exports.LTCEngine = LTCEngine;
