/* eslint-disable jsx-a11y/media-has-caption -- audio transcripts are below */
import React from "react";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import archiveMode from "../../utils/archiveMode";
import rootUrl from "../../utils/rootUrl";
import { PuzzlingWordFromOurSponsors } from "./PuzzlingWordFromOurSponsors";
import ad_a from "./assets/quixotic-shoe-a.mp3";
import ad_b from "./assets/quixotic-shoe-b.mp3";
import ad_c from "./assets/quixotic-shoe-c.mp3";
import ad_d from "./assets/quixotic-shoe-d.mp3";
import ad_e from "./assets/quixotic-shoe-e.mp3";

const Puzzle = (): JSX.Element => {
  return (
    <>
      <noscript>This puzzle requires Javascript.</noscript>

      <AuthorsNoteBlock>
        <p>
          During the hunt, in lieu of this puzzle page unlocking, teams’ radios
          would spontaneously start playing ads between each song. This puzzle
          page would only be available one one of the subpuzzles was solved.
          {archiveMode &&
            " Note that the exact URLs in the ads may need to be adjusted for the archives; we’ve updated the links appropriately."}{" "}
          The ads are as follows:
        </p>
        <audio src={ad_a} controls />
        <details>
          <summary>Transcript</summary>
          <p>
            Terry:{" "}
            <span className="puzzle-flavor">
              I have some advertisers here who are very eager to talk to you.
              Let’s hear what they have to say.
            </span>
          </p>
          <p>
            Advertiser:{" "}
            <span className="puzzle-flavor">
              When you want restaurant-quality food without all the cooking and
              cleaning, look no further than Hell Fresh, the newest MITropolis
              meal delivery service. We’re sharing our recipes so you can get a
              taste of what we’re cooking up, like our Devilishly Good Bars.
              Print the recipe and bedevil your friends with these decadent
              bars. Just remember to include the secret ingredient (not included
              in your delivery). For a limited time, get 250 bonus
              MITropoliscard points when you go to{" "}
              <a href={`${rootUrl}/hellfresh`}>two-pi-noir.agency/hellfresh</a>{" "}
              and enter promo code [static] at checkout.
            </span>
          </p>
        </details>
        <audio src={ad_b} controls />
        <details>
          <summary>Transcript</summary>
          <p>
            Terry:{" "}
            <span className="puzzle-flavor">
              We’ll be right back after a word from our sponsors.
            </span>
          </p>
          <p>
            Advertiser:{" "}
            <span className="puzzle-flavor">
              Are you feeling down? In need of a pick-me-up? Here at
              BetterOprah, we’ve got you covered! With a subscription that drops
              the best inspirational quotes from your favorite TV personality,
              you’ll never miss another word! Go to{" "}
              <a href={`${rootUrl}/betteroprah`}>
                two-pi-noir.agency/betteroprah
              </a>{" "}
              and enter promo code [static] at checkout.
            </span>
          </p>
        </details>
        <audio src={ad_c} controls />
        <details>
          <summary>Transcript</summary>
          <p>
            Terry:{" "}
            <span className="puzzle-flavor">
              WDNM is brought to you by our sponsors, which means I occasionally
              need to let them get a word in edgewise.
            </span>
          </p>
          <p>
            Advertiser:{" "}
            <span className="puzzle-flavor">
              MITropolis can be a dangerous place, but the latest home security
              software from HardlySafe can protect you and your family. Our
              latest camera features all-new x-ray technology that sees through
              walls, ensuring every key area of your home is captured from
              multiple angles by two different cameras. And for a limited time,
              get 250 bonus MITropolisCard Points when you go to{" "}
              <a href={`${rootUrl}/hardlysafe`}>
                two-pi-noir.agency/hardlysafe
              </a>{" "}
              and enter promo code [static] at checkout.
            </span>
          </p>
        </details>
        <audio src={ad_d} controls />
        <details>
          <summary>Transcript</summary>
          <p>
            Terry:{" "}
            <span className="puzzle-flavor">
              We’re going to go to commercial. You’re probably going to go to
              the bathroom.
            </span>
          </p>
          <p>
            Advertiser:{" "}
            <span className="puzzle-flavor">
              At the end of a hard week of work in downtown MITropolis, when all
              you want to do is to unwind and have a couple cold ones,
              DraughtQueens has got you covered. We have six new house-brewed
              beers on tap, so you’re sure to find one you love, even if you end
              up spilling a drop of it. For a limited time only, you can get 250
              bonus MITropolisCard points when you go to{" "}
              <a href={`${rootUrl}/draughtqueens`}>
                two-pi-noir.agency/draughtqueens
              </a>{" "}
              and enter promo code [static] at checkout.
            </span>
          </p>
        </details>
        <audio src={ad_e} controls />
        <details>
          <summary>Transcript</summary>
          <p>
            Terry:{" "}
            <span className="puzzle-flavor">
              And now, a word from the folks who make WDNM possible—other than
              me, of course.
            </span>
          </p>
          <p>
            Advertiser:{" "}
            <span className="puzzle-flavor">
              You can sell things. Hidden talents. Your time. And much more. Our
              downtown TownSquareSpace is the bulletin board for everything you
              need to sell anything. And for a limited time, when you sign up
              you’ll get 250 MITropolis card points. Just go to{" "}
              <a href={`${rootUrl}/townsquarespace`}>
                two-pi-noir.agency/townsquarespace
              </a>{" "}
              and enter promo code [static] at checkout.
            </span>
          </p>
        </details>
      </AuthorsNoteBlock>

      <div id="and-now-a-puzzling-word-from-our-sponsors-root">
        <PuzzlingWordFromOurSponsors />
      </div>
    </>
  );
};

export default Puzzle;
/* eslint-enable jsx-a11y/media-has-caption -- re-enabling */
