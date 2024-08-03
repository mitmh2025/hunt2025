import React from "react";
import type { TeamState } from "../../../lib/api/client.js";
import { lookupScripts, lookupStylesheets } from "../server/assets";

function dedupedOrderedItems(scripts: string[]): string[] {
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
  innerHTML,
  scripts,
  stylesheets,
  styleElements,
  title,
  teamState,
}: {
  innerHTML: string;
  scripts?: string[];
  stylesheets?: string[];
  styleElements?: React.JSX.Element[];
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
        {dedupedOrderedItems(allStyles).map((s) => (
          <link key={s} rel="stylesheet" href={s} />
        ))}
        {styleElements}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: innerHTML }} />
        {dedupedOrderedItems(allScripts).map((s) => (
          <script key={s} type="text/javascript" src={s} />
        ))}
      </body>
    </html>
  );
};

export default Layout;
