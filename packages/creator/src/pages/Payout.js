"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payout = Payout;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var alert_1 = require("@/components/ui/alert");
var proofs_mock_1 = require("../state/proofs.mock");
var ProofSlip_1 = require("../components/ProofSlip");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var react_router_dom_2 = require("react-router-dom");
function Payout() {
    var id = (0, react_router_dom_1.useParams)().id;
    var searchParams = (0, react_router_dom_1.useSearchParams)()[0];
    var navigate = (0, react_router_dom_2.useNavigate)();
    var amount = Number(searchParams.get('amount')) || 0;
    var splits = searchParams.get('splits') ? JSON.parse(decodeURIComponent(searchParams.get('splits'))) : [];
    var _a = (0, react_1.useState)((0, proofs_mock_1.getProofs)()), proofs = _a[0], setProofs = _a[1];
    var _b = (0, react_1.useState)(false), escrowFunded = _b[0], setEscrowFunded = _b[1];
    var _c = (0, react_1.useState)(false), escrowReleased = _c[0], setEscrowReleased = _c[1];
    (0, react_1.useEffect)(function () {
        var currentProofs = (0, proofs_mock_1.getProofs)();
        setProofs(currentProofs);
        setEscrowFunded(currentProofs.some(function (p) { return p.title.includes('Escrow Funded'); }));
        setEscrowReleased(currentProofs.some(function (p) { return p.title.includes('Escrow Released'); }));
    }, []);
    var handleFundEscrow = function () {
        var proof = (0, ProofSlip_1.makeProof)('Escrow Funded', [
            { label: 'Deal ID', value: id || 'N/A' },
            { label: 'Amount', value: "$".concat(amount.toLocaleString()) },
            { label: 'Status', value: 'FUNDED' },
            { label: 'Funding Source', value: 'Brand Account' }
        ]);
        (0, proofs_mock_1.addProof)(proof);
        setEscrowFunded(true);
        setProofs((0, proofs_mock_1.getProofs)());
        sonner_1.toast.success('Escrow funded successfully!');
    };
    var handleReleaseEscrow = function () {
        var proof = (0, ProofSlip_1.makeProof)('Escrow Released', [
            { label: 'Deal ID', value: id || 'N/A' },
            { label: 'Amount', value: "$".concat(amount.toLocaleString()) },
            { label: 'Status', value: 'RELEASED' },
            { label: 'Released To', value: 'Creator Wallet' }
        ]);
        (0, proofs_mock_1.addProof)(proof);
        setEscrowReleased(true);
        setProofs((0, proofs_mock_1.getProofs)());
        sonner_1.toast.success('Escrow released successfully!');
    };
    return (<div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button_1.Button variant="ghost" size="sm" onClick={function () { return navigate("/creator/deal/".concat(id)); }}>
          <lucide_react_1.ArrowLeft className="h-4 w-4 mr-2"/>
          Back to Deal
        </button_1.Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payout #{id}</h1>
          <p className="text-muted-foreground mt-2">
            Escrow management and payout processing
          </p>
        </div>
      </div>

      {/* Escrow Summary */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle className="flex items-center gap-2">
            <lucide_react_1.Wallet className="h-5 w-5"/>
            Escrow Details
          </card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="font-medium">Total Amount:</span>
              <span className="font-bold">${amount.toLocaleString()}</span>
            </div>
            
            {splits.length > 0 && (<div>
                <h4 className="font-medium mb-2">Payment Splits:</h4>
                <div className="space-y-1 text-sm">
                  {splits.map(function (split, index) { return (<div key={index} className="flex justify-between">
                      <span className="text-muted-foreground">{split.party}:</span>
                      <span>{split.percentage}% (${(amount * split.percentage / 100).toLocaleString()})</span>
                    </div>); })}
                </div>
              </div>)}
          </div>
        </card_1.CardContent>
      </card_1.Card>

      {/* Escrow Status */}
      <div className="grid gap-4 md:grid-cols-2">
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle className="flex items-center justify-between">
              Fund Escrow
              {escrowFunded && (<badge_1.Badge variant="default">
                  <lucide_react_1.CheckCircle2 className="h-3 w-3 mr-1"/>
                  Funded
                </badge_1.Badge>)}
            </card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {escrowFunded ?
            'Escrow has been funded and is secure.' :
            'Fund the escrow account to secure payment.'}
            </p>
            <button_1.Button onClick={handleFundEscrow} disabled={escrowFunded} className="w-full">
              <lucide_react_1.DollarSign className="h-4 w-4 mr-2"/>
              {escrowFunded ? 'Funded' : 'Fund Escrow'}
            </button_1.Button>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle className="flex items-center justify-between">
              Release Payment
              {escrowReleased && (<badge_1.Badge variant="default">
                  <lucide_react_1.CheckCircle2 className="h-3 w-3 mr-1"/>
                  Released
                </badge_1.Badge>)}
            </card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {escrowReleased ?
            'Payment has been released to creator.' :
            'Release payment after work completion.'}
            </p>
            <button_1.Button onClick={handleReleaseEscrow} disabled={!escrowFunded || escrowReleased} className="w-full">
              <lucide_react_1.CheckCircle2 className="h-4 w-4 mr-2"/>
              {escrowReleased ? 'Released' : 'Release Payment'}
            </button_1.Button>
          </card_1.CardContent>
        </card_1.Card>
      </div>

      {/* Status Alert */}
      {escrowFunded && escrowReleased && (<alert_1.Alert>
          <lucide_react_1.CheckCircle2 className="h-4 w-4"/>
          <alert_1.AlertDescription>
            Escrow process completed successfully. Payment has been released and deal is finalized.
          </alert_1.AlertDescription>
        </alert_1.Alert>)}
    </div>);
}
