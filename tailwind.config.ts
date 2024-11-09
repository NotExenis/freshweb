import { type Config } from "tailwindcss";
import daisyUI from "daisyui";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  plugins: [
    daisyUI as any,
  ],
  daisyui: {
    themes: [
      "forest",
    ],
  },
} satisfies Config;
