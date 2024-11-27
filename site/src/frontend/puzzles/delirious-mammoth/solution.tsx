import React from "react";
import { styled } from "styled-components";

const Mono = styled.span`
  font-family: monospace;
`;

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
        <Mono>
          <strong>HEDWIG AND THE ANGRY INCH</strong>
        </Mono>
        , a Broadway musical about a singer.
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
          <th>Song</th>
          <th>Show</th>
          <th>Song</th>
          <th>Contrast</th>
        </tr>
        <tr>
          <td>1</td>
          <td>
            <i>Six</i>
          </td>
          <td>Don’t Lose Ur Head</td>
          <td>Aladdin</td>
          <td>Friend Like Me</td>
          <td>Bad friend vs. good friend</td>
        </tr>
        <tr>
          <td>2</td>
          <td>
            <i>Annie</i>
          </td>
          <td>Tomorrow</td>
          <td>Cats</td>
          <td>Memory</td>
          <td>Thinking of the future vs. the past</td>
        </tr>
        <tr>
          <td>3</td>
          <td>
            <i>Evita</i>
          </td>
          <td>Don’t Cry for Me Argentina</td>
          <td>Hello, Dolly!</td>
          <td>Hello, Dolly!</td>
          <td>Saying goodbye vs. hello</td>
        </tr>
        <tr>
          <td>4</td>
          <td>
            <i>Chess</i>
          </td>
          <td>One Night In Bangkok</td>
          <td>Les Misérables</td>
          <td>One Day More</td>
          <td>Night vs. Day</td>
        </tr>
        <tr>
          <td>5</td>
          <td>
            <i>Rent</i>
          </td>
          <td>Rent</td>
          <td>Fiddler on the Roof</td>
          <td>If I Were a Rich Man</td>
          <td>Reality of poverty vs. imagination of wealth</td>
        </tr>
        <tr>
          <td>6</td>
          <td>
            <i>Peter Pan</i>
          </td>
          <td>I Won’t Grow Up</td>
          <td>Wicked</td>
          <td>Defying Gravity</td>
          <td>Staying as you are vs. growing up</td>
        </tr>
        <tr>
          <td>7</td>
          <td>
            <i>Guys and Dolls</i>
          </td>
          <td>Luck be a Lady</td>
          <td>Jagged Little Pill</td>
          <td>Ironic</td>
          <td>Is it ironic or just bad luck?</td>
        </tr>
        <tr>
          <td>8</td>
          <td>
            <i>Hairspray</i>
          </td>
          <td>You Can’t Stop The Beat</td>
          <td>Phantom of the Opera</td>
          <td>Music of the Night</td>
          <td>Inevitability of music to bring us into light vs. dark</td>
        </tr>
        <tr>
          <td>9</td>
          <td>
            <i>Prologue: Into the Woods</i>
          </td>
          <td>Into the Woods</td>
          <td>Meet Me In St. Louis</td>
          <td>Have Yourself a Merry Little Christmas</td>
          <td>Cursing vs. blessing</td>
        </tr>
      </StyledTable>
    </>
  );
};

export default Solution;
