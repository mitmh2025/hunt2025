import React, { Fragment, useLayoutEffect } from "react";
import { styled } from "styled-components";
import { type TeamHuntState } from "../../../../lib/api/client";
import { CourierFont } from "../../assets/SharedFonts";
import PuzzleLink from "../../components/PuzzleLink";
import { StrayLeadsFonts } from "./StrayLeadsFonts";
import Bg from "./assets/bg.jpg";
import PaperBg from "./assets/paper.png";
import PostitBg from "./assets/postit.png";
import { type StrayLeadsState } from "./types";

const TableScape = styled.div`
  background-image: url(${Bg});
  background-size: cover;
  background-repeat: no-repeat;
  width: min(var(--viewport-width), 1916px);
  min-height: min(var(--viewport-height), 1075px);
  margin: 0 auto;

  padding-bottom: 2rem;
`;

const ContentWrapper = styled.div`
  width: 714px;
  height: 903px;
  margin: 0 auto;
  position: relative;
  transform: scale(min(1, var(--viewport-width) / 714px));

  color: var(--black);
`;

const Paper = styled.main`
  background-image: url(${PaperBg});
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  padding: 2rem 72px 1rem 2rem;
  filter: drop-shadow(1px 2px 16px rgba(0, 0, 0, 0.53));

  display: flex;
  flex-direction: column;
  text-align: center;
  font-family: Courier, monospace;

  h1 {
    flex: 0;
    text-align: center;
    font-family: Courier, monospace;
    font-weight: 600;
    font-size: 2.2rem;
    margin: 1rem 0;
  }

  ul {
    flex: 1;
    padding: 0;
    list-style-type: none;
    width: 100%;
    margin: 0 auto;
    overflow-y: auto;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    li + li {
      margin-top: 1rem;
    }

    li .puzzle-link a,
    li a {
      color: var(--gold-900);
      text-decoration-color: var(--gold-800);

      &:hover {
        color: var(--gold-700);
        text-decoration-color: var(--gold-700);
      }
    }

    .filing {
      font-style: italic;
    }
  }

  p {
    flex: 0;
    color: var(--gray-600);
    text-align: center;
    margin-top: 1.5rem;
    padding: 0 2rem;
  }
`;

const Postit = styled.aside`
  background-image: url(${PostitBg});
  background-size: contain;
  width: 211px;
  height: 218px;
  position: absolute;
  top: 66px;
  left: -48px;
  transform: rotate(10deg);
  padding: 1rem 1.5rem 1rem 1rem;
  filter: drop-shadow(-1px 2px 3px rgba(0, 0, 0, 0.53));
  font-family: "Rock Salt";
  font-size: 0.9rem;

  p {
    margin: 0;
  }
  p + p {
    margin-top: 0.5rem;
  }

  .signature {
    text-align: right;
    font-size: 1.1rem;
  }
`;

function _calculateViewportDims() {
  document.documentElement.style.setProperty(
    "--viewport-width",
    `${document.documentElement.clientWidth}px`,
  );
  document.documentElement.style.setProperty(
    "--viewport-height",
    `${document.documentElement.clientHeight}px`,
  );
}

const StrayLeadsBody = ({
  state,
  teamState,
}: {
  state: StrayLeadsState;
  teamState: TeamHuntState;
}) => {
  useLayoutEffect(() => {
    window.addEventListener("resize", _calculateViewportDims, false);
    document.addEventListener(
      "DOMContentLoaded",
      _calculateViewportDims,
      false,
    );
    window.addEventListener("load", _calculateViewportDims);
    return () => {
      window.removeEventListener("resize", _calculateViewportDims, false);
      document.removeEventListener(
        "DOMContentLoaded",
        _calculateViewportDims,
        false,
      );
      window.removeEventListener("load", _calculateViewportDims);
    };
  }, []);
  const items = (
    <ul>
      {state.leads.map((lead) => {
        const puzzleState = teamState.puzzles[lead.slug];
        return (
          <li key={lead.slug}>
            <PuzzleLink
              lockState={puzzleState?.locked ?? "locked"}
              answer={puzzleState?.answer}
              currency={teamState.currency}
              title={lead.title}
              slug={lead.slug}
            />
            {/* <span className="filing">
              Filed under <a href="/rounds/stakeout">The Stakeout</a>
            </span> */}
          </li>
        );
      })}
    </ul>
  );
  return (
    <Fragment key="stray-leads">
      <StrayLeadsFonts />
      <CourierFont />
      <TableScape>
        <ContentWrapper>
          <Paper>
            <h1>Stray Leads</h1>
            {items}
            <p>
              These leads will be sorted once you open the investigation they
              belong to.
            </p>
          </Paper>
          <Postit>
            <p>I know these go somewhere...</p>
            <p>I just don’t know where they fit in the bigger picture yet.</p>
            <p className="signature">— Billie</p>
          </Postit>
        </ContentWrapper>
      </TableScape>
    </Fragment>
  );
};

export default StrayLeadsBody;
