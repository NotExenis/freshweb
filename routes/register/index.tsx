import { Handlers, type PageProps } from "$fresh/server.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { connect } from "../../private/db.ts";
import Navbar from "../../islands/navbar.tsx";
import type { JwtClaims } from "../../utils/types/interfaces.ts";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const handler: Handlers = {
  async POST(req: Request): Promise<Response> {
    let conn;
    try {
      const formData = await req.formData();
      const userData: RegisterData = {
        name: formData.get("name")?.toString() || "",
        email: formData.get("email")?.toString() || "",
        password: formData.get("password")?.toString() || "",
      };

      if (!userData.name || !userData.email || !userData.password) {
        console.log("Validation failed:", {
          hasName: !!userData.name,
          hasEmail: !!userData.email,
          hasPassword: !!userData.password,
        });
        return new Response(
          JSON.stringify({
            error: "All fields are required",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      conn = await connect();

      // Check for existing user
      const [existingUsers] = await conn.execute(
        "SELECT * FROM tbl_users WHERE user_email = ?",
        [userData.email],
      );

      if (Array.isArray(existingUsers) && existingUsers.length > 0) {
        console.log("User with email already exists");
        return new Response(
          JSON.stringify({
            error: "Email already registered",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      const hashedPassword = await bcrypt.hash(userData.password);

      // insert given data into db
      await conn.execute(
        "INSERT INTO tbl_users (user_name, user_email, user_password, user_2fa) VALUES (?, ?, ?,?)",
        [userData.name, userData.email, hashedPassword, 0],
      );

      return new Response(null, {
        status: 302,
        headers: { Location: "/login" },
      });
    } catch (_error: unknown) {
      return new Response(
        JSON.stringify({
          error: "Registration failed",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    } finally {
      if (conn) {
        try {
          await conn.end();
          console.log("Database connection closed successfully");
        } catch (closeError) {
          console.error("Error closing database connection:", closeError);
        }
      }
    }
  },
};

export default function RegisterPage(props: PageProps<JwtClaims>) {
  return (
    <section>
      <Navbar {...props} />
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-neutral rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:secondary">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Register an account
            </h1>
            <form class="space-y-4 md:space-y-6" method="POST">
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your username
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-neutral text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="username"
                  required
                />
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-neutral text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="email@email.com"
                  required
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-neutral text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <button
                type="submit"
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
