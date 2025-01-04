import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { HScrollTableWrapper } from "../../components/StyledUI";
import img1 from "./assets/img1.png";
import img10 from "./assets/img10.png";
import img11 from "./assets/img11.png";
import img12 from "./assets/img12.png";
import img13 from "./assets/img13.png";
import img14 from "./assets/img14.png";
import img15 from "./assets/img15.png";
import img2 from "./assets/img2.png";
import img3 from "./assets/img3.png";
import img4 from "./assets/img4.png";
import img5 from "./assets/img5.png";
import img6 from "./assets/img6.png";
import img7 from "./assets/img7.png";
import img8 from "./assets/img8.png";
import img9 from "./assets/img9.png";

const GRID = [
  "NUOFWEFQIPNCDFMDOCREEMFDLPALVNOLRXS",
  "WRFJLBWBDCSLPSFIIYKHNIBCUSABTODEKGE",
  "RTYUNAFRHWISALDJHFVAKLHRBGOOARHMYJF",
  "TLKAKSNEGMWAKWSACOBEPIFIXQCLEEZARWB",
  "OOLNCIVEABDFRYHMTRHFLHWSNYAOHNGSZBL",
  "MPBGKLRBGQNRQWSOHKGXLCFDPETGIAHAFAU",
  "ASXHRCOHNUAEJXINRAMHIYELRQSNLBSGLUE",
  "THPOZHXCHLSSKAFSNTSGVACLBKSEIAWNQYB",
  "OWYNDIIABKTNCTYEWBACWDIAWUESHHCAWRE",
  "KDRERCMECARBONARAPARMESANEDECYQKATR",
  "EADYHKNPSGKTNBRRDAXRQMSTCUQOTRHEKRR",
  "TRFBPEREMWVLOMCAOSIPGAAETHBSEEBJRLY",
  "CJPUDNOTOEQBCNYNFTLWNGLRWJGIEIWDMVN",
  "HAKTXLCIKIYBAYCOYELSWRCGYNKMWFATXAP",
  "ULBTFYPHLDCKRCINRDEYKQUEACOPSPRBSHK",
  "PAWEQOOWRVZJEQPFKFDQAUDRPTMFRYWGZXO",
  "YBPRNSPDALJYATSHGIRBPFKOBEBEEFCSPIU",
  "RTXUFRONGIHNDGDNSOIWSASLCLXOCWQEHDZ",
];

const StyledTable = styled.table`
  margin-bottom: 1em;
  font-family: "Roboto Mono", monospace;
  width: 100%;
  th,
  td {
    text-align: center;
  }
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-around;
`;

