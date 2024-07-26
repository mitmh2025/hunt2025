import React, { type ReactNode } from "react";
import type { TeamState } from "../../../lib/api/client.js";
import { lookupScripts, lookupStylesheets } from "../server/assets";

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
        {allScripts.map((s) => (
          <script key={s} type="text/javascript" src={s} />
        ))}
      </body>
    </html>
  );
};

export default Layout;
