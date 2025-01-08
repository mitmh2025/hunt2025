import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import audio from "./assets/audio.mp3";
import background from "./assets/background.png";
import center from "./assets/center.png";
import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";
import image4 from "./assets/image4.png";
import image5 from "./assets/image5.png";
import image6 from "./assets/image6.png";
import image7 from "./assets/image7.png";
import image8 from "./assets/image8.png";

const PuzzleWrapper = styled.div`
  height: 1600px;
`;

const StyledOl = styled.ol`
  margin-bottom: 200px;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
  width: 1000px;
`;

const StyledDiv = styled.div`
  width: 800px;
  height: 800px;
`;

const BackgroundImage = styled.img`
  width: 800px;
`;

const PositionedImage = styled(LinkedImage)<{
  $left: number;
  $rotate: number;
  $top: number;
}>`
  width: 136px;
  height: 136px;
  position: absolute;
  transform: translate(-50%, -50%) rotate(${({ $rotate }) => $rotate}deg);
  left: ${({ $left }) => $left}px;
  top: ${({ $top }) => $top}px;
`;

const PositionedAudio = styled.audio`
  position: absolute;
  transform: translate(-50%, -50%) rotate(180deg);
  left: 588.8px;
  top: 211.2px;
  height: 18.5px;
  width: 130px;
  border-radius: 18.5px;
`;

const Center = styled(LinkedImage)`
  width: 310.56px;
  height: 310.56px;
  border-radius: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 500px;
  top: 400px;
`;

const Box = ({ id }: { id: string }): JSX.Element => {
  useEffect(() => {
    gsap.registerPlugin(Draggable);

    Draggable.create(`#${id}`, {
      allowContextMenu: true,
      type: "rotation",
      onDragEnd: function () {
        gsap.to(`#${id}`, {
          rotation: gsap.utils.snap(45, this.rotation as number),
        });
      },
      snap: {
        rotation: gsap.utils.snap(45),
      },
    });

    gsap.set(`#${id}`, { transformOrigin: "center" });
  }, [id]);

  return (
    <StyledDiv id={id}>
      <BackgroundImage
        src={background}
        alt="A wood-grain box with eight inset slots, and words carved around the edges. Clockwise, these words read: EXPO, EXTRUDED, EYES, SHOT, SURVEYOR, SCUM, WOLF, WHOMEVER, WARD, NICE, NONPOLAR, NOIR"
      />
      <PositionedImage
        $rotate={180}
        $left={211.2}
        $top={211.2}
        src={image1}
        alt="A 4x4 grid with rainbow colors, with each square having a different gradient. Each grid square has two to six letters in it, and most squares have a thick black line segment as well."
      />
      <PositionedImage
        $rotate={-135}
        $left={400}
        $top={133.04}
        src={image2}
        alt="Eleven constellations, drawn with dots and lines in white. Each is annotated with a Greek letter and a number, both in cyan. Criss-crossing, arcing blue lines form a toroidal shape behind the constellations, against a black background."
      />
      <PositionedImage
        $rotate={180}
        $left={588.8}
        $top={211.2}
        src={image3}
        alt="A green background with a gold border around an audio player."
      />
      {/*
       * styled-components breaks the lint for jsx-a11y/media-has-caption here,
       * but in any case we are not including one as it would spoil the puzzle
       */}
      <PositionedAudio controls src={audio} />
      <PositionedImage
        $rotate={-135}
        $left={666.58}
        $top={400}
        src={image4}
        alt="Six images, each annotated with a number. From left to right, top to bottom, these are: a semiconductor wafer (3), a pink-purple gas-discharge lamp (6), a matchbox (7), a balloon (1), toothpaste (2 5), the Hindenburg exploding (4)"
      />
      <PositionedImage
        $rotate={0}
        $left={588.8}
        $top={588.8}
        src={image5}
        alt="A chessboard, with pieces showing a game in progress. Each square on the board has a letter in the opposite color."
      />
      <PositionedImage
        $rotate={45}
        $left={400}
        $top={666.58}
        src={image6}
        alt="A Fibonacci spiral. Each square within the spiral has a number and a color. From largest to smallest, these are: red square numbered 34, green square numbered 22, red square numbered 33, blue square numbered 1, red square numbered 29, beige square numbered 23, red square numbered 21, green square numbered 23, red square numbered 13, red square numbered -3."
      />
      <PositionedImage
        $rotate={0}
        $left={211.2}
        $top={588.8}
        src={image7}
        alt="A tic-tac-toe board. Some squares have more than one X or O. To the right of the board is a mechanism with a button on a metal flange. Below the board are six groups of miniature tic-tac-toe grids containing arrows instead of X’s and O’s."
      />
      <PositionedImage
        $rotate={45}
        $left={133.04}
        $top={400}
        src={image8}
        alt="An abacus, split into three side-by-side segments, with six rows of rainbow-colored beads, one color per row. Below the abacus are a series of math equations: sixty four divided by eight equals fourteen, nine times two equals sixteen, ten divided by two equals seven, ten minus five equals thirteen, two to the power of nine equals two, eight times six equals twelve, fifty four divided by six equals one, ten to the power of nine equals eight, sixty one plus forty equals three, twenty nine times four equals fifteen, zero plus seven equals nine, thirty six plus thirty three equals five, twelve minus two equals seventeen, ten to the power of ten equals ten, twenty seven times three equals eleven, sixty divided by five equals six, twenty minus twenty equals four"
      />
    </StyledDiv>
  );
};

