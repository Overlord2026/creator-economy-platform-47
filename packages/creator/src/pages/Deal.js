"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deal = Deal;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var offer_mock_1 = require("../state/offer.mock");
var proofs_mock_1 = require("../state/proofs.mock");
var ProofSlip_1 = require("../components/ProofSlip");
var lucide_react_1 = require("lucide-react");
function Deal() {
    var id = (0, react_router_dom_1.useParams)().id;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_1.useState)((0, offer_mock_1.getCurrentOffer)()), offer = _a[0], setOffer = _a[1];
    var _b = (0, react_1.useState)((0, proofs_mock_1.getProofs)()), proofs = _b[0], setProofs = _b[1];
    var _c = (0, react_1.useState)((0, proofs_mock_1.isEscrowComplete)()), escrowComplete = _c[0], setEscrowComplete = _c[1];
    (0, react_1.useEffect)(function () {
        setOffer((0, offer_mock_1.getCurrentOffer)());
        setProofs((0, proofs_mock_1.getProofs)());
        setEscrowComplete((0, proofs_mock_1.isEscrowComplete)());
    }, []);
    var handleCreateEscrow = function () {
        var _a;
        var amount = ((_a = offer.brief) === null || _a === void 0 ? void 0 : _a.compensation) || 0;
        var splits = encodeURIComponent(JSON.stringify([
            { party: 'Creator', percentage: 85 },
            { party: 'Platform Fee', percentage: 15 }
        ]));
        navigate("/creator/payout/".concat(id, "?amount=").concat(amount, "&splits=").concat(splits));
    };
    var handleDownloadAudit = function () {
        var auditData = {
            dealId: id,
            brief: offer.brief,
            proofs: proofs,
            exportedAt: new Date().toISOString(),
            verification: {
                checksCompleted: offer.checksCompleted,
                signed: offer.signed,
                escrowComplete: escrowComplete
            }
        };
        var blob = new Blob([JSON.stringify(auditData, null, 2)], {
            type: 'application/json'
        });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "deal-".concat(id, "-audit-pack.json");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    if (!offer.brief) {
        return (<div className="max-w-4xl mx-auto">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Deal not found</p>
        </div>
      </div>);
    }
    return (<div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deal #{id}</h1>
          <p className="text-muted-foreground mt-2">
            {offer.brief.title} with {offer.brief.brand}
          </p>
        </div>
        <div className="flex gap-2">
          <button_1.Button variant="outline" size="sm" asChild>
            <a href={"/creator/deal/".concat(id, "/verify")}>
              <lucide_react_1.QrCode className="h-4 w-4 mr-2"/>
              Verify
            </a>
          </button_1.Button>
          <button_1.Button variant="outline" size="sm" onClick={handleDownloadAudit}>
            <lucide_react_1.Download className="h-4 w-4 mr-2"/>
            Audit Pack
          </button_1.Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Deal Overview */}
        <div className="lg:col-span-1 space-y-4">
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle className="flex items-center justify-between">
                Deal Status
                <badge_1.Badge variant={escrowComplete ? "default" : "secondary"}>
                  {escrowComplete ? "Complete" : "Active"}
                </badge_1.Badge>
              </card_1.CardTitle>
            </card_1.CardHeader>
            <card_1.CardContent>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Value:</dt>
                  <dd className="font-medium">${offer.brief.compensation.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Status:</dt>
                  <dd className="font-medium">
                    {offer.signed ? 'Signed' : 'Pending'}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Escrow:</dt>
                  <dd className="font-medium">
                    {escrowComplete ? 'Complete' : 'Pending'}
                  </dd>
                </div>
              </dl>
              
              {offer.signed && !escrowComplete && (<button_1.Button onClick={handleCreateEscrow} className="w-full mt-4" size="sm">
                  <lucide_react_1.DollarSign className="h-4 w-4 mr-2"/>
                  Create Escrow
                </button_1.Button>)}
            </card_1.CardContent>
          </card_1.Card>
        </div>

        {/* Proof Receipts */}
        <div className="lg:col-span-2">
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Proof Receipts ({proofs.length})</card_1.CardTitle>
            </card_1.CardHeader>
            <card_1.CardContent>
              {proofs.length === 0 ? (<p className="text-muted-foreground text-center py-4">
                  No proof receipts available
                </p>) : (<div className="space-y-4">
                  {proofs.map(function (proof) { return (<ProofSlip_1.ProofSlip key={proof.id} title={proof.title} items={proof.items} timestamp={proof.timestamp} hash={proof.hash}/>); })}
                </div>)}
            </card_1.CardContent>
          </card_1.Card>
        </div>
      </div>
    </div>);
}
