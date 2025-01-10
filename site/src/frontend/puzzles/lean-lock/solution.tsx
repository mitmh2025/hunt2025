import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import andorra from "./assets/andorra.png";
import belgium from "./assets/belgium.png";
import completed from "./assets/completed.png";
import guinea from "./assets/guinea.png";
import mali from "./assets/mali.png";
import romania from "./assets/romania.png";

const SizedImage = styled(LinkedImage)`
  display: block;
  width: 400px;
  margin: auto;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle is an interactive web of words, in the style of{" "}
        <a
          href="https://funny-farm.appspot.com/game/farm"
          target="_blank"
          rel="noreferrer"
        >
          Funny Farm
        </a>
        . Initially solvers just see nodes labeled BELGIUM and GUINEA, connected
        by lines to other yet-unlabeled nodes.
      </p>
      <p>
        With two country names visible, solvers may infer that the other nodes
        should also be country names. Eventually solvers may stumble upon MALI
        connected to GUINEA or ROMANIA and CHAD connected to BELGIUM. Correctly
        entering country names exposes more and more of the grid. At this point,
        solvers may realize that while these countries are not necessarily
        related by location or language, they do have very similar flags! For
        example, the flag of GUINEA:
      </p>
      <SizedImage
        src={guinea}
        alt="The flag of Guinea. It has three equal-sized vertical stripes. From left to right, they are red, yellow, and green."
      />
      <p>
        is a 180 degree rotation of the flag of MALI (up to small variations in
        shade):
      </p>
      <SizedImage
        src={mali}
        alt="The flag of Mali. It has three equal-sized vertical stripes. From left to right, they are green, yellow, and red."
      />
      <p>And the flag of BELGIUM:</p>
      <SizedImage
        src={belgium}
        alt="The flag of Belgium. It has three equal-sized vertical stripes. From left to right, they are black, yellow, and red."
      />
      <p>differs by only one color from the flag of ROMANIA:</p>
      <SizedImage
        src={romania}
        alt="The flag of Romania. It has three equal-sized vertical stripes. From left to right, they are blue, yellow, and red."
      />
      <p>
        In addition to the rectangular nodes which contain countries, solvers
        will also find oval nodes which do not appear to contain country names.
        These nodes are attached (via dotted lines) to magenta edges connecting
        two flags which differ by the presence of some charge, i.e. some element
        added to the flag. For example, ROMANIA (see above) can be combined with
        a SHIELD to get the flag of ANDORRA:
      </p>
      <SizedImage
        src={andorra}
        alt="The flag of Andorra. It has three equal-sized vertical stripes. From left to right, they are blue, yellow, and red. In the middle of the yellow stripe isi the coat of arms of Andorra."
      />
      <p>
        The oval nodes contain the descriptions of the charges, with
        enumerations given to disambiguate.
      </p>
      <p>The full list of transformations is:</p>
      <ol>
        <li>
          Black arrows change one color of the flag (from black to a rainbow
          color, or forward in the rainbow, or from a rainbow color to white)
        </li>
        <li>Blue curved lines rotate a flag</li>
        <li>Orange squiggles permute the colors of a flag</li>
        <li>Pink lines combine a flag and a charge</li>
        <li>
          Double purple lines connect flags which are equivalent (up to small
          changes in shade)
        </li>
      </ol>
      <p>The completed grid is:</p>
      <LinkedImage
        src={completed}
        alt="A completed funny farm grid showing many different kinds of lines connecting flags of many different countries."
      />
      <p>
        One oval node is highlighted in yellow and labeled ANSWER (4). This
        connects the flag of PERU to the flag of CANADA, which differ by the
        presence of a LEAF, which is the answer.
      </p>
    </>
  );
};

export default Solution;
