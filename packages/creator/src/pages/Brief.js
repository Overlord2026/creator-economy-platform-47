"use strict";
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
exports.Brief = Brief;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var textarea_1 = require("@/components/ui/textarea");
var offer_mock_1 = require("../state/offer.mock");
var proofs_mock_1 = require("../state/proofs.mock");
var ProofSlip_1 = require("../components/ProofSlip");
var sonner_1 = require("sonner");
function Brief() {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_1.useState)({
        title: '',
        brand: '',
        compensation: '',
        startDate: '',
        endDate: '',
        notes: ''
    }), formData = _a[0], setFormData = _a[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        if (!formData.title || !formData.brand || !formData.compensation) {
            sonner_1.toast.error('Please fill in all required fields');
            return;
        }
        var briefData = {
            title: formData.title,
            brand: formData.brand,
            compensation: Number(formData.compensation),
            startDate: formData.startDate,
            endDate: formData.endDate,
            notes: formData.notes
        };
        // Store the brief
        (0, offer_mock_1.createBrief)(briefData);
        // Create proof receipt
        var proof = (0, ProofSlip_1.makeProof)('Brief Submitted', [
            { label: 'Title', value: briefData.title },
            { label: 'Brand', value: briefData.brand },
            { label: 'Compensation', value: "$".concat(briefData.compensation.toLocaleString()) },
            { label: 'Start Date', value: briefData.startDate },
            { label: 'End Date', value: briefData.endDate }
        ]);
        (0, proofs_mock_1.addProof)(proof);
        sonner_1.toast.success('Brief submitted successfully!');
        navigate('/creator/offer-lock');
    };
    var handleChange = function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    };
    return (<div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Brief</h1>
        <p className="text-muted-foreground mt-2">
          Submit your collaboration proposal to begin the verification process.
        </p>
      </div>

      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Brief Details</card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label_1.Label htmlFor="title">Title *</label_1.Label>
              <input_1.Input id="title" placeholder="Enter brief title" value={formData.title} onChange={function (e) { return handleChange('title', e.target.value); }} required/>
            </div>

            <div className="space-y-2">
              <label_1.Label htmlFor="brand">Brand *</label_1.Label>
              <input_1.Input id="brand" placeholder="Enter brand name" value={formData.brand} onChange={function (e) { return handleChange('brand', e.target.value); }} required/>
            </div>

            <div className="space-y-2">
              <label_1.Label htmlFor="compensation">Compensation ($) *</label_1.Label>
              <input_1.Input id="compensation" type="number" placeholder="0" value={formData.compensation} onChange={function (e) { return handleChange('compensation', e.target.value); }} required/>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label_1.Label htmlFor="startDate">Start Date</label_1.Label>
                <input_1.Input id="startDate" type="date" value={formData.startDate} onChange={function (e) { return handleChange('startDate', e.target.value); }}/>
              </div>

              <div className="space-y-2">
                <label_1.Label htmlFor="endDate">End Date</label_1.Label>
                <input_1.Input id="endDate" type="date" value={formData.endDate} onChange={function (e) { return handleChange('endDate', e.target.value); }}/>
              </div>
            </div>

            <div className="space-y-2">
              <label_1.Label htmlFor="notes">Notes</label_1.Label>
              <textarea_1.Textarea id="notes" placeholder="Additional details or requirements" value={formData.notes} onChange={function (e) { return handleChange('notes', e.target.value); }} rows={3}/>
            </div>

            <div className="flex gap-3 pt-4">
              <button_1.Button type="submit" className="flex-1">
                Submit Brief
              </button_1.Button>
              <button_1.Button type="button" variant="outline" onClick={function () { return navigate('/creator/portfolio'); }}>
                Save Draft
              </button_1.Button>
            </div>
          </form>
        </card_1.CardContent>
      </card_1.Card>
    </div>);
}
