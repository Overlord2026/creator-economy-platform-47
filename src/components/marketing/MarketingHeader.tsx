import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Users } from "lucide-react";
import { useState } from "react";

export default function MarketingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Personas', href: '/personas' },
    { name: 'Connections', href: '/connections' },
    { name: 'Professionals', href: '/pros' },
    { name: 'Why Receipts', href: '/why-receipts' }
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="bg-[#0b1a2b] border-b border-white/10 sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Users className="size-8 text-[#D4AF37]" />
            <span className="text-xl font-bold text-white">CreatorHub</span>
            <Badge variant="outline" className="border-[#D4AF37]/30 text-[#D4AF37] text-xs">
              Beta
            </Badge>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-[#D4AF37] ${
                  isActive(item.href)
                    ? 'text-[#D4AF37]'
                    : 'text-white/80'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 text-sm">
              <Link to="/personas">Get Started</Link>
            </Button>
            <Button asChild className="bg-[#D4AF37] text-[#0b1a2b] hover:bg-[#D4AF37]/90 text-sm">
              <Link to="#/demo/offerlock">Try Demo</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-4">
            <nav className="space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-2 text-sm font-medium transition-colors hover:text-[#D4AF37] ${
                    isActive(item.href)
                      ? 'text-[#D4AF37] bg-white/5'
                      : 'text-white/80'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="px-4 pt-4 space-y-3">
                <Button asChild variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  <Link to="/personas" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
                </Button>
                <Button asChild className="w-full bg-[#D4AF37] text-[#0b1a2b] hover:bg-[#D4AF37]/90">
                  <Link to="#/demo/offerlock" onClick={() => setIsMenuOpen(false)}>Try Demo</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}