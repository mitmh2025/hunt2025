import React, { Fragment, useEffect } from "react";
import { styled } from "styled-components";
import { type TeamHuntState } from "../../../../lib/api/client";
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
  padding: 2rem;
  padding-right: 48px;
  filter: drop-shadow(1px 2px 16px rgba(0, 0, 0, 0.53));

  display: flex;
  flex-direction: column;
  text-align: center;

  h1 {
    flex: 0;
    text-align: center;
    font-family: "Rock Salt";
    font-size: 2.2rem;
    margin: 2rem 0;
  }

  ul {
    flex: 1;
    padding: 0;
    list-style-type: none;
    max-width: 480px;
    margin: 0 auto;

    li {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
    }

    li .puzzle-link a,
    li a {
      color: var(--gray-900);
      text-decoration-color: var(--gray-800);

      &:hover {
        color: black;
        text-decoration-color: black;
      }
    }
  }

  p {
    flex: 0;
    color: var(--gray-600);
    text-align: center;
  }
`;

const Postit = styled.aside`
  background-image: url(${PostitBg});
  background-size: contain;
  width: 264px;
  height: 273px;
  position: absolute;
  top: 66px;
  left: -48px;
  transform: rotate(10deg);
  padding: 1.5rem;
  filter: drop-shadow(-1px 2px 3px rgba(0, 0, 0, 0.53));
  font-family: "Rock Salt";
  font-size: 1.1rem;

  p {
    margin: 0;
  }
  p + p {
    margin-top: 0.5rem;
  }

  .signature {
    text-align: right;
    font-size: 1.2rem;
  }
`;

const StrayLeadsBody = ({
  state,
  teamState,
}: {
  state: StrayLeadsState;
  teamState: TeamHuntState;
}) => {
  useEffect(() => {
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

    // recalculate on resize
    window.addEventListener("resize", _calculateViewportDims, false);
    // recalculate on dom load
    document.addEventListener(
      "DOMContentLoaded",
      _calculateViewportDims,
      false,
    );
    // recalculate on load (assets loaded as well)
    window.addEventListener("load", _calculateViewportDims);
  });
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
              size={16}
            />
            {/* <span>
              (<a href="/">sorted!</a>)
            </span> */}
          </li>
        );
      })}
    </ul>
  );
  return (
    <Fragment key="stray-leads">
      <StrayLeadsFonts />
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
