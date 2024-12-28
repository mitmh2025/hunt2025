import React from "react";
import { styled } from "styled-components";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import dog from "./assets/dog.png";

const StyledTable = styled.table`
  margin-bottom: 1em;
  th,
  td {
    padding: 0px 8px;
  }
`;

const HighlightedTable = styled(StyledTable)`
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
      <HighlightedTable>
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
      </HighlightedTable>
      <p>
        Once this is done, each set of clues will specifically identify one
        chemical and provide three different numerical shifts. The aha here is
        that all chemicals are uniquely associated with a CAS registry number,
        which has the format of three numbers separated by dashes (for instance,
        ozone is 10028-15-6). These can be looked up most easily from googling
        the chemical, as most are listed on wikipedia pages for the compound or
        on chemical supplier pages. They can also be looked up at{" "}
        <a
          href="https://commonchemistry.cas.org/"
          target="_blank"
          rel="noreferrer"
        >
          https://commonchemistry.cas.org/
        </a>
        . Reverse searching can generally be done fairly easily by googling the
        CAS number and “cas” together.
      </p>
      <p>
        The three shifts in order can be applied to the CAS number of the
        compound to make a new CAS number for a compound resembling the original
        one, except with a new element replacing an atom in the original.
        Reading the elemental abbreviations of the added atoms, in order, spells
        out C Al Li N Es Ca La T I O N, or <Mono>CALL IN ESCALATION</Mono>. The
        answer is thus <PuzzleAnswer>ESCALATION</PuzzleAnswer>.
      </p>
      <StyledTable>
        <tr>
          <th>Compound</th>
          <th>CAS</th>
          <th>Shifts</th>
          <th>New CAS</th>
          <th>New compound</th>
        </tr>
        <tr>
          <td>
            Ozone, O<sub>3</sub>
          </td>
          <td>10028-15-6</td>
          <td>-9904, +23, +3</td>
          <td>124-38-9</td>
          <td>
            Carbon dioxide, CO<sub>2</sub>
          </td>
        </tr>
        <tr>
          <td>
            Ammonia, NH<sub>3</sub>
          </td>
          <td>7664-41-7</td>
          <td>+120, -20, -1</td>
          <td>7784-21-6</td>
          <td>
            Aluminum hydride, AlH<sub>3</sub>
          </td>
        </tr>
        <tr>
          <td>
            Methanol, CH<sub>3</sub>OH
          </td>
          <td>67-56-1</td>
          <td>+798, -22, +8</td>
          <td>865-34-9</td>
          <td>
            Lithium methoxide
            <sup>
              <a href="#footnote-1">1</a>
            </sup>
            , CH<sub>3</sub>OLi
          </td>
        </tr>
        <tr>
          <td>
            Arsole, C<sub>4</sub>H<sub>4</sub>AsH
          </td>
          <td>287-77-4</td>
          <td>-178, +20, +3</td>
          <td>109-97-7</td>
          <td>
            Pyrrole, C<sub>4</sub>H<sub>4</sub>NH
          </td>
        </tr>
        <tr>
          <td>
            Alumina, Al<sub>2</sub>O<sub>3</sub>
          </td>
          <td>1344-28-1</td>
          <td>+36018, +66, -1</td>
          <td>37362-94-0</td>
          <td>
            Einsteinium oxide, Es<sub>2</sub>O<sub>3</sub>
          </td>
        </tr>
        <tr>
          <td>
            Milk of magnesia, Mg(OH)<sub>2</sub>
          </td>
          <td>1309-42-8</td>
          <td>-4, +20, -8</td>
          <td>1305-62-0</td>
          <td>
            Calcium hydroxide, Ca(OH)<sub>2</sub>
          </td>
        </tr>
        <tr>
          <td>
            iron(III) oxide, Fe<sub>2</sub>O<sub>3</sub>
          </td>
          <td>1309-37-1</td>
          <td>+3, +44, +7</td>
          <td>1312-81-8</td>
          <td>
            Lanthanum sesquioxide, La<sub>2</sub>O<sub>3</sub>
          </td>
        </tr>
        <tr>
          <td>
            Water, H<sub>2</sub>O
          </td>
          <td>7732-18-5</td>
          <td>+5938, -1, -3</td>
          <td>13670-17-2</td>
          <td>
            HTO (tritium-labeled water)
            <sup>
              <a href="#footnote-2">2</a>
            </sup>
          </td>
        </tr>
        <tr>
          <td>
            Benzene, C<sub>6</sub>H<sub>6</sub>
          </td>
          <td>71-43-2</td>
          <td>+520, +7, +2</td>
          <td>591-50-4</td>
          <td>
            Iodobenzene, C<sub>6</sub>H<sub>5</sub>I
          </td>
        </tr>
        <tr>
          <td>Quicklime, CaO</td>
          <td>1305-78-8</td>
          <td>+6477, -34, -1</td>
          <td>7782-44-7</td>
          <td>
            Dioxygen, O<sub>2</sub>
          </td>
        </tr>
        <tr>
          <td>
            Borane, BH<sub>3</sub>
          </td>
          <td>13283-31-3</td>
          <td>-5619, +10, +4</td>
          <td>7664-41-7</td>
          <td>
            Ammonia, NH<sub>3</sub>
          </td>
        </tr>
      </StyledTable>
      <p id="footnote-1">
        <sup>1</sup> Unfortunately,{" "}
        <a
          href="https://commonchemistry.cas.org/detail?cas_rn=865-34-9"
          target="_blank"
          rel="noreferrer"
        >
          commonchemistry.cas.org
        </a>{" "}
        (incorrectly) gives the formula for lithium methoxide as CH<sub>4</sub>
        OLi (there are historical reasons for this whose discussion is beyond
        the scope of this solutions page). Hopefully, solvers (if they don’t
        recognize the error based on chemical knowledge) will notice that the
        correct formula CH<sub>3</sub>OLi is given by all other readily
        available sources.
      </p>
      <p id="footnote-2">
        <sup>2</sup> Some sources (incorrectly) give the formula for this CAS
        number as T2O, but this doesn’t affect the final extraction.
      </p>
      <p>
        Fun fact: in development, this puzzle was assigned the random codename
        innocent-lab, which led to the following image being adopted as the
        puzzle mascot:
      </p>
      <img
        src={dog}
        alt="I Have No Idea What I'm Doing meme with a Laborador retriever wearing safety glasses in front of a bunch of chemistry equipment filled with colored liquids. The dog is pouring a beaker into a coffee mug."
      />
    </>
  );
};

export default Solution;
