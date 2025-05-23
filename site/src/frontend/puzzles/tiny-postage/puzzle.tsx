import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import { Errata } from "../../components/StyledUI";
import alchemist1Thumb from "./assets/alchemist1-thumbnail.jpg";
import alchemist1 from "./assets/alchemist1.jpg";
import alchemist2Thumb from "./assets/alchemist2-thumbnail.jpg";
import alchemist2 from "./assets/alchemist2.jpg";
import alchemist3Thumb from "./assets/alchemist3-thumbnail.jpg";
import alchemist3 from "./assets/alchemist3.jpg";
import alchemist4Thumb from "./assets/alchemist4-thumbnail.jpg";
import alchemist4 from "./assets/alchemist4.jpg";
import alchemist5Thumb from "./assets/alchemist5-thumbnail.jpg";
import alchemist5 from "./assets/alchemist5.jpg";
import alchemist6Thumb from "./assets/alchemist6-thumbnail.jpg";
import alchemist6 from "./assets/alchemist6.jpg";
import alchemist7Thumb from "./assets/alchemist7-thumbnail.jpg";
import alchemist7 from "./assets/alchemist7.jpg";
import alchemist8Thumb from "./assets/alchemist8-thumbnail.jpg";
import alchemist8 from "./assets/alchemist8.jpg";
import blacklight from "./assets/blacklight.jpg";
import cigarettes1 from "./assets/cigarettes1.jpg";
import cigarettes2 from "./assets/cigarettes2.jpg";
import edgertonZoom01 from "./assets/edgerton-zoom01.jpg";
import edgertonZoom02 from "./assets/edgerton-zoom02.jpg";
import edgertonZoom03 from "./assets/edgerton-zoom03.jpg";
import edgertonZoom04 from "./assets/edgerton-zoom04.jpg";
import edgertonZoom05 from "./assets/edgerton-zoom05.jpg";
import edgertonZoom06 from "./assets/edgerton-zoom06.jpg";
import edgertonZoom07 from "./assets/edgerton-zoom07.jpg";
import edgertonZoom08 from "./assets/edgerton-zoom08.jpg";
import edgertonZoom09 from "./assets/edgerton-zoom09.jpg";
import edgertonZoom10 from "./assets/edgerton-zoom10.jpg";
import edgertonZoom11 from "./assets/edgerton-zoom11.jpg";
import edgertonZoom12 from "./assets/edgerton-zoom12.jpg";
import edgertonZoom13 from "./assets/edgerton-zoom13.jpg";
import edgertonZoom14 from "./assets/edgerton-zoom14.jpg";
import edgertonZoom15 from "./assets/edgerton-zoom15.jpg";
import edgertonZoom16 from "./assets/edgerton-zoom16.jpg";
import edgerton from "./assets/edgerton.jpg";
import memorial from "./assets/memorial.jpg";
import poet01 from "./assets/poet01.jpg";
import poet02 from "./assets/poet02.jpg";
import poet03 from "./assets/poet03.jpg";
import poet04 from "./assets/poet04.jpg";
import poet05 from "./assets/poet05.jpg";
import poet06 from "./assets/poet06.jpg";
import poet07 from "./assets/poet07.jpg";
import poet08 from "./assets/poet08.jpg";
import poet09 from "./assets/poet09.jpg";
import poet10 from "./assets/poet10.jpg";
import poet11 from "./assets/poet11.jpg";
import puzzles from "./assets/puzzles.pdf";
import tissue from "./assets/tissue.pdf";

const FlexWithMargin = styled.div`
  display: flex;
  margin: 1em 0;
`;

const PhotoGrid = styled.div<{ $maxWidth?: string }>`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${({ $maxWidth }) => $maxWidth ?? "200px"}, 1fr)
  );
  gap: 1em;
  margin: 1em 0;
`;

const Minipuzzle = styled.details`
  margin-top: 1em;
  & > p {
    margin-top: 1em;
  }
`;

const BlacklightTable = styled.table`
  & td {
    padding: 0.25rem 0.5rem;
  }
`;

