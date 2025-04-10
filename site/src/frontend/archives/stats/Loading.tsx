import React from "react";
import { keyframes, styled } from "styled-components";

const SpinnerAnimation = keyframes`
  100% {transform: rotate(1turn)}
`;

const Spinner = styled.div`
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  border-radius: 50%;
  background:
    linear-gradient(
        0deg,
        rgb(from var(--white) r g b/50%) 30%,
        rgb(from var(--white) r g b/0%) 0 70%,
        rgb(from var(--white) r g b/100%) 0
      )
      50%/8% 100%,
    linear-gradient(
        90deg,
        rgb(from var(--white) r g b/25%) 30%,
        rgb(from var(--white) r g b/0%) 0 70%,
        rgb(from var(--white) r g b/75%) 0
      )
      50%/100% 8%;
  background-repeat: no-repeat;
  animation: ${SpinnerAnimation} 1s infinite steps(12);
  &::before,
  &::after {
    content: "";
    grid-area: 1/1;
    border-radius: 50%;
    background: inherit;
    opacity: 0.915;
    transform: rotate(30deg);
  }
  &::after {
    opacity: 0.83;
    transform: rotate(60deg);
  }
`;

const Loading = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
    <Spinner /> Computing additional statistics...
  </div>
);

export default Loading;
