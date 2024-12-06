import { FreshContext } from "$fresh/server.ts";
import { JwtClaims } from "../../utils/types/interfaces.ts";

export async function handler(
  req: Request,
  ctx: FreshContext,
) {
  try {
    let user = ctx.state.user as JwtClaims;
    if (!user) {
      throw new Error("invalid jwt");
    }

    return ctx.next();
  } catch (error) {
    console.error("Authentication error:", error);
    return new Response(
      null,
      {
        status: 302,
        headers: { location: "/login" },
      },
    );
  }
}
