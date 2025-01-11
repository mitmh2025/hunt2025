import React, { type ReactNode } from "react";
import { styled } from "styled-components";
import { HScrollTableWrapper } from "../../components/StyledUI";
import image_adder from "./assets/image_01.png";
import image_aped from "./assets/image_02.png";
import image_awn from "./assets/image_03.png";
import image_beefs from "./assets/image_04.png";
import image_bow from "./assets/image_05.png";
import image_dance from "./assets/image_06.png";
import image_dory from "./assets/image_07.png";
import image_dust from "./assets/image_08.png";
import image_ear from "./assets/image_09.png";
import image_fuji from "./assets/image_10.png";
import image_grub from "./assets/image_11.png";
import image_hew from "./assets/image_12.png";
import image_inferno from "./assets/image_13.png";
import image_joey from "./assets/image_14.png";
import image_limbs from "./assets/image_15.png";
import image_oaf from "./assets/image_16.png";
import image_old from "./assets/image_17.png";
import image_peel from "./assets/image_18.png";
import image_puke from "./assets/image_19.png";
import image_rum from "./assets/image_20.png";
import image_sails from "./assets/image_21.png";
import image_town from "./assets/image_22.png";
import image_two from "./assets/image_23.png";
import image_win from "./assets/image_24.png";

const Image = styled.img`
  width: 153px;
`;

const TableElement = styled.table`
  margin: 0 auto;
  td {
    text-align: center;
    vertical-align: middle;
  }
`;

const Table = ({ children }: { children: ReactNode }) => {
  return (
    <HScrollTableWrapper>
      <TableElement>{children}</TableElement>
    </HScrollTableWrapper>
  );
};

const IROHA = [
  ["い", "ろ", "は", "に", "ほ", "へ", "と"],
  ["ち", "り", "ぬ", "る", "を"],
  ["わ", "か", "よ", "た", "れ", "そ"],
  ["つ", "ね", "な", "ら", "む"],
  ["う", "ゐ", "の", "お", "く", "や", "ま"],
  ["け", "ふ", "こ", "え", "て"],
  ["あ", "さ", "き", "ゆ", "め", "み", "し"],
  ["ゑ", "ひ", "も", "せ", "す"],
];

const IROHA_HIGHLIGHTS: Record<string, string> = {
  い: "#e06666",
  う: "#c9daf8",
  ま: "#a4c2f4",
  し: "#ea9999",
};

