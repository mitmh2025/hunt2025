import React from "react";
import { styled } from "styled-components";
import img01 from "./assets/img01.png";
import img02 from "./assets/img02.png";
import img03 from "./assets/img03.png";
import img04 from "./assets/img04.png";
import img05 from "./assets/img05.png";
import img06 from "./assets/img06.png";
import img07 from "./assets/img07.png";
import img08 from "./assets/img08.png";
import img09 from "./assets/img09.png";
import img10 from "./assets/img10.png";
import img11 from "./assets/img11.png";
import img12 from "./assets/img12.png";
import img13 from "./assets/img13.png";
import img14 from "./assets/img14.png";
import img15 from "./assets/img15.png";
import img16 from "./assets/img16.png";
import img17 from "./assets/img17.png";
import img18 from "./assets/img18.png";
import img19 from "./assets/img19.png";
import img20 from "./assets/img20.png";
import img21 from "./assets/img21.png";
import img22 from "./assets/img22.png";
import img23 from "./assets/img23.png";
import img24 from "./assets/img24.png";
import img25 from "./assets/img25.png";
import img26 from "./assets/img26.png";
import img27 from "./assets/img27.png";
import PuzzleImage from "../../components/PuzzleImage";

const Mono = styled.span`
  font-family: monospace;
`;

const FlexFullWidth = styled.div`
  width: 100%;
  padding: 0px 16px;
  display: flex;
  gap: 16px;
  & > * {
    flex: 1 1 calc(50% - 16px);
  }
`;

const SizedWrapper = styled.div`
  width: 100%;
`;

const PUZZLE_IMAGE_ALT_TEXT =
  "An orthographic projection of a 3-dimensional object. The projection is outlined in blue, with dotted lines indicating shape on the underside of the object. In the bottom right of the image is text 'Just Plane Wrong', and a logo for 'The MITropolis Design Group.'";

const Solution = () => {
  return (
    <>
      <p>
        This puzzle is presented as a series of orthographic projections (3-view
        drawings). When recreated in 3D each drawing creates a 3D object. These
        3D objects are essentially puzzle pieces. By assembling them together
        you get a 3D model of a <Mono>FIRE EXTINGUISHER</Mono>.
      </p>
      <FlexFullWidth>
        <PuzzleImage src={img01} alt={PUZZLE_IMAGE_ALT_TEXT} />
        <PuzzleImage
          src={img14}
          alt="A 3D rendering of the handle of a fire extinguisher."
        />
      </FlexFullWidth>
      <FlexFullWidth>
        <PuzzleImage src={img02} alt={PUZZLE_IMAGE_ALT_TEXT} />
        <PuzzleImage
          src={img15}
          alt="A 3D rendering of the hose of a fire extinguisher."
        />
      </FlexFullWidth>
      <FlexFullWidth>
        <PuzzleImage src={img03} alt={PUZZLE_IMAGE_ALT_TEXT} />
        <PuzzleImage
          src={img16}
          alt="A 3D rendering of part of the operating lever of a fire extinguisher."
        />
      </FlexFullWidth>
      <FlexFullWidth>
        <PuzzleImage src={img04} alt={PUZZLE_IMAGE_ALT_TEXT} />
        <PuzzleImage
          src={img17}
          alt="A 3D rendering of a cuboid slice of the top half of the tank of a fire extinguisher."
        />
      </FlexFullWidth>
      <FlexFullWidth>
        <PuzzleImage src={img05} alt={PUZZLE_IMAGE_ALT_TEXT} />
        <PuzzleImage
          src={img18}
          alt="A 3D rendering of a cuboid slice of the bottom half of the tank of a fire extinguisher."
        />
      </FlexFullWidth>
      <FlexFullWidth>
        <PuzzleImage src={img06} alt={PUZZLE_IMAGE_ALT_TEXT} />
        <PuzzleImage
          src={img19}
          alt="A 3D rendering of the hemispherical top of a fire extinguisher, including part of the valve, and with a cuboid slice taken out."
        />
      </FlexFullWidth>
      <FlexFullWidth>
        <PuzzleImage src={img07} alt={PUZZLE_IMAGE_ALT_TEXT} />
        <PuzzleImage
          src={img20}
          alt="A 3D rendering of part of the valve of a fire extinguisher."
        />
      </FlexFullWidth>
      <FlexFullWidth>
        <PuzzleImage src={img08} alt={PUZZLE_IMAGE_ALT_TEXT} />
        <PuzzleImage
          src={img21}
          alt="A 3D rendering of part of the operating lever of a fire extinguisher."
        />
      </FlexFullWidth>
      <FlexFullWidth>
        <PuzzleImage src={img09} alt={PUZZLE_IMAGE_ALT_TEXT} />
        <PuzzleImage
          src={img22}
          alt="A 3D rendering of the pin of a fire extinguisher."
        />
      </FlexFullWidth>
      <FlexFullWidth>
        <PuzzleImage src={img10} alt={PUZZLE_IMAGE_ALT_TEXT} />
        <PuzzleImage
          src={img23}
          alt="A 3D rendering of the part of the tank of a fire extinguisher with a cuboid slice taken out."
        />
      </FlexFullWidth>
      <FlexFullWidth>
        <PuzzleImage src={img11} alt={PUZZLE_IMAGE_ALT_TEXT} />
        <PuzzleImage
          src={img24}
          alt="A 3D rendering of part of the tank of a fire extinguisher, with several cuboid slices taken out."
        />
      </FlexFullWidth>
      <FlexFullWidth>
        <PuzzleImage src={img12} alt={PUZZLE_IMAGE_ALT_TEXT} />
        <PuzzleImage
          src={img25}
          alt="A 3D rendering of part of the tank of a fire extinguisher, with several cuboid slices taken out."
        />
      </FlexFullWidth>
      <FlexFullWidth>
        <PuzzleImage src={img13} alt={PUZZLE_IMAGE_ALT_TEXT} />
        <PuzzleImage
          src={img26}
          alt="A 3D rendering of the nozzle of a fire extinguisher."
        />
      </FlexFullWidth>
      <SizedWrapper>
        <PuzzleImage
          src={img27}
          alt="A 3D rendering of a fire extinguisher, assembled from the 3D renderings above."
        />
      </SizedWrapper>
    </>
  );
};

export default Solution;
