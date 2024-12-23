import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import img1 from "./assets/img1.png";
import img10 from "./assets/img10.png";
import img11 from "./assets/img11.png";
import img12 from "./assets/img12.png";
import img13 from "./assets/img13.png";
import img2 from "./assets/img2.png";
import img3 from "./assets/img3.png";
import img4 from "./assets/img4.png";
import img5 from "./assets/img5.png";
import img6 from "./assets/img6.png";
import img7 from "./assets/img7.png";
import img8 from "./assets/img8.png";
import img9 from "./assets/img9.png";

const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SizedImage = styled(LinkedImage)`
  width: 300px;
  margin-bottom: 1em;
`;

const SHARED_ALT_TEXT =
  "A glitched-out baseball card. Instead of a picture of the baseball player is a clock face with clipart on it.";

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">
        Reality flickers in the feedback. Things look different… Is this a
        curse, or a blessing?
      </p>
      <FlexWrapper>
        <SizedImage
          src={img1}
          alt={`${SHARED_ALT_TEXT} The card reads: Space reinfected. TK Dilbury. Twill pates. Prince in Togo. NE HQ cued. Teat grants carrot. ?. This utility player and current Brewers analyst played catcher for Team Italy in 2009, but it was not his most played major league position.`}
        />
        <SizedImage
          src={img2}
          alt={`${SHARED_ALT_TEXT} The card reads: Ouzo salt beer. Flat IRS slang. Restful Atlanta thunder. ?. This Dominican utility infielder hit a home run in his first World Series at-bat, in 2018.`}
        />
        <SizedImage
          src={img3}
          alt={`${SHARED_ALT_TEXT} The card reads: April fed kids. ?. Rifle sport. This 1978 first-round pick was a color commentator for the Angels for ten years.`}
        />
        <SizedImage
          src={img4}
          alt={`${SHARED_ALT_TEXT} The card reads: Tadpole boy. Anal clenching omen. ?. Undeath. Abort cursed vacation. This Dominican pitcher contributed to the only major league combined no-hitter to have taken place outside of the US and Canada.`}
        />
        <SizedImage
          src={img5}
          alt={`${SHARED_ALT_TEXT} The card reads: TCG tribe captain. Rib and rib. ?. This 1964 All-Star left fielder was selected from the Orioles in the 1960 MLB expansion draft.`}
        />
        <SizedImage
          src={img6}
          alt={`${SHARED_ALT_TEXT} The card reads: ?. Feud rip. Lily tibia. Antenatal tourist retort. Long bebops. This Puerto Rican right fielder made his major league debut for the Cubs in 1996.`}
        />
        <SizedImage
          src={img7}
          alt={`${SHARED_ALT_TEXT} The card reads: ?. This current Twin was a first overall MLB draft pick.`}
        />
        <SizedImage
          src={img8}
          alt={`${SHARED_ALT_TEXT} The card reads: Unforgettable albino nubbins. Beninese buffalo bottled. Holt unbefitting bobtail. ?. DNS wrist pin. Hex on prom. This left fielder represented the Phillies in the 2013 All-Star game.`}
        />
        <SizedImage
          src={img9}
          alt={`${SHARED_ALT_TEXT} The card reads: Unforgettable albino nubbins. Beninese buffalo bottled. Space reinfected. Holt unbefitting bobtail. ?. Able newcomer’s pelt. 22 pagans’ chaos eon. This pitcher closed a 7-inning combined no-hitter in 2021, not officially recorded as a no-hitter due to its truncated length.`}
        />
        <SizedImage
          src={img10}
          alt={`${SHARED_ALT_TEXT} The card reads: ?. This left fielder drew controversy for appearing to lean in to get hit by a pitch by Max Scherzer, denying him a perfect game with two out in the ninth inning.`}
        />
        <SizedImage
          src={img11}
          alt={`${SHARED_ALT_TEXT} The card reads: Bland diet. Feud rip. ?. KO deflated chimp. Actuarial spoon biopsy. This Diamondback made his debut on 2024 Opening Day.`}
        />
        <SizedImage
          src={img12}
          alt={`${SHARED_ALT_TEXT} The card reads: Feud rip. ?. Violet agent detour. 13 Bostonians abet billion Gu theft. This player held the record for most games pitched by a Mexican-born player until he was overtaken in 2019.`}
        />
        <SizedImage
          src={img13}
          alt={`${SHARED_ALT_TEXT} The card reads: ?. Nicknamed “Dutch”, this player played in the 1920s. In his second career game—also his only multi-hit game as a batter—he pitched 7 innings of scoreless relief to win the game for the Braves against the Phillies.`}
        />
      </FlexWrapper>
    </>
  );
};

export default Puzzle;
