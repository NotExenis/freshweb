import { FreshContext } from "$fresh/server.ts";
import { getUserFromToken } from "../utils/jwt.ts";
import { UserState } from "../utils/types/interfaces.ts";
import { KEY } from "../utils/jwt.ts";
export async function handler(
    req: Request,
    ctx: FreshContext,
  ) {
    try {
      const authHeader = req.headers.get("authorization");
      const token = authHeader?.toLowerCase().startsWith("bearer ")
        ? authHeader.slice(7)
        : null;
  
      const cryptoKey = await KEY;
      const userState = await getUserFromToken(token || "", cryptoKey);
      ctx.state.user = userState;
  
      if (req.url.includes("/admin") && userState.role !== "admin") {
        return new Response(
          JSON.stringify({
            error: "Admin access required",
            details: {
              isAuthenticated: userState.isAuthenticated,
              role: userState.role,
            },
          }),
          {
            status: 403,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      }
  
      if (req.url.includes("/dashboard") && !userState.isAuthenticated) {
        return new Response(
          JSON.stringify({ error: "Authentication required" }),
          {
            status: 401,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      }
  
      return await ctx.next();
    } catch (error) {
      console.error("Authentication error:", error);
      return new Response(
        JSON.stringify({ error: "Authentication failed" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
  }
  