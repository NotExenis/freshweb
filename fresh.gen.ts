// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_middleware from "./routes/_middleware.tsx";
import * as $admin_middleware from "./routes/admin/_middleware.tsx";
import * as $admin_dashboard_index from "./routes/admin/dashboard/index.tsx";
import * as $admin_panel_index from "./routes/admin/panel/index.tsx";
import * as $admin_users_index from "./routes/admin/users/index.tsx";
import * as $dashboard_index from "./routes/dashboard/index.tsx";
import * as $index from "./routes/index.tsx";
import * as $login_index from "./routes/login/index.tsx";
import * as $profile_index from "./routes/profile/index.tsx";
import * as $register_index from "./routes/register/index.tsx";
import * as $settings_index from "./routes/settings/index.tsx";
import * as $navbar from "./islands/navbar.tsx";
import * as $profile_icon from "./islands/profile_icon.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_middleware.tsx": $_middleware,
    "./routes/admin/_middleware.tsx": $admin_middleware,
    "./routes/admin/dashboard/index.tsx": $admin_dashboard_index,
    "./routes/admin/panel/index.tsx": $admin_panel_index,
    "./routes/admin/users/index.tsx": $admin_users_index,
    "./routes/dashboard/index.tsx": $dashboard_index,
    "./routes/index.tsx": $index,
    "./routes/login/index.tsx": $login_index,
    "./routes/profile/index.tsx": $profile_index,
    "./routes/register/index.tsx": $register_index,
    "./routes/settings/index.tsx": $settings_index,
  },
  islands: {
    "./islands/navbar.tsx": $navbar,
    "./islands/profile_icon.tsx": $profile_icon,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