const App = (): JSX.Element => {
  return (
    <>
      <PuzzleWrapper>
        <h3>Puzzle Box Instructions:</h3>
        <StyledOl>
          <li>
            Glance over the chessboard, and focus on the squares that white
            pieces attack more than black. Then, find the mate in three to
            deduce what to do with those squares (ignore variational mate
            differences).
          </li>
          <li>
            Label each object with its main element, then identify their
            corresponding atomic number.
          </li>
          <li>
            Acknowledge the stereogram encoded in the wood paneling pattern.
          </li>
          <li>
            Subtract each integer (take the absolute difference) from its
            associated number from the Fibonacci sequence.
          </li>
          <li>Scrutinize the Tic-Tac-Toe board encoded with Morse.</li>
          <li>
            Observe all the constellations, index into their names, and order
            via their corresponding greek letter label.
          </li>
          <li>
            Notice the music layered over itself thematically, then ascertain
            the missing words.
          </li>
          <li>
            Inspect the inscriptions along the edge of the perimeter, then
            rotate them into the correct cardinal orientation.
          </li>
          <li>
            Organize the tiles in the fifteen-puzzle, sliding them about to
            create a seamless gradient.
          </li>
          <li>
            Number the equations according to the RHS, then solve for the
            correct LHS answer in words and assign each one to an abacus rack.
          </li>
        </StyledOl>
        <FlexWrapper>
          <Box id="box" />
          <Center
            src={center}
            alt="A wood-grain plate with sets of blanks etched around the edges. Clockwise, these read: _ _ 18 9 _ _ 30 21, _ _ 17 10 _ _ 27 1, 20 _ 31 33 _ 3 _ 7, 13 _ _ 16 _ 15 _ 22, _ _ 14 _ 4 _ 26 29, 25 _ _ 12 _ 32 23, _ 24 6 _ _ 19 _ 2, _ _ 5 8 _ 11 _ 28"
          />
        </FlexWrapper>
      </PuzzleWrapper>
    </>
  );
};

const elem = document.getElementById("the-center-is-in-plain-sight-root");
if (elem) {
  const root = createRoot(elem);
  root.render(<App />);
} else {
  console.error(
    "Could not mount App because #the-center-is-in-plain-sight-root was nowhere to be found",
  );
}
