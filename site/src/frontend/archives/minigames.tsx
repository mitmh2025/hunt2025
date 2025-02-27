import React from "react";
import {
  PageHeader,
  PageMain,
  PageTitle,
  PageWrapper,
} from "../components/PageLayout";
import MinigamesHub from "../components/minigames/MinigamesHub";

export function minigamesHandler() {
  const node = (
    <PageWrapper>
      <>
        <PageHeader>
          <PageTitle>Minigames Archive</PageTitle>
        </PageHeader>
        <PageMain>
          <p>
            <a href={`/2025/`}>← Back home</a>
          </p>

          <div id="minigames-root">
            <MinigamesHub />
          </div>
        </PageMain>
      </>
    </PageWrapper>
  );

  return {
    node,
    entrypoints: ["minigames" as const],
    title: "Minigames Archive",
  };
}
