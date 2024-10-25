// routes/register.ts
import { Handlers } from "$fresh/server.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { connect } from "../../private/db.ts";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const handler: Handlers = {
  async GET(req) {
    let conn;
    try {
      const url = new URL(req.url);
      const userData: RegisterData = {
        name: url.searchParams.get("name") || "",
        email: url.searchParams.get("email") || "",
        password: url.searchParams.get("password") || "",
      };

      if (!userData.name || !userData.email || !userData.password) {
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

      const hashedPassword = await bcrypt.hash(userData.password);

      conn = await connect();

      const [existingUsers] = await conn.query(
        "SELECT * FROM users WHERE email = ?",
        [userData.email],
      );

      if (Array.isArray(existingUsers) && existingUsers.length > 0) {
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

      await conn.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [userData.name, userData.email, hashedPassword],
      );

      return new Response(null, {
        status: 302,
        headers: { Location: "/login" },
      });
    } catch (error) {
      console.error("Registration error:", error);
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
        await conn.end();
      }
    }
  },
};
