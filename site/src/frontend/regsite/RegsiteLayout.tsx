import React from "react";
import { BaseLayout } from "../components/Layout";
import { lookupStylesheets } from "../server/assets";

export default function RegsiteLayout({
  innerHTML,
  stylesheets,
  styleElements,
  title,
}: {
  innerHTML: string;
  scripts?: string[];
  stylesheets?: string[];
  styleElements?: React.JSX.Element[];
  title?: string;
}) {
  const allStyles = [...lookupStylesheets("regsite"), ...(stylesheets ?? [])];

  return (
    <BaseLayout
      innerHTML={innerHTML}
      stylesheets={allStyles}
      styleElements={styleElements}
      title={title}
    />
  );
}
