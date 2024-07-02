import React, { type ReactNode } from "react";
import type { TeamState } from "../../../lib/api/client.js";
import { lookupScripts, lookupStylesheets } from "../server/assets";
import DevPane from "./DevPane";

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
  const allScripts = [...lookupScripts("main"), ...(scripts ?? [])];
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            justifyContent: "stretch",
          }}
        >
          <div style={{ flex: 1 }}>{children}</div>
          <DevPane teamState={teamState} />
        </div>
        {allScripts.map((s) => (
          <script key={s} type="text/javascript" src={s} />
        ))}
      </body>
    </html>
  );
};

export default Layout;
