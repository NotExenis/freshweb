import { JSX } from "preact";

interface NavbarProps {
  isLoggedIn: boolean;
}

export default function Navbar({ isLoggedIn }: NavbarProps): JSX.Element {
  const loggedInNavItems = [
    { path: "", label: "Home" },
    { path: "logout", label: "Logout" },
    { path: "waiting_list", label: "Whitelist user" },
    { path: "admin_dashboard", label: "Admin dashboard" },
  ];

  const loggedOutNavItems = [
    { path: "", label: "Home" },
    { path: "login", label: "Login" },
    { path: "register", label: "Register" },
  ];

  const navItems = isLoggedIn ? loggedInNavItems : loggedOutNavItems;

  return (
    <nav class="bg-neutral-800 flex shadow-lg fixed w-full z-20 top-0 start-0">
        <div className="flex items-center justify-center flex-row space-x-5">
          <img src="../images/velocity.png" height={24} width={24} className='ml-4 h-6 w-6' alt=''></img>
          <div className="font-light text-gray-300">
              <p>VELOCITY DEVELOPMENT</p>
          </div>
        </div>
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            {/* button label */}
          </button>
        </div>
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
            {navItems.map((item) => (
              <li key={item.path}>
                <a
                  href={`/${item.path}`}
                  class="block py-2 px-3rounded md:hover:text-blue-700 md:p-0 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
