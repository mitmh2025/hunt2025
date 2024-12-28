import React from "react";
import { styled } from "styled-components";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";

const StyledTable = styled.table`
  margin-bottom: 1em;
  td,
  th {
    padding: 1px 8px;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        We hear some familiar tunes with some strange lyrics. What they have in
        common is that the tunes are all from songs from Broadway musicals,
        though some of the songs may be more familiar from other contexts.
        Thinking about Broadway musicals, solvers can realize the lyrics are all
        paraphrases from songs from different Broadway musicals. Since the title
        asks “Whose song is it?,” and the puzzle gives blanks in the “music
        space” and “lyrics space” for each song, we fill these spaces with the
        name of the character that sings the corresponding tune in the Broadway
        musical. The songs are in alphabetical order by the characters
        associated to the lyrics. After filling in all the character names, we
        take the letters in the red spaces in the numbered order, to spell{" "}
        <Mono>SHOW BY TRASK AND MITCHELL</Mono>, which clues the answer{" "}
        <PuzzleAnswer>HEDWIG AND THE ANGRY INCH</PuzzleAnswer>, a Broadway
        musical about a singer.
      </p>
      <StyledTable>
        <tr>
          <th>Order</th>
          <th>Character that sings tune</th>
          <th>Character that sings similar lyrics</th>
        </tr>
        <tr>
          <td>1</td>
          <td>GENIE</td>
          <td>ANNE BOLEYN</td>
        </tr>
        <tr>
          <td>2</td>
          <td>GRIZABELLA</td>
          <td>ANNIE</td>
        </tr>
        <tr>
          <td>3</td>
          <td>DOLLY</td>
          <td>EVA</td>
        </tr>
        <tr>
          <td>4</td>
          <td>JEAN VALJEAN</td>
          <td>FREDDIE</td>
        </tr>
        <tr>
          <td>5</td>
          <td>TEVYE</td>
          <td>MARK</td>
        </tr>
        <tr>
          <td>6</td>
          <td>ELPHABA</td>
          <td>PETER PAN</td>
        </tr>
        <tr>
          <td>7</td>
          <td>FRANKIE</td>
          <td>SKY</td>
        </tr>
        <tr>
          <td>8</td>
          <td>PHANTOM</td>
          <td>TRACY</td>
        </tr>
        <tr>
          <td>9</td>
          <td>ESTHER</td>
          <td>WITCH</td>
        </tr>
      </StyledTable>
      <h3>Appendix</h3>
      <p>
        The songs and shows are all listed below. Each pair has some sort of
        contrast, mostly for the fun of mixing them up.
      </p>
      <StyledTable>
        <tr>
          <th>Order</th>
          <th>Show</th>
          <th>(Tune) Song</th>
          <th>Show</th>
          <th>(Lyrics) Song</th>
          <th>Contrast</th>
        </tr>
        <tr>
          <td>1</td>
          <td>
            <i>Aladdin</i>
          </td>
          <td>Friend Like Me</td>
          <td>
            <i>Six</i>
          </td>
          <td>Don’t Lose Ur Head</td>
          <td>Good friend vs. bad friend</td>
        </tr>
        <tr>
          <td>2</td>
          <td>
            <i>Cats</i>
          </td>
          <td>Memory</td>
          <td>
            <i>Annie</i>
          </td>
          <td>Tomorrow</td>
          <td>Thinking of the past vs. the future</td>
        </tr>
        <tr>
          <td>3</td>
          <td>
            <i>Hello, Dolly!</i>
          </td>
          <td>Hello, Dolly!</td>
          <td>
            <i>Evita</i>
          </td>
          <td>Don’t Cry for Me Argentina</td>
          <td>Saying hello vs. goodbye</td>
        </tr>
        <tr>
          <td>4</td>
          <td>
            <i>Les Misérables</i>
          </td>
          <td>One Day More</td>
          <td>
            <i>Chess</i>
          </td>
          <td>One Night In Bangkok</td>
          <td>Day vs. night</td>
        </tr>
        <tr>
          <td>5</td>
          <td>
            <i>Fiddler on the Roof</i>
          </td>
          <td>If I Were a Rich Man</td>
          <td>
            <i>Rent</i>
          </td>
          <td>Rent</td>
          <td>Imagination of wealth vs. Reality of poverty</td>
        </tr>
        <tr>
          <td>6</td>
          <td>
            <i>Wicked</i>
          </td>
          <td>Defying Gravity</td>
          <td>
            <i>Peter Pan</i>
          </td>
          <td>I Won’t Grow Up</td>
          <td>Growing up vs. staying as you are</td>
        </tr>
        <tr>
          <td>7</td>
          <td>
            <i>Jagged Little Pill</i>
          </td>
          <td>Ironic</td>
          <td>
            <i>Guys and Dolls</i>
          </td>
          <td>Luck be a Lady</td>
          <td>Is it ironic or just bad luck?</td>
        </tr>
        <tr>
          <td>8</td>
          <td>
            <i>Phantom of the Opera</i>
          </td>
          <td>Music of the Night</td>
          <td>
            <i>Hairspray</i>
          </td>
          <td>You Can’t Stop The Beat</td>
          <td>Inevitability of music to bring us into dark vs. light</td>
        </tr>
        <tr>
          <td>9</td>
          <td>
            <i>Meet Me In St. Louis</i>
          </td>
          <td>Have Yourself a Merry Little Christmas</td>
          <td>
            <i>Into the Woods</i>
          </td>
          <td>Prologue: Into the Woods</td>
          <td>Blessing vs. cursing</td>
        </tr>
      </StyledTable>
    </>
  );
};

export default Solution;
