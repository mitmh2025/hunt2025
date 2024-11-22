import React from "react";
import { styled } from "styled-components";

const Mono = styled.span`
  font-family: monospace;
`;

const StyledTable = styled.table`
  td,
  th {
    padding: 1px 8px;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        The flavortext clues that the speaker should have paid more attention in
        language classes, instead of “meming to Maury.” This phrase, spoken
        aloud, sounds like the Latin phrase “memento mori.” The statements
        provided each clue a similar Engl-iiish translation of a Latin phrase
        matching the given enumeration. The first letters of these Latin
        phrases, read in order, tell teams that the <Mono>ANSVVER</Mono> is{" "}
        <Mono>
          <strong>SHOPPING CART</strong>
        </Mono>
        .
      </p>
      <StyledTable>
        <tr>
          <th>Clue</th>
          <th>Engl-iiish</th>
          <th>Latin</th>
          <th>Initial</th>
        </tr>
        <tr>
          <td>
            “You should put in the proper tool to drink this drink.” (2 5)
          </td>
          <td>Add a straw.</td>
          <td>ad astra</td>
          <td>
            <Mono>A</Mono>
          </td>
        </tr>
        <tr>
          <td>
            “We’re not allowing any competitors who aren’t either medium or
            high.” (4 10)
          </td>
          <td>No low contender.</td>
          <td>nolo contendere</td>
          <td>
            <Mono>N</Mono>
          </td>
        </tr>
        <tr>
          <td>
            “Man, Ms. Estefan, the way you drive a bus is dope! See you after
            the weekend?” (3 7 6 5)
          </td>
          <td>Sick transit, Gloria! Monday?</td>
          <td>sic transit gloria mundi</td>
          <td>
            <Mono>S</Mono>
          </td>
        </tr>
        <tr>
          <td>
            “This Youtube clip you’ve scored seems to focus a lot on what pops
            out when bodybuilders flex, Mr. Bergling.” (4 4 4)
          </td>
          <td>Veiny vid, Avicii.</td>
          <td>veni vidi vici</td>
          <td>
            <Mono>V</Mono>
          </td>
        </tr>
        <tr>
          <td>
            “No, not a rapper—more someone who strings together stanzas about
            Michael Mann’s Miami-based crime show.” (4 5)
          </td>
          <td>Vice verser.</td>
          <td>vice versa</td>
          <td>
            <Mono>V</Mono>
          </td>
        </tr>
        <tr>
          <td>
            “Is this get-together… entirely attended by your former boyfriends?”
          </td>
          <td>Ex-party.</td>
          <td>ex parte</td>
          <td>
            <Mono>E</Mono>
          </td>
        </tr>
        <tr>
          <td>
            “Cut back on the sponsorship campaign featuring your uncle Luiz
            shirtless. His six-pack physique is stupid.” (8 2 8)
          </td>
          <td>Reduce tio ad—abs are dumb.</td>
          <td>reductio ad absurdum</td>
          <td>
            <Mono>R</Mono>
          </td>
        </tr>
        <tr>
          <td>
            “Figure this out. It should be easy for the cross between an
            emergency services vehicle and Mr. Calrissian!” (8 9)
          </td>
          <td>Solve it—you’re Ambu-Lando!</td>
          <td>solvitur ambulando</td>
          <td>
            <Mono>S</Mono>
          </td>
        </tr>
        <tr>
          <td>
            “What made this so razor-like? The sharpener is the one who did it.”
            (7 5)
          </td>
          <td>Honer is causer.</td>
          <td>honoris causa</td>
          <td>
            <Mono>H</Mono>
          </td>
        </tr>
        <tr>
          <td>
            “Stack up behind my group, those of you who favor a Scandinavian
            variant of ice hockey!” (4 8)
          </td>
          <td>On us, pro-Bandy!</td>
          <td>onus probandi</td>
          <td>
            <Mono>O</Mono>
          </td>
        </tr>
        <tr>
          <td>
            “Attention, nation! As your pre-Hunger Games entertainment, here is
            the Knight of Perceptions!” (5 2 9)
          </td>
          <td>Panem, it’s Sir Senses!</td>
          <td>panem et circenses</td>
          <td>
            <Mono>P</Mono>
          </td>
        </tr>
        <tr>
          <td>
            “You will NEVER hear me say a bad word about U2’s singer. NEVER.” (3
            4)
          </td>
          <td>Pro-Bono.</td>
          <td>pro bono</td>
          <td>
            <Mono>P</Mono>
          </td>
        </tr>
        <tr>
          <td>
            “MIT is a better school in every way—why should we covet Harvard’s
            motto?” (2 4 7)
          </td>
          <td>Envy no Veritas!</td>
          <td>in vino veritas</td>
          <td>
            <Mono>I</Mono>
          </td>
        </tr>
        <tr>
          <td>
            “The Mother Superior’s midpoint is bracketed by two tropical
            circles.” (3 8)
          </td>
          <td>Nun’s equator.</td>
          <td>non sequitur</td>
          <td>
            <Mono>N</Mono>
          </td>
        </tr>
        <tr>
          <td>“He’s brilliant, but he’s very subtle about it.” (6 4)</td>
          <td>Genius, low-key.</td>
          <td>genius loci</td>
          <td>
            <Mono>G</Mono>
          </td>
        </tr>
        <tr>
          <td>“That’s a direct message about your auto loan.” (5 4)</td>
          <td>Car pay DM.</td>
          <td>carpe diem</td>
          <td>
            <Mono>C</Mono>
          </td>
        </tr>
        <tr>
          <td>
            “Why am I here? I’m standing in a proctologist’s office—why do you
            THINK I’m here?” (5 10)
          </td>
          <td>Anus horrible.</td>
          <td>annus horribilis</td>
          <td>
            <Mono>A</Mono>
          </td>
        </tr>
        <tr>
          <td>
            “Who’s handling the ropes on the mast? Mr. Sahl is taking care of
            that!” (5 6)
          </td>
          <td>Rigger Mort is.</td>
          <td>rigor mortis</td>
          <td>
            <Mono>R</Mono>
          </td>
        </tr>
        <tr>
          <td>“Eek, you opened up a private tab in Chrome!” (5 9)</td>
          <td>Terror, incognito!</td>
          <td>terra incognita</td>
          <td>
            <Mono>T</Mono>
          </td>
        </tr>
      </StyledTable>
    </>
  );
};

export default Solution;
