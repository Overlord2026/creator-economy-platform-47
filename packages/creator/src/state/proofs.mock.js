"use strict";
// Mock state for proof receipts
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
exports.proofs = void 0;
exports.addProof = addProof;
exports.getProofs = getProofs;
exports.clearProofs = clearProofs;
exports.isEscrowComplete = isEscrowComplete;
var proofs = [];
exports.proofs = proofs;
// Load proofs from localStorage on module init
try {
    var stored = localStorage.getItem('creator_proofs');
    if (stored) {
        exports.proofs = proofs = JSON.parse(stored);
    }
}
catch (error) {
    console.warn('Failed to load proofs from storage:', error);
}
function addProof(proof) {
    var newProof = __assign(__assign({}, proof), { id: "proof_".concat(Date.now(), "_").concat(Math.random().toString(16).slice(2)) });
    proofs.unshift(newProof);
    try {
        localStorage.setItem('creator_proofs', JSON.stringify(proofs));
    }
    catch (error) {
        console.warn('Failed to save proofs to storage:', error);
    }
    return newProof;
}
function getProofs() {
    return __spreadArray([], proofs, true);
}
function clearProofs() {
    exports.proofs = proofs = [];
    localStorage.removeItem('creator_proofs');
}
// Helper to check if escrow is complete
function isEscrowComplete() {
    var hasFunded = proofs.some(function (p) { return p.title.includes('Escrow Funded'); });
    var hasReleased = proofs.some(function (p) { return p.title.includes('Escrow Released'); });
    return hasFunded && hasReleased;
}
