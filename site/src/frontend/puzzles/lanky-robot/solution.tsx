import React from "react";
import { styled } from "styled-components";
import { HScrollTableWrapper } from "../../components/StyledUI";

const StyledTable = styled.table`
  border-collapse: collapse;
  border: none;

  td {
    padding: 0 1rem;
  }

  tr:hover td {
    background-color: var(--white);
  }
`;

const Solution = () => {
  return (
    <>
      <p>
        Each clue has one misspelled word, and in particular that word is
        misspelled by swapping the placement of its two vowels. Each clue
        results in a two-syllable answer that matches the first enumeration.
        Then, if you swap the vowel sounds of the two syllables, you get another
        answer that matches the second enumeration. (As an additional
        confirmation, the transformed answers are in alphabetical order.)
      </p>
      <p>
        That second enumeration matches the number of words in the clue. Extract
        the letter corresponding with the misspelled word and enter into the
        blanks at the bottom to get the clue phrase: PURCHASE DIGIT AT END OF
        FOOT. The answer to this phrase is &ldquo;buy toe&rdquo;, which needs to
        have its vowel sounds swapped to give the puzzle answer BOW TIE.
      </p>
      {/* TODO: make a reusable component for emphasizing clue phrases and a second one for answers */}

      <HScrollTableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <th>Clue</th>
              <th>Answer</th>
              <th>Answer 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                hatred or malice possessed by one with geldon hair (6 5 ⇒ 5 4)
              </td>
              <td>BLONDE SPITE</td>
              <td>BLIND SPOT</td>
            </tr>
            <tr>
              <td>musical nembur written about ballpoint pens (3 4 ⇒ 6)</td>
              <td>BIC SONG</td>
              <td>BOXING</td>
            </tr>
            <tr>
              <td>low mournful suond that emanates from cheese (4 4 ⇒ 7)</td>
              <td>BRIE MOAN</td>
              <td>BROMINE</td>
            </tr>
            <tr>
              <td>
                a wedi flat cooking receptacle used to contain regret (5 3 ⇒ 9)
              </td>
              <td>SHAME PAN</td>
              <td>CHAMPAGNE</td>
            </tr>
            <tr>
              <td>
                record kept about the baem running under the hull (4 3 ⇒ 9)
              </td>
              <td>KEEL LOG</td>
              <td>COLLEAGUE</td>
            </tr>
            <tr>
              <td>enlarge or widen like a pipul or nostril (6 ⇒ 8)</td>
              <td>DILATE</td>
              <td>DAYLIGHT</td>
            </tr>
            <tr>
              <td>
                suddenly immerse a breath freshener in cold wetar (5 4 ⇒ 8)
              </td>
              <td>DOUSE MINT</td>
              <td>DISMOUNT</td>
            </tr>
            <tr>
              <td>the unlucky child used to lure uot Pennywise (2 4 ⇒ 5-3)</td>
              <td>IT BAIT</td>
              <td>EIGHT-BIT</td>
            </tr>
            <tr>
              <td>pinac at the sight of crimson colors (4 3 ⇒ 7)</td>
              <td>FEAR RED</td>
              <td>FERRIED</td>
            </tr>
            <tr>
              <td>
                the version control cammond that cooks a pastry? (3 5 ⇒ 8)
              </td>
              <td>GIT SCONE</td>
              <td>GOATSKIN</td>
            </tr>
            <tr>
              <td>
                the entirety of a discoloration on a porsen&rsquo;s clothing (5
                5 ⇒ 9)
              </td>
              <td>WHOLE STAIN</td>
              <td>HAILSTONE</td>
            </tr>
            <tr>
              <td>
                a baby&rsquo;s bed ewnod by an Objectivist author (3&rsquo;1 4 ⇒
                8)
              </td>
              <td>AYN&rsquo;S CRIB</td>
              <td>INSCRIBE</td>
            </tr>
            <tr>
              <td>a fellow who has clear and visible wrenklis (5 3 ⇒ 4 4)</td>
              <td>LINED MAN</td>
              <td>LAND MINE</td>
            </tr>
            <tr>
              <td>
                backbone that ollaws one to successfully express mirth (5 5 ⇒ 8)
              </td>
              <td>LAUGH SPINE</td>
              <td>LIFESPAN</td>
            </tr>
            <tr>
              <td>simian that resides in the sledgu (4 3 ⇒ 6)</td>
              <td>MUCK APE</td>
              <td>MAKEUP</td>
            </tr>
            <tr>
              <td>grassy area naer a house that&rsquo;s mediocre (3 4 ⇒ 7)</td>
              <td>MID LAWN</td>
              <td>MAUDLIN</td>
            </tr>
            <tr>
              <td>an amusing woolen hat meda in Scotland (3 3 ⇒ 7)</td>
              <td>FUN TAM</td>
              <td>PHANTOM</td>
            </tr>
            <tr>
              <td>
                annoy or dustirb group associated with sporting events (4 4 ⇒
                4-4)
              </td>
              <td>RILE TEAM</td>
              <td>REAL-TIME</td>
            </tr>
            <tr>
              <td>
                the posterior of a small to medium sized redont (3 4 ⇒ 5 4)
              </td>
              <td>RAT HIND</td>
              <td>RIGHT HAND</td>
            </tr>
            <tr>
              <td>
                feli legal action in court against triplets (hopefully with
                cause) (3 5 ⇒ 3 7)
              </td>
              <td>SUE THREE</td>
              <td>SEE THROUGH</td>
            </tr>
            <tr>
              <td>a photograph of a cervud woodwind instrument (3 3 ⇒ 3 4)</td>
              <td>SAX PIC</td>
              <td>SIX PACK</td>
            </tr>
            <tr>
              <td>the tapered part of a bettlo made of wood (4 4 ⇒ 9)</td>
              <td>TEAK NECK</td>
              <td>TECHNIQUE</td>
            </tr>
            <tr>
              <td>sample perplu drank by taking a small sip (3 4 ⇒ 8)</td>
              <td>TRY LEAN</td>
              <td>TREELINE</td>
            </tr>
            <tr>
              <td>
                a dress wearer in a wedding who is soaked thruogh (3 5 ⇒ 5 5)
              </td>
              <td>WET BRIDE</td>
              <td>WHITE BREAD</td>
            </tr>
          </tbody>
        </StyledTable>
      </HScrollTableWrapper>
    </>
  );
};

export default Solution;
