import React from "react";
import { css, styled } from "styled-components";
import { CaveatFont } from "../../../assets/SharedFonts";
import {
  COPY_ONLY_CLASS,
  NO_COPY_CLASS,
} from "../../../components/CopyToClipboard";
import { AuthorsNote } from "../../../components/PuzzleLayout";
import { deviceMax, deviceMin } from "../../../utils/breakpoints";
import rootUrl from "../../../utils/rootUrl";
import tag from "./assets/tag.svg";
import tag01 from "./assets/tag01.svg";
import tag07Back from "./assets/tag07-back.svg";
import tag07Front from "./assets/tag07-front.svg";
import tag08Back from "./assets/tag08-back.svg";
import tag08Front from "./assets/tag08-front.svg";
import tag10Back from "./assets/tag10-back.svg";
import tag10Front from "./assets/tag10-front.svg";
import tag11Back from "./assets/tag11-back.svg";
import tag11Front from "./assets/tag11-front.svg";
import tag13Back from "./assets/tag13-back.svg";
import tag13Front from "./assets/tag13-front.svg";
import tag14Back from "./assets/tag14-back.svg";
import tag14Front from "./assets/tag14-front.svg";
import tag16Back from "./assets/tag16-back.svg";
import tag16Front from "./assets/tag16-front.svg";
import tag17Back from "./assets/tag17-back.svg";
import tag17Front from "./assets/tag17-front.svg";
import tag18Back from "./assets/tag18-back.svg";
import tag18Front from "./assets/tag18-front.svg";

const Arrow = styled.span`
  color: var(--red-500);
`;

const SunOffset = 5;
const TagHeight = 5.08;
const TagWidth = 10.89;

const Label = styled.span`
  font-family: "Caveat";
  font-weight: bold;
  font-size: 1.25cm;
  line-height: 0.75;
  text-align: center;
  color: var(--black);
`;

const TagImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
`;

const Tags: {
  offset: number;
  front: React.ReactNode;
  back?: React.ReactNode;
}[] = [
  { offset: 0, front: <img src={tag01} alt="An icon of the sun" /> },
  {
    offset: 39.9,
    front: (
      <Label>
        Stadsmuseet <br />
        Stockholm
      </Label>
    ),
  },
  {
    offset: 70.2,
    front: (
      <Label>
        Chemin de <br />
        l’Observatoire
      </Label>
    ),
  },
  {
    offset: 100.1,
    front: (
      <Label style={{ fontSize: "1.75cm" }}>
        NCN <br />
        Route 65
      </Label>
    ),
  },
  {
    offset: 152.3,
    front: (
      <Label>
        21 Tkalčićeva <br />
        ulica
      </Label>
    ),
  },
  {
    offset: 515.8,
    front: (
      <Label>
        Rua da Sra. <br />
        dos Caminhos
      </Label>
    ),
  },
  {
    offset: 660.4,
    front: <TagImage src={tag07Front} alt="A flag" />,
    back: (
      <TagImage
        src={tag07Back}
        alt="A drawing of a building with the text ↺81.4°"
      />
    ),
  },
  {
    offset: 877.4,
    front: <TagImage src={tag08Front} alt="A flag" />,
    back: (
      <TagImage
        src={tag08Back}
        alt="A drawing of a building with the text ↻46.7°"
      />
    ),
  },
  {
    offset: 965.3,
    front: (
      <Label style={{ fontSize: "1cm" }}>
        Pitäjänmäentien <br />
        ja Höyläämötien <br />
        kulmassa
      </Label>
    ),
  },
  {
    offset: 1252.7,
    front: <TagImage src={tag10Front} alt="A flag" />,
    back: (
      <TagImage
        src={tag10Back}
        alt="A drawing of a building with the text ↺103.1°"
      />
    ),
  },
  {
    offset: 1646.2,
    front: <TagImage src={tag11Front} alt="A flag" />,
    back: (
      <TagImage
        src={tag11Back}
        alt="A drawing of a building with the text ↻117°.1"
      />
    ),
  },
  {
    offset: 1918.5,
    front: (
      <Label style={{ fontSize: "1.75cm" }}>
        Thompson <br />
        Park
      </Label>
    ),
  },
  {
    offset: 2170.2,
    front: <TagImage src={tag13Front} alt="A flag" />,
    back: (
      <TagImage
        src={tag13Back}
        alt="A drawing of a hallway with the text 0.0° ↓𓊍"
      />
    ),
  },
  {
    offset: 2808.4,
    front: <TagImage src={tag14Front} alt="A flag" />,
    back: (
      <TagImage
        src={tag14Back}
        alt="A drawing of a building with the text ↺27.9°"
      />
    ),
  },
  {
    offset: 3008.1,
    front: (
      <Label>
        Arts and <br />
        Industries <br />
        Building
      </Label>
    ),
  },
  {
    offset: 3665.4,
    front: <TagImage src={tag16Front} alt="A flag" />,
    back: (
      <TagImage
        src={tag16Back}
        alt="A drawing of a building with the text ↻158.0°"
      />
    ),
  },
  {
    offset: 3707.3,
    front: <TagImage src={tag17Front} alt="A flag" />,
    back: (
      <TagImage
        src={tag17Back}
        alt="A drawing of a building with the text ↻56.0°"
      />
    ),
  },
  {
    offset: 3771.7,
    front: <TagImage src={tag18Front} alt="A flag" />,
    back: (
      <TagImage
        src={tag18Back}
        alt="A drawing of a statue with the text ↻13.5°"
      />
    ),
  },
  {
    offset: 3950.6,
    front: <Label style={{ fontSize: "2.25cm" }}>8-322</Label>,
  },
];

const RibbonContainer = styled.div`
  display: flex;
  gap: 2cm;

  @media ${deviceMax.lg} {
    gap: 0.25cm;
  }
