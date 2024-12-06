import type { Handlers, PageProps } from "$fresh/server.ts";
import type { JwtClaims } from "../../../utils/types/interfaces.ts";
import Navbar from "../../../islands/navbar.tsx";

export const handler: Handlers<JwtClaims> = {
  GET(_, ctx) {
    return ctx.render(ctx.state.user as JwtClaims);
  },
};

export default function Userspage(props: PageProps<JwtClaims>) {
  return (
    <div>
      <Navbar {...props} />
      hi
    </div>
  );
}
