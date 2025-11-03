"use strict";
// Mock state for compliance gates
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
exports.setTraining = setTraining;
exports.setDisclosure = setDisclosure;
exports.setFtcLabels = setFtcLabels;
exports.getCompliance = getCompliance;
exports.allPassed = allPassed;
exports.resetCompliance = resetCompliance;
var compliance = {
    training: false,
    disclosure: false,
    ftcLabels: false
};
// Load from localStorage on module init
try {
    var stored = localStorage.getItem('creator_compliance');
    if (stored) {
        compliance = __assign(__assign({}, compliance), JSON.parse(stored));
    }
}
catch (error) {
    console.warn('Failed to load compliance from storage:', error);
}
function saveCompliance() {
    try {
        localStorage.setItem('creator_compliance', JSON.stringify(compliance));
    }
    catch (error) {
        console.warn('Failed to save compliance to storage:', error);
    }
}
function setTraining(completed) {
    compliance.training = completed;
    saveCompliance();
    return compliance;
}
function setDisclosure(filed) {
    compliance.disclosure = filed;
    saveCompliance();
    return compliance;
}
function setFtcLabels(enabled) {
    compliance.ftcLabels = enabled;
    saveCompliance();
    return compliance;
}
function getCompliance() {
    return __assign({}, compliance);
}
function allPassed() {
    return compliance.training && compliance.disclosure && compliance.ftcLabels;
}
function resetCompliance() {
    compliance = {
        training: false,
        disclosure: false,
        ftcLabels: false
    };
    saveCompliance();
    return compliance;
}
