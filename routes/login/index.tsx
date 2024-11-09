import { Handlers, type PageProps } from "$fresh/server.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { connect } from "../../private/db.ts";
import { RowDataPacket } from "mysql2";
import cookie from "cookie";
import { generateToken } from "../../utils/jwt.ts";
import Navbar from "../../islands/navbar.tsx";
import type { JwtClaims } from "../../utils/types/interfaces.ts";

export interface UserRecord extends RowDataPacket {
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

export const handler2: Handlers<JwtClaims> = {
  GET(_, ctx) {
    return ctx.render(ctx.state.user as JwtClaims);
  },
};

export const handler: Handlers<JwtClaims> = {
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

      let exp = new Date();
      const jwt = generateToken({
        userId: user.user_id,
        email: user.user_email,
        role: user.user_role,
        exp: exp.setTime(exp.getTime() + 3600 * 1000 * 24),
      });

      const redirectPath = user.user_role === "admin"
        ? "/admin/dashboard"
        : "/dashboard";

      const headers = new Headers();
      headers.set(
        "Set-Cookie",
        cookie.serialize("jwt", jwt, { maxAge: 3600 * 24, httpOnly: true }),
      );
      headers.set("Location", redirectPath);

      return new Response(null, {
        status: 302,
        headers,
      });
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

export default function Login(props: PageProps<JwtClaims>) {
  return (
    <div>
      <Navbar {...props} />
      <section>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-neutral rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:secondary">
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
                    class="bg-gray-50 border border-neutral text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
                    class="bg-gray-50 border border-neutral text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  >
                  </input>
                </div>
                <div class="flex items-center justify-between allign">
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
    </div>
  );
}
