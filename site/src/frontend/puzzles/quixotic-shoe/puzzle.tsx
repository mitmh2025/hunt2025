import React from "react";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import { PuzzlingWordFromOurSponsors } from "./PuzzlingWordFromOurSponsors";

const Puzzle = (): JSX.Element => {
  return (
    <>
      <noscript>This puzzle requires Javascript.</noscript>

      <AuthorsNoteBlock>
        <p>
          During the hunt, in lieu of this puzzle page unlocking, teams’ radios
          would spontaneously start playing ads between each song. This puzzle
          page would only be available one one of the subpuzzles was solved. The
          ads are as follows:
        </p>
        <p className="puzzle-flavor">
          When you want restaurant-quality food without all the cooking and
          cleaning, look no further than Hell Fresh, the newest MITropolis meal
          delivery service. We’re sharing our recipes so you can get a taste of
          what we’re cooking up, like our Devilishly Good Bars. Print the recipe
          and bedevil your friends with these decadent bars. Just remember to
          include the secret ingredient (not included in your delivery). For a
          limited time, get 250 bonus MITropoliscard points when you go to
          two-pi-noir.agency/hellfresh and enter promo code [static] at
          checkout.
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
          ensuring every key area of your home is captured from multiple angles
          by two different cameras. And for a limited time, get 250 bonus
          MITropolisCard Points when you go to two-pi-noir.agency/hardlysafe and
          enter promo code [static] at checkout.
        </p>
        <p className="puzzle-flavor">
          At the end of a hard week of work in downtown MITropolis, when all you
          want to do is to unwind and have a couple cold ones, DraughtQueens has
          got you covered. We have six new house-brewed beers on tap, so you’re
          sure to find one you love, even if you end up spilling a drop of it.
          For a limited time only, you can get 250 bonus MITropolisCard points
          when you go to two-pi-noir.agency/draughtqueens and enter promo code
          [static] at checkout.
        </p>
        <p className="puzzle-flavor">
          You can sell things. Hidden talents. Your time. And much more. Our
          downtown TownSquareSpace is the bulletin board for everything you need
          to sell anything. And for a limited time, when you sign up you’ll get
          250 MITropolis card points. Just go to
          two-pi-noir.agency/townsquarespace and enter promo code [static] at
          checkout.
        </p>
      </AuthorsNoteBlock>

      <div id="and-now-a-puzzling-word-from-our-sponsors-root">
        <PuzzlingWordFromOurSponsors />
      </div>
    </>
  );
};

export default Puzzle;
