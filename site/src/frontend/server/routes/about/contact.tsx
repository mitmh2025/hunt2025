import { type Request } from "express";
import React from "react";
import { wrapContentWithNavBar } from "../../../components/ContentWithNavBar";
import {
  PageWrapper,
  PageHeader,
  PageTitle,
  PageMain,
} from "../../../components/PageLayout";
import { AuthorsNoteBlock } from "../../../components/PuzzleLayout";

export function contactHandler(req: Request) {
  const teamState = req.teamState;
  if (teamState === undefined) return undefined;

  const node = (
    <PageWrapper>
      <>
        <PageHeader>
          <PageTitle>Contact HQ</PageTitle>
        </PageHeader>
        <PageMain>
          {teamState.state.gates_satisfied.includes("solutions_released") ? (
            <AuthorsNoteBlock style={{ margin: "5em auto", maxWidth: "400px" }}>
              HQ is no longer contactable.
            </AuthorsNoteBlock>
          ) : (
            <>
              <p>
                There are lots of great reasons to visit or contact us—if a
                puzzle instructs you to, if you think there is an erratum or
                technical issue, if you are not having fun and want extra help,
                or if you just want to say hi!
              </p>
              <p>
                If you need to reach out, the easiest option is to visit us at
                the Gala bar. The bar staff can direct any questions to the
                right people. The second best option is email, at{" "}
                <a
                  href="mailto:info@mitmh2025.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  info@mitmh2025.com
                </a>
                . In an urgent situation, you can also call us at 617-324-7732.
              </p>
              <p>
                The Gala is located in the Stata Center 4th Floor R&amp;D
                Commons. Detailed instructions for accessing Stata and the Gala
                can be found <a href="/about#the-gala">here</a>.
              </p>
            </>
          )}
        </PageMain>
      </>
    </PageWrapper>
  );

  return wrapContentWithNavBar(
    {
      node,
      title: "Contact HQ",
    },
    teamState,
  );
}
