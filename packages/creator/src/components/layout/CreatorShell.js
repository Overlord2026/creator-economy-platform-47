"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatorShell = CreatorShell;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var utils_1 = require("@/lib/utils");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function CreatorShell() {
    var navItems = [
        { to: '/creator', label: 'Brief', end: true },
        { to: '/creator/offer-lock', label: 'Offer Lock' },
        { to: '/creator/deal/123', label: 'Deals' },
        { to: '/creator/payout/123', label: 'Payouts' },
        { to: '/creator/compliance', label: 'Compliance' },
        { to: '/creator/portfolio', label: 'Portfolio' },
    ];
    return (<div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        {/* Left Navigation */}
        <aside className="w-64 bg-card border-r border-border sticky top-0 h-screen">
          <div className="p-6">
            <h1 className="text-lg font-semibold text-primary mb-6">Creator Platform</h1>
            <nav className="space-y-2">
              {navItems.map(function (item) { return (<react_router_dom_1.NavLink key={item.to} to={item.to} end={item.end} className={function (_a) {
                var isActive = _a.isActive;
                return (0, utils_1.cn)("block px-3 py-2 rounded-md text-sm font-medium transition-colors", isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted");
            }}>
                  {item.label}
                </react_router_dom_1.NavLink>); })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar */}
          <header className="bg-card border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Creator Platform</h2>
              <button_1.Button asChild>
                <react_router_dom_1.NavLink to="/creator">
                  <lucide_react_1.Plus className="w-4 h-4 mr-2"/>
                  New Brief
                </react_router_dom_1.NavLink>
              </button_1.Button>
            </div>
          </header>

          {/* Content Area */}
          <main className="p-6">
            <react_router_dom_1.Outlet />
          </main>
        </div>
      </div>
    </div>);
}
