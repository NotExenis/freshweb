import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { getUserFromToken } from "../utils/jwt.ts";
import {
  adminNavigation,
  guestNavigation,
  userNavigation,
} from "../utils/navigation.ts";
import { NavItem, UserState } from "../utils/types/interfaces.ts";
import { KEY } from "../utils/jwt.ts";

export default function Navbar(): JSX.Element {
  const [userState, setUserState] = useState<UserState>({
    isAuthenticated: false,
    role: "guest",
  });
  const [navigation, setNavigation] = useState<NavItem[]>(guestNavigation);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token") || getCookie("token");

        if (!token) {
          setUserState({ isAuthenticated: false, role: "guest" });
          setNavigation(guestNavigation);
          return;
        }

        const cryptoKey = await KEY;
        const userState = await getUserFromToken(token, cryptoKey);

        if (!userState || !userState.isAuthenticated) {
          localStorage.removeItem("token");
          document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          setUserState({ isAuthenticated: false, role: "guest" });
          setNavigation(guestNavigation);
          return;
        }

        setUserState(userState);

        const navigationMap = {
          admin: adminNavigation,
          user: userNavigation,
          guest: guestNavigation,
        };

        setNavigation(navigationMap[userState.role] || guestNavigation);
      } catch (error) {
        console.error("Auth check failed:", error);
        setUserState({ isAuthenticated: false, role: "guest" });
        setNavigation(guestNavigation);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUserState({ isAuthenticated: false, role: "guest" });
    setNavigation(guestNavigation);
    globalThis.location.href = "/";
  };

  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  };

  if (isLoading) {
    return (
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center h-16">
            <div className="text-gray-300">Loading...</div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-white font-bold">
              Logo
            </a>
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium
                    ${
                    location.pathname === item.href
                      ? "text-white bg-gray-900"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            {userState.isAuthenticated && (
              <>
                <span className="text-gray-300 mr-4">
                  Role: {userState.role}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
