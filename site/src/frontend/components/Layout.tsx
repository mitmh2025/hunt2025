import React from "react";
import type { TeamHuntState } from "../../../lib/api/client.js";
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

export const BaseLayout = ({
  innerHTML,
  scripts,
  stylesheets,
  styleElements,
  title,
}: {
  innerHTML: string;
  scripts?: string[];
  stylesheets?: string[];
  styleElements?: React.JSX.Element[];
  title?: string;
}) => {
  return (
    <html lang="en">
      <head>
        {title && <title>{title}</title>}
        {dedupedOrderedItems(stylesheets ?? []).map((s) => (
          <link key={s} rel="stylesheet" href={s} />
        ))}
        {styleElements}
        {process.env.NODE_ENV === "development" && (
          <script src="http://localhost:35729/livereload.js?snipver=1" />
        )}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: innerHTML }} />
        {dedupedOrderedItems(scripts ?? []).map((s) => (
          <script key={s} type="text/javascript" src={s} />
        ))}
      </body>
    </html>
  );
};

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
  teamState?: TeamHuntState;
}) => {
  const injectDevScript = process.env.NODE_ENV === "development" && !!teamState;
  const devScripts = injectDevScript ? lookupScripts("dev") : [];
  // Scripts are deduped by BaseLayout
  const allScripts = [
    ...lookupScripts("main"),
    ...(scripts ?? []),
    ...devScripts,
  ];

  const allStyles = [...lookupStylesheets("main"), ...(stylesheets ?? [])];

  return (
    <BaseLayout
      innerHTML={innerHTML}
      scripts={allScripts}
      stylesheets={allStyles}
      styleElements={styleElements}
      title={title}
    />
  );
};

export default Layout;
