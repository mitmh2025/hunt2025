import React from "react";
import {
  PageWrapper,
  PageHeader,
  PageTitle,
  PageMain,
} from "../components/PageLayout";

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
            At the start of the 2025 MIT Mystery Hunt, the gala celebrating the
            engagement of Gladys Finster (heir apparent to the legitimate
            businesses of crime boss Robert “Papa” Finster) and Ferdinand Carter
            (scion of the Carter Brothers jewelry conglomerate) is interrupted
            when Carter’s latest acquisition, the storied Shadow Diamond, is
            discovered to be missing.
          </p>

          <p>
            Papa hires private eye Billie O’Ryan, who in turn recruits teams to
            join their newly formed Billie O’Ryan Detective Academy and help
            find the diamond.
          </p>

          <h2>Prequel</h2>

          <p>
            In October, The Providence Crime Syndications and the MIT Puzzle
            Club ran an pre-hunt as an event for students. The{" "}
            <a href="heist/">MIT Mystery Heist</a> is a prequel to the story of
            The Case of the Shadow Diamond, where Papa organizes a bank robbery
            to steal a valuable rare coin.
          </p>

          <h2>Kickoff</h2>

          <p>
            The 2025 MIT Mystery Hunt was kicked off on Friday, January 17th at
            noon. It was presented in three different classrooms as a broadcast
            from the Finster-Carter engagement gala. When Carter goes to reveal
            the illustrious Shadow Diamond, it is discovered to be missing.
            Papa, father of the bride and MITropolis crime boss, hires Billie
            O’Ryan to find the diamond, starting by investigating those closest
            to it.
          </p>

          <p>
            <a href="https://www.youtube.com/watch?v=cWPZ61YgY6s">
              Watch kickoff
            </a>{" "}
            on YouTube.
          </p>

          <h2>The Hunt</h2>

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

          <p>
            View the <a href="hunt/">Hunt website</a> as seen by teams.
          </p>

          <h2>Winning Team</h2>

          <p>
            At 8:56 AM on Sunday, January 19th, Cardinality became the first
            team to solve each of the rounds. At 12:17 PM they successfully
            broke into the Finster family vault and revealed the true mastermind
            behind the theft of the Shadow Diamond, making them the winners of
            the 2025 MIT Mystery Hunt. Unfortunately, they weren’t able to
            recover either the Shadow Diamond or the coin stolen by Papa, but
            instead they received a stash of surprisingly coin-like counterfeit
            jewelry manufactured by one of the characters.
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

          <ul>
            <li>
              <a href="extras/stats">Statistics</a>: Stastics from the Hunt,
              including the full activity log.
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
