import { Link as MFNGLink } from "@mfng/core/client";
import React, { type ReactNode } from "react";

export default function Link({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return <MFNGLink to={{ pathname: href }}>{children}</MFNGLink>;
}
