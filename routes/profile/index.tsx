import type { Handlers, PageProps } from "$fresh/server.ts";
import Navbar from "../../islands/navbar.tsx";
import { connect } from "../../private/db.ts";
import type { JwtClaims } from "../../utils/types/interfaces.ts";
import openProfile from "../../components/Button.tsx";

export const handler: Handlers<JwtClaims> = {
  async GET(_, ctx) {
    const userClaims = ctx.state.user as JwtClaims;
    const email = userClaims.email;
    const conn = await connect();
    const [user] = await conn.execute(
      "SELECT * FROM tbl_users WHERE user_email = ?",
      [email],
    );
    return ctx.render(ctx.state.user as JwtClaims);
  },
};

export default function (props: PageProps<JwtClaims>) {
  const userClaims = props.data; 

  async function userData(email: string) {
    const conn = await connect();
    const [users] = await conn.execute(
      "SELECT * FROM tbl_users WHERE user_email =?",
      [email],
    );
    return users;
  }

  const user = userData(userClaims?.email);
  console.log("user", user);
  return (
    <div>
      <Navbar {...props} />
      <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="md:col-span-1 p-2 m-2"></div>

          <div class="md:col-span-2 p-2 m-2">
            <div className="card card-side bg-base-100 shadow-xl">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                  alt="Movie"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Hey {userClaims?.name}!</h2>
                <p>Email: {userClaims?.email}</p> 
                <p>Your role: {userClaims?.role}</p>
                <div className="card-actions justify-end">
                  <button id="modalButton"className="btn btn-secondary btn-outline">
                    Edit profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="md:col-span-1 p-2 m-2"></div>
        </div>
      </div>
    </div>
  );
}
