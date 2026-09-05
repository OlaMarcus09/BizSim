import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Building2,
  History,
  Home,
  LogIn,
  Newspaper,
  Tags,
  Trophy,
} from "lucide-react";

export type StudentNavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
};

export const studentNavigation: StudentNavigationItem[] = [
  { label: "Home", href: "/student", icon: Home, exact: true },
  { label: "Dashboard", href: "/student/dashboard", icon: BarChart3 },
  { label: "My Company", href: "/student/company", icon: Building2 },
  { label: "Market & News", href: "/student/market", icon: Newspaper },
  { label: "Performance History", href: "/student/performance", icon: History },
  { label: "Leaderboard", href: "/student/leaderboard", icon: Trophy },
];

export const joinSimulationNavigation: StudentNavigationItem = {
  label: "Join Simulation",
  href: "/student/join",
  icon: LogIn,
};

export const pricingNavigation: StudentNavigationItem = {
  label: "Pricing Decision",
  href: "/student/pricing",
  icon: Tags,
};
