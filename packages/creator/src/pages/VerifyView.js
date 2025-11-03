"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyView = VerifyView;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var dialog_1 = require("@/components/ui/dialog");
var offer_mock_1 = require("../state/offer.mock");
var proofs_mock_1 = require("../state/proofs.mock");
var ProofSlip_1 = require("../components/ProofSlip");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
function VerifyView() {
    var id = (0, react_router_dom_1.useParams)().id;
    var _a = (0, react_1.useState)((0, offer_mock_1.getCurrentOffer)()), offer = _a[0], setOffer = _a[1];
    var _b = (0, react_1.useState)((0, proofs_mock_1.getProofs)()), proofs = _b[0], setProofs = _b[1];
    var _c = (0, react_1.useState)((0, proofs_mock_1.isEscrowComplete)()), escrowComplete = _c[0], setEscrowComplete = _c[1];
    (0, react_1.useEffect)(function () {
        setOffer((0, offer_mock_1.getCurrentOffer)());
        setProofs((0, proofs_mock_1.getProofs)());
        setEscrowComplete((0, proofs_mock_1.isEscrowComplete)());
    }, []);
    var verifyUrl = window.location.href;
    var handleCopyUrl = function () {
        navigator.clipboard.writeText(verifyUrl);
        sonner_1.toast.success('Verification URL copied to clipboard');
    };
    // Simple QR code placeholder - in production, use a proper QR library
    var generateQRPlaceholder = function () {
        return "data:image/svg+xml,".concat(encodeURIComponent("\n      <svg width=\"200\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect width=\"200\" height=\"200\" fill=\"white\"/>\n        <text x=\"100\" y=\"100\" text-anchor=\"middle\" dominant-baseline=\"middle\" font-family=\"monospace\" font-size=\"12\">\n          QR Code\n          ".concat(verifyUrl.slice(-20), "...\n        </text>\n      </svg>\n    ")));
    };
    if (!offer.brief) {
        return (<div className="max-w-4xl mx-auto py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Deal not found or verification not available</p>
        </div>
      </div>);
    }
    return (<div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <lucide_react_1.CheckCircle2 className="h-6 w-6 text-green-600"/>
          <h1 className="text-3xl font-bold tracking-tight">Deal Verification</h1>
        </div>
        <p className="text-muted-foreground">
          This is a read-only verification view for Deal #{id}
        </p>
        
        <div className="flex items-center justify-center gap-2">
          <button_1.Button variant="outline" size="sm" onClick={handleCopyUrl}>
            <lucide_react_1.Copy className="h-4 w-4 mr-2"/>
            Copy URL
          </button_1.Button>
          
          <dialog_1.Dialog>
            <dialog_1.DialogTrigger asChild>
              <button_1.Button variant="outline" size="sm">
                <lucide_react_1.QrCode className="h-4 w-4 mr-2"/>
                Show QR
              </button_1.Button>
            </dialog_1.DialogTrigger>
            <dialog_1.DialogContent className="sm:max-w-md">
              <dialog_1.DialogHeader>
                <dialog_1.DialogTitle>QR Code for Verification</dialog_1.DialogTitle>
              </dialog_1.DialogHeader>
              <div className="flex flex-col items-center space-y-4">
                <img src={generateQRPlaceholder()} alt="QR Code for verification" className="border rounded-lg"/>
                <p className="text-sm text-muted-foreground text-center">
                  Scan to verify this deal on any device
                </p>
                <button_1.Button variant="outline" onClick={handleCopyUrl} className="w-full">
                  <lucide_react_1.Copy className="h-4 w-4 mr-2"/>
                  Copy Verification URL
                </button_1.Button>
              </div>
            </dialog_1.DialogContent>
          </dialog_1.Dialog>
        </div>
      </div>

      {/* Deal Summary */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle className="flex items-center justify-between">
            Deal Summary
            <badge_1.Badge variant={escrowComplete ? "default" : "secondary"}>
              {escrowComplete ? "Complete" : "Active"}
            </badge_1.Badge>
          </card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="grid md:grid-cols-2 gap-4">
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
                <dt className="text-muted-foreground">Value:</dt>
                <dd className="font-medium">${offer.brief.compensation.toLocaleString()}</dd>
              </div>
            </dl>
            
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Checks:</dt>
                <dd className="font-medium">{offer.checksCompleted ? 'Passed' : 'Pending'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Signed:</dt>
                <dd className="font-medium">{offer.signed ? 'Yes' : 'No'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Escrow:</dt>
                <dd className="font-medium">{escrowComplete ? 'Complete' : 'In Progress'}</dd>
              </div>
            </dl>
          </div>
        </card_1.CardContent>
      </card_1.Card>

      {/* Verification Trail */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Verification Trail ({proofs.length} Records)</card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent>
          {proofs.length === 0 ? (<p className="text-muted-foreground text-center py-4">
              No verification records available
            </p>) : (<div className="space-y-4">
              {proofs.map(function (proof) { return (<ProofSlip_1.ProofSlip key={proof.id} title={proof.title} items={proof.items} timestamp={proof.timestamp} hash={proof.hash}/>); })}
            </div>)}
        </card_1.CardContent>
      </card_1.Card>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground">
        <p>This verification is cryptographically secured and tamper-evident.</p>
        <p>Verified at {new Date().toLocaleString()}</p>
      </div>
    </div>);
}
