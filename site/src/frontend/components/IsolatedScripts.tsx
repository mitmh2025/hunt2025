"use client";

import React, { useEffect, useState } from "react";

export default function IsolatedScripts({ scripts }: { scripts: string[] }) {
  // This pattern comes from https://react.dev/reference/react-dom/client/hydrateRoot#handling-different-client-and-server-content
  // By delaying the script tag until the main tree has been hydrated, we ensure that React won't care about new elements being created.
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient &&
        scripts.map((s) => (
          <script key={s} type="text/javascript" src={s} async={true} />
        ))}
    </>
  );
}
