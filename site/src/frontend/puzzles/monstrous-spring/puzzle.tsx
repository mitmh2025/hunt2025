import React, { type CSSProperties } from "react";
import { styled } from "styled-components";
import {
  COPY_ONLY_CLASS,
  NO_COPY_CLASS,
} from "../../components/CopyToClipboard";
import { deviceMax } from "../../utils/breakpoints";

const Container = styled.div`
  display: flex;

  @media ${deviceMax.md} {
    flex-direction: column;
  }
`;

const PoolScaleRatio = 675 / 753.38;
const PoolWidth = 675;
const PoolHeight = PoolScaleRatio * 562.38;

const PoolContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: ${PoolWidth}px;
  margin: 0 auto;
  container-name: pool;
  container-type: inline-size;
`;

const PoolImage = styled.svg`
  width: 100%;
`;

const PoolClue = styled.div`
  position: absolute;

  @container pool (max-width: ${PoolWidth}px) {
    font-size: ${(100 * 16) / PoolWidth}cqw;
  }
`;

const PoolClues: [x: number, y: number, clue: string][] = [
  [620.9233, 108.116, "Phobia"],
  [559.0934, 132.1178, "Property record"],
  [538.5158, 159.1196, "Plummet"],
  [476.7101, 184.6213, "Not Bluetooth"],
  [347.2001, 210.1231, "Wetland grass or college in Portland"],
  [371.8277, 236.7167, "Security guard’s patrols"],
  [321.2593, 264.7301, "Soviet space station"],
  [321.2594, 294.0893, "Like a fish or lizard"],
  [267.8817, 319.8351, "Toddlers’ favorite words"],
  [363.3996, 344.3702, "Don"],
  [312.2353, 369.8719, "Bitter and stout"],
  [173.6158, 395.6285, "Fruit that may be edible, decorative, or functional"],
  [319.4233, 424.991, "Ask for an ack"],
  [285.7111, 450.737, "Chopped up leftovers"],
  [295.0756, 479.8519, "Typographical units"],
  [280.2504, 505.5959, "Current events"],
  [308.1977, 530.5966, "Catkin, or Pearl Jam bassist"],
];

const Pool = (
  <PoolImage
    viewBox={`0 0 753.38 562.38`}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="#000">
      <g fill="none" strokeWidth=".75">
        <path d="m650.55 562.08 102.49-513.97-329.44-12.628-423.01 477.1z" />
        <path d="m424.08 35.666 4.125 23.409 319.12 17.35" />
        <path d="m427.58 58.894-376.81 457.33" />
      </g>
      <g fill="none" strokeWidth=".27892">
        <path d="m477.93 101.86s7.53-0.762 15.323-5.0507c7.785-4.2893 13.927-12.016 13.927-12.016s-5.677 3.336 5.775 12.016c11.453 8.6757 15.18 6.0937 15.18 6.0937" />
        <path d="m506.88 92.67s7.538-0.7583 15.323-5.0468c7.792-4.2892 13.935-12.015 13.935-12.015s-5.678 3.336 5.775 12.015c11.445 8.676 15.172 6.0938 15.172 6.0938" />
        <path d="m543.48 93.435s7.538-0.762 15.323-5.0505c7.792-4.2893 13.927-12.015 13.927-12.015s-5.67 3.339 5.775 12.015c11.453 8.6797 15.18 6.0937 15.18 6.0937" />
        <path d="m514.38 108.42s7.538-0.761 15.323-5.05c7.792-4.2892 13.935-12.016 13.935-12.016s-5.678 3.336 5.767 12.016c11.453 8.679 15.18 6.093 15.18 6.093" />
        <path d="m134.98 461.46s7.534-0.762 15.323-5.051c7.793-4.289 13.933-12.015 13.933-12.015s-5.679 3.336 5.774 12.015c11.453 8.676 15.176 6.093 15.176 6.093" />
        <path d="m164.01 452.28s7.535-0.762 15.324-5.051c7.788-4.289 13.929-12.015 13.929-12.015s-5.676 3.336 5.777 12.015c11.449 8.676 15.178 6.094 15.178 6.094" />
        <path d="m189.3 467.07s7.535-0.761 15.324-5.05c7.787-4.286 13.929-12.016 13.929-12.016s-5.677 3.34 5.775 12.016c11.453 8.678 15.18 6.097 15.18 6.097" />
        <path d="m200.54 452.1s7.535-0.762 15.321-5.047c7.793-4.289 13.935-12.016 13.935-12.016s-5.677 3.336 5.768 12.016c11.46 8.676 15.18 6.094 15.18 6.094" />
      </g>
      <g fill="#fff" strokeWidth=".65197">
        <path d="m378.02 0.2585c-6.922 0.2505-13.68 3.969-19.462 10.192-7.523 8.0932-10.898 18.156-11.903 36.496-1.012 18.339 0 45.686 0 45.686l8.498-0.3037s-0.975-27.359-8e-3 -44.917c0.968-17.555 3.518-24.586 9.638-31.168 6.412-6.903 11.775-8.7616 17.647-6.93 5.865 1.836 13.118 8.4652 20.505 21.266 13.178 22.824 20.625 35.164 24.615 44.648 3.983 9.4807 4.785 16.191 4.785 29.425v26.69c0 3.051-1.41 4.707-4.89 6.533-3.487 1.823-8.812 3.046-14.265 3.635-10.89 1.188-22.065 0.114-22.065 0.114l-0.832 8.464s11.767 1.188 23.82-0.121c6.022-0.656 12.165-1.875 17.287-4.558 5.123-2.679 9.443-7.597 9.443-14.067v-26.69c0-13.621-1.028-22.214-5.445-32.722-4.418-10.504-11.94-22.84-25.088-45.6-7.92-13.726-16.095-22.243-25.335-25.129-2.31-0.723-4.635-1.0275-6.945-0.942z" />
        <path d="m432.99 91.53-28.147 33.073 6.472 5.508 28.155-33.07z" />
        <path d="m432.99 116.82-28.147 33.073 6.472 5.508 28.155-33.069z" />
        <path d="m349.59 28.818c-6.915 0.2505-13.68 3.969-19.462 10.191-7.523 8.094-10.89 18.157-11.903 36.495-1.005 18.34 0 45.688 0 45.688l8.498-0.306s-0.968-27.358-8e-3 -44.916c0.968-17.553 3.525-24.585 9.645-31.167 6.405-6.9015 11.768-8.7615 17.64-6.9285 5.873 1.8345 13.118 8.4638 20.505 21.264 13.178 22.823 20.633 35.163 24.615 44.648 3.99 9.48 4.785 16.191 4.785 29.424v26.691c0 3.051-1.402 4.707-4.89 6.531-3.48 1.824-8.812 3.048-14.257 3.637-10.898 1.187-22.073 0.113-22.073 0.113l-0.825 8.466s11.76 1.186 23.813-0.122c6.022-0.655 12.172-1.875 17.287-4.558 5.123-2.681 9.45-7.597 9.45-14.067v-26.691c0-13.62-1.035-22.213-5.445-32.721-4.417-10.504-11.947-22.84-25.087-45.6-7.928-13.726-16.095-22.242-25.343-25.129-2.31-0.7223-4.635-1.0268-6.945-0.9413z" />
      </g>
    </g>
  </PoolImage>
);

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">I was in the pool!</p>

      <Container>
        <div>
          <div>Dried out (8)</div>
          <div>Holy (6)</div>
          <div>Inserts [in] (6)</div>
          <div>Jesus’s dozen (8)</div>
          <div>Like last week’s balloon (8)</div>
          <div>Non-existent places (8)</div>
          <div>Psychoactive resin (7)</div>
          <div>Revealed once more (8)</div>
          <div>Rotaries (11)</div>
          <div>Scornfully (10)</div>
          <div>Serious foodie (8)</div>
          <div>Terminating, with “out” (7)</div>
          <div>THE ANSWER, PART ONE</div>
          <div>THE ANSWER, PART TWO</div>
          <div>To survive, as a storm or crisis (7)</div>
          <div>Under legal age (5)</div>
          <div>Yankee Doodle’s “macaroni” (7)</div>
        </div>

        <br className={COPY_ONLY_CLASS} />

        <div className={COPY_ONLY_CLASS}>
          {PoolClues.map(([_x, _y, clue], i) => (
            <div key={i}>{clue}</div>
          ))}
        </div>

        <PoolContainer className={NO_COPY_CLASS}>
          {Pool}
          {PoolClues.map(([x, y, clue]) => {
            const style: CSSProperties = {
              left: `${((PoolScaleRatio * x) / PoolWidth) * 100}%`,
              top: `calc(${((PoolScaleRatio * y) / PoolHeight) * 100}% - 1.5em)`,
            };
            return (
              <PoolClue key={clue} style={style}>
                {clue}
              </PoolClue>
            );
          })}
        </PoolContainer>
      </Container>
    </>
  );
};

export default Puzzle;
