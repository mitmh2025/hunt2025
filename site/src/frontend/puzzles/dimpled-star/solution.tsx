import React from "react";
import LinkedImage from "../../components/LinkedImage";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";

const KATRINA_COLOR = "#ff7a00";
const PAPA_COLOR = "#0072cd";
const GLADYS_COLOR = "#fe0a9c";
const CARTER_COLOR = "#8f0100";

const Solution = () => {
  return (
    <>
      <p>
        The round page presents a logic puzzle around Papa’s, Gladys’s,
        Carter’s, and Katrina’s paths on the map. With each puzzle solve, a
        witness offers new information concerning which characters passed
        through a certain block. With each submeta solve, Billie provides a
        special movement rule for the associated character. When a team solves
        their fourth submeta, Billie also provides global high-level rules for
        all characters. The puzzle is over-defined and designed to be solved
        without all of the witness statements, and the four paths can be solved
        independently. Note the one-way streets which restrict movement in cars.
      </p>
      <p>
        The solutions are as follows for Katrina (route shown in{" "}
        <span style={{ color: KATRINA_COLOR }}>orange</span>) , Papa (route
        shown in <span style={{ color: PAPA_COLOR }}>blue</span>), Gladys (route
        shown in <span style={{ color: GLADYS_COLOR }}>pink</span>; in a taxi to
        jewelry store, then on foot to the flower shop, then driven by Rover),
        and Carter (route shown in{" "}
        <span style={{ color: CARTER_COLOR }}>burgundy</span>):
      </p>
      <LinkedImage
        src={image1}
        alt="A street map of MITropolis, showing the paths of each suspect as they traveled through the city."
      />
      <p>
        Next, notice that each character’s path goes through exactly as many
        intersections as there are letters in that character’s corresponding
        meta answer. The intersections can be labeled along the direction of
        travel with the letters of the answer. Character paths that cross assign
        the same label to the intersection, offering further confirmation, and
        every intersection is covered.
      </p>
      <LinkedImage
        src={image2}
        alt="The same map as before, but each intersection is annotated with a letter from the name of the character or characters passing through it."
      />
      <p>
        If this constraint is discovered early, using the answer lengths and
        letter restrictions where paths cross can significantly reduce the
        number of clues necessary to establish each character’s path.
      </p>
      <p>
        Meanwhile, once a team has solved their fourth location submeta, Billie
        summons them to the Gala Bar to discuss their findings. Before they
        arrive, Billie spots a key witness outside, and chases after her. Teams
        follow Billie through the halls of MIT, via Billie’s voiceover over the
        radio narrating their actions. However, since this universe is noir,
        everything is black and white. The only colors Billie refers to are
        black, white, or grey (which is everything not black or white).
        Periodically, the runaround stops at a blue paw print (a Blue’s—or
        Grey’s—Clue), which Billie identifies as tracks left by the witness
        <a href="#footnote">
          <sup id="antifootnote">1</sup>
        </a>
        . Billie strongly suggests that the team should record the location in a
        handy-dandy notebook or equivalent. The route can be seen in the video
        here:
      </p>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/9XjTJp2fDPQ?"
        title="The Runaround"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <p>
        The runaround path stops at a campus map stand in lobby 7, and a final
        message refers back to the map that was picked up along the way, as well
        as a different map (which is the MITropolis map). Two stops along the
        runaround path are identified—the intersection of E and 3rd corresponds
        to Lobby 10 and the intersection of E and 9th street corresponds with
        the East Campus Goodale entrance. This information allows the solver to
        overlay the two maps. A few moments of scaling and rotating the campus
        map should reveal a nice correspondence. Notably, the intersection next
        to the boardwalk corresponds to the sailing pavilion, the river and park
        are preserved, and—quite by accident—the airport corresponds to the
        Wright Brothers Wind Tunnel. The note which links to this puzzle appears
        near the intersection of H and 7th, corresponding to the runaround start
        location in Stata.
      </p>
      <LinkedImage
        src={image3}
        alt="The same map as before, but overlaid with a map of MIT campus. Each intersection letter lines up with a campus building."
      />
      <p>
        Each of the paw-print locations in the runaround can now be mapped to a
        letter.
      </p>
      <ul>
        <li>
          Building 32: <Mono>R</Mono>
        </li>
        <li>
          Building 36: <Mono>A</Mono>
        </li>
        <li>
          Lobby 34: <Mono>C</Mono>
        </li>
        <li>
          Building 37: <Mono>E</Mono>
        </li>
        <li>
          West side of building 13: <Mono>D</Mono>
        </li>
        <li>
          East side of building 13: <Mono>I</Mono>
        </li>
        <li>
          Building 3-mid: <Mono>S</Mono>
        </li>
        <li>
          Southwest corner of building 1: <Mono>E</Mono>
        </li>
        <li>
          Lobby 10: <Mono>D</Mono>
        </li>
        <li>
          Building 54: <Mono>I</Mono>
        </li>
        <li>
          The east parallel of East Campus (Building 64): <Mono>R</Mono>
        </li>
      </ul>
      <p>
        Taken in reverse order (looking back through our steps, per the
        voiceover), they spell the instruction for confronting the thief:{" "}
        <PuzzleAnswer>RIDE SIDECAR</PuzzleAnswer>.
      </p>
      <h3>Author’s Note</h3>
      <p>
        Solvers may not have counted, but there are exactly fifty uses of “grey”
        in the puzzle. We’re (not) sorry.
      </p>
      <h3>Song acknowledgements</h3>
      <p>
        The video walkthrough uses the following songs, all from Kevin MacLeod (
        <a href="incompetech.com" target="_blank" rel="noreferrer">
          incompetech.com
        </a>
        ), licensed under Creative Commons: By Attribution 4.0 (
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noreferrer"
        >
          https://creativecommons.org/licenses/by/4.0/
        </a>
        ):
      </p>
      <ul>
        <li>I Knew a Guy</li>
        <li>Bass Walker</li>
        <li>Hard Boiled</li>
        <li>Cool Vibes</li>
        <li>Walking Along</li>
        <li>Covert Affair</li>
        <li>On the Cool Side</li>
        <li>Dances and Dames</li>
        <li>Backed Vibes Clean</li>
        <li>Just as Soon</li>
      </ul>
      <hr />
      <a href="#antifootnote">
        <sup id="footnote">1</sup>
      </a>{" "}
      Nowhere in the rule book does it say a dog can’t appraise diamonds.
    </>
  );
};

export default Solution;
