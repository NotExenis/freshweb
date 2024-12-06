import { FreshContext } from "$fresh/server.ts";
import { getUserFromToken } from "../utils/jwt.ts";
import cookie from "cookie";

export async function handler(
  req: Request,
  ctx: FreshContext,
  res: Response,
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
    if (!claims) { 
      console.error("Invalid claims received:", claims);
      return ctx.next();
    }

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

    if (req.url.includes("/logout")) {
      return new Response(null, {
        status: 302,
        headers: {
          "Set-Cookie": "jwt=; max-age=-1; path=/",
          "Location": "/",
        },
      });
    }

    return ctx.next();
  } catch (error) {
    console.error("Authentication error:", error);
  }
}
