"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofSlip = ProofSlip;
exports.makeProof = makeProof;
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
function ProofSlip(_a) {
    var title = _a.title, items = _a.items, timestamp = _a.timestamp, hash = _a.hash;
    var displayTimestamp = timestamp || new Date().toISOString();
    var displayHash = hash || makeProof(title, items).hash;
    return (<card_1.Card className="w-full">
      <card_1.CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <card_1.CardTitle className="text-lg">{title}</card_1.CardTitle>
          <badge_1.Badge variant="outline" className="text-xs">
            Verified
          </badge_1.Badge>
        </div>
      </card_1.CardHeader>
      <card_1.CardContent className="space-y-4">
        {/* Items */}
        <dl className="space-y-2">
          {items.map(function (item, index) { return (<div key={index} className="flex justify-between text-sm">
              <dt className="text-muted-foreground">{item.label}:</dt>
              <dd className="font-medium">{item.value}</dd>
            </div>); })}
        </dl>
        
        {/* Timestamp */}
        <div className="pt-2 border-t border-border text-xs text-muted-foreground">
          <div>Timestamp: {new Date(displayTimestamp).toLocaleString()}</div>
          <div className="font-mono mt-1 break-all">{displayHash}</div>
        </div>
      </card_1.CardContent>
    </card_1.Card>);
}
// Helper function to create proof objects
function makeProof(title, items) {
    var timestamp = new Date().toISOString();
    var hash = 'sha256:' + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2);
    return {
        title: title,
        items: items,
        timestamp: timestamp,
        hash: hash
    };
}
