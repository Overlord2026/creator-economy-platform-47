"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compliance = Compliance;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var switch_1 = require("@/components/ui/switch");
var label_1 = require("@/components/ui/label");
var compliance_mock_1 = require("../state/compliance.mock");
var proofs_mock_1 = require("../state/proofs.mock");
var ProofSlip_1 = require("../components/ProofSlip");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
function Compliance() {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_1.useState)((0, compliance_mock_1.getCompliance)()), compliance = _a[0], setComplianceState = _a[1];
    (0, react_1.useEffect)(function () {
        setComplianceState((0, compliance_mock_1.getCompliance)());
    }, []);
    var handleToggle = function (type, value) {
        var updatedCompliance;
        var proofTitle = '';
        switch (type) {
            case 'training':
                updatedCompliance = (0, compliance_mock_1.setTraining)(value);
                proofTitle = 'Training Completed';
                break;
            case 'disclosure':
                updatedCompliance = (0, compliance_mock_1.setDisclosure)(value);
                proofTitle = 'Disclosure Filed';
                break;
            case 'ftcLabels':
                updatedCompliance = (0, compliance_mock_1.setFtcLabels)(value);
                proofTitle = 'FTC Labels Enabled';
                break;
        }
        setComplianceState(updatedCompliance);
        if (value) {
            var proof = (0, ProofSlip_1.makeProof)("Compliance Gate Passed: ".concat(proofTitle), [
                { label: 'Gate Type', value: proofTitle },
                { label: 'Status', value: 'COMPLETED' },
                { label: 'Verified', value: 'YES' }
            ]);
            (0, proofs_mock_1.addProof)(proof);
            sonner_1.toast.success("".concat(proofTitle, " marked as complete"));
        }
    };
    var complianceItems = [
        {
            id: 'training',
            title: 'Training Completed',
            description: 'Complete required creator training and education modules',
            icon: lucide_react_1.Shield,
            completed: compliance.training,
            onToggle: function (value) { return handleToggle('training', value); }
        },
        {
            id: 'disclosure',
            title: 'Disclosure Filed',
            description: 'File required disclosure documents and agreements',
            icon: lucide_react_1.FileText,
            completed: compliance.disclosure,
            onToggle: function (value) { return handleToggle('disclosure', value); }
        },
        {
            id: 'ftcLabels',
            title: 'FTC Labels Enabled',
            description: 'Enable automatic FTC compliance labeling for sponsored content',
            icon: lucide_react_1.Tag,
            completed: compliance.ftcLabels,
            onToggle: function (value) { return handleToggle('ftcLabels', value); }
        }
    ];
    var allComplete = (0, compliance_mock_1.allPassed)();
    return (<div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Compliance Gates</h1>
        <p className="text-muted-foreground mt-2">
          Complete all compliance requirements before creating offers.
        </p>
      </div>

      {/* Overall Status */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle className="flex items-center justify-between">
            Compliance Status
            <badge_1.Badge variant={allComplete ? "default" : "secondary"}>
              {allComplete ? "Complete" : "Incomplete"}
            </badge_1.Badge>
          </card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="flex items-center gap-2 text-sm">
            {allComplete ? (<>
                <lucide_react_1.CheckCircle2 className="h-4 w-4 text-green-600"/>
                <span>All compliance gates passed. You can now create offers.</span>
              </>) : (<>
                <span className="text-muted-foreground">
                  {complianceItems.filter(function (item) { return item.completed; }).length} of {complianceItems.length} requirements completed
                </span>
              </>)}
          </div>
        </card_1.CardContent>
      </card_1.Card>

      {/* Compliance Items */}
      <div className="space-y-4">
        {complianceItems.map(function (item) {
            var Icon = item.icon;
            return (<card_1.Card key={item.id}>
              <card_1.CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-muted">
                    <Icon className="h-5 w-5"/>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{item.title}</h3>
                      <div className="flex items-center gap-2">
                        {item.completed && (<badge_1.Badge variant="default" className="text-xs">
                            <lucide_react_1.CheckCircle2 className="h-3 w-3 mr-1"/>
                            Complete
                          </badge_1.Badge>)}
                        <div className="flex items-center space-x-2">
                          <switch_1.Switch id={item.id} checked={item.completed} onCheckedChange={item.onToggle}/>
                          <label_1.Label htmlFor={item.id} className="sr-only">
                            {item.title}
                          </label_1.Label>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </card_1.CardContent>
            </card_1.Card>);
        })}
      </div>

      {/* Action Button */}
      {allComplete && (<card_1.Card>
          <card_1.CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Ready to Proceed</h3>
                <p className="text-sm text-muted-foreground">
                  All compliance requirements met. Continue to offer lock.
                </p>
              </div>
              <button_1.Button onClick={function () { return navigate('/creator/offer-lock'); }}>
                Continue
                <lucide_react_1.ArrowRight className="h-4 w-4 ml-2"/>
              </button_1.Button>
            </div>
          </card_1.CardContent>
        </card_1.Card>)}
    </div>);
}
