import { type PageProps } from "$fresh/server.ts";
import type { JSX } from "preact/jsx-runtime";
import { JwtClaims } from "../utils/types/interfaces.ts";

type EnhancedPageProps = {
  Component: (props: JwtClaims) => JSX.Element;
  url: URL;
  props: PageProps<JwtClaims>;
};

export default function App({ props, Component, url }: EnhancedPageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Freshy</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="icon" type="image/x-icon" href="/images/ekremdied.png" />
      </head>
      <body class="dark:bg-slate-600 dark:text-white">
        <Component />
      </body>
    </html>
  );
}
