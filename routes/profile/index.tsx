import type { Handlers, PageProps } from "$fresh/server.ts";
import Navbar from "../../islands/navbar.tsx";
import type { JwtClaims } from "../../utils/types/interfaces.ts";

export const handler: Handlers<JwtClaims> = {
  GET(_, ctx) {
    return ctx.render(ctx.state.user as JwtClaims);
  },
};

export default function UserPage(props: PageProps<JwtClaims>) {
  return (
    <div>
      <Navbar {...props} />
      <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="md:col-span-1">
          </div>

          <div class="md:col-span-2">
          </div>

          <div class="md:col-span-1">
          </div>
        </div>
      </div>
    </div>
  );
}
