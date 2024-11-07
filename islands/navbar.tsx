import {
    adminNavigation,
    guestNavigation,
    userNavigation,
  } from "../utils/navigation.ts";
  import { type JwtClaims } from "../utils/types/interfaces.ts";
  import type { Handlers, PageProps } from "$fresh/server.ts";
  
  export const handler: Handlers<JwtClaims> = {
    GET(_, ctx) {
      return ctx.render(ctx.state.user as JwtClaims);
    },
  };
  
  export default function Navbar(props: PageProps<JwtClaims>) {
    console.log(props);
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
  
    const currentNavigation = getNavigationForRole(role);
    const currentPath = props.url?.pathname || ""; 
    return (
      <nav class="bg-gray-800">
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
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  aria-current={currentPath === item.href ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    );
  }
  