"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferLock = OfferLock;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var alert_1 = require("@/components/ui/alert");
var badge_1 = require("@/components/ui/badge");
var offer_mock_1 = require("../state/offer.mock");
var compliance_mock_1 = require("../state/compliance.mock");
var proofs_mock_1 = require("../state/proofs.mock");
var ProofSlip_1 = require("../components/ProofSlip");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
function OfferLock() {
    var _this = this;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_1.useState)((0, offer_mock_1.getCurrentOffer)()), offer = _a[0], setOffer = _a[1];
    var _b = (0, react_1.useState)((0, compliance_mock_1.getCompliance)()), compliance = _b[0], setCompliance = _b[1];
    var _c = (0, react_1.useState)(false), isRunningChecks = _c[0], setIsRunningChecks = _c[1];
    (0, react_1.useEffect)(function () {
        setOffer((0, offer_mock_1.getCurrentOffer)());
        setCompliance((0, compliance_mock_1.getCompliance)());
    }, []);
    var canRunChecks = (0, compliance_mock_1.allPassed)() && offer.brief && !offer.checksCompleted;
    var canSign = offer.checksCompleted && !offer.signed;
    var handleRunChecks = function () { return __awaiter(_this, void 0, void 0, function () {
        var proof;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!canRunChecks)
                        return [2 /*return*/];
                    setIsRunningChecks(true);
                    // Simulate smart checks
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2000); })];
                case 1:
                    // Simulate smart checks
                    _c.sent();
                    (0, offer_mock_1.setOfferChecks)(true, 'All smart checks passed: compliance verified, content approved, payment terms validated');
                    proof = (0, ProofSlip_1.makeProof)('Smart Checks Passed', [
                        { label: 'Brief Title', value: ((_a = offer.brief) === null || _a === void 0 ? void 0 : _a.title) || 'N/A' },
                        { label: 'Brand', value: ((_b = offer.brief) === null || _b === void 0 ? void 0 : _b.brand) || 'N/A' },
                        { label: 'Checks Status', value: 'PASSED' },
                        { label: 'Compliance', value: 'VERIFIED' }
                    ]);
                    (0, proofs_mock_1.addProof)(proof);
                    setOffer((0, offer_mock_1.getCurrentOffer)());
                    setIsRunningChecks(false);
                    sonner_1.toast.success('Smart checks completed successfully!');
                    return [2 /*return*/];
            }
        });
    }); };
    var handleSign = function () {
        var _a, _b;
        (0, offer_mock_1.signOffer)();
        var proof = (0, ProofSlip_1.makeProof)('Offer Signed', [
            { label: 'Brief Title', value: ((_a = offer.brief) === null || _a === void 0 ? void 0 : _a.title) || 'N/A' },
            { label: 'Brand', value: ((_b = offer.brief) === null || _b === void 0 ? void 0 : _b.brand) || 'N/A' },
            { label: 'Signature Status', value: 'SIGNED' },
            { label: 'Legal Status', value: 'BINDING' }
        ]);
        (0, proofs_mock_1.addProof)(proof);
        sonner_1.toast.success('Offer signed successfully!');
        navigate('/creator/deal/123');
    };
    if (!offer.brief) {
        return (<div className="max-w-2xl mx-auto">
        <alert_1.Alert>
          <lucide_react_1.AlertTriangle className="h-4 w-4"/>
          <alert_1.AlertDescription>
            No brief found. Please <a href="/creator" className="underline">create a brief</a> first.
          </alert_1.AlertDescription>
        </alert_1.Alert>
      </div>);
    }
    return (<div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Offer Lock</h1>
        <p className="text-muted-foreground mt-2">
          Run smart checks and sign your verified offer.
        </p>
      </div>

      {/* Brief Summary */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle className="flex items-center gap-2">
            Brief Summary
            <badge_1.Badge variant={offer.checksCompleted ? "default" : "secondary"}>
              {offer.checksCompleted ? "Verified" : "Pending"}
            </badge_1.Badge>
          </card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Title:</dt>
              <dd className="font-medium">{offer.brief.title}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Brand:</dt>
              <dd className="font-medium">{offer.brief.brand}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Compensation:</dt>
              <dd className="font-medium">${offer.brief.compensation.toLocaleString()}</dd>
            </div>
            {offer.brief.startDate && (<div className="flex justify-between">
                <dt className="text-muted-foreground">Duration:</dt>
                <dd className="font-medium">{offer.brief.startDate} to {offer.brief.endDate}</dd>
              </div>)}
          </dl>
        </card_1.CardContent>
      </card_1.Card>

      {/* Compliance Check */}
      {!(0, compliance_mock_1.allPassed)() && (<alert_1.Alert variant="destructive">
          <lucide_react_1.AlertTriangle className="h-4 w-4"/>
          <alert_1.AlertDescription className="flex items-center justify-between">
            <span>Compliance gates must be completed before running smart checks.</span>
            <button_1.Button variant="outline" size="sm" asChild>
              <a href="/creator/compliance">
                <lucide_react_1.ExternalLink className="h-3 w-3 mr-1"/>
                Complete Compliance
              </a>
            </button_1.Button>
          </alert_1.AlertDescription>
        </alert_1.Alert>)}

      {/* Smart Checks */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle className="flex items-center gap-2">
            <lucide_react_1.Lock className="h-5 w-5"/>
            Smart Checks
          </card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-4">
          {offer.checksCompleted ? (<div className="flex items-center gap-2 text-green-600">
              <lucide_react_1.CheckCircle2 className="h-4 w-4"/>
              <span className="text-sm font-medium">All checks passed</span>
            </div>) : (<p className="text-sm text-muted-foreground">
              Run automated verification of compliance, content, and payment terms.
            </p>)}
          
          {offer.checkNotes && (<p className="text-xs text-muted-foreground bg-muted p-2 rounded">
              {offer.checkNotes}
            </p>)}

          <button_1.Button onClick={handleRunChecks} disabled={!canRunChecks || isRunningChecks} className="w-full">
            {isRunningChecks ? 'Running Checks...' : 'Run Smart Checks'}
          </button_1.Button>
        </card_1.CardContent>
      </card_1.Card>

      {/* Sign Button */}
      {canSign && (<card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Ready to Sign</card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              All checks have passed. You can now sign this offer to make it legally binding.
            </p>
            <button_1.Button onClick={handleSign} className="w-full" size="lg">
              Sign Offer
            </button_1.Button>
          </card_1.CardContent>
        </card_1.Card>)}
    </div>);
}
