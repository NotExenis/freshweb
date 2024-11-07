import { FreshContext } from "$fresh/server.ts";
import { getUserFromToken } from "../utils/jwt.ts";
import cookie from "cookie";

export async function handler(
  req: Request,
  ctx: FreshContext,
) {
  try {
    const cookies = req.headers.get("Cookie");
    if (!cookies) {
      return ctx.next();
    }

    const jwt = cookie.parse(cookies).jwt;
    if (jwt === null || jwt === undefined) {
      return ctx.next();
    }

    const claims = await getUserFromToken(jwt);
    ctx.state.user = claims;

    if (req.url.includes("/login") || req.url.includes("/register")) {
      if (claims.role === "admin") {
        return new Response(null, {
          status: 302,
          headers: {
            Location: "/admin/dashboard",
          },
        });
      }

      return new Response(null, {
        status: 302,
        headers: {
          Location: "/dashboard",
        },
      });
    }

    return ctx.next();
  } catch (error) {
    console.error("Authentication error:", error);
  }
}
