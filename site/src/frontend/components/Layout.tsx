import React, { type ReactNode } from "react";
import type { TeamHuntState } from "../../../lib/api/client.js";
import AppleTouchIcon from "../../assets/apple-touch-icon.png";
import FaviconIco from "../../assets/favicon.ico";
import Favicon from "../../assets/favicon.svg";
import { lookupScripts, lookupStylesheets } from "../server/assets";
import archiveMode from "../utils/archiveMode.js";

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
  earlyScripts,
  stylesheets,
  styleElements,
  title,
  headElements,
}: {
  innerHTML: string;
  scripts?: string[];
  earlyScripts?: string[];
  stylesheets?: string[];
  styleElements?: React.JSX.Element[];
  headElements?: ReactNode[];
  title?: string;
}) => {
  const orderedStylesheets = dedupedOrderedItems(stylesheets ?? []);
  const orderedScripts = dedupedOrderedItems(scripts ?? []);
  const orderedEarlyScripts = dedupedOrderedItems(earlyScripts ?? []);
  return (
    <html lang="en">
      <head>
        {title && <title>{title}</title>}
        {orderedEarlyScripts.map((s) => (
          <script key={s} type="text/javascript" src={s} />
        ))}
        {orderedScripts.map((s) => (
          <link key={`preload-${s}`} rel="preload" href={s} as="script" />
        ))}
        {headElements}
        {orderedStylesheets.map((s) => (
          <link key={s} rel="stylesheet" href={s} />
        ))}
        {styleElements}
        {process.env.NODE_ENV === "development" && !archiveMode && (
          <script src="http://localhost:35729/livereload.js?snipver=1" />
        )}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: innerHTML }} />
        {orderedScripts.map((s) => (
          <script key={s} type="text/javascript" src={s} defer />
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
  extraHeadElements,
  title,
  teamState,
}: {
  innerHTML: string;
  scripts?: string[];
  stylesheets?: string[];
  styleElements?: React.JSX.Element[];
  extraHeadElements?: React.JSX.Element[];
  title?: string;
  teamState?: TeamHuntState;
}) => {
  const injectDevScript =
    process.env.NODE_ENV === "development" && !archiveMode && !!teamState;
  const devScripts = injectDevScript ? lookupScripts("dev") : [];
  // Scripts are deduped by BaseLayout
  const allScripts = [
    ...lookupScripts("main"),
    ...(scripts ?? []),
    ...devScripts,
  ];
  const earlyScripts = archiveMode
    ? lookupScripts("archive_flash_prevention")
    : [];

  const allStyles = [...lookupStylesheets("main"), ...(stylesheets ?? [])];

  const headElements: ReactNode[] = [
    ...(extraHeadElements ?? []),
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
      earlyScripts={earlyScripts}
      stylesheets={allStyles}
      styleElements={styleElements}
      headElements={headElements}
      title={title}
    />
  );
};

export default Layout;
