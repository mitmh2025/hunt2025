import React from "react";
import { styled } from "styled-components";

const StyledTable = styled.table`
  margin-bottom: 1em;
  border-collapse: collapse;
  tr:nth-child(odd) {
    background-color: #bba5a3;
    td {
      border: 1px solid #bba5a3;
    }
  }
  tr:nth-child(even) {
    background-color: #e0d6d5;
    td {
      border: 1px solid #e0d6d5;
    }
  }
  tr:nth-child(1) {
    background-color: #967470;
    th {
      border: 1px solid #967470;
    }
  }
  th,
  td {
    padding: 0px 8px;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        Solvers are presented with two columns of clue fragments and
        illustrations that look like chemical bottles with warning labels. Each
        clue fragment/bottle contains a bracketed number (positive or negative).
        The first two columns read like cryptic clues. The second column and the
        bottles are presented alphabetically, and the first column is not,
        implying that part of the task is to identify which entry in parts 2 and
        3 match with the fragment in column 1.
      </p>
      <p>
        The text in the first two columns are cryptic-style wordplay clues, with
        certain differences from a standard cryptic. Firstly, there is no
        definition (the entire fragment is wordplay). Secondly, the first column
        has clues towards digits or numbers (e.g. “the end of the answer to the
        ultimate question,” which is famously 42). Finally, there are a lot of
        references to chemicals or elements, to go along with the title as
        marking this as very explicitly a chemistry puzzle.
      </p>
      <p>
        It turns out that Column 1’s wordplay clues produce a molecular formula,
        and column 2 produces a common name for a chemical compound (not
        necessarily the systematic IUPAC name). Finally, the warning label is an
        oblique reference to the chemicals being identified by formula and name.
        It is possible to match up fragments of the clues so that all three
        pieces describe the same compound. The references in the warning labels
        are intended to be less directly useful but good confirmation that the
        compound is correct once it’s been ID’d via wordplay clues.
      </p>
      <p>The table below explains the wordplay and warnings.</p>
      <StyledTable>
        <tr>
          <th>Compound</th>
          <th>Column 1 (formula)</th>
          <th>Column 2 (chemical name)</th>
          <th>Warning Labels (oblique references)</th>
        </tr>
        <tr>
          <td>
            ozone, O<sub>3</sub>
          </td>
          <td>Obnoxiously start beginning of film about Sparta…</td>
          <td>…ruining topless snooze</td>
          <td>damages tires</td>
        </tr>
        <tr>
          <td></td>
          <td>O (start of OBNOXIOUSLY) + 3 (start of 300)</td>
          <td>anagram of [s]NOOZE</td>
          <td>reference to “ozone cracking”</td>
        </tr>
        <tr>
          <td>
            ammonia, NH<sub>3</sub>
          </td>
          <td>The granite state, back East…</td>
          <td>…produces bullets with nickel and silver, partly</td>
          <td>do not bleach</td>
        </tr>
        <tr>
          <td></td>
          <td>
            NH (granite state, new hampshire), 3 (backwards capital E looks like
            a 3)
          </td>
          <td>AMMO + Ni + A (part of Ag for silver)</td>
          <td>
            ammonia and bleach fairly famously produce toxic gases when
            combined. it’s a common cleaning-products-related accident
          </td>
        </tr>
        <tr>
          <td>
            methanol, CH<sub>3</sub>OH
          </td>
          <td>Cold hydronium, adding helium pointlessly,…</td>
          <td>…makes drug, stirred on a vial bottom</td>
          <td>if ingested, drink</td>
        </tr>
        <tr>
          <td></td>
          <td>
            C (cold) H<sub>3</sub>O + H (He for helium with e (compass point)
            removed)
          </td>
          <td>METH (drug) + (ON A)* + L (last letter of vial)</td>
          <td>drinking ethanol is an antidote for methanol poisoning</td>
        </tr>
        <tr>
          <td>
            arsole, C<sub>4</sub>H<sub>4</sub>AsH
          </td>
          <td>Explosive Spruce Goose burnt residue…</td>
          <td>…upset a loser</td>
          <td>somewhat aromatic</td>
        </tr>
        <tr>
          <td></td>
          <td>C4 (explosive) + H4 (spruce goose) + Ash</td>
          <td>(ALOSER)* = arsole</td>
          <td>
            arsole is “moderately aromatic” according to wikipedia, a phrase
            that is very unusual (try googling it)
          </td>
        </tr>
        <tr>
          <td>
            alumina, Al<sub>2</sub>O<sub>3</sub>
          </td>
          <td>Reverend Sharpton put nothing into the Shepherd Psalm…</td>
          <td>…for animal sickened after ingesting radioactive metal</td>
          <td>abrasive</td>
        </tr>
        <tr>
          <td></td>
          <td>Reverend Sharpton = AL + nothing (O) into 23 (psalm 23) = 2O3</td>
          <td>(ANIMAL + U)*</td>
          <td>
            alumina is frequently used as an abrasive, including in a lot of
            sandpaper
          </td>
        </tr>
        <tr>
          <td>
            milk of magnesia, Mg(OH)<sub>2</sub>
          </td>
          <td>
            Disheartened, Gram spilled (gasp) the end of the answer to the
            ultimate question,…
          </td>
          <td>….creating a white liquid: roiling, foaming sea</td>
          <td>may cause diarrhea</td>
        </tr>
        <tr>
          <td></td>
          <td>
            remove center letters from gram and turn upside-down = MG + (gasp =
            OH) + end of 42 = 2
          </td>
          <td>white liquid = MILK + (FOAMINGSEA)* = OF MAGNESIA</td>
          <td>well known as a laxative</td>
        </tr>
        <tr>
          <td>
            iron(III) oxide, Fe<sub>2</sub>O<sub>3</sub>
          </td>
          <td>Beginning to fly, first entering Angwin Airport…</td>
          <td>
            …in a section of Air One (me, myself, and I) with excited doxie
          </td>
          <td>may stain metal</td>
        </tr>
        <tr>
          <td></td>
          <td>
            first letters of fly, entering (FE) + 2O3 is the IATA code for
            Angwin Airport (obscure, I know, but easily googlable)
          </td>
          <td>hidden word in aIRONe (me = I, myself=I, I), (DOXIE)*</td>
          <td>rust</td>
        </tr>
        <tr>
          <td>
            water, H<sub>2</sub>O
          </td>
          <td>Flammable gas ring…</td>
          <td>…from whiskey and oddly discarded saltpetre</td>
          <td>dissociates spontaneously</td>
        </tr>
        <tr>
          <td></td>
          <td>
            H<sub>2</sub> + O (ring)
          </td>
          <td>w + ater (even letters of “saltpetre”)</td>
          <td>
            water dissociates into H<sub>3</sub>O<sup>+</sup> and OH
            <sup>-</sup>; this is the basis for the well known K<sub>w</sub>{" "}
            constant
          </td>
        </tr>
        <tr>
          <td>
            benzene, C<sub>6</sub>H<sub>6</sub>
          </td>
          <td>
            Church takes turns with the Beast, after cutting off its tail,…
          </td>
          <td>…having been transformed and embracing inner peace</td>
          <td>self-devouring</td>
        </tr>
        <tr>
          <td></td>
          <td>
            CH (church leaders) alternating with 66 (number of the beast minus
            tail)
          </td>
          <td>(BEEN)*, insert ZEN</td>
          <td>
            benzene’s structure was proposed after a dream of snakes biting
            their own tails.
          </td>
        </tr>
        <tr>
          <td>quicklime, CaO</td>
          <td>Extract of amino acid enantiomer…</td>
          <td>…is bright green</td>
          <td>not for use in corpse disposal</td>
        </tr>
        <tr>
          <td></td>
          <td>
            OAC hidden in aminOACid; “enantiomer” can be interpreted as “mirror
            image”, therefore, reverse OAC = CAO
          </td>
          <td>bright = quick, green = lime</td>
          <td>
            cement shoes; also, more obscurely, a reference to the fact that CaO
            used to be believed to be good for dissolving bodies but it’s not
            actually (according to the wikipedia page)
          </td>
        </tr>
        <tr>
          <td>
            borane, BH<sub>3</sub>
          </td>
          <td>Empty British Materials Science Department…</td>
          <td>…carried around palladium core</td>
          <td>supplied in pairs, do not separate</td>
        </tr>
        <tr>
          <td></td>
          <td>
            remove center of British = BH, materials science dept (at mit) = 3
          </td>
          <td>BORNE around middle of palladium = A</td>
          <td>
            BH<sub>3</sub> is unstable as an independent molecule and
            spontaneously dimerizes into B<sub>2</sub>H<sub>6</sub>
          </td>
        </tr>
      </StyledTable>
    </>
  );
};

export default Solution;
