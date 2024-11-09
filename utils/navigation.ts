import { NavItem } from "./types/interfaces.ts";

export const guestNavigation: NavItem[] = [
  { name: "Home", href: "/" },
];

export const userNavigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Settings", href: "/settings" },
];

export const adminNavigation: NavItem[] = [
  ...userNavigation,
  { name: "Admin Panel", href: "/admin/panel" },
  { name: "Users", href: "/admin/users" },
];

export const accountDropdownSignedOut: NavItem[] = [
  { name: "Login", href: "/login" },
  { name: "Register", href: "/register" },
];

export const accountDropdownSignedIn: NavItem[] = [
  { name: "Profile", href: "/profile" },
  { name: "Logout", href: "/logout" },
];