const SplotchWrapper = styled.table`
  vertical-align: center;
  border-spacing: 16px 0;
  td:nth-child(2) {
    width: 202px;
    height: 202px;
  }
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">This is flavortext.</p>
      <HScrollTableWrapper>
        <StyledTable>
          {GRID.map((row, i) => (
            <tr key={i}>
              {[...row].map((char, j) => (
                <td key={`${i}-${j}`}>{char}</td>
              ))}
            </tr>
          ))}
        </StyledTable>
      </HScrollTableWrapper>
      <FlexRow>
        <SplotchWrapper>
          <td>__</td>
          <td>
            <LinkedImage
              src={img1}
              alt="A splotch of pink with darker pink splotches in the center and lower left"
            />
          </td>
          <td>__</td>
        </SplotchWrapper>
      </FlexRow>
      <FlexRow>
        <SplotchWrapper>
          <td>__</td>
          <td>
            <LinkedImage src={img2} alt="A splotch of yellow" />
          </td>
          <td>__</td>
        </SplotchWrapper>
      </FlexRow>
      <FlexRow>
        <SplotchWrapper>
          <td>__</td>
          <td>
            <LinkedImage
              src={img3}
              alt="A splotch of lavender with several dark blue splotches in the lower left"
            />
          </td>
          <td>__</td>
        </SplotchWrapper>
      </FlexRow>
      <FlexRow>
        <SplotchWrapper>
          <td>__</td>
          <td>
            <LinkedImage
              src={img4}
              alt="A splotch of black with a splotch of yellow on the left and a splotch of hot pink in the lower right"
            />
          </td>
          <td>__</td>
        </SplotchWrapper>
      </FlexRow>
      <FlexRow>
        <SplotchWrapper>
          <td>__</td>
          <td>
            <LinkedImage
              src={img5}
              alt="A splotch of green with a splotch of green and a splotch of red in the lower left"
            />
          </td>
          <td>__</td>
        </SplotchWrapper>
      </FlexRow>
      <FlexRow>
        <SplotchWrapper>
          <td>__</td>
          <td>
            <LinkedImage
              src={img6}
              alt="A splotch of olive green with splotches of yellow and pink in the lower right. On the right is a splotch of white with a splotch of yellow inside it."
            />
          </td>
          <td>__</td>
        </SplotchWrapper>
      </FlexRow>
      <FlexRow>
        <SplotchWrapper>
          <td>__</td>
          <td>
            <LinkedImage
              src={img7}
              alt="A splotch of yellowish-orange with splotches of brown and white in the lower left. At the top is a splatter of red in a circle"
            />
          </td>
          <td>__</td>
        </SplotchWrapper>
      </FlexRow>
      <FlexRow>
        <SplotchWrapper>
          <td>__</td>
          <td>
            <LinkedImage
              src={img8}
              alt="A splotch of navy blue bisected by a white splotch. In the lower left is a splotch of brown with a splotch of yellow in the center, and a splotch of white in the center of the yellow splotch."
            />
          </td>
          <td>__</td>
        </SplotchWrapper>
      </FlexRow>
      <FlexRow>
        <SplotchWrapper>
          <td>__</td>
          <td>
            <LinkedImage
              src={img9}
              alt="A splotch of reddish gray, growing more saturated around the edges. In the lower left is a splotch of brown."
            />
          </td>
          <td>__</td>
        </SplotchWrapper>
      </FlexRow>
      <FlexRow>
        <SplotchWrapper>
          <td>__</td>
          <td>
            <LinkedImage
              src={img10}
              alt="A splotch of dark pink with a splotch of light pink in the middle. In the lower left is a splotch of even darker pink."
            />
          </td>
          <td>__</td>
        </SplotchWrapper>
      </FlexRow>
      <FlexRow>
        <SplotchWrapper>
          <td>__</td>
          <td>
            <LinkedImage
              src={img11}
              alt="A splotch of black with two large splotches of magenta at the top and a splotch of dark yellow at the bottom right."
            />
          </td>
          <td>__</td>
        </SplotchWrapper>
      </FlexRow>
      <FlexRow>
        <SplotchWrapper>
          <td>__</td>
          <td>
            <LinkedImage
              src={img12}
              alt="A splotch of electric blue with a splotch of darker blue in the center. On the bottom left are two splotches of red."
            />
          </td>
          <td>__</td>
        </SplotchWrapper>
      </FlexRow>
      <FlexRow>
        <SplotchWrapper>
          <td>__</td>
          <td>
            <LinkedImage
              src={img13}
              alt="A splotch of puce, a splotch of dark yellow, and a splotch of lavender. The lavender splotch has a darker purple center. To the lower left are several small purplish-yellow splotches."
            />
          </td>
          <td>__</td>
        </SplotchWrapper>
      </FlexRow>
      <FlexRow>
        <SplotchWrapper>
          <td>__</td>
          <td>
            <LinkedImage
              src={img14}
              alt="A splotch of red with a splotch of orange and a splotch of brighter red in the lower left"
            />
          </td>
          <td>__</td>
        </SplotchWrapper>
      </FlexRow>
      <FlexRow>
        <SplotchWrapper>
          <td>__</td>
          <td>
            <LinkedImage
              src={img15}
              alt="A splotch of navy blue with a splotch of green in the center. Another navy blue splotch is in the center of the green splotch. To the bottom left is a splotch of tan."
            />
          </td>
          <td>__</td>
        </SplotchWrapper>
      </FlexRow>
    </>
  );
};

export default Puzzle;
