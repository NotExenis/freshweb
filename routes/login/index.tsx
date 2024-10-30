import { Handlers } from "$fresh/server.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { connect } from "../../private/db.ts";
import { create } from "https://deno.land/x/djwt@v2.9.1/mod.ts";
import { RowDataPacket } from "mysql2";

interface UserRecord extends RowDataPacket {
  user_id: number;
  user_email: string;
  user_password: string;
  user_name: string;
  user_2fa: number;
  user_role: "user" | "admin";
}

interface LoginData {
  email: string;
  password: string;
}

const KEY = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);
export const handler: Handlers = {
  async POST(req: Request): Promise<Response> {
    let conn;
    try {
      const formData = await req.formData();
      const loginData: LoginData = {
        email: formData.get("email")?.toString() || "",
        password: formData.get("password")?.toString() || "",
      };

      if (!loginData.email || !loginData.password) {
        console.log("Validation failed:", {
          hasEmail: !!loginData.email,
          hasPassword: !!loginData.password,
        });
        return new Response(
          JSON.stringify({
            error: "Email and password are required",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      conn = await connect();

      const [users] = await conn.execute<UserRecord[]>(
        "SELECT * FROM tbl_users WHERE user_email = ?",
        [loginData.email],
      );

      if (!Array.isArray(users) || users.length === 0) {
        console.log("User not found");
        return new Response(
          JSON.stringify({
            error: "Invalid email or password",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      const user = users[0];
      const passwordMatch = await bcrypt.compare(
        loginData.password,
        user.user_password,
      );

      if (!passwordMatch) {
        console.log("Password mismatch");
        return new Response(
          JSON.stringify({
            error: "Invalid email or password",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      const jwt = await create(
        { alg: "HS512", typ: "JWT" },
        {
          userId: user.user_id,
          email: user.user_email,
          role: user.user_role,
          exp: Math.floor(Date.now() / 1000 + 60 * 60 * 24),
        },
        KEY,
      );
      
      const redirectPath = user.user_role === "admin"
        ? "/admin/dashboard"
        : "/dashboard";

      return new Response(
        JSON.stringify({
          token: jwt,
          user: {
            email: user.user_email,
            role: user.user_role,
          },
          redirectPath,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    } catch (error: unknown) {
      console.error("Login error:", error);
      return new Response(
        JSON.stringify({
          error: "Login failed",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    } finally {
      if (conn) {
        await conn.end().catch((err) =>
          console.error("Error closing database connection:", err)
        );
      }
    }
  },
};
export default function Login() {
  return (
    <section class="bg-gray-50 dark:bg-slate-600">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form class="space-y-4 md:space-y-6" method="POST">
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
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="email@email.com"
                >
                </input>
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
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                </input>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      type="checkbox"
                      class="appearance-none checked:content-['⛔'] w-4 h-4 border border-gray-300 rounded bg-gray-50 checked:bg-blue-600 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    >
                    </input>
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="remember"
                      class="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  class="text-sm font-medium dark:text-white hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
