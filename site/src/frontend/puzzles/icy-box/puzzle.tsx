import React from "react";
import { styled } from "styled-components";
import { CaveatFont } from "../../assets/SharedFonts";
import { AuthorsNote } from "../../components/PuzzleLayout";
import { Errata } from "../../components/StyledUI";
import weatherLosAngeles from "./assets/icy-box-los-angeles.mp3";
import weatherParis from "./assets/icy-box-paris.mp3";
import weatherRome from "./assets/icy-box-rome.mp3";
import weatherStockholm from "./assets/icy-box-stockholm.mp3";
import weatherTokyo from "./assets/icy-box-tokyo.mp3";
import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";
import image4 from "./assets/image4.png";
import image5 from "./assets/image5.png";
import paper from "./assets/paper.jpg";

const FontWrapper = styled.div`
  font-family: "Caveat";
  font-size: 20px;
`;

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const Paper = styled.img`
  width: 100%;
`;

const StyledImage = styled.img<{ $left: number; $top: number }>`
  width: 15%;
  position: absolute;
  left: ${({ $left }) => $left}%;
  top: ${({ $top }) => $top}%;
`;

const PositionedText = styled.div<{ $left: number; $top: number }>`
  position: absolute;
  left: ${({ $left }) => $left}%;
  top: ${({ $top }) => $top}%;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <CaveatFont />
      <Errata
        errata={[
          {
            timestamp: "January 30th",
            message:
              "After Mystery Hunt, we learned of an error in the Los Angeles weather report. The transcript previously read a gauge reading of 1 and 6 tenths below zero; we have corrected it to a gauge reading of 0 and 6 tenths below zero. We are unable to correct the audio recording.",
          },
        ]}
      />
      <AuthorsNote as="div">
        <p>
          During Mystery Hunt, after they had unlocked the Paper Trail round,
          teams would begin receiving weather reports over their{" "}
          <a href="/radio">radio</a> approximately every 20 minutes. When they
          subsequently unlocked this puzzle, they would need to connect those
          reports with the puzzle content here.
        </p>
        <p>
          Below, you can hear (or read) how the five weather reports would have
          sounded coming over the radio stream:
        </p>

        {/* eslint-disable jsx-a11y/media-has-caption -- captions are below the audio elements */}
        <audio src={weatherLosAngeles} controls />
        <details>
          <summary>Transcript</summary>
          <p>
            Terry:{" "}
            <span className="puzzle-flavor">
              I’m going to hand things off to my good friend Sonny, with the
              weather.
            </span>
          </p>
          <p>WDNM: The Weather, with Sonny</p>
          <p>
            Sonny:{" "}
            <span className="puzzle-flavor">
              In Los Angeles, the temperature is currently 100 degrees with a
              barometric pressure reading of 0.94. It is currently raining and
              the wind coming from the northwest with the precipitation measured
              at 0.44. There are low cumulus clouds covering about 2 tenths of
              the sky and coming in from the south. The Los Angeles River is
              rising and reporting a gauge reading of 0 and 6 tenths below zero.
            </span>
          </p>
        </details>
        <audio src={weatherParis} controls />
        <details>
          <summary>Transcript</summary>
          <p>
            Terry:{" "}
            <span className="puzzle-flavor">
              It’s cold out there today in MITropolis. Sonny, what can you tell
              us about the weather?
            </span>
          </p>
          <p>WDNM: The Weather, with Sonny</p>
          <p>
            Sonny:{" "}
            <span className="puzzle-flavor">
              In Paris the temperature is currently 54 degrees with a barometric
              pressure reading of 0.96. At 3pm the dew point was measured to be
              74 degrees. It is currently snowing and the wind coming from the
              northwest with the precipitation measured at 0.02. The Seine is
              continuing to fall with a gauge reading of 18 and 6 tenths.
            </span>
          </p>
        </details>
        <audio src={weatherRome} controls />
        <details>
          <summary>Transcript</summary>
          <p>
            Terry:{" "}
            <span className="puzzle-flavor">
              It is freezing out there. Sonny, what is going on in the world of
              weather?
            </span>
          </p>
          <p>WDNM: The Weather, with Sonny</p>
          <p>
            Sonny:{" "}
            <span className="puzzle-flavor">
              In Rome the temperature is currently 62 degrees with a barometric
              pressure reading of 0.58. At 10pm the dew point was measured to be
              52 degrees. The skies are clear and wind coming from the south
              with the precipitation measured at 0.24. The Tiber is continuing
              to rise with a gauge reading of 20 and 6 tenths.
            </span>
          </p>
        </details>
        <audio src={weatherStockholm} controls />
        <details>
          <summary>Transcript</summary>
          <p>
            Terry:{" "}
            <span className="puzzle-flavor">
              I’m here with our famed WDNM meteorologist, Sonny. Sonny, what is
              going on out there?
            </span>
          </p>
          <p>WDNM: The Weather, with Sonny</p>
          <p>
            Sonny:{" "}
            <span className="puzzle-flavor">
              In Stockholm the temperature is currently 40 degrees with a
              barometric pressure reading of 0.90. At 10pm the dew point was
              measured to be 58 degrees. The skies are cloudy and the wind
              coming from the northeast with the precipitation measured at 0.98.
              There are low cumulus clouds covering about 4 tenths of the sky
              and coming in from the northeast. The Söderström is continuing to
              rise with a gauge reading of 54 and 1 tenth.
            </span>
          </p>
        </details>
        <audio src={weatherTokyo} controls />
        <details>
          <summary>Transcript</summary>
          <p>
            Terry:{" "}
            <span className="puzzle-flavor">
              It’s time for another update from WDNM meteorologist Sonny.
            </span>
          </p>
          <p>WDNM: The Weather, with Sonny</p>
          <p>
            Sonny:{" "}
            <span className="puzzle-flavor">
              In Tokyo the temperature is currently 100 degrees with a
              barometric pressure reading of 0.02. At 7am the dew point was
              measured to be 66 degrees. It is currently calm and cloudy with
              the precipitation measured at 0.08. The sky is fully covered with
              nimbus clouds that are coming in from the northeast. A maximum
              wind speed of 16 was measured coming from the northwest. The
              Sumida is continuing to rise with a gauge reading of 32 and 4
              tenths.
            </span>
          </p>
        </details>
        {/* eslint-enable jsx-a11y/media-has-caption -- reenable */}
      </AuthorsNote>
      <br />
      <Wrapper>
        <Paper
          src={paper}
          alt="An old piece of paper thas has been crumpled and straightened out."
        />
        <StyledImage $left={10} $top={12} src={image1} alt="A squiggly line." />
        <StyledImage $left={10} $top={24} src={image2} alt="A squiggly line." />
        <StyledImage $left={10} $top={36} src={image3} alt="A squiggly line." />
        <StyledImage $left={10} $top={48} src={image4} alt="A squiggly line." />
        <StyledImage $left={10} $top={60} src={image5} alt="A squiggly line." />
        <PositionedText $left={85} $top={4}>
          <FontWrapper>7/1/87</FontWrapper>
        </PositionedText>
        <PositionedText $left={30} $top={30}>
          <FontWrapper>
            <div>Ms. Bennett—</div>
            <div>
              Listen for the clues. The War Department will provide the signals.
            </div>
            <div>Look for either first or last names.</div>
            <div>I’m retiring after this last transmission.</div>
            <div>Please keep this note safely hidden in the dress.</div>
          </FontWrapper>
        </PositionedText>
      </Wrapper>
    </>
  );
};

export default Puzzle;
