import { Link } from "react-router-dom";
import { Users, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

export default function MarketingFooter() {
  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Personas", href: "/personas" },
        { name: "Connections", href: "/connections" },
        { name: "Professionals", href: "/pros" },
        { name: "Why Receipts", href: "/why-receipts" }
      ]
    },
    {
      title: "Creators",
      links: [
        { name: "Athletes", href: "/personas?type=athlete" },
        { name: "Entertainers", href: "/personas?type=entertainer" },
        { name: "Content Creators", href: "/personas?type=creator" },
        { name: "Parents & Guardians", href: "/personas?type=parent" }
      ]
    },
    {
      title: "Professionals",
      links: [
        { name: "Agents & Reps", href: "/personas?type=agent" },
        { name: "Brands", href: "/personas?type=brand" },
        { name: "Schools & Coaches", href: "/personas?type=school" },
        { name: "Service Pros", href: "/personas?type=pros" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Getting Started", href: "/personas" },
        { name: "Platform Demo", href: "#/demo/offerlock" },
        { name: "Documentation", href: "/why-receipts" },
        { name: "Support", href: "/connections" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "YouTube", icon: Youtube, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" }
  ];

  return (
    <footer className="bg-[#0b1a2b] border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Users className="size-8 text-[#D4AF37]" />
              <span className="text-xl font-bold text-white">CreatorHub</span>
            </Link>
            <p className="text-white/60 text-sm mb-4">
              Deals and projects, minus the drama. Built by compliance nerds, designed for humans.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-white/60 hover:text-[#D4AF37] transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-white/60 text-sm">
              <span>© 2024 CreatorHub. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                Built by compliance nerds. Designed for humans.
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-white/60 text-sm">
              <Link to="/privacy" className="hover:text-[#D4AF37] transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-[#D4AF37] transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link to="/contact" className="hover:text-[#D4AF37] transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}