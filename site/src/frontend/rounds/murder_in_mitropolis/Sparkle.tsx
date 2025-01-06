import React from "react";
import { styled } from "styled-components";
import { proportionify } from "./Layout";
import { ObjectPosition } from ".";

const ANIMATION_DURATION = 0.8;

export const SPARKLES: SparkleProps[] = [
  {
    pos: { left: 26, top: 177 },
    startWidth: 54,
    color: "var(--purple-500)",
    delay: 0.4,
  },
  {
    pos: { left: 162, top: 324 },
    startWidth: 55,
    delay: 0.15,
  },
  {
    pos: { left: 199, top: 215 },
    startWidth: 30,
    delay: 0.8,
  },
  {
    pos: { left: 253, top: 234 },
    startWidth: 60,
    color: "var(--white)",
    delay: 0.41,
  },
  {
    pos: { left: 437, top: 507 },
    startWidth: 47,
    color: "var(--purple-300)",
    delay: 0.9,
  },
  {
    pos: { left: 505, top: 436 },
    startWidth: 55,
    color: "var(--purple-500)",
    delay: 0.3,
  },
  {
    pos: { left: 639, top: 171 },
    startWidth: 40,
    color: "var(--purple-300)",
    delay: 0.78,
  },
  {
    pos: { left: 1109, top: 453 },
    startWidth: 64,
    delay: 0.2,
  },
  {
    pos: { left: 1225, top: 243 },
    startWidth: 90,
    color: "var(--white)",
    delay: 0.02,
  },
  {
    pos: { left: 1323, top: 230 },
    startWidth: 49,
    color: "var(--purple-500)",
    delay: 0.9,
  },
  {
    pos: { left: 1327, top: 509 },
    startWidth: 58,
    color: "var(--purple-300)",
    delay: 0.6,
  },
  {
    pos: { left: 1436, top: 21 },
    startWidth: 40,
    color: "var(--white)",
    delay: 0.33,
  },
  {
    pos: { left: 1478, top: 71 },
    startWidth: 66,
    color: "var(--purple-500)",
    delay: 0.75,
  },
  {
    pos: { left: 1671, top: 384 },
    startWidth: 46,
    delay: 0.48,
  },
  {
    pos: { left: 1694, top: 698 },
    startWidth: 42,
    delay: 0.85,
  },
  {
    pos: { left: 1796, top: 223 },
    startWidth: 40,
    color: "var(--white)",
    delay: 0.1,
  },
  {
    pos: { left: 1840, top: 280 },
    startWidth: 40,
    color: "var(--purple-500)",
    delay: 0.67,
  },
];

const Sparkle = styled.svg`
  @keyframes twinkle {
    0% {
      transform: scale(50%);
    }

    100% {
      transform: scale(110%);
    }
  }
  position: absolute;

  animation: ${ANIMATION_DURATION}s infinite ease-in alternate twinkle;
  opacity: 0.8;
`;

export type SparkleProps = {
  color?: string;
  delay?: number;
  startWidth?: number;
  pos: ObjectPosition;
};

const SparkleComponent = ({ color, delay, startWidth, pos }: SparkleProps) => {
  return (
    <Sparkle
      viewBox="0 0 79.332436 108.08878"
      version="1.1"
      xmlSpace="preserve"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        top: proportionify(pos.top),
        left: proportionify(pos.left),
        width: proportionify(startWidth ?? 32),
        animationDelay: `${-1 * (delay ?? Math.random()) * ANIMATION_DURATION}s`,
      }}
    >
      <g transform="translate(-13.169759,-7.8629744)">
        <path
          style={{ fill: color ?? "var(--gold-500)" }}
          d="m 40.667757,114.34317 c -0.09598,-0.88472 -0.309209,-4.23533 -0.473844,-7.44581 -0.252869,-4.93111 -0.229316,-6.86915 0.151728,-12.484871 C 40.84266,87.087565 40.667066,82.762678 39.690819,78.284186 38.388008,72.307592 36.589214,68.929951 32.257973,64.327339 28.057371,59.863551 25.884501,58.484463 16.219839,54.148178 9.871543,51.29986 9.9787872,51.418751 13.935378,51.615633 c 1.840062,0.09156 4.795826,0.337512 6.568365,0.546553 6.052198,0.713754 10.671141,0.3891 15.882083,-1.11631 5.751233,-1.661498 8.309762,-3.720656 10.793241,-8.686625 1.704929,-3.40918 2.746184,-6.358498 7.240824,-20.509384 2.388556,-7.520108 4.445638,-13.7808559 4.571293,-13.912774 0.778294,-0.8170836 0.648678,5.101696 -0.410354,18.738511 -1.077155,13.870177 -0.958217,18.115245 0.636237,22.708211 1.769427,5.096985 6.05335,8.865891 12.852802,11.307625 1.079447,0.387637 5.603576,1.740035 10.05362,3.005328 4.450043,1.265293 8.197185,2.402512 8.326981,2.527153 0.363817,0.349368 -1.116723,0.521169 -6.83447,0.793071 -5.889315,0.280061 -9.238735,0.848592 -13.64281,2.315733 -7.475336,2.490279 -12.647715,6.23639 -16.227756,11.753004 -2.691895,4.148037 -4.080999,7.456733 -6.265966,14.924861 -1.512624,5.17009 -5.389672,16.97117 -6.243059,19.00282 l -0.394145,0.93834 z"
        />
      </g>
    </Sparkle>
  );
};

export default SparkleComponent;
