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
} from "lucide-react";

export interface SubMenuItem {
  label: string;
  href: string;
  iconName: string;
  badge?: number;
}

export interface MenuItem {
  label: string;
  href?: string;
  iconName: string;
  submenu?: SubMenuItem[];
  badge?: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
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
};

export function getIcon(name: string) {
  return iconMap[name] || LayoutDashboard;
}

export const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    iconName: "LayoutDashboard",
    submenu: [
      { label: "Outstanding Payment", href: "/dashboard/outstanding", iconName: "CreditCard" },
      { label: "Awaiting Payment", href: "/dashboard/awaiting", iconName: "Clock" },
      { label: "Renewal", href: "/dashboard/renewal", iconName: "RefreshCw" },
      { label: "Overdue Payment", href: "/dashboard/overdue", iconName: "AlertTriangle", badge: 7 },
    ],
  },
  {
    label: "Member Data",
    iconName: "Users",
    submenu: [
      { label: "All Member", href: "/dashboard/member-data", iconName: "UserCheck" },
      { label: "New Member", href: "/dashboard/member-data/new", iconName: "UserPlus" },
      { label: "Need Renewal", href: "/dashboard/member-data/renewal", iconName: "Timer" },
      { label: "Ex-Member", href: "/dashboard/member-data/ex", iconName: "UserMinus" },
    ],
  },
  {
    label: "Subscription Data",
    href: "/dashboard/subscription-data",
    iconName: "FileText",
  },
  {
    label: "Setting",
    iconName: "Settings",
    submenu: [
      { label: "Master Data", href: "/dashboard/setting/master-data", iconName: "Database" },
    ],
  },
];