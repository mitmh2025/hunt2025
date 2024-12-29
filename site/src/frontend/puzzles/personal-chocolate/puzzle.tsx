import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { HScrollTableWrapper } from "../../components/StyledUI";
import audio1 from "./assets/1.mp3";
import audio10a from "./assets/10a.mp3";
import audio10b from "./assets/10b.mp3";
import audio11 from "./assets/11.mp3";
import audio12 from "./assets/12.mp3";
import audio13 from "./assets/13.mp3";
import audio14 from "./assets/14.mp3";
import audio15 from "./assets/15.mp3";
import audio16 from "./assets/16.mp3";
import audio17a from "./assets/17a.mp3";
import audio17b from "./assets/17b.mp3";
import audio18 from "./assets/18.mp3";
import audio2 from "./assets/2.mp3";
import audio3a from "./assets/3a.mp3";
import audio3b from "./assets/3b.mp3";
import audio4 from "./assets/4.mp3";
import audio5 from "./assets/5.mp3";
import audio6a from "./assets/6a.mp3";
import audio6b from "./assets/6b.mp3";
import audio7 from "./assets/7.mp3";
import audio8 from "./assets/8.mp3";
import audio9 from "./assets/9.mp3";
import image from "./assets/image.png";

const StyledTable = styled.table`
  margin-top: 1em;
  border-collapse: collapse;
  td {
    padding: 8px;
    height: 72px;
    border: 1px solid black;
    span {
      display: flex;
      align-items: center;
      gap: 16px;
    }
  }
`;

const DATA = [
  [{ audio: audio1, ipa: "/tɹu ve læŋ gɹɑp su vɑn/" }],
  [{ audio: audio2, ipa: "/d͡ʒist d͡ʒæst fɑv ut/" }],
  [
    { audio: audio3a, ipa: "/oŋ gɹɑ sæ/" },
    { audio: audio3b, ipa: "/vun/" },
  ],
  [{ audio: audio4, ipa: "/slɑd dog bɹɑd fæv/" }],
  [{ audio: audio5, ipa: "/nim sæk əv d͡ʒʌ lɑ sæks/" }],
  [
    { audio: audio6a, ipa: "/non fɑd/" },
    { audio: audio6b, ipa: "/fuv/" },
  ],
  [{ audio: audio7, ipa: "/gɹut en dæ ɑn kuŋ ɑt/" }],
  [{ audio: audio8, ipa: "/e buv jɑ æt/" }],
  [{ audio: audio9, ipa: "/in un dæŋ nɑn/" }],
  [
    { audio: audio10a, ipa: "/tɹo sɑp/" },
    { audio: audio10b, ipa: "/fuv/" },
  ],
  [{ audio: audio11, ipa: "/kiz mɛk diɹt fuv fɑɹ/" }],
  [{ audio: audio12, ipa: "/dɑ loʃ ɑs fæv/" }],
  [{ audio: audio13, ipa: "/pɹu i lɛm pʌ ɑn fæv/" }],
  [{ audio: audio14, ipa: "/mu ɹin mɛs ʌl sɑ væn/" }],
  [{ audio: audio15, ipa: "/nit fuls hæd fɑv/" }],
  [{ audio: audio16, ipa: "/gɹɛt bɹʌt ən flɛg fæv fɑɹ/" }],
  [
    { audio: audio17a, ipa: "/on ʃɑnt swæd/" },
    { audio: audio17b, ipa: "/suks/" },
  ],
  [{ audio: audio18, ipa: "/twist sɛ din lu sʌks/" }],
];

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">
        There are no menus here, just an incomprehensible chart that someone has
        drawn symbols on.
      </p>
      <LinkedImage
        src={image}
        alt="Eighteen beer taps. From left to right: Tree House Brewing Co., Sixpoint Brewery, Ekim Brewing Co., Uinta Brewing, Industrial Arts Brewing Company, Great Divide Brewing Co., Firestone Walker Brewing Company, Sierra Nevada, Avery Brewing, Elysian Brewing, Kane Brewing Company, Alaskan Brewing Company, Surly Brewing Co., Deschutes Brewery, Rhinegeist Brewery, Maine Beer Company, Manhattan Brewing Co, Tröegs Independent Brewing"
      />
      <HScrollTableWrapper>
        <StyledTable>
          {DATA.map((row, i) => (
            <tr key={`row-${i}`}>
              {row.map(({ audio, ipa }, j) => (
                <td key={`cell-${i}-${j}`} colSpan={row.length === 1 ? 2 : 1}>
                  <span>
                    {/* eslint-disable-next-line jsx-a11y/media-has-caption -- transcript provided inline */}
                    <audio controls src={audio} />
                    {ipa}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </StyledTable>
      </HScrollTableWrapper>
    </>
  );
};

export default Puzzle;
