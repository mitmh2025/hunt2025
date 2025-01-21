import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { AuthorsNote } from "../../components/PuzzleLayout";
import untitled1 from "./assets/untitled1.jpg";
import untitled2 from "./assets/untitled2.png";
import untitled3 from "./assets/untitled3.png";
import untitled4 from "./assets/untitled4.png";
import untitled5 from "./assets/untitled5.png";
import untitled6 from "./assets/untitled6.png";
import untitled7 from "./assets/untitled7.jpg";

const Art = styled.div`
  margin-top: 2rem;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">
        We cordially invite you to examine MoMH—the Museum of Mystery
        Hunt—currently on display at the Gala.
      </p>

      <AuthorsNote as="div">
        <p>
          During Mystery Hunt, the following pieces of artwork were displayed on
          easels around the Gala with labels as shown:
        </p>

        <Art>
          <LinkedImage src={untitled1} alt="Untitled 1 (2018)" />
          <br />
          Untitled 1 (2018)
        </Art>

        <Art>
          <LinkedImage src={untitled2} alt="Untitled 2 (2020)" />
          <br />
          Untitled 2 (2020)
        </Art>

        <Art>
          <LinkedImage src={untitled3} alt="Untitled 3 (2017)" />
          <br />
          Untitled 3 (2017)
        </Art>

        <Art>
          <LinkedImage src={untitled4} alt="Untitled 4 (2018)" />
          <br />
          Untitled 4 (2018)
        </Art>

        <Art>
          <LinkedImage src={untitled5} alt="Untitled 5 (2015)" />
          <br />
          Untitled 5 (2015)
        </Art>

        <Art>
          <LinkedImage src={untitled6} alt="Untitled 6 (2019)" />
          <br />
          Untitled 6 (2017)
        </Art>

        <Art>
          <LinkedImage src={untitled7} alt="Untitled 7 (2016)" />
          <br />
          Untitled 7 (2022)
        </Art>
      </AuthorsNote>
    </>
  );
};

export default Puzzle;
