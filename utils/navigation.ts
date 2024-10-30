import { NavItem } from "./types/interfaces.ts";

export const guestNavigation: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Login", href: "/login" },
  { name: "Register", href: "/register" },
];

export const userNavigation: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Profile", href: "/profile" },
  { name: "Settings", href: "/settings" },
];

export const adminNavigation: NavItem[] = [
  ...userNavigation,
  { name: "Admin Panel", href: "/admin" },
  { name: "Users", href: "/admin/users" },
  { name: "Settings", href: "/admin/settings" },
];
