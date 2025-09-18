import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { cn } from 'src/lib/utils';
import { Button } from 'src/components/ui/button';
import { Plus } from 'lucide-react';

export function CreatorShell() {
  const navItems = [
    { to: '/creator', label: 'Brief', end: true },
    { to: '/creator/offer-lock', label: 'Offer Lock' },
    { to: '/creator/deal/123', label: 'Deals' },
    { to: '/creator/payout/123', label: 'Payouts' },
    { to: '/creator/compliance', label: 'Compliance' },
    { to: '/creator/portfolio', label: 'Portfolio' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        {/* Left Navigation */}
        <aside className="w-64 bg-card border-r border-border sticky top-0 h-screen">
          <div className="p-6">
            <h1 className="text-lg font-semibold text-primary mb-6">Creator Platform</h1>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => cn(
                    "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar */}
          <header className="bg-card border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Creator Platform</h2>
              <Button asChild>
                <NavLink to="/creator">
                  <Plus className="w-4 h-4 mr-2" />
                  New Brief
                </NavLink>
              </Button>
            </div>
          </header>

          {/* Content Area */}
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}