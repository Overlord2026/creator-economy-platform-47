import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useUser } from '@/context/UserContext';
import { useRoleContext } from '@/context/RoleContext';
import { sb } from '@/lib/supabase-relaxed';
import { NavItem } from '@/types/navigation';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  HomeIcon,
  GraduationCapIcon,
  BriefcaseIcon,
  BarChart3Icon,
  ArchiveIcon,
  BanknoteIcon,
  ShieldIcon,
  PieChart,
  ActivityIcon,
  Users2Icon,
  SettingsIcon,
  LogOutIcon,
  Crown,
  Ellipsis,
  Menu,
  X,
  BuildingIcon,
  Scale,
  FileText,
  Search,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useResponsive } from '@/hooks/use-responsive';

// Role-based navigation configuration
const getNavigationByRole = (role: string, tier?: string): NavItem[] => {
  // Determine marketplace label based on role
  const isProfessional = ['advisor', 'accountant', 'consultant', 'attorney'].includes(role);
  const marketplaceTitle = isProfessional ? 'Marketplace (Pro)' : 'Marketplace';
  
  const baseNav: NavItem[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      href: '/',
      icon: HomeIcon
    },
    {
      id: 'marketplace',
      title: marketplaceTitle,
      href: '/marketplace',
      icon: BuildingIcon
    }
  ];

  const clientNav: NavItem[] = [
    ...baseNav,
    {
      id: 'goals',
      title: 'Goals',
      href: '/goals',
      icon: Target
    },
    {
      id: 'education',
      title: 'Education & Solutions',
      icon: GraduationCapIcon,
      children: [
        {
          id: 'education-center',
          title: 'Education Center',
          href: '/education',
          icon: GraduationCapIcon
        },
        {
          id: 'investment-solutions',
          title: 'Investment Solutions',
          href: '/investments',
          icon: BarChart3Icon
        },
        {
          id: 'tax-planning',
          title: 'Tax Planning',
          href: '/tax-planning',
          icon: PieChart
        },
        {
          id: 'insurance',
          title: 'Insurance Solutions',
          href: '/insurance',
          icon: ShieldIcon
        },
        {
          id: 'annuities',
          title: 'Annuities',
          href: '/annuities',
          icon: ArchiveIcon
        }
      ]
    },
    {
      id: 'wealth',
      title: 'Wealth Management',
      icon: BriefcaseIcon,
      children: [
        {
          id: 'wealth-overview',
          title: 'Overview',
          href: '/wealth',
          icon: HomeIcon
        },
        {
          id: 'wealth-accounts',
          title: 'Accounts',
          href: '/wealth/accounts',
          icon: BarChart3Icon
        },
        {
          id: 'wealth-cash',
          title: 'Cash Management',
          href: '/wealth/cash/management',
          icon: BanknoteIcon
        },
        {
          id: 'wealth-properties',
          title: 'Properties',
          href: '/wealth/properties',
          icon: HomeIcon
        },
        {
          id: 'wealth-docs',
          title: 'Documents',
          href: '/wealth/docs',
          icon: ArchiveIcon
        }
      ]
    },
    {
      id: 'health',
      title: 'Health Optimization',
      icon: ActivityIcon,
      children: [
        {
          id: 'health-overview',
          title: 'Health Dashboard',
          href: '/healthcare-dashboard',
          icon: HomeIcon
        },
        {
          id: 'health-hsa',
          title: 'HSA Accounts',
          href: '/healthcare-hsa-accounts',
          icon: BanknoteIcon
        },
        {
          id: 'health-knowledge',
          title: 'Knowledge Center',
          href: '/healthcare-knowledge',
          icon: GraduationCapIcon
        },
        {
          id: 'health-data',
          title: 'Data Sharing',
          href: '/healthcare-share-data',
          icon: Users2Icon
        }
      ]
    }
  ];

  const advisorNav: NavItem[] = [
    ...baseNav,
    {
      id: 'clients',
      title: 'Client Management',
      icon: Users2Icon,
      children: [
        {
          id: 'client-list',
          title: 'Client List',
          href: '/advisor/clients',
          icon: Users2Icon
        },
        {
          id: 'prospects',
          title: 'Prospects',
          href: '/advisor/prospects',
          icon: Users2Icon
        }
      ]
    },
    {
      id: 'portfolio',
      title: 'Portfolio Management',
      icon: BarChart3Icon,
      children: [
        {
          id: 'portfolio-overview',
          title: 'Overview',
          href: '/advisor/portfolio',
          icon: BarChart3Icon
        },
        {
          id: 'performance',
          title: 'Performance Reports',
          href: '/advisor/performance',
          icon: BarChart3Icon
        }
      ]
    },
    {
      id: 'business',
      title: 'Business Tools',
      icon: BriefcaseIcon,
      children: [
        {
          id: 'billing',
          title: 'Fee & Billing',
          href: '/advisor/billing',
          icon: BanknoteIcon
        },
        {
          id: 'compliance',
          title: 'Compliance',
          href: '/advisor/compliance',
          icon: ShieldIcon
        }
      ]
    }
  ];

  const professionalNav: NavItem[] = [
    ...baseNav,
    {
      id: 'services',
      title: 'Professional Services',
      icon: BriefcaseIcon,
      children: [
        {
          id: 'projects',
          title: 'Active Projects',
          href: `/${role}/projects`,
          icon: BriefcaseIcon
        },
        {
          id: 'clients',
          title: 'Client Management',
          href: `/${role}/clients`,
          icon: Users2Icon
        }
      ]
    }
  ];

  const attorneyNav: NavItem[] = [
    ...baseNav,
    {
      id: 'legal-services',
      title: 'Legal Services',
      icon: Scale,
      children: [
        {
          id: 'estate-planning',
          title: 'Estate Planning',
          href: '/attorney/estate-planning',
          icon: Scale
        },
        {
          id: 'business-law',
          title: 'Business Law',
          href: '/attorney/business-law',
          icon: BriefcaseIcon
        },
        {
          id: 'contracts',
          title: 'Contracts',
          href: '/attorney/contracts',
          icon: FileText
        },
        {
          id: 'research',
          title: 'Research',
          href: '/attorney/research',
          icon: Search
        }
      ]
    }
  ];

  const adminNav: NavItem[] = [
    ...baseNav,
    {
      id: 'admin',
      title: 'Administration',
      icon: SettingsIcon,
      children: [
        {
          id: 'users',
          title: 'User Management',
          href: '/admin/users',
          icon: Users2Icon
        },
        {
          id: 'system',
          title: 'System Settings',
          href: '/admin/settings',
          icon: SettingsIcon
        }
      ]
    }
  ];

  // Role-based navigation selection
  switch (role) {
    case 'client':
    case 'client_premium':
      return clientNav;
    case 'advisor':
      return advisorNav;
    case 'attorney':
      return attorneyNav;
    case 'accountant':
    case 'consultant':
      return professionalNav;
    case 'admin':
    case 'tenant_admin':
    case 'system_administrator':
      return adminNav;
    default:
      return baseNav;
  }
};

