import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { AuthorsNote } from "../../components/PuzzleLayout";
import green from "./assets/green.png";

const SizedImage = styled(LinkedImage)`
  display: block;
  width: 25%;
  margin: auto;
`;

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">
        These pages are scattered about at random like that indigestible Cain’s
        Jawbone that someone keeps going on about, but the narrative seems to be
        about what’s happened over the course of the day in MITropolis since
        midnight last night. At least every character has an equal chance to say
        their piece.
      </p>
      <p className="puzzle-flavor">How should we confront the killer?</p>
      <AuthorsNote>
        Pages are numbered for your convenience. The given numbering is not
        puzzle content.
      </AuthorsNote>
      <SizedImage src={green} alt="The Green Building" />
    </>
  );
};

export default Puzzle;
