import React from "react";
import { styled } from "styled-components";

const StyledImg = styled.img`
  width: 100%;
`;

interface PuzzleImageProps {
  alt: string;
  src: string;
}

/**
 * Convenience wrapper for an image embedded in a puzzle that should open a full-size version of itself in a new tab when clicked.
 * Expands to fill the width of its parent.
 */
const PuzzleImage = ({ alt, src }: PuzzleImageProps): JSX.Element => {
  return (
    <a href={src} target="_blank" rel="noreferrer">
      <StyledImg src={src} alt={alt} />
    </a>
  );
};

export default PuzzleImage;
