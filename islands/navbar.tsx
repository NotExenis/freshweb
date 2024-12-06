import {
  accountDropdownSignedIn,
  accountDropdownSignedOut,
  adminNavigation,
  guestNavigation,
  userNavigation,
} from "../utils/navigation.ts";
import { type JwtClaims, type User } from "../utils/types/interfaces.ts";
import type { PageProps } from "$fresh/server.ts";

export default function Navbar(props: PageProps<JwtClaims>) {
  const navigationItems = {
    guest: guestNavigation,
    user: userNavigation,
    admin: adminNavigation,
  };

  const role = props.data?.role || "guest";
  const getNavigationForRole = (role: string) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return navigationItems.admin;
      case "user":
        return navigationItems.user;
      default:
        return navigationItems.guest;
    }
  };

  const getNavigationDropdown = (role: string) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return accountDropdownSignedIn;
      case "user":
        return accountDropdownSignedIn;
      default:
        return accountDropdownSignedOut;
    }
  };

  const currentNavigation = getNavigationForRole(role);
  const currentDropdown = getNavigationDropdown(role);
  const currentPath = props.url?.pathname || "";
  return (
    <nav class="bg bg-neutral">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <div class="ml-10 flex items-baseline space-x-4">
            {currentNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                class={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPath === item.href
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-secondary hover:text-white"
                }`}
                aria-current={currentPath === item.href ? "page" : undefined}
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="dropdown dropdown-hover">
            <div tabIndex={0} role="button" className="btn m-1">Account</div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-secondary rounded-box z-[1] w-42 p-1 shadow "
            >
              {currentDropdown.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  class={`px-3.5 py-3.5 rounded-md text-sm font-medium ${
                    currentPath === item.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-neutral hover:text-white"
                  }`}
                  aria-current={currentPath === item.href ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
