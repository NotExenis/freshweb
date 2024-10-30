import { type PageProps } from "$fresh/server.ts";
import Navbar from "../islands/navbar.tsx";
type EnhancedPageProps = PageProps & {
  req: Request;
};

export default function App({ Component }: EnhancedPageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Exenis Web</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="icon" type="image/x-icon" href="/images/ekremdied.png" />
      </head>
      <body class="dark:bg-slate-600 dark:text-white">
        <Navbar />
        <Component />
      </body>
    </html>
  );
}
