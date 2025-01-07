import React from "react";
import { styled } from "styled-components";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";

const TABLE = [
  ["1", "cascade 1", "earth’s star shines a gleaming trail", "A"],
  ["2", "espinela 3", "shining at the pavement slightly", "B"],
  ["3", "rhupunt 2", "high like a sail", "A"],
  ["4", "cascade 11", "weather smelt and shark can sense", "C"],
  ["5", "espinela 7", "rainy wind is getting meaner", "D"],
  ["6", "cascade 3", "each wave crests and calls its twin", "E"],
  ["7", "espinela 2", "firey engine streetlight sightly", "B"],
  ["8", "espinela 6", "garnet tint then shifting greener", "D"],
  ["9", "espinela 8", "sepia pervades the landscape", "F"],
  ["10", "espinela 5", "scarlet catch and grasp and grapple", "G"],
  ["11", "cascade 6", "earth’s star shines a gleaming trail", "A"],
  ["12", "rhupunt 10", "far in the seas", "H"],
  ["13", "treochair 5", "Gilchrist’s, red-eye, Atlantic,", "I"],
  ["14", "cascade 9", "the seas teem with leaping swimming life", "J"],
  ["15", "espinela 4", "in the rain and wet will dapple", "G"],
  ["16", "cascade 10", "wind and rain pelt the sea", "K"],
  ["17", "cascade 12", "each wave crests and calls its twin", "E"],
  ["18", "treochair 4", "silver-stripe,", "L"],
  ["19", "rhupunt 4", "it swims the sea", "K"],
  ["20", "rhupunt 6", "a deeper drive", "M"],
  ["21", "treochair 1", "salty fish", "N"],
  ["22", "treochair 6", "West African pygmy type", "L"],
  ["23", "rhupunt 12", "it wriggles free", "K"],
  ["24", "rhupunt 7", "yet still alive", "M"],
  ["25", "cascade 5", "swim in sync and sparkle silver", "O"],
  ["26", "rhupunt 1", "with fin and tail", "A"],
  ["27", "rhupunt 9", "the little tease", "H"],
  ["28", "espinela 10", "it’s a sight will thrill me keener", "D"],
  ["29", "cascade 7", "as if with wings, flying fish glide", "P"],
  ["30", "rhupunt 5", "then in a dive", "M"],
  ["31", "cascade 8", "in the air, then in the water", "Q"],
  ["32", "rhupunt 3", "astride a whale", "A"],
  ["33", "cascade 4", "sardines, many at a time,", "R"],
  ["34", "flamenca 2", "a tin greasy fish fills", "S"],
  ["35", "cascade 2", "the seas teem with leaping swimming life", "J"],
  ["36", "treochair 2", "I prefer a herring, red --", "T"],
  ["37", "treochair 7", "in a can", "U"],
  ["38", "flamenca 5", "if I lack it, I wilt", "V"],
  ["39", "flamenca 1", "titillate my palate", "W"],
  ["40", "rhupunt 11", "again with ease", "H"],
  ["41", "flamenca 4", "salty fatty and dense", "C"],
  ["42", "treochair 8", "in a packet, as a snack", "X"],
  ["43", "flamenca 3", "nicer than pate", "Y"],
  ["44", "espinela 9", "carmine piscine in a can shape", "F"],
  ["45", "rhupunt 8", "it evades me", "K"],
  ["46", "Schuttelreim 1", "if there is a caring heart", "Z"],
  ["47", "espinela 1", "red as clay and candy apple", "G"],
  ["48", "Schuttelreim 2", "please find me a largeish herring cart", "Z"],
  ["49", "treochair 3", "kippered, dried, a tasty dish", "N"],
  ["50", "treochair 9", "any way, I am a fan", "U"],
  ["51", "byr a thoddaid 1", "rarely can a careerly sin displease", "H"],
  ["52", "byr a thoddaid 2", "appease my heart, I grin", "E"],
  ["53", "byr a thoddaid 3", "in living a thief’s archetype", "L"],
  ["54", "byr a thoddaid 4", "I will present a single gripe", "L"],
  ["55", "dodoitsu 1", "a thief can get ill at ease", "H"],
  ["56", "dodoitsu 2", "with stealing sterling silver", "O"],
  ["57", "dodoitsu 3", "take a gem, shimmy drainpipe", "L"],
  ["58", "dodoitsu 4", "sack with ring therein", "E"],
];