// Resources/More navigation for less-used features
const getResourcesNav = (): NavItem[] => [
  {
    id: 'help',
    title: 'Help & Support',
    href: '/help',
    icon: GraduationCapIcon
  },
  {
    id: 'settings',
    title: 'Settings',
    href: '/settings',
    icon: SettingsIcon
  }
];

interface AccordionSidebarProps {
  className?: string;
}

export function AccordionSidebar({ className }: AccordionSidebarProps) {
  const location = useLocation();
  const { userProfile } = useUser();
  const { getCurrentRole, getCurrentClientTier } = useRoleContext();
  const { isMobile } = useResponsive();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentRole = getCurrentRole();
  const currentTier = getCurrentClientTier();
  
  const navigationItems = getNavigationByRole(currentRole, currentTier);
  const resourcesItems = getResourcesNav();

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const NavItemComponent: React.FC<{ item: NavItem; depth?: number }> = ({ item, depth = 0 }) => {
    const Icon = item.icon;
    const isActivePath = item.href ? isActive(item.href) : false;

    if (item.children && item.children.length > 0) {
      return (
        <AccordionItem value={item.id} className="border-none">
          <AccordionTrigger className={cn(
            "flex items-center gap-3 px-3 py-2 text-left hover:no-underline rounded-md transition-colors",
            "hover:bg-bfo-gold/10 hover:text-bfo-gold text-bfo-gold",
            depth > 0 && "ml-4 text-sm"
          )}>
            <div className="flex items-center gap-3 flex-1">
              {Icon && <Icon className="h-4 w-4 flex-shrink-0 text-bfo-gold" />}
              <span className="font-medium truncate text-bfo-gold">{item.title}</span>
              {item.isPremium && <Crown className="h-3 w-3 text-bfo-gold" />}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-0">
            <div className="space-y-1">
              {item.children.map((child) => (
                <NavItemComponent key={child.id} item={child} depth={depth + 1} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      );
    }

    if (!item.href) {
      return (
        <div className={cn(
          "flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-md",
          depth > 0 && "ml-4 text-sm"
        )}>
          {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
          <span className="truncate">{item.title}</span>
          {item.isPremium && <Crown className="h-3 w-3 text-amber-500" />}
        </div>
      );
    }

    return (
      <Link
        to={item.href}
        onClick={() => isMobile && setMobileOpen(false)}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
          isActivePath
            ? "bg-bfo-gold text-navy font-medium"
            : "text-bfo-gold hover:bg-bfo-gold/10 hover:text-bfo-gold",
          depth > 0 && "ml-4 text-sm"
        )}
      >
        {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
        <span className="truncate">{item.title}</span>
        {item.isPremium && <Crown className="h-3 w-3 text-bfo-gold" />}
      </Link>
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-navy text-bfo-gold">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-bfo-gold/30">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/brand/bfo_logo_gold.svg"
            alt="Boutique Family Office"
            className="h-8 w-auto"
            onError={(e) => (e.currentTarget.src = '/brand/bfo_logo_gold.png')}
          />
        </Link>
        {isMobile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <Accordion type="multiple" className="space-y-2">
          {navigationItems.map((item) => (
            <NavItemComponent key={item.id} item={item} />
          ))}
          
          {/* Resources Section */}
          <AccordionItem value="resources" className="border-none">
            <AccordionTrigger className="flex items-center gap-3 px-3 py-2 text-left hover:no-underline rounded-md transition-colors hover:bg-bfo-gold/10 hover:text-bfo-gold">
              <div className="flex items-center gap-3 flex-1 text-bfo-gold">
                <Ellipsis className="h-4 w-4 flex-shrink-0" />
                <span className="font-medium">More</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <div className="space-y-1">
                {resourcesItems.map((item) => (
                  <NavItemComponent key={item.id} item={item} depth={1} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-bfo-gold/30">
        <div className="text-xs text-bfo-gold/70 mb-2">
          {userProfile?.email && (
            <div className="truncate">{userProfile.email}</div>
          )}
          <div>Role: {currentRole}{currentTier === 'premium' ? ' Premium' : ''}</div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-bfo-gold hover:bg-bfo-gold/10 hover:text-bfo-gold"
          onClick={async () => {
            await sb.auth.signOut();
            window.location.href = '/';
          }}
        >
          <LogOutIcon className="h-4 w-4" />
          <span>Sign out</span>
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile trigger */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </div>
      </>
    );
  }

  return (
    <div className={cn("hidden lg:flex w-80 border-r border-bfo-gold/30 bg-navy", className)}>
      <SidebarContent />
    </div>
  );
}