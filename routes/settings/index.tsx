import type { Handlers, PageProps } from "$fresh/server.ts";
import Navbar from "../../islands/navbar.tsx";
import type { JwtClaims } from "../../utils/types/interfaces.ts";

export const handler: Handlers<JwtClaims> = {
  GET(_, ctx) {
    return ctx.render(ctx.state.user as JwtClaims);
  },
};

export default function Settings(props: PageProps<JwtClaims>) {
  return (
    <div>
      <Navbar {...props} />
    </div>
  );
}