const StyledTable = styled.table`
  margin: 1em 0;
  th,
  td {
    padding-right: 8px;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        There are a few parallel components to this puzzle, so this solution
        lays out one potential solve path.
      </p>
      <p>
        After pressing the button to start the transmission, a long block of
        text is displayed, which “self destructs” two times afterwards (is
        overwritten by two different blocks of text). It turns out that the text
        of the transmission is made up of a set of 5 poems that have been
        interleaved. Deinterleaving, ordering the poems by the order in which
        their first lines appear in the transmission, and then reading down the
        first letter of each line gives:
      </p>
      <p>
        <Mono>THEFIRSTDESTRUCTIONUSESTHEAGRIPPAENCODING →</Mono>
        <br />
        <Mono>THE FIRST DESTRUCTION USES THE AGRIPPA ENCODING</Mono>
      </p>
      <p>Deinterleaved poems:</p>
      <p>
        <strong>limerick</strong>
        <br />
        There once was a young man named Will
        <br />
        He looked at some photos until
        <br />
        Emissions of Kodaks
        <br />
        Found him having throwbacks;
        <br />
        Intensely his mind was refilled.
      </p>
      <p>
        <strong>shakespearean sonnet</strong>
        <br />
        Release a poem into the feral throng;
        <br />
        Say that it can be only read one time.
        <br />
        They say they hear but it won’t last for long;
        <br />
        Defy, record, upload - a minor crime.
        <br />
        <br />
        Except perhaps this was the plan throughout?
        <br />
        Suggest the poem’s short life makes it unique,
        <br />
        Then open up the door for what pans out:
        <br />
        Renouncing rules, soon some will stage a leak.
        <br />
        <br />
        Unleashed, the poem will now forever be
        <br />
        Captured online for all who wish to read.
        <br />
        Though are this clone and that which was set free
        <br />
        In fact the same, or two distinctive breeds?
        <br />
        <br />
        Origin’ly a live event alone,
        <br />
        Now readable even when on your own.
      </p>
      <p>
        <strong>haiku</strong>
        <br />
        Undulating dust
        <br />
        Sun shows the mechanism
        <br />
        Everywhere inside
      </p>
      <p>
        <strong>dizain</strong>
        <br />
        Shots spiraling from the gun, dividing
        <br />
        The silence with noise. Pictures collected
        <br />
        Here and there, then and now, and all hiding
        <br />
        Each time from one another, connected
        <br />
        And yet distinct. That which is neglected,
        <br />
        Gone by the time the recollection fades,
        <br />
        Rarely survives across many decades
        <br />
        In the same way that a recording can
        <br />
        Persist through time. But if that record trades
        <br />
        Proof for substance, then I am not a fan.
      </p>
      <p>
        <strong>nonet</strong>
        <br />
        As he looks into the old album,
        <br />
        Each page contains old faces that
        <br />
        Nudge the mind to recall but
        <br />
        Crinkles mar their visage.
        <br />
        Oddly, his response:
        <br />
        Destruction, his
        <br />
        Ire at time
        <br />
        Never
        <br />
        Gone
      </p>
      <p>
        Given these instructions, we now start examining the self destruction
        steps. We notice that each time the transmission button is pressed, the
        same transmission appears but there are 8 possible pairs of first/second
        stage self destruction. Searching for “Agrippa encoding” leads to the
        realization that this puzzle points at{" "}
        <a
          href="https://en.wikipedia.org/wiki/Agrippa_(A_Book_of_the_Dead)"
          target="_blank"
          rel="noreferrer"
        >
          Agrippa (A Book of the Dead)
        </a>
        , by William Gibson, a work of art that includes an ephemeral poem and
        an “encryption” scheme. After the fact (or earlier, if anyone looking at
        the puzzle is already familiar with Agrippa), we may realize that the
        text of the deinterleaved poems, and the overall thematic elements of
        the puzzle including the title, “self destruction,” and use of the
        phrase “transmission” also all more obliquely pay homage to the original
        Agrippa project.
      </p>
      <p>
        After some more searching about the “Agrippa encoding,” we find that a
        number of people participated in the Cracking Agrippa project to reverse
        engineer the encryption scheme. Any of them can work for the next step,
        but of particular interest (as it is the easiest to use) is the
        <a
          href="https://agrippa.english.ucsb.edu/images/cracked-code/submissions/files/agrippa_in_action.html"
          target="_blank"
          rel="noreferrer"
        >
          web-based implementation
        </a>
        .
      </p>
      <p>
        Putting each of the eight first stage self-destruction outputs into this
        site and ignoring the padding added by the algorithm (see note on bottom
        of the Agrippa in Action page), we get:
      </p>
      <p>
        1. cascade 1<br />
        2. espinela 3<br />
        3. rhupunt 2<br />
        4. cascade 11
        <br />
        5. espinela 7<br />
        6. cascade 3<br />
        7. espinela 2<br />
        8. espinela 6<br />
        9. espin
        <br />
        <br />
        ela 8<br />
        10. espinela 5<br />
        11. cascade 6<br />
        12. rhupunt 10
        <br />
        13. treochair 5<br />
        14. cascade 9<br />
        15. espinela 4<br />
        16. cascade 10
        <br />
        17. ca
        <br />
        <br />
        scade 12
        <br />
        18. treochair 4<br />
        19. rhupunt 4<br />
        20. rhupunt 6<br />
        21. treochair 1<br />
        22. treochair 6<br />
        23. rhupunt 12
        <br />
        24. rhupunt 7<br />
        25.
        <br />
        <br />
        cascade 5<br />
        26. rhupunt 1<br />
        27. rhupunt 9<br />
        28. espinela 10
        <br />
        29. cascade 7<br />
        30. rhupunt 5<br />
        31. cascade 8<br />
        32. rhupunt 3<br />
        33. c<br />
        <br />
        ascade 4<br />
        34. flamenca 2<br />
        35. cascade 2<br />
        36. treochair 2<br />
        37. treochair 7<br />
        38. flamenca 5<br />
        39. flamenca 1<br />
        40. rhupunt 11
        <br />
        41
        <br />
        <br />
        . flamenca 4<br />
        42. treochair 8<br />
        43. flamenca 3<br />
        44. espinela 9<br />
        45. rhupunt 8<br />
        46. schuttelreim 1<br />
        47. espinela 1<br />
        48. schutt
        <br />
        <br />
        elreim 2<br />
        49. treochair 3<br />
        50. treochair 9<br />
        51. byr a thoddaid 1<br />
        52. byr a thoddaid 2<br />
        53. byr a thoddaid 3<br />
        54. byr a thodd
        <br />
        <br />
        aid 4<br />
        55. dodoitsu 1<br />
        56. dodoitsu 2<br />
        57. dodoitsu 3<br />
        58. dodoitsu 4<br />I scheme, you scheme, we all scheme for rhyme
        scheme!
      </p>
      <p>
        We note that the poem types listed here are not the same types as those
        that we deinterleaved from the transmission.
      </p>
      <p>
        Looking at the second stage self-destruction outputs, we realize that
        they are DNA (a motif used in the original Agrippa binary’s self
        destruction as well). Using a{" "}
        <a
          href="https://www.dcode.fr/codons-genetic-code"
          target="_blank"
          rel="noreferrer"
        >
          decoder
        </a>{" "}
        and treating stop codons as line breaks, (and double stop codons as
        verse breaks,) we decode the eight second stage self-destruction outputs
        and get another series of poems. The poem types are not labeled in the
        DNA encoding, but we realize that all of the poems from the DNA are of
        the types listed in the Agrippa encoded messages. We identify them as
        the following:
      </p>
      <p>
        (Note: these poems include the author’s original punctuation, which is
        not encoded via the DNA.)
      </p>
      <p>
        <strong>byr a thoddaid</strong>
        <br />
        rarely can a careerly sin displease
        <br />
        appease my heart, I grin
        <br />
        in living a thief’s archetype
        <br />I will present a single gripe
      </p>
      <p>
        <strong>cascade</strong>
        <br />
        <br />
        earth’s star shines a gleaming trail
        <br />
        the seas teem with leaping swimming life
        <br />
        each wave crests and calls its twin
        <br />
        <br />
        sardines, many at a time,
        <br />
        swim in sync and sparkle silver
        <br />
        earth’s star shines a gleaming trail
        <br />
        <br />
        as if with wings, flying fish glide
        <br />
        in the air, then in the water
        <br />
        the seas teem with leaping swimming life
        <br />
        <br />
        wind and rain pelt the sea
        <br />
        weather smelt and shark can sense
        <br />
        each wave crests and calls its twin
      </p>
      <p>
        <strong>dodoitsu</strong>
        <br />
        a thief can get ill at ease
        <br />
        with stealing sterling silver
        <br />
        take a gem, shimmy drainpipe
        <br />
        sack with ring therein
      </p>
      <p>
        <strong>espinela</strong>
        <br />
        red as clay and candy apple
        <br />
        firey engine streetlight sightly
        <br />
        shining at the pavement slightly
        <br />
        in the rain and wet will dapple
        <br />
        <br />
        scarlet catch and grasp and grapple
        <br />
        garnet tint then shifting greener
        <br />
        rainy wind is getting meaner
        <br />
        sepia pervades the landscape
        <br />
        carmine piscine in a can shape
        <br />
        it’s a sight will thrill me keener
      </p>
      <p>
        <strong>flamenca</strong>
        <br />
        titillate my palate
        <br />
        a tin greasy fish fills
        <br />
        nicer than pate
        <br />
        salty fatty and dense
        <br />
        if I lack it, I wilt
      </p>
      <p>
        <strong>rhupunt</strong>
        <br />
        with fin and tail
        <br />
        high like a sail
        <br />
        astride a whale
        <br />
        it swims the sea
        <br />
        <br />
        then in a dive
        <br />
        a deeper drive
        <br />
        yet still alive
        <br />
        it evades me
        <br />
        <br />
        the little tease
        <br />
        far in the seas
        <br />
        again with ease
        <br />
        it wriggles free
      </p>
      <p>
        <strong>schuttelreim</strong>
        <br />
        if there is a caring heart
        <br />
        please find me a largeish herring cart
      </p>
      <p>
        <strong>treochair</strong>
        <br />
        salty fish
        <br />
        I prefer a herring, red —<br />
        kippered, dried, a tasty dish
        <br />
        <br />
        silver-stripe,
        <br />
        Gilchrist’s, red-eye, Atlantic,
        <br />
        West African pygmy type
        <br />
        <br />
        in a can
        <br />
        in a packet, as a snack
        <br />
        any way, I am a fan
      </p>
      <p>
        We then eventually realize that the messages from the first stage
        self-destructions are instructions for how to interleave this set of
        poems into a single large poem, much like we are presented with when
        pressing the transmission start button. However, we also notice that
        unlike the transmission “poem,” this poem is more cohesive. Given how
        much poetry we’ve seen so far without needing to do any real poetry
        analysis along with the sentence clued along with the interleaving
        instructions, we take a look at the rhyme scheme and realize that not
        only does this megapoem have enough rhymes to encode A–Z, but the final
        lines, which are from the only poems that are not about red herrings,
        spell out <PuzzleAnswer>HELLHOLE</PuzzleAnswer>, the answer to this
        puzzle.
      </p>
      <StyledTable>
        <tr>
          <th>Megapoem Order</th>
          <th>Poem Title</th>
          <th>Line</th>
          <th>Rhyme Scheme</th>
        </tr>
        {TABLE.map(([order, title, line, rhyme], i) => (
          <tr key={i}>
            <td>{order}</td>
            <td>{title}</td>
            <td>{line}</td>
            <td>{rhyme}</td>
          </tr>
        ))}
      </StyledTable>
      <h3>Author’s Note</h3>
      <p>
        Due to the fact that there are only 20 amino acids, I had to write all
        the DNA-encoded poems without using numerals, punctuation, or the
        letters Z, X, J, B, U, or O. (Those are listed in increasing order of
        how much I wanted to use them.) An incomplete list of words I would have
        liked to use is: of, off, for, out, by, to, from, over, under, above,
        below, about, around, along, next, up, down, how, who, too, or, no, not,
        nor, you, our, be, should, would, could, job, jewelry, gold, box,
        delectable, sun, glow, amaze, jump, job, blue, row, ocean, and the names
        of many types of fish.
      </p>
    </>
  );
};

export default Solution;
