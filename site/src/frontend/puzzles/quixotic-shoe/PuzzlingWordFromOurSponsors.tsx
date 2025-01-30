import React, { useState } from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import { Button, PuzzleAnswer } from "../../components/StyledUI";
import { deviceMax } from "../../utils/breakpoints";
import rootUrl from "../../utils/rootUrl";
import beef from "./assets/beef.png";
import cartel from "./assets/cartel.png";
import hotwings from "./assets/hotwings.png";
import image from "./assets/image.png";
import martini from "./assets/martini.jpg";
import move from "./assets/move.png";

const Wrapper = styled.div`
  font-family: "Arial", "Helvetica Neue", Helvetica, sans-serif;
  color: var(--true-black);
  background: var(--true-white);
  padding: 1.5rem;

  h2,
  h3 {
    font-family: "Arial", "Helvetica Neue", Helvetica, sans-serif;
  }

  h3 {
    font-weight: 600;
    font-size: 1.8rem;
  }

  section:last-child {
    width: 100%;
    overflow-x: auto;
    background-color: var(--true-white);
  }

  section + section {
    margin-top: 1rem;
  }
`;

const Header = styled.h2`
  text-align: center;
  font-size: 3rem;
  font-weight: 300;
  border-radius: 0.5rem;
  border: 2px solid #7b8895;
  background-color: #d6dde5;
`;

const FeatureTable = styled.table`
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;

  tr.subscription-titles {
    background-color: #e6efe9;
    font-size: 1.5rem;

    th {
      font-weight: 900;
    }
  }

  td,
  th {
    width: 160px;
    padding: 1rem;
    text-align: center;
  }

  .buttons {
    font-size: 1.5rem;

    span {
      font-weight: 600;
    }
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    background-color: #beecc9;
    border-color: #289542;
    border-width: 2px;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      background-color: #71e08b;
      margin-top: -2px;
      border-bottom-width: 4px;
    }
  }

  .blurbs {
    font-style: italic;
  }

  th.active,
  td.active {
    background-color: #ffff0066;
  }

  th.feature {
    width: 120px;
  }
`;

const SubpuzzleLinkWrapper = styled.a`
  margin-bottom: 0.5rem;
  border: 4px solid #7b8895;
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;

  text-decoration: none;

  .main-promo-contents {
    display: flex;
    align-items: center;
    width: 100%;
  }

  span.subpuzzle-name {
    flex: 1;
    font-size: 1.5rem;
    font-weight: 800;
  }

  &:hover {
    background-color: #007bff33;
    border-color: #055296;

    span {
      color: var(--true-black);
    }

    span.subpuzzle-name {
      color: #001c8b;
    }
  }

  @media ${deviceMax.xs} {
    img {
      width: 100%;
    }
  }
`;

const SubpuzzleLink = ({
  answer,
  title,
  slug,
  solved,
  children,
}: {
  answer?: string;
  title: string;
  slug: string;
  solved?: boolean;
  children?: React.ReactNode;
}): JSX.Element => {
  return (
    <SubpuzzleLinkWrapper href={`${rootUrl}/${slug}`}>
      <div className="main-promo-contents">
        <span className="subpuzzle-name">
          <span>{answer ?? solved ? "✔️ " : "➕ "}</span>
          {title}
        </span>
        {answer && (
          <span>
            (Solved! <PuzzleAnswer>{answer}</PuzzleAnswer>){" "}
          </span>
        )}
      </div>
      {children}
    </SubpuzzleLinkWrapper>
  );
};

