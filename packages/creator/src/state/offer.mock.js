"use strict";
// Mock state for offer management
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBrief = createBrief;
exports.getCurrentOffer = getCurrentOffer;
exports.setOfferChecks = setOfferChecks;
exports.signOffer = signOffer;
var currentOffer = {
    checksCompleted: false,
    signed: false
};
function createBrief(data) {
    currentOffer.brief = data;
    localStorage.setItem('creator_offer', JSON.stringify(currentOffer));
    return currentOffer;
}
function getCurrentOffer() {
    try {
        var stored = localStorage.getItem('creator_offer');
        if (stored) {
            currentOffer = JSON.parse(stored);
        }
    }
    catch (error) {
        console.warn('Failed to load offer from storage:', error);
    }
    return currentOffer;
}
function setOfferChecks(pass, notes) {
    currentOffer.checksCompleted = pass;
    currentOffer.checkNotes = notes;
    localStorage.setItem('creator_offer', JSON.stringify(currentOffer));
    return currentOffer;
}
function signOffer() {
    currentOffer.signed = true;
    localStorage.setItem('creator_offer', JSON.stringify(currentOffer));
    return currentOffer;
}
