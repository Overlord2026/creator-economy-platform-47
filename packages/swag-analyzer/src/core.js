"use strict";
/**
 * SWAG Analyzer Core Functions
 * Minimal implementations for outcome-first stress testing
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
exports.canonical = canonical;
exports.outcomeScore = outcomeScore;
exports.processSwagResults = processSwagResults;
exports.enforceChanceConstraint = enforceChanceConstraint;
exports.makeOutcomeReceipt = makeOutcomeReceipt;
exports.ETAY = ETAY;
exports.SEAY = SEAY;
exports.liquidityVaR = liquidityVaR;
var crypto_1 = require("crypto");
function canonical(obj) {
    return JSON.stringify(obj, Object.keys(obj).sort());
}
function outcomeScore(m, w) {
    if (w === void 0) { w = { ISP: 0.35, DGBP: 0.25, ATE: 0.15, LCI: 0.25 }; }
    return w.ISP * m.ISP - w.DGBP * m.DGBP + w.ATE * m.ATE + w.LCI * m.LCI;
}
function processSwagResults(data, inputs) {
    return __awaiter(this, void 0, void 0, function () {
        var phaseMetrics, _i, _a, p;
        return __generator(this, function (_b) {
            phaseMetrics = data.phaseMetrics;
            for (_i = 0, _a = Object.keys(phaseMetrics); _i < _a.length; _i++) {
                p = _a[_i];
                phaseMetrics[p].OS = outcomeScore(phaseMetrics[p]);
            }
            return [2 /*return*/, __assign(__assign({}, data), { phaseMetrics: phaseMetrics })];
        });
    });
}
function enforceChanceConstraint(samples, epsilon) {
    // samples = shortfall values (negative=good, positive=shortfall)
    var sorted = __spreadArray([], samples, true).sort(function (a, b) { return a - b; });
    var q = sorted[Math.floor((1 - epsilon) * sorted.length)];
    return q <= 0; // true if required quantile has no shortfall
}
function makeOutcomeReceipt(payload) {
    var body = {
        policyHash: payload.policyHash,
        modelHash: payload.modelHash,
        regimeState: payload.regimeState,
        phaseMetrics: payload.phaseMetrics, // include pre/post
        trades: payload.trades,
        lotDeltas: payload.lotDeltas,
        seed: payload.seed,
        ts: new Date().toISOString()
    };
    var hash = crypto_1.default.createHash('sha256').update(canonical(body)).digest('hex');
    return { body: body, hash: hash };
}
function ETAY(comp, rates, feeDrag) {
    if (feeDrag === void 0) { feeDrag = 0; }
    var _a = comp.interest, interest = _a === void 0 ? 0 : _a, _b = comp.qualified, qualified = _b === void 0 ? 0 : _b, _c = comp.ltg, ltg = _c === void 0 ? 0 : _c, _d = comp.stg, stg = _d === void 0 ? 0 : _d;
    return (interest * (1 - rates.ordinary) +
        qualified * (1 - rates.qualified) +
        ltg * (1 - rates.ltg) +
        stg * (1 - rates.stg)) - feeDrag;
}
function SEAY(stakingAPR, tax, slashingProb, unbondDays, dailyPenaltyBps) {
    var afterTax = stakingAPR * (1 - tax);
    var latencyPenalty = (unbondDays * dailyPenaltyBps) / 10000 + slashingProb * stakingAPR;
    return afterTax - latencyPenalty;
}
function liquidityVaR(config) {
    var _a = config.secondaryHaircut, secondaryHaircut = _a === void 0 ? 0 : _a, _b = config.gateProb, gateProb = _b === void 0 ? 0 : _b, _c = config.delayDays, delayDays = _c === void 0 ? 0 : _c, _d = config.dailyPenaltyBps, dailyPenaltyBps = _d === void 0 ? 0 : _d;
    return secondaryHaircut + gateProb * (delayDays * dailyPenaltyBps / 10000);
}