export const PuzzlingWordFromOurSponsors = (): JSX.Element => {
  const [pickupComplete, setPickupComplete] = useState(false);

  const sortedSubpuzzleData = [
    {
      subpuzzle_slug: "hellfresh",
      subpuzzle_name: "HellFresh",
      answer: "HOTWINGS",
      image: hotwings,
      color: "red",
    },
    {
      subpuzzle_slug: "betteroprah",
      subpuzzle_name: "BetterOprah",
      answer: "MOVE",
      image: move,
      color: "orange",
    },
    {
      subpuzzle_slug: "hardlysafe",
      subpuzzle_name: "HardlySafe",
      answer: "IMAGE",
      image,
      color: "green",
    },
    {
      subpuzzle_slug: "draughtqueens",
      subpuzzle_name: "DraughtQueens",
      answer: "CARTEL",
      image: cartel,
      color: "blue",
    },
    {
      subpuzzle_slug: "townsquarespace",
      subpuzzle_name: "TownSquareSpace",
      answer: "BEEF",
      image: beef,
      color: "pink",
    },
  ];

  return (
    <Wrapper>
      <Header>MITropolisCard Rewards™️ Portal</Header>
      <AuthorsNoteBlock style={{ marginTop: "1rem" }}>
        <p>
          After solving all five subpuzzles, teams were instructed to visit the
          bar to redeem their 1,250 bonus MITropolisCard points for a martini.
          Click below to proceed once you’ve solved all five subpuzzles.
        </p>
        <p>
          <Button
            onClick={() => {
              setPickupComplete(true);
            }}
          >
            Pick up martini
          </Button>
        </p>
      </AuthorsNoteBlock>
      {pickupComplete && (
        <section>
          <h3>Martini Reward</h3>
          <AuthorsNoteBlock>
            <p>
              Teams went to the bar, were the bartender offered them a “very
              dry” martini. The batender produced a shaker and martini glass,
              shook the shaker, and poured out 34 colored scrabble tiles into
              the glass.
            </p>
            <LinkedImage
              src={martini}
              alt="A set of 34 scrabble tiles. Red ones read TYRT. Orange ones read EEFGNORSSV. Green ones read BELEIET. Blue ones read CEEGIMORST. Pink ones read WHE."
            />
          </AuthorsNoteBlock>
          <p className="puzzle-flavor">
            It looks like a few ingredients are missing from both your martini
            and the promo codes…
          </p>
          {sortedSubpuzzleData.map(
            ({ subpuzzle_name, subpuzzle_slug, color, answer, image }) => {
              if (answer) {
                return (
                  <SubpuzzleLink
                    key={`tiled-${subpuzzle_name}`}
                    title={subpuzzle_name}
                    slug={subpuzzle_slug}
                    solved={true}
                  >
                    <img
                      src={image}
                      alt={`A rack of wooden tiles with ${color} letters on them reading ${answer}.`}
                    />
                  </SubpuzzleLink>
                );
              }
              return null;
            },
          )}
        </section>
      )}

      <section>
        <h3>Your Subscription</h3>
        <p>
          Changes to your subscriptions can take 5–10 minutes to take effect.
        </p>
        <AuthorsNoteBlock>
          During the hunt, teams could use this section to control the frequency
          of advertisement on their radios.
        </AuthorsNoteBlock>
        <FeatureTable>
          <tbody>
            <tr>
              <th className="feature"></th>
              <td></td>
              <td className="active"></td>
              <td></td>
            </tr>
            <tr className="subscription-titles">
              <th></th>
              <th>Mystery Hunt Minus™️</th>
              <th className="active">Mystery Hunt™️</th>
              <th>Mystery Hunt Plus™️</th>
            </tr>
            <tr className="buttons">
              <th></th>
              <td>
                <button>Activate</button>
              </td>
              <td className="active">
                <span>Active</span>
              </td>
              <td>
                <button>Activate</button>
              </td>
            </tr>
            <tr className="blurbs">
              <th></th>
              <td>
                More of your favorite advertisements, now free from distracting
                radio content!
              </td>
              <td className="active">
                A classic mix of radio content and advertisements!
              </td>
              <td>
                More of your favorite radio content, now free from distracting
                advertisements!
              </td>
            </tr>
            <tr>
              <th className="feature">Music</th>
              <td>❌</td>
              <td className="active">✅</td>
              <td>✅</td>
            </tr>
            <tr>
              <th className="feature">Ads</th>
              <td>✅</td>
              <td className="active">✅</td>
              <td>❌</td>
            </tr>
            <tr>
              <th className="feature">Money-back guarantee</th>
              <td>✅</td>
              <td className="active">✅</td>
              <td>✅</td>
            </tr>
            <tr>
              <th></th>
              <td></td> <td className="active"></td>
              <td></td>
            </tr>
          </tbody>
        </FeatureTable>
      </section>
    </Wrapper>
  );
};
