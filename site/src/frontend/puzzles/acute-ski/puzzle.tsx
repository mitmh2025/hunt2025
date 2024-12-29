import React from "react";
import { styled } from "styled-components";
import {
  COPY_ONLY_CLASS,
  NO_COPY_CLASS,
} from "../../components/CopyToClipboard";
import { deviceMax } from "../../utils/breakpoints";
import finalImage from "./assets/final_image.png";
import portrait from "./assets/portrait.png";

const Book = styled.div`
  display: flex;
  border: 1px solid black;

  @media (${deviceMax.md}) {
    flex-direction: column;
  }
`;

const Portraits = styled.div`
  width: 100%;
  border: 1px solid black;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const PortraitFrame = styled.div`
  width: 25%;
  display: flex;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
`;

const Comparative = styled.div`
  text-align: center;
  font-size: 14px;
`;

const Portrait = styled.img`
  width: 100%;
`;

const Superlatives = styled.div`
  width: 100%;
  border: 1px solid black;
  padding: 1rem;
`;

const FinalImageContainer = styled.div`
  width: 100%;
  padding-top: 2rem;
  display: flex;
  justify-content: center;
`;

const FinalImage = styled.img`
  max-width: calc(min(452px, 100%));
`;

const comparatives = [
  "Laptop brand ‘35",
  "Change or edit ‘46",
  "Sterling spy ‘47",
  "Monastery fellow ‘28",
  "Churned from cream ‘27",
  "Finster fiancé ‘77",
  "Middle alignment ‘17",
  "Mr. Fudd ‘26",
  "Youngest Wiggin ‘26",
  "Keyboard key ‘56",
  "High-speed internet ‘26",
  "Coming from an April shower ‘57",
  "Someone to follow ‘37",
  "A class year can help choose this ‘27",
  "Washington coin ‘18",
  "Pass on ‘16",
  "Like many pantyhose ‘36",
  "Like Clark Kent ‘26",
  "Personal coach ‘48",
];

const superlatives = [
  "get kicked in the rear",
  "moot up later",
  "drop some sick bars",
  "be feminine",
  "lick the paint",
  "make ramen",
  "be a tree",
  "tell lies",
  "listen to indie rock",
  "issue a red card",
  "take a wagon",
  "stay cool in the summer",
  "take a penny",
  "need orthotic inserts",
  "finish",
  "ride the rails",
  "have a couple pints",
  "have an evening meal",
  "be easy in Norwegian",
];

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">
        You better believe these kids are great, but what do their classmates
        expect them to be the best at?
      </p>

      <Book>
        <Portraits>
          {comparatives.map((comparative) => (
            <PortraitFrame key={comparative}>
              <Portrait
                className={NO_COPY_CLASS}
                src={portrait}
                alt={"A photo of a person"}
              />
              <Comparative>{comparative}</Comparative>
            </PortraitFrame>
          ))}
        </Portraits>
        <br className={COPY_ONLY_CLASS} />
        <Superlatives>
          <div>Most likely to…</div>
          <ul>
            {superlatives.map((superlative) => (
              <li key={superlative}>…{superlative}</li>
            ))}
          </ul>
        </Superlatives>
      </Book>

      <FinalImageContainer>
        <FinalImage
          src={finalImage}
          alt="A crooked outline with some numbers written in red and a rectangle labeled “Most likely to lead the college”"
        />
      </FinalImageContainer>
    </>
  );
};

export default Puzzle;
