import React, { type ReactNode } from "react";
import type { TeamState } from "../../../lib/api/client.js";
import { lookupScripts, lookupStylesheets } from "../server/assets";

function dedupedOrderedScripts(scripts: string[]): string[] {
  // Dedupe included scripts.  We only need to load each chunk once.
  const deduped: string[] = [];
  const seen = new Set<string>();
  scripts.forEach((script) => {
    if (!seen.has(script)) {
      deduped.push(script);
      seen.add(script);
    }
  });
  return deduped;
}

const Layout = ({
  children,
  scripts,
  stylesheets,
  title,
  teamState,
}: {
  children: ReactNode;
  scripts?: string[];
  stylesheets?: string[];
  title?: string;
  teamState?: TeamState;
}) => {
  const injectDevScript = process.env.NODE_ENV === "development" && !!teamState;
  const devScripts = injectDevScript ? lookupScripts("dev") : [];
  // Scripts need to be deduped
  const allScripts = [
    ...lookupScripts("main"),
    ...(scripts ?? []),
    ...devScripts,
  ];
  const allStyles = [...lookupStylesheets("main"), ...(stylesheets ?? [])];

  return (
    <html lang="en">
      <head>
        {title && <title>{title}</title>}
        {allStyles.map((s) => (
          <link key={s} rel="stylesheet" href={s} />
        ))}
      </head>
      <body>
        <div id="root">{children}</div>
        {dedupedOrderedScripts(allScripts).map((s) => (
          <script key={s} type="text/javascript" src={s} />
        ))}
      </body>
    </html>
  );
};

export default Layout;
