import React from "react";
import LinkedImage from "../components/LinkedImage";
import {
  PageWrapper,
  PageHeader,
  PageTitle,
  PageMain,
} from "../components/PageLayout";
import invitePDF from "../puzzles/timely-head/assets/engagements-and-other-crimes.pdf";
import inviteFront from "../puzzles/timely-head/assets/invitation-front.svg";
import rootUrl from "../utils/rootUrl";

export function indexHandler() {
  const node = (
    <PageWrapper>
      <>
        <PageHeader>
          <PageTitle>
            2025 MIT Mystery Hunt: The Case of the Shadow Diamond
          </PageTitle>
        </PageHeader>
        <PageMain>
          <p>
            At the start of the 2025 MIT Mystery Hunt, MITropolis’s hottest
            event, the gala celebrating the engagement of Gladys Finster (heir
            apparent to the legitimate businesses of crime boss Robert “Papa”
            Finster) and Ferdinand Carter (scion of the Carter Brothers jewelry
            conglomerate) is interrupted when Carter’s latest acquisition, the
            storied <strong>Shadow Diamond</strong>, is discovered to be
            missing.
          </p>
          <p>
            Papa hires private eye Billie O’Ryan, of the Two P.I. Noir Detective
            Agency, who in turn recruits teams to join them and help find the
            diamond.
          </p>
          <h2>Prequel</h2>
          <p>
            In October,{" "}
            <strong>
              The Providence Crime Syndications and the MIT Puzzle Club
            </strong>{" "}
            ran an pre-hunt as an event for students. The{" "}
            <strong>
              <a href="/2025/heist/">MIT Mystery Heist</a>
            </strong>{" "}
            is a prequel to the story of The Case of the Shadow Diamond, where
            Papa organizes a bank robbery to steal a valuable rare coin.
          </p>
          <h2>Invite</h2>
          <p>
            At the beginning of January, teams (with a US mailing address)
            received an invitation in the mail from Papa to the Gala:
          </p>
          <p style={{ display: "flex", maxWidth: "500px", margin: "0 auto" }}>
            <LinkedImage
              src={inviteFront}
              alt="Invitation saying that Robert Finster cordially invites you to a Gala celebrating the engagement of his daughter Gladys Finster to Ferdinand Carter. Friday, January 17th, 2025, Twelve Noon, The Massachusetts Institute of Technology, Cambridge, Massachusetts. Suggested dress: cocktail attire"
              fullSizeURL={invitePDF}
            />
          </p>
          <h2>Kickoff</h2>
          <p>
            <strong>
              <a href="https://www.youtube.com/watch?v=cWPZ61YgY6s">
                Watch kickoff
              </a>
            </strong>{" "}
            on YouTube.
          </p>
          <p>
            The 2025 MIT Mystery Hunt was kicked off on Friday, January 17th at
            noon. It was presented in three different classrooms as a broadcast
            from the Finster-Carter engagement gala. When Carter goes to reveal
            the illustrious Shadow Diamond, it is discovered to be missing.
            Papa, father of the bride and MITropolis crime boss, hires Billie
            O’Ryan to find the diamond, starting by investigating those closest
            to it.
          </p>
          <h2>The Hunt</h2>
          <p>
            <strong>
              View the <a href="/2025/hunt/">Hunt website</a>
            </strong>{" "}
            as seen by teams.
          </p>
          <p>
            In typical noir fashion, while searching for the missing diamond,
            teams learn that the situation is far more complicated than it
            seemed on the surface. While four of characters are innocent of
            stealing the diamond, each has an unrelated dark secret of their own
            to uncover. The thief who stole the diamond turns up dead, and the
            diamond they had stolen turns out to be fake.
          </p>
          <p>
            After finding the thief’s killer and learning everyone’s secrets,
            Billie and teams had to break into the Finster family vault, after
            which they learned that someone unexpected had been behind the whole
            thing…
          </p>
          <h2>Winning Team</h2>
          <p>
            At 8:56 AM on Sunday, January 19th, <strong>Cardinality</strong>{" "}
            became the first team to solve their final major investigation. At
            12:17 PM they successfully broke into the Finster family vault and
            revealed the true mastermind behind the theft of the Shadow Diamond,
            making them the winners of the 2025 MIT Mystery Hunt. Unfortunately,
            they weren’t able to recover either the Shadow Diamond or the coin
            stolen by Papa, but instead they received a stash of surprisingly
            coin-like counterfeit jewelry manufactured by one of the characters.
          </p>
          <p>
            A video showing footage of Cardinality breaking into the vault and
            learning the dramatic end of the story is available on the page for{" "}
            <a href={`${rootUrl}/interactions/the_vault`}>The Vault</a>.
          </p>
          <p>
            Between when Cardinality finished and wrap-up, an additional 10
            teams (for 11 total) managed to finish the Hunt.
          </p>
          <h2>Wrap-Up</h2>
          <p>
            A wrap-up event for the Hunt was held at noon on Monday.{" "}
            <a href="https://www.youtube.com/watch?v=2qwjMkvlAyI">
              Watch the video
            </a>{" "}
            on YouTube.
          </p>
          <h2>Extras</h2>
          <p>
            The <a href={rootUrl}>Hunt website</a> allows you to re-play the
            2025 MIT Mystery Hunt with an in-browser re-implementation of the
            Hunt’s unlock structure. Experience the Hunt as teams did, or choose
            to unlock all puzzles to see all of the puzzles and content. We’ve
            also made at least minor — and occasionally significant —
            modifications to nearly 25% of the puzzles and interactions. We
            believe this should allow you to solve (or, in a few cases, at least
            experience) those puzzles which previously required physical
            components, in-person elements, or live staffing.
          </p>
          <p>
            We’ve also collated video footage taken during Hunt into recaps of{" "}
            <a href={`${rootUrl}/rounds/events`}>several of the events</a>,{" "}
            <a href={`${rootUrl}/interactions/the_vault`}>the finale</a>, and a
            few particularly dramatic puzzles such as{" "}
            <a href={`${rootUrl}/puzzles/control_room`}>Control Room</a> and{" "}
            <a href={`${rootUrl}/puzzles/in_communicado_tonight`}>
              In Communicado Tonight
            </a>
            .
          </p>
          <p>
            Outside of the Hunt website, we also have a few pages of bonus
            content, analysis, and behind-the-scenes coverage:
          </p>
          <ul>
            <li>
              <a href="/2025/extras/credits">Credits</a>
            </li>
            <li>
              <a href="/2025/extras/coin">Coin</a>: A detailed look at the
              design of our coin, highlighting some references and fun easter
              eggs.
            </li>
            <li>
              <a href="/2025/extras/music">Music</a>: Original music composed
              and arranged by the team which was featured in{" "}
              <a href="https://www.youtube.com/watch?v=cWPZ61YgY6s">Kickoff</a>,{" "}
              <a href={`${rootUrl}/interactions/the_vault`}>the finale</a>, and
              each of the in-person interactions following capstone super-metas.
            </li>
            <li>
              <a href="/2025/extras/radio">Radio</a>: Design, schematics, and
              firmware for the radio that each on-campus team received. (And
              while we are unable to broadcast the original WDNM 2π PM radio
              station, we have included some archival audio clips on the{" "}
              <a href={`${rootUrl}/virtual_radio`}>virtual radio</a> page.)
            </li>
            <li>
              <a href="/2025/extras/stats">Statistics</a>: Stastics from the
              Hunt, including the full activity log.
            </li>
            <li>
              <a href="/2025/extras/minigames">Minigames</a>: The{" "}
              <a href={`${rootUrl}/interactions/interview_at_the_boardwalk`}>
                Interview at the Boardwalk
              </a>{" "}
              featured three minigames that you had to play on Roger’s behalf.
              If you’d like to just play the games without the full interview,
              you can do so here.
            </li>
          </ul>
        </PageMain>
      </>
    </PageWrapper>
  );

  return {
    node,
    title: "2025 MIT Mystery Hunt: The Case of the Shadow Diamond",
  };
}
