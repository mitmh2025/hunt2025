import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";
import image4 from "./assets/image4.png";
import image5 from "./assets/image5.png";
import image6 from "./assets/image6.png";

const Mono = styled.span`
  font-family: monospace;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle is about autostereograms (a.k.a. Magic Eyes). The initial
        presentation of the puzzle is two columns of text. Treating those as a
        magic eye by letting your eyes converge at infinity, several words will
        appear to float above the text (as hinted by the content of the text
        itself). Those words are{" "}
        <Mono>CALL IN LOOK A LITTLE CLOSER FOR PART TWO</Mono>. Calling in{" "}
        <Mono>LOOK A LITTLE CLOSER</Mono> gives a link to the second half of the
        puzzle.
      </p>
      <p>
        The provided image itself looks like it could be a typical stereogram,
        but just staring through it as usual won’t reveal anything.
      </p>
      <LinkedImage
        src={image1}
        alt="A large autostereogram made out of thin black monospace serif text on a white background. The text itself is comprised of fragments of lorem ipsum."
      />
      <p> Instead, solvers need to look closer at the content:</p>
      <LinkedImage
        src={image2}
        alt="A closeup of the previous autostereogram. The individual lorem ipsum characters are readily visible."
      />
      <p>
        The first two lines are a slightly corrupted version of “lorem” and
        “ipsum” respectively, and indeed all of the lines are various
        corruptions of words and phrases from the typical Lorem Ipsum filler
        text. This is intended to hint to solvers that the exact text is not the
        key to this puzzle.
      </p>
      <p>
        Zoomed in at this layer, there is a lot of repetition within the lines
        of text, and the period of repetition is the same on every line. In
        fact, this text comprises a textual autostereogram, just like part 1.
        Viewing this like a typical Magic Eye and allowing the repeated blocks
        of text to overlap reveals that individual letters on each line appear
        to pop “up” above the page. The highlighted letters are{" "}
        <Mono>DELETE ALL BUT DOTTED LETTER</Mono>.
      </p>
      <p>
        If solvers can’t see autostereograms themselves, one of a number of{" "}
        <a
          href="https://magiceye.ecksdee.co.uk/"
          target="_blank"
          rel="noreferrer"
        >
          online tools
        </a>{" "}
        can be used. That tool doesn’t perfectly replicate the experience of
        viewing the image, but it’s sufficient to reveal the content:
      </p>
      <LinkedImage
        src={image3}
        alt="A closeup of the solved autostereogram. The text is now white on black. Letters spelling out ‘delete all but dotted letter’ jump out from the image."
      />
      <p>
        <Mono>DELETE ALL BUT DOTTED LETTER</Mono> is a clue to the next step:
        Solvers need to remove most of the text from the image, leaving only the
        “dotted letter”, i.e. the lowercase `i`.
      </p>
      <p>
        Since the image is given as an SVG, this can be done programmatically or
        with some clever use of find-and-replace in a text editor. Removing all
        of the non-i letters and replacing them all with spaces, solvers, get a
        new version of the image, which looks like this:
      </p>
      <LinkedImage
        src={image4}
        alt="The original autostereogram but with all instances of the letter i removed. This image bears much more resemblance to a classical magic eye."
      />
      <p>
        This is, in fact, a traditional Magic Eye image. Again, this can be
        viewed directly or otherwise solved with a{" "}
        <a
          href="https://magiceye.ecksdee.co.uk/"
          target="_blank"
          rel="noreferrer"
        >
          tool
        </a>
        . This magic eye resolves to a plus sign inside a magnifying glass and a
        large arrow pointing directly down:
      </p>
      <LinkedImage
        src={image5}
        alt="The solved autostereogram. A white magnifying glass and arrow are readily visible in the image."
      />
      <p>
        The magnifying glass is a clue to zoom in, and the arrow gives a
        location. At this point, solvers may notice the border of letter `i`s at
        the top and bottom of the image, which have not yet been used. The arrow
        points directly down at that border, and, in fact, points at exactly one
        of the `i`s in the lower border.
      </p>
      <p>
        Looking very closely at that part of the image reveals that the answer
        has been hiding in the dot of the “magic” i:
      </p>
      <LinkedImage
        src={image6}
        alt="A very zoomed in portion of the autostereogram showing three lowercase letter I in a row. The middle I, instead of having a dot, has the word ‘insect’."
      />
      <p>
        The final answer is{" "}
        <Mono>
          <strong>INSECT</strong>
        </Mono>
        .
      </p>
      <p>
        Author’s note: The location tip of the arrow is ambiguous, since it
        consists of separate parts of the image which your brain combines into a
        coherent 3D shape. To ensure that the puzzle works no matter which eye’s
        image dominates, the answer is actually hidden in two places separated
        by the tile width of the stereogram.
      </p>
    </>
  );
};

export default Solution;
