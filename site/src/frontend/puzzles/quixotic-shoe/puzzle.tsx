import React from "react";
import type { TeamHuntState } from "../../../../lib/api/client";
import { type PuzzleStateLogEntry } from "../../../../lib/api/frontend_contract";
import teamIsImmutable from "../../../utils/teamIsImmutable";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import { PuzzlingWordFromOurSponsors } from "./PuzzlingWordFromOurSponsors";

const Puzzle = ({
  teamState,
  puzzleStateLog,
  teamUsername,
}: {
  teamState: TeamHuntState;
  puzzleStateLog?: PuzzleStateLogEntry[];
  teamUsername: string;
}): JSX.Element => {
  const inlineScript = `window.initialTeamState = ${JSON.stringify(teamState)};`;
  return (
    <>
      <noscript>This puzzle requires Javascript.</noscript>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />

      {teamIsImmutable(teamUsername) ? (
        <AuthorsNoteBlock>
          <p>
            This puzzle is not yet fully solvable by the the public access team.
            We are working on archival version of as much of the hunt as
            possible.
          </p>
          <p>
            However, this puzzle does have 5 sub-puzzles that we think are
            pretty fun on their own, and <em>are</em> solvable by the public
            access team.
          </p>
          <p>
            During the hunt, teams’ radios would spontaneously start playing ads
            between each song. The ads are as follows:
          </p>
          <p className="puzzle-flavor">
            When you want restaurant-quality food without all the cooking and
            cleaning, look no further than Hell Fresh, the newest MITropolis
            meal delivery service. We’re sharing our recipes so you can get a
            taste of what we’re cooking up, like our Devilishly Good Bars. Print
            the recipe and bedevil your friends with these decadent bars. Just
            remember to include the secret ingredient (not included in your
            delivery). For a limited time, get 250 bonus MITropoliscard points
            when you go to two-pi-noir.agency/hellfresh and enter promo code
            [static] at checkout.
          </p>
          <p className="puzzle-flavor">
            Are you feeling down? In need of a pick-me-up? Here at BetterOprah,
            we’ve got you covered! With a subscription that drops the best
            inspirational quotes from your favorite TV personality, you’ll never
            miss another word! Go to two-pi-noir.agency/betteroprah and enter
            promo code [static] at checkout.
          </p>
          <p className="puzzle-flavor">
            MITropolis can be a dangerous place, but the latest home security
            software from HardlySafe can protect you and your family. Our latest
            camera features all-new x-ray technology that sees through walls,
            ensuring every key area of your home is captured from multiple
            angles by two different cameras. And for a limited time, get 250
            bonus MITropolisCard Points when you go to
            two-pi-noir.agency/hardlysafe and enter promo code [static] at
            checkout.
          </p>
          <p className="puzzle-flavor">
            At the end of a hard week of work in downtown MITropolis, when all
            you want to do is to unwind and have a couple cold ones,
            DraughtQueens has got you covered. We have six new house-brewed
            beers on tap, so you’re sure to find one you love, even if you end
            up spilling a drop of it. For a limited time only, you can get 250
            bonus MITropolisCard points when you go to
            two-pi-noir.agency/draughtqueens and enter promo code [static] at
            checkout.
          </p>
          <p className="puzzle-flavor">
            You can sell things. Hidden talents. Your time. And much more. Our
            downtown TownSquareSpace is the bulletin board for everything you
            need to sell anything. And for a limited time, when you sign up
            you’ll get 250 MITropolis card points. Just go to
            two-pi-noir.agency/townsquarespace and enter promo code [static] at
            checkout.
          </p>
        </AuthorsNoteBlock>
      ) : (
        <div id="and-now-a-puzzling-word-from-our-sponsors-root">
          <PuzzlingWordFromOurSponsors
            teamState={teamState}
            puzzleStateLog={puzzleStateLog ?? []}
          />
        </div>
      )}
    </>
  );
};

export default Puzzle;
