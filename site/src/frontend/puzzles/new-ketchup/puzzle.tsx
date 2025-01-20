import React from "react";
import { createGlobalStyle } from "styled-components";
import RobotoMonoBold from "../../../assets/RobotoMono-Bold.ttf";
import RobotoMonoLight from "../../../assets/RobotoMono-Light.ttf";
import RobotoMonoLightItalic from "../../../assets/RobotoMono-LightItalic.ttf";
import teamIsImmutable from "../../../utils/teamIsImmutable";
import { AuthorsNote } from "../../components/PuzzleLayout";

const Fonts = createGlobalStyle`
  @font-face {
    font-family: "Roboto Mono";
    src: url(${RobotoMonoLight});
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: "Roboto Mono";
    src: url(${RobotoMonoLightItalic});
    font-weight: 300;
    font-style: italic;
  }
  @font-face {
    font-family: "Roboto Mono";
    src: url(${RobotoMonoBold});
    font-weight: bold;
    font-style: normal;
  }
`;

const Puzzle = ({ teamUsername }: { teamUsername: string }) => {
  return (
    <>
      {teamIsImmutable(teamUsername) ? (
        <AuthorsNote style={{ margin: "5em auto", maxWidth: "400px" }}>
          This puzzle is not currently available for the public access team. We
          are working on archival version of as much of the hunt as possible.
        </AuthorsNote>
      ) : (
        <>
          <Fonts />
          <p className="puzzle-flavor">
            Who <strong>is</strong> your new employer, anyway? Billie clearly
            used to have a partner, or the agency wouldn′t be called{" "}
            <strong>2</strong> P.I. Noir. You set out to investigate who
            Billie′s old partner was and what became of them. But to do that,
            you′re going to have to convince a lot of tight-lipped characters to
            talk to you.
          </p>

          <noscript>This puzzle requires Javascript.</noscript>
          <div id="what-do-they-call-you-root" />
        </>
      )}
    </>
  );
};

export default Puzzle;