const Puzzle = ({ puzzleSlug }: { puzzleSlug: string }): JSX.Element => {
  return (
    <>
      {puzzleSlug === "smoke_em_if_youve_got_em_blacklight" && (
        <AuthorsNoteBlock>
          <p>Shining a blacklight on the filters would reveal the following:</p>

          <LinkedImage
            src={blacklight}
            alt="A grid of mock cigarette filters under blacklight. Each filter has a letter or number written on it."
          />

          <p>These map to the various minipuzzles as follows:</p>

          <BlacklightTable>
            <tr>
              <td>Florist</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Academic</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Swimmer</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Coroner</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Photographer</td>
              <td>5</td>
            </tr>
            <tr>
              <td>Poet</td>
              <td>6</td>
            </tr>
            <tr>
              <td>Actor</td>
              <td>x</td>
            </tr>
            <tr>
              <td>Bartender</td>
              <td>x</td>
            </tr>
            <tr>
              <td>Logician</td>
              <td>x</td>
            </tr>
            <tr>
              <td>Police Officer</td>
              <td>x</td>
            </tr>
            <tr>
              <td>Stonemason</td>
              <td>x</td>
            </tr>
          </BlacklightTable>
        </AuthorsNoteBlock>
      )}
      <Errata
        errata={[
          {
            timestamp: "January 17th, at 9:45 PM",
            message:
              "In the Stonemason, the string “Neighbors” should instead have been spelled “Neighbours”. We are not able to correct the physical objects.",
          },
        ]}
      />
      <AuthorsNoteBlock>
        <p>
          During Mystery Hunt, teams were told to come to the Gala and ask the
          bartender if they could “bum a puzzle.” They received in exchange a
          box of Cambridge Slims cigarettes — full of flavortext! — containing
          12 tightly-rolled minipuzzles and some tissue paper packaging:
        </p>

        <FlexWithMargin style={{ justifyContent: "center" }}>
          <LinkedImage
            src={cigarettes1}
            alt="A pack of paper mock cigarettes"
          />
          <LinkedImage
            src={cigarettes2}
            alt="The back of the pack of cigarettes, with some flavor text."
          />
        </FlexWithMargin>

        <p>
          If you’d like to feed your puzzling addiction, you can print out{" "}
          <a href={puzzles} target="_blank" rel="noreferrer">
            a copy of the puzzles
          </a>{" "}
          (print double-sided, flipped on the short edge). Each page should be
          cut in half lengthwise, and for the authentic experience, tightly
          rolled around a pen or pencil and held in position with a small strip
          of adhesive paper. You’ll also need{" "}
          <a href={tissue} target="_blank" rel="noreferrer">
            a copy of the tissue paper packaging
          </a>{" "}
          (which was printed on tissue paper and folded up, although this is not
          necessary to solve the puzzle){/* TODO box */}. There was one
          additional physical element to this puzzle described in the spoilers
          below.
        </p>

        <p>
          Many parts of this puzzle required visiting physical locations on
          MIT’s campus. We’ve done a few things to enable it to be solved
          remotely. Below is an expandable section for each of the minipuzzles.
          Some have additional photos or other documentation to assist in
          solving; we’ve included sections for all minipuzzles to limit up-front
          spoilers. If solving a minipuzzle instructed you to visit a location,
          you can enter that location (in the format yielded by the minipuzzle)
          as an answer to receive additional information.
        </p>

        <Minipuzzle>
          <summary>The Academic</summary>
          <p>
            At this time we have no additional information for this minipuzzle.
          </p>
        </Minipuzzle>

        <Minipuzzle>
          <summary>The Actor</summary>
          <p>
            At this time we have no additional information for this minipuzzle.
          </p>
        </Minipuzzle>

        <Minipuzzle>
          <summary>The Bartender</summary>
          <p>
            At this time we have no additional information for this minipuzzle.
          </p>
        </Minipuzzle>

        <Minipuzzle>
          <summary>The Coroner</summary>
          <p>
            This minipuzzle required visiting{" "}
            <a
              href="https://listart.mit.edu/art-artists/alchemist-2010"
              target="_blank"
              rel="noreferrer"
            >
              The Alchemist
            </a>{" "}
            outside of building W20. We’ve included some photos of the sculpture
            here:
          </p>
          <PhotoGrid>
            <LinkedImage
              alt="Photo of a sculpture"
              src={alchemist1Thumb}
              fullSizeURL={alchemist1}
            />
            <LinkedImage
              alt="Photo of a sculpture"
              src={alchemist2Thumb}
              fullSizeURL={alchemist2}
            />
            <LinkedImage
              alt="Photo of a sculpture"
              src={alchemist3Thumb}
              fullSizeURL={alchemist3}
            />
            <LinkedImage
              alt="Photo of a sculpture"
              src={alchemist4Thumb}
              fullSizeURL={alchemist4}
            />
            <LinkedImage
              alt="Photo of a sculpture"
              src={alchemist5Thumb}
              fullSizeURL={alchemist5}
            />
            <LinkedImage
              alt="Photo of a sculpture"
              src={alchemist6Thumb}
              fullSizeURL={alchemist6}
            />
            <LinkedImage
              alt="Photo of a sculpture"
              src={alchemist7Thumb}
              fullSizeURL={alchemist7}
            />
            <LinkedImage
              alt="Photo of a sculpture"
              src={alchemist8Thumb}
              fullSizeURL={alchemist8}
            />
          </PhotoGrid>
        </Minipuzzle>

        <Minipuzzle>
          <summary>The Florist</summary>
          <p>
            At this time we have no additional information for this minipuzzle.
          </p>
        </Minipuzzle>

        <Minipuzzle>
          <summary>The Logician</summary>
          <p>
            At this time we have no additional information for this minipuzzle.
          </p>
        </Minipuzzle>

        <Minipuzzle>
          <summary>The Photographer</summary>
          <p>
            This puzzle required visiting the mirror art wall in Strobe Alley,
            outside of the Edgerton Center in building 4. You can see the
            overall photo wall below, along with a series of zoomed-in images of
            each section.
          </p>

          <img
            style={{ width: "100%" }}
            src={edgerton}
            alt="Edgerton mirror tile wall"
          />

          <PhotoGrid $maxWidth="200px">
            {[
              edgertonZoom01,
              edgertonZoom02,
              edgertonZoom03,
              edgertonZoom04,
              edgertonZoom05,
              edgertonZoom06,
              edgertonZoom07,
              edgertonZoom08,
              edgertonZoom09,
              edgertonZoom10,
              edgertonZoom11,
              edgertonZoom12,
              edgertonZoom13,
              edgertonZoom14,
              edgertonZoom15,
              edgertonZoom16,
            ].map((src) => (
              <LinkedImage
                key={src}
                alt="Zoomed-in photo of the Edgerton mirror tile wall"
                src={src}
                fullSizeURL={src}
              />
            ))}
          </PhotoGrid>
        </Minipuzzle>

        <Minipuzzle>
          <summary>The Police Officer</summary>
          <p>
            This puzzle required teams to visit the Sean Collier Memorial near
            the Stata Center. The following photo (originally from{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Sean_Collier_Memorial_02.jpg">
              Wikimedia Commons
            </a>
            , taken by{" "}
            <a href="https://commons.wikimedia.org/wiki/User:Peacearth">
              Peacearth
            </a>
            , and used under the{" "}
            <a href="https://creativecommons.org/licenses/by-sa/4.0">
              CC BY-SA 4.0
            </a>{" "}
            license) should provide sufficient information to solve the
            minipuzzle:
          </p>

          <LinkedImage
            alt="Sean Collier Memorial"
            src={memorial}
            fullSizeURL={memorial}
          />
        </Minipuzzle>

        <Minipuzzle>
          <summary>The Poet</summary>

          <p>
            This puzzle required teams to visit the hallway leading from
            Building 2 to Building 14, which hosts a series of displays about
            the HASS majors at MIT. You can see the displays below:
          </p>

          <PhotoGrid $maxWidth="200px">
            {[
              poet01,
              poet02,
              poet03,
              poet04,
              poet05,
              poet06,
              poet07,
              poet08,
              poet09,
              poet10,
              poet11,
            ].map((src) => (
              <LinkedImage
                key={src}
                alt="Photo of the HASS majors display"
                src={src}
                fullSizeURL={src}
              />
            ))}
          </PhotoGrid>
        </Minipuzzle>

        <Minipuzzle>
          <summary>The Stonemason</summary>

          <p>
            At this time we have no additional information for this minipuzzle.
          </p>
        </Minipuzzle>

        <Minipuzzle>
          <summary>The Swimmer</summary>

          <p>
            Upon unrolling this minipuzzle, teams would find a small capsule.
            The capsule would dissolve in water, freeing a piece of foam cut in
            the shape of the letter “A”.
          </p>
        </Minipuzzle>
      </AuthorsNoteBlock>
    </>
  );
};

export default Puzzle;