`;

const SmallScreen = styled.div`
  @media ${deviceMin.md} {
    display: none;
  }
`;

const LargeScreen = styled.div`
  @media ${deviceMax.sm} {
    display: none;
  }
`;

const Ruler = ({ style }: { style?: React.CSSProperties }) => {
  const strokeWidth = 0.05;

  const ticks: JSX.Element[] = [];
  for (let i = 0; i <= 40000; i++) {
    ticks.push(
      <line
        key={i}
        x1="2cm"
        y1={`${i / 10 + strokeWidth / 2}cm`}
        x2={i % 10 === 0 ? "1.5cm" : "1.75cm"}
        y2={`${i / 10 + strokeWidth / 2}cm`}
      />,
    );
  }

  const labels: JSX.Element[] = [];
  for (let i = 10; i < 4000; i += 10) {
    labels.push(
      <text key={i} x="1.4cm" y={`${i + strokeWidth / 2}cm`}>
        {i}
      </text>,
    );
  }

  return (
    <svg height={`${4000 + strokeWidth}cm`} width="2cm" style={style}>
      <rect
        x="0"
        y="0"
        width="2cm"
        height={`${4000 + strokeWidth}cm`}
        fill="var(--white)"
      />
      <text
        x="0.25cm"
        y="0.25cm"
        dominantBaseline="hanging"
        fontSize="0.5cm"
        fontFamily="Roboto Mono"
        style={{
          transformBox: "content-box",
          transformOrigin: "top left",
          transform: "rotate(90deg) translateY(-100%)",
        }}
      >
        (cm)
      </text>
      <g id="ticks" stroke="var(--black)" strokeWidth={`${strokeWidth}cm`}>
        {ticks}
      </g>
      <g
        id="labels"
        fill="var(--black)"
        fontSize="0.5cm"
        fontFamily="Roboto Mono"
        textAnchor="end"
        dominantBaseline="middle"
      >
        {labels}
      </g>
    </svg>
  );
};

const TagInner = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${tag});
  background-size: ${TagWidth}cm ${TagHeight}cm;
  background-repeat: no-repeat;
  background-position: center;
  transform-style: preserve-3d;
  transition: transform 0.5s ease-in-out;
`;

const TagOuter = styled.div<{ $offset: number }>`
  position: absolute;
  top: ${({ $offset }) => $offset + SunOffset - TagHeight / 2}cm;
  left: 0.5cm;
  width: ${TagWidth}cm;
  height: ${TagHeight}cm;

  perspective: 1000px;

  &:hover > ${TagInner} {
    transform: rotateX(180deg);
  }
`;

const TagContents = styled.div<{ $back?: boolean }>`
  position: absolute;
  top: 0.254cm;
  left: 3.797cm;
  width: 6.858cm;
  height: 4.572cm;
  backface-visibility: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ $back }) =>
    $back &&
    css`
      transform: rotateX(180deg);
    `}
`;

const Tag = ({
  offset,
  front,
  back,
}: {
  offset: number;
  front: React.ReactNode;
  back?: React.ReactNode;
}) => {
  return (
    <TagOuter $offset={offset}>
      <TagInner>
        <TagContents>{front}</TagContents>
        {back && <TagContents $back>{back}</TagContents>}
      </TagInner>
    </TagOuter>
  );
};

const Ribbon = () => {
  return (
    <svg height={`${4000 + SunOffset * 2}cm`} width="1cm">
      <defs>
        <mask id="hole-punches">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          {Tags.map(({ offset }) => (
            <circle
              key={offset}
              cx="0.5cm"
              cy={`${offset + SunOffset}cm`}
              r="0.3cm"
              fill="black"
            />
          ))}
        </mask>
      </defs>
      <rect
        x="0"
        y="0"
        width="1cm"
        height={`${4000 + SunOffset * 2}cm`}
        fill="var(--black)"
        mask="url(#hole-punches)"
      />
    </svg>
  );
};

const Puzzle = () => {
  return (
    <>
      <CaveatFont />
      <div className={NO_COPY_CLASS}>
        <p>
          <Arrow>←</Arrow>{" "}
          <a href={`${rootUrl}/puzzles/celestial_rope`}>Back to main puzzle</a>
        </p>

        <SmallScreen>
          <AuthorsNote>
            We are not able to provide the virtual ribbon for mobile-sized
            screens. We recommend using a computer to solve this puzzle.
          </AuthorsNote>
        </SmallScreen>

        <LargeScreen>
          <AuthorsNote>
            As a courtesy for post-Mystery Hunt solving, we have already
            untangled your ribbon below, and have included an impossibly long
            tape measure with it.
          </AuthorsNote>

          <RibbonContainer>
            <Ruler style={{ marginTop: `${SunOffset}cm` }} />
            <div style={{ position: "relative" }}>
              <Ribbon />
              {Tags.map(({ offset, front, back }) => (
                <Tag key={offset} offset={offset} front={front} back={back} />
              ))}
            </div>
          </RibbonContainer>
        </LargeScreen>
      </div>

      <div className={COPY_ONLY_CLASS}>
        <table>
          <thead>
            <tr>
              <th>Front</th>
              <th>Back</th>
            </tr>
          </thead>
          <tbody>
            {Tags.map(({ offset, front, back }) => (
              <tr key={offset}>
                <td>{front}</td>
                <td>{back}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Puzzle;
