"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  Clock,
  RefreshCw,
  AlertTriangle,
  Users,
  UserCheck,
  UserPlus,
  Timer,
  UserMinus,
  FileText,
  Settings,
  Database,
  ChevronDown,
  ChevronRight,
  X,
} from "lucide-react";

interface SubMenuItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

interface MenuItem {
  label: string;
  href?: string;
  icon: React.ElementType;
  submenu?: SubMenuItem[];
  badge?: number;
}

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    submenu: [
      { label: "Outstanding Payment", href: "/dashboard/outstanding", icon: CreditCard },
      { label: "Awaiting Payment", href: "/dashboard/awaiting", icon: Clock },
      { label: "Renewal", href: "/dashboard/renewal", icon: RefreshCw },
      { label: "Overdue Payment", href: "/dashboard/overdue", icon: AlertTriangle, badge: 7 },
    ],
  },
  {
    label: "Member Data",
    icon: Users,
    submenu: [
      { label: "All Member", href: "/dashboard/member-data", icon: UserCheck },
      { label: "New Member", href: "/dashboard/member-data/new", icon: UserPlus },
      { label: "Need Renewal", href: "/dashboard/member-data/renewal", icon: Timer },
      { label: "Ex-Member", href: "/dashboard/member-data/ex", icon: UserMinus },
    ],
  },
  {
    label: "Subscription Data",
    href: "/dashboard/subscription-data",
    icon: FileText,
  },
  {
    label: "Setting",
    icon: Settings,
    submenu: [
      { label: "Master Data", href: "/dashboard/setting/master-data", icon: Database },
    ],
  },
];

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>(["Dashboard", "Member Data"]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((m) => m !== label) : [...prev, label]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isParentActive = (item: MenuItem) =>
    item.submenu?.some((sub) => pathname === sub.href);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-sidebar text-white z-50 transform transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <span className="text-2xl font-bold text-bni-primary">BNI</span>
        </div>

        {/* Close button for mobile */}
        <button
          className="absolute top-4 right-4 md:hidden"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <div key={item.label}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-150 ${
                      isParentActive(item)
                        ? "bg-bni-light text-bni-primary border-l-3 border-bni-primary"
                        : "hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {openMenus.includes(item.label) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {openMenus.includes(item.label) && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={onClose}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                            isActive(sub.href)
                              ? "bg-bni-light text-bni-primary border-l-3 border-bni-primary"
                              : "text-white/70 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <sub.icon className="w-4 h-4" />
                            <span>{sub.label}</span>
                          </div>
                          {sub.badge && (
                            <span className="bg-bni-primary text-white text-xs px-2 py-0.5 rounded-full">
                              {sub.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href || "#"}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 ${
                    isActive(item.href || "")
                      ? "bg-bni-light text-bni-primary border-l-3 border-bni-primary"
                      : "hover:bg-white/10"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="bg-bni-primary text-white text-xs px-2 py-0.5 rounded-full ml-auto">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-bni-primary flex items-center justify-center text-white font-medium">
              A
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-white/60">Administrator</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

