import React from "react";
import { styled } from "styled-components";
import { PuzzleAnswer } from "../../components/StyledUI";

const StyledTable = styled.table`
  margin-bottom: 1em;
  th,
  td {
    padding: 0px 8px;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle provides sheet music (using chords and slash notation) and a
        video that purports to be a video tutorial for that song. However, the
        sheet music and video disagree on the song title as well as the notes
        that should be played. Additionally, even though the chords are supposed
        to be one per measure, there are gaps between some chords, and some
        chords are played much louder than the rest.
      </p>
      <p>
        The sheet song title is “Fake Mike”, and the video song title is “Cobra
        Bow”. The flavortext hints at finding the Vigenere key between these
        two, which is the string XOR NOTES.
      </p>
      <p>
        Next, use this to XOR the notes in each chord with the notes that are
        played, staying within the middle C octave. Note also that the middle
        octave is labeled 0 to 6. Therefore, the seven notes in the octave can
        be mapped to bits 0 - 6, which means the XOR results can be read as
        7-bit ASCII:
      </p>
      <StyledTable>
        <tr>
          <th>Written chord</th>
          <th>Notes in chord</th>
          <th>Notes played</th>
          <th>XOR Result</th>
          <th>Binary</th>
          <th>ASCII</th>
        </tr>
        <tr>
          <td>F</td>
          <td>F A C</td>
          <td>A B</td>
          <td>C F B</td>
          <td>1001001</td>
          <td>I</td>
        </tr>
        <tr>
          <td>Em7</td>
          <td>E G B D</td>
          <td>F G A</td>
          <td>D E F A B</td>
          <td>1101110</td>
          <td>n</td>
        </tr>
        <tr>
          <td>E7sus</td>
          <td>E A B D</td>
          <td>D G</td>
          <td>E G A B</td>
          <td>1110100</td>
          <td>t</td>
        </tr>
        <tr>
          <td>G6/9</td>
          <td>G B D E A</td>
          <td>C D G</td>
          <td>C E A B</td>
          <td>1100101</td>
          <td>e</td>
        </tr>
        <tr>
          <td>Dm</td>
          <td>D F A</td>
          <td>F G B</td>
          <td>D G A B</td>
          <td>1110010</td>
          <td>r</td>
        </tr>
        <tr>
          <td>Am7</td>
          <td>A C E G</td>
          <td>C E B</td>
          <td>G A B</td>
          <td>1110000</td>
          <td>p</td>
        </tr>
        <tr>
          <td>F(add9)</td>
          <td>F A C G</td>
          <td>C D F B</td>
          <td>D G A B</td>
          <td>1110010</td>
          <td>r</td>
        </tr>
        <tr>
          <td>Dm9</td>
          <td>D F A C E</td>
          <td>D F B</td>
          <td>C E A B</td>
          <td>1100101</td>
          <td>e</td>
        </tr>
        <tr>
          <td>E5</td>
          <td>E B</td>
          <td>G A</td>
          <td>E G A B</td>
          <td>1110100</td>
          <td>t</td>
        </tr>
        <tr>
          <td>
            B<sup>ø7</sup>
          </td>
          <td>B D F A</td>
          <td>D F B</td>
          <td>A</td>
          <td>0100000</td>
          <td>(space)</td>
        </tr>
        <tr>
          <td>
            B<sup>o</sup>
          </td>
          <td>B D F</td>
          <td>F G A</td>
          <td>D G A B</td>
          <td>1110010</td>
          <td>r</td>
        </tr>
        <tr>
          <td>G7sus</td>
          <td>G C D F</td>
          <td>E G A B</td>
          <td>C D E F A B</td>
          <td>1101111</td>
          <td>o</td>
        </tr>
        <tr>
          <td>Em7(♭9)</td>
          <td>E G B D F</td>
          <td>C G A</td>
          <td>C D E F A B</td>
          <td>1101111</td>
          <td>o</td>
        </tr>
        <tr>
          <td>G</td>
          <td>G B D</td>
          <td>D E A</td>
          <td>E G A B</td>
          <td>1110100</td>
          <td>t</td>
        </tr>
        <tr>
          <td>C6</td>
          <td>C E G A</td>
          <td>D E B</td>
          <td>C D G A B</td>
          <td>1110011</td>
          <td>s</td>
        </tr>
        <tr>
          <td>Am7(no5)</td>
          <td>A C G</td>
          <td>C G</td>
          <td>A</td>
          <td>0100000</td>
          <td>(space)</td>
        </tr>
        <tr>
          <td>
            B<sup>o</sup>(♭9)
          </td>
          <td>B D F C</td>
          <td>D F A</td>
          <td>C A B</td>
          <td>1100001</td>
          <td>a</td>
        </tr>
        <tr>
          <td>Em7</td>
          <td>E G B D</td>
          <td>C E A</td>
          <td>C D G A B</td>
          <td>1110011</td>
          <td>s</td>
        </tr>
        <tr>
          <td>Esus</td>
          <td>E A B</td>
          <td>E B</td>
          <td>A</td>
          <td>0100000</td>
          <td>(space)</td>
        </tr>
        <tr>
          <td>Fsus2</td>
          <td>F G C</td>
          <td>D F B</td>
          <td>C D G B</td>
          <td>1010011</td>
          <td>S</td>
        </tr>
        <tr>
          <td>G9</td>
          <td>G B D F A</td>
          <td>C E G</td>
          <td>C D E F A B</td>
          <td>1101111</td>
          <td>o</td>
        </tr>
        <tr>
          <td>Em</td>
          <td>E G B</td>
          <td>F G A</td>
          <td>E F A B</td>
          <td>1101100</td>
          <td>l</td>
        </tr>
        <tr>
          <td>G5</td>
          <td>G D</td>
          <td>A B</td>
          <td>D G A B</td>
          <td>1110010</td>
          <td>r</td>
        </tr>
        <tr>
          <td>Dm7</td>
          <td>D F A C</td>
          <td>D E F B</td>
          <td>C E A B</td>
          <td>1100101</td>
          <td>e</td>
        </tr>
        <tr>
          <td>Dsus</td>
          <td>D G A</td>
          <td>C B</td>
          <td>C D G A B</td>
          <td>1110011</td>
          <td>s</td>
        </tr>
        <tr>
          <td>A7sus2</td>
          <td>A B E G</td>
          <td>C D F G</td>
          <td>C D E F A B</td>
          <td>1101111</td>
          <td>o</td>
        </tr>
        <tr>
          <td>Am</td>
          <td>A C E</td>
          <td>C F B</td>
          <td>E F A B</td>
          <td>1101100</td>
          <td>l</td>
        </tr>
      </StyledTable>
      <p>This spells the message “Interpret roots as Solresol”.</p>
      <p>
        The Solresol constructed language uses the notes of the scale to spell
        out its words, so the next step is to use the notated chord roots and
        read them as if they were the notes in Solresol! There are a couple of
        other features of Solresol that also need to be translated from the
        played music:
      </p>
      <ul>
        <li>
          Words in Solresol are usually made up of multiple notes and need to be
          separated by pauses. Those word breaks are given by the two-beat
          pauses in the video.
        </li>
        <li>
          The same note sequence can represent several related concepts (like
          “to prefer” vs “preference” vs “preferably”). To distinguish between
          those concepts, one particular note in the sequence is given a
          circumflex accent, which is played with rinforzando (suddenly
          increased volume). In the video, those accents are associated with the
          chords that are played louder than the rest.
        </li>
        <li>
          Plurals in Solresol are marked by an acute accent, which is played
          with gemination (elongated pronunciation). In the video, that accent
          is associated with the chord that is played for longer than one
          measure.
        </li>
      </ul>
      <p>The Solresol translation goes as follows:</p>
      <StyledTable>
        <tr>
          <th>Notes</th>
          <th>Solresol</th>
          <th>Translation</th>
        </tr>
        <tr>
          <td>F E</td>
          <td>fa mi</td>
          <td>This</td>
        </tr>
        <tr>
          <td>E G D A</td>
          <td>mî sol re la</td>
          <td>group</td>
        </tr>
        <tr>
          <td>F D E</td>
          <td>fa re mi</td>
          <td>is</td>
        </tr>
        <tr>
          <td>B B </td>
          <td>si si</td>
          <td>(past participle marker)</td>
        </tr>
        <tr>
          <td>G E G C</td>
          <td>sol mi sol do</td>
          <td>composed</td>
        </tr>
        <tr>
          <td>A B</td>
          <td>la si</td>
          <td>of</td>
        </tr>
        <tr>
          <td>E E F</td>
          <td>mi mi fa</td>
          <td>nine</td>
        </tr>
        <tr>
          <td>G E G D</td>
          <td>sol mî sol ré</td>
          <td>musicians</td>
        </tr>
        <tr>
          <td>D A A</td>
          <td>re la la</td>
          <td>(five)</td>
        </tr>
      </StyledTable>
      <p>
        A type of group composed of nine musicians is a{" "}
        <PuzzleAnswer>NONET</PuzzleAnswer>.
      </p>
      <h3>Acknowledgements</h3>
      <p>
        The scrolling piano roll portion of the video was created using Simon
        Rodriguez’s{" "}
        <a
          href="https://github.com/kosua20/MIDIVisualizer"
          target="_blank"
          rel="noreferrer"
        >
          MIDI Visualizer
        </a>
        .
      </p>
    </>
  );
};

export default Solution;
