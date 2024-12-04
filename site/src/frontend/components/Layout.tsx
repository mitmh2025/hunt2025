import React, { type ReactNode } from "react";
import type { TeamHuntState } from "../../../lib/api/client.js";
import AppleTouchIcon from "../../assets/apple-touch-icon.png";
import FaviconIco from "../../assets/favicon.ico";
import Favicon from "../../assets/favicon.svg";
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
  headElements,
}: {
  innerHTML: string;
  scripts?: string[];
  stylesheets?: string[];
  styleElements?: React.JSX.Element[];
  headElements?: ReactNode[];
  title?: string;
}) => {
  return (
    <html lang="en">
      <head>
        {title && <title>{title}</title>}
        {headElements}
        {dedupedOrderedItems(stylesheets ?? []).map((s) => (
          <link key={s} rel="stylesheet" href={s} />
        ))}
        {styleElements}
        {process.env.NODE_ENV === "development" && (
          <script src="http://localhost:35729/livereload.js?snipver=1" />
        )}
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

  const headElements: ReactNode[] = [
    <link key="favicon-ico" rel="icon" href={FaviconIco} sizes="48x48" />,
    <link
      key="favicon-svg"
      rel="icon"
      href={Favicon}
      sizes="any"
      type="image/svg+xml"
    />,
    <link key="favicon-apple" rel="apple-touch-icon" href={AppleTouchIcon} />,
  ];

  return (
    <BaseLayout
      innerHTML={innerHTML}
      scripts={allScripts}
      stylesheets={allStyles}
      styleElements={styleElements}
      headElements={headElements}
      title={title}
    />
  );
};

export default Layout;