const HighlightedIroha = () => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      {IROHA.map((row) => {
        return (
          <div key={row.join("")}>
            {row.map((kana) => {
              const highlightColor = IROHA_HIGHLIGHTS[kana];
              return (
                <span key={kana} style={{ backgroundColor: highlightColor }}>
                  {kana}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const NoBreak = styled.span`
  display: inline-block;
  white-space: "nowrap";
`;

const Solution = () => {
  return (
    <>
      <p>
        The flavor text of the puzzle, “Colors are fragrant, but they shift and
        shift. —Kūkai,” contains reference to two aspects of this puzzle. Kūkai
        was a Japanese buddhist monk who is traditionally purported to have
        developed the kana writing system used in writing Japanese phonetically
        and to have written the Iroha, a poem which was a perfect pangram of the
        kana in use at the time. The first line of the Iroha,{" "}
        <NoBreak>いろはにほへと,</NoBreak> directly translate to “colors are
        fragrant, but they.” The “colors are fragrant, but they” and “Kūkai”
        parts of the flavor text are pointing to the Iroha. The “shift and
        shift” part is in reference to Caesar shifts, also clued by the title{" "}
        <NoBreak>皇帝の暗号,</NoBreak> Japanese for emperor’s cipher. This is
        meant to reference Caesar shifts.
      </p>
      <p>
        In summary, this puzzle is about Caesar shifts and the Iroha ordering of
        the Japanese kana.
      </p>

      <p>
        The image tiles each must be identified with both an English word and a
        Japanese word. The identifications are independent; the English and
        Japanese identifications may not be direct translations of each other,
        but each describe the tile image. To aid identification, the tiles are
        originally ordered alphabetically by English ID, and the toggle switch
        can be used to reorder them to be ordered “irohaically” by Japanese ID.
        As clued by the diagram below the image tiles, the solver must construct
        three-tile chains using two different mechanisms. These mechanisms are
        an English Caesar shift and a Japanese Iroha shift. As an example, ADDER
        pairs with BEEFS through a Caesar shift of 1, advancing each letter one
        along the alphabet. Then, <NoBreak>うし</NoBreak> (meaning cows) pairs
        with <NoBreak>まい</NoBreak> (meaning dance) through an Iroha shift of
        6. This is shown on the Iroha below. Note that advancing six steps
        forward from し wraps back to the start of the Iroha.
      </p>

      <HighlightedIroha />

      <p>
        The full set of identifications and shifts are given below. Japanese
        identifications are written in kanji and written out in hiragana in
        parentheses.
      </p>

      <Table>
        <thead>
          <tr>
            <th></th>
            <th>English shift</th>
            <th></th>
            <th>Japanese shift</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Image src={image_adder} />
            </td>
            <td>→</td>
            <td>
              <Image src={image_beefs} />
            </td>
            <td>→</td>
            <td>
              <Image src={image_dance} />
            </td>
          </tr>
          <tr>
            <td>
              ADDER
              <br />蛇 (へび)
            </td>
            <td>A (1)</td>
            <td>
              BEEFS
              <br />牛 (うし)
            </td>
            <td>へ (6)</td>
            <td>
              DANCE
              <br />舞 (まい)
            </td>
          </tr>
          <tr>
            <td>
              <Image src={image_rum} />
            </td>
            <td>→</td>
            <td>
              <Image src={image_two} />
            </td>
            <td>→</td>
            <td>
              <Image src={image_sails} />
            </td>
          </tr>
          <tr>
            <td>
              RUM
              <br />酒 (さけ)
            </td>
            <td>B (2)</td>
            <td>
              TWO
              <br />二 (に)
            </td>
            <td>い (1)</td>
            <td>
              SAILS
              <br />帆 (ほ)
            </td>
          </tr>
          <tr>
            <td>
              <Image src={image_dory} />
            </td>
            <td>→</td>
            <td>
              <Image src={image_grub} />
            </td>
            <td>→</td>
            <td>
              <Image src={image_bow} />
            </td>
          </tr>
          <tr>
            <td>
              DORY
              <br />魚 (さかな)
            </td>
            <td>C (3)</td>
            <td>
              GRUB
              <br />飯 (めし)
            </td>
            <td>せ (46)</td>
            <td>
              BOW
              <br />弓 (ゆみ)
            </td>
          </tr>
          <tr>
            <td>
              <Image src={image_awn} />
            </td>
            <td>→</td>
            <td>
              <Image src={image_ear} />
            </td>
            <td>→</td>
            <td>
              <Image src={image_limbs} />
            </td>
          </tr>
          <tr>
            <td>
              AWN
              <br />芒 (のぎ)
            </td>
            <td>D (4)</td>
            <td>
              EAR
              <br />耳 (みみ)
            </td>
            <td>い (1)</td>
            <td>
              LIMBS
              <br />
              四肢 (しし)
            </td>
          </tr>
          <tr>
            <td>
              <Image src={image_aped} />
            </td>
            <td>→</td>
            <td>
              <Image src={image_fuji} />
            </td>
            <td>→</td>
            <td>
              <Image src={image_dust} />
            </td>
          </tr>
          <tr>
            <td>
              APED
              <br />
              真似る (まねる)
            </td>
            <td>E (5)</td>
            <td>
              FUJI
              <br />山 (やま)
            </td>
            <td>の (26)</td>
            <td>
              DUST
              <br />塵 (ちり)
            </td>
          </tr>
          <tr>
            <td>
              <Image src={image_joey} />
            </td>
            <td>→</td>
            <td>
              <Image src={image_puke} />
            </td>
            <td>→</td>
            <td>
              <Image src={image_town} />
            </td>
          </tr>
          <tr>
            <td>
              JOEY
              <br />
              子供 (こども)
            </td>
            <td>F (6)</td>
            <td>
              PUKE
              <br />
              吐く (はく)
            </td>
            <td>お (27)</td>
            <td>
              TOWN
              <br />町 (まち)
            </td>
          </tr>
          <tr>
            <td>
              <Image src={image_hew} />
            </td>
            <td>→</td>
            <td>
              <Image src={image_old} />
            </td>
            <td>→</td>
            <td>
              <Image src={image_inferno} />
            </td>
          </tr>
          <tr>
            <td>
              HEW
              <br />
              切る (きる)
            </td>
            <td>G (7)</td>
            <td>
              OLD
              <br />
              古い (ふるい)
            </td>
            <td>わ (13)</td>
            <td>
              INFERNO
              <br />
              猛火 (もうか)
            </td>
          </tr>
          <tr>
            <td>
              <Image src={image_oaf} />
            </td>
            <td>→</td>
            <td>
              <Image src={image_win} />
            </td>
            <td>→</td>
            <td>
              <Image src={image_peel} />
            </td>
          </tr>
          <tr>
            <td>
              OAF
              <br />
              愚か者 (おろかもの)
            </td>
            <td>H (8)</td>
            <td>
              WIN
              <br />
              勝つ (かつ)
            </td>
            <td>り (9)</td>
            <td>
              PEEL
              <br />
              剥く (むく)
            </td>
          </tr>
        </tbody>
      </Table>

      <p>
        As given, the Caesar shifts are of intervals 1 through 8, providing an
        ordering. The Iroha shifts in this order are of intervals 6, 1, 46, 1,
        26, 27, 13, and 9. If these are used as indices into the Iroha itself,
        one obtains <NoBreak>へいせいのおわり,</NoBreak> which may be
        interpreted as <NoBreak>平成の終わり,</NoBreak> or translated into
        English, <code>THE END OF THE HEISEI ERA</code>, which is the answer to
        this puzzle. To alleviate ambiguity in translation, an enumeration for
        the intended answer is provided at the bottom of the puzzle.
      </p>
    </>
  );
};

export default Solution;
