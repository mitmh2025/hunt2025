import React from "react";
import { styled } from "styled-components";

const MonospaceTable = styled.table`
  font-family: monospace;

  margin-bottom: 1rem;
  border-collapse: collapse;
  border: 1px solid var(--black);

  td,
  th {
    border: 1px solid var(--black);
    padding: 0 0.5rem;
  }
`;

const CSpan = styled.span<{ $color: "red" | "blue" }>`
  color: ${({ $color }) => $color};
`;

const Solution = () => {
  return (
    <div>
      <p>
        This puzzle contains 7 rounds of Texas Hold&apos;Em Poker played against
        an opponent. On the table in each round, the community cards are
        arranged in increasing value (by rank, then by suit ordered Clubs,
        Diamonds, Hearts, Spades), with the chips in front of each player
        increasing once each round, indicating the rounds do not need to be
        re-ordered. The aim of the puzzle, hinted by the flavor, is to beat the
        opponent at each poker round by cheating, playing your own pairs but not
        getting caught.
      </p>

      <p>
        Looking closely at the opponent each round, you can see his hole cards
        reflected in his glasses. This tells you what his best hand is, which
        you must beat by swapping the cards you have hidden in your sleeves.
        However, there is nowhere close to a unique way to beat the dealer in
        each hand, suggesting that the hidden cards are set and must be
        determined from the round answer feeders.
      </p>

      <p>
        It turns out that each of the 7 feeders to the puzzle have a
        commonality: aside from all being 13 letters long, each feeder contains
        the name of a card rank as a substring (e.g. Ace, Nine, King), hinted by
        &ldquo;keep rank&rdquo; and &ldquo;conceal your con&rdquo; in the flavor
        text. In addition, each feeder begins with either the letter C, H, or S,
        which are abbreviations for card suits. From this, we can infer that
        each feeder is associated with a specific playing card from the standard
        52-card deck:
      </p>

      <MonospaceTable>
        <thead>
          <tr>
            <th>Feeder Answer</th>
            <th>Card</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <CSpan $color="blue">C</CSpan>A<CSpan $color="red">NINE</CSpan>
              PARTNER
            </td>
            <td>9♣</td>
          </tr>
          <tr>
            <td>
              <CSpan $color="blue">C</CSpan>HEE<CSpan $color="red">SEVEN</CSpan>
              DORS
            </td>
            <td>7♣</td>
          </tr>
          <tr>
            <td>
              <CSpan $color="blue">C</CSpan>HO<CSpan $color="red">KING</CSpan>
              HAZARD
            </td>
            <td>K♣</td>
          </tr>
          <tr>
            <td>
              <CSpan $color="blue">H</CSpan>ARDDISKSP
              <CSpan $color="red">ACE</CSpan>
            </td>
            <td>A♥</td>
          </tr>
          <tr>
            <td>
              <CSpan $color="blue">S</CSpan>L<CSpan $color="red">EIGHT</CSpan>
              OFHAND
            </td>
            <td>8♠</td>
          </tr>
          <tr>
            <td>
              <CSpan $color="blue">S</CSpan>P<CSpan $color="red">ACE</CSpan>
              WARSHIPS
            </td>
            <td>A♠</td>
          </tr>
          <tr>
            <td>
              <CSpan $color="blue">S</CSpan>
              <CSpan $color="red">TEN</CSpan>OGRAPHERS
            </td>
            <td>10♠</td>
          </tr>
        </tbody>
      </MonospaceTable>

      <p>
        These cards represent the pool of cards you have hidden up your sleeves.
        Given this set, there is a unique way to beat the opponent in each round
        of poker, with one distinction: you cannot play cards that are already
        on the table, otherwise you will be caught cheating. In this way, each
        card will be used exactly twice (&ldquo;double up&rdquo;), which
        provides confirmation of the correct assignment.
      </p>

      <MonospaceTable>
        <thead>
          <tr>
            <th>Round</th>
            <th>Community Cards</th>
            <th>Opponent&apos;s Hand</th>
            <th>Your Hand</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan={2}>1</td>
            <td rowSpan={2}>A♦,5♦,6♠,7♦,K♦</td>
            <td>3♣,4♥</td>
            <td>8♠,9♣</td>
          </tr>
          <tr>
            <td>
              3♣,4♥,5♦,6♠,7♦
              <br />
              (Straight, 7-high)
            </td>
            <td>
              5♦,6♠,7♦,8♠,9♣
              <br />
              (Straight, 9-high)
            </td>
          </tr>

          <tr>
            <td rowSpan={2}>2</td>
            <td rowSpan={2}>A♦,A♠,3♣,J♥,K♠</td>
            <td>10♦,Q♦</td>
            <td>A♥,K♣</td>
          </tr>
          <tr>
            <td>
              10♦,J♥,Q♦,K♠,A♠
              <br />
              (Straight)
            </td>
            <td>
              K♣,K♠,A♦,A♥,A♠
              <br />
              (Full House)
            </td>
          </tr>

          <tr>
            <td rowSpan={2}>3</td>
            <td rowSpan={2}>A♥,3♣,4♠,7♦,J♥</td>
            <td>A♣,9♥</td>
            <td>7♣,A♠</td>
          </tr>
          <tr>
            <td>
              A♣,A♥
              <br />
              (Pair)
            </td>
            <td>
              A♥,A♠,7♣,7♦
              <br />
              (Two Pair)
            </td>
          </tr>

          <tr>
            <td rowSpan={2}>4</td>
            <td rowSpan={2}>2♣,5♦,7♥,10♣,10♥</td>
            <td>7♦,7♠</td>
            <td>7♣,10♠</td>
          </tr>
          <tr>
            <td>
              10♣,10♥,7♦,7♥,7♠
              <br />
              (Full House, 7s over 10s)
            </td>
            <td>
              7♣,7♥,10♣,10♥,10♠
              <br />
              (Full House, 10s over 7s)
            </td>
          </tr>

          <tr>
            <td rowSpan={2}>5</td>
            <td rowSpan={2}>6♣,6♠,J♠,Q♠,K♠</td>
            <td>6♦,6♥</td>
            <td>A♠,10♠</td>
          </tr>
          <tr>
            <td>
              6♣,6♦,6♥,6♠
              <br />
              (Four-of-a-kind){" "}
            </td>
            <td>
              10♠,J♠,Q♠,K♠,A♠
              <br />
              (Royal Flush){" "}
            </td>
          </tr>

          <tr>
            <td rowSpan={2}>6</td>
            <td rowSpan={2}>5♣,6♠,7♣,8♥,10♣</td>
            <td>8♣,J♣</td>
            <td>9♣,K♣</td>
          </tr>
          <tr>
            <td>
              5♣,7♣,8♣,10♣,J♣
              <br />
              (Flush, Jack-high)
            </td>
            <td>
              5♣,7♣,9♣,10♣,K♣
              <br />
              (Flush, King-high)
            </td>
          </tr>

          <tr>
            <td rowSpan={2}>7</td>
            <td rowSpan={2}>A♠,2♥,4♦,8♣,Q♥</td>
            <td>4♠,Q♦</td>
            <td>A♥,8♠</td>
          </tr>
          <tr>
            <td>
              4♦,4♠,Q♦,Q♥
              <br />
              (Two Pair, Queens over 4s)
            </td>
            <td>
              8♣,8♠,A♥,A♠
              <br />
              (Two Pair, Aces over 8s)
            </td>
          </tr>
        </tbody>
      </MonospaceTable>

      <p>
        The 13-letter feeders, alongside the numbers for the card ranks,
        strongly indicate indexing into the feeders. Given the 7 pairings of
        cards, you must use each card&apos;s rank (Ace = 1, King = 13) to index
        into the other card, extracting 7 bigrams. The bigram ordering can
        easily be brute-forced, however a parity check is given in how your hole
        cards are overlapped. If the left card is on top, the letter extracted
        from the card of lower value goes first, and conversely if the right
        card is on top the letter extracted from the card of higher value goes
        first. Combining all 7 bigrams produces the answer{" "}
        <code>FACECARDSHARKS</code>.
      </p>

      <MonospaceTable>
        <thead>
          <tr>
            <th>Hole Cards</th>
            <th>High / Low Card First</th>
            <th>Card Feeder</th>
            <th>Paired Card Rank</th>
            <th>Indexed Letter</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan={2}>8♠,9♣</td>
            <td rowSpan={2}>Low</td>
            <td>
              SLEIGHTO<CSpan $color="red">F</CSpan>HAND
            </td>
            <td>9</td>
            <td>F</td>
          </tr>
          <tr>
            <td>
              CANINEP<CSpan $color="red">A</CSpan>RTNER
            </td>
            <td>8</td>
            <td>A</td>
          </tr>
          <tr>
            <td rowSpan={2}>A♥,K♣</td>
            <td rowSpan={2}>High</td>
            <td>
              <CSpan $color="red">C</CSpan>HOKINGHAZARD
            </td>
            <td>1</td>
            <td>C</td>
          </tr>
          <tr>
            <td>
              HARDDISKSPAC<CSpan $color="red">E</CSpan>
            </td>
            <td>13</td>
            <td>E</td>
          </tr>
          <tr>
            <td rowSpan={2}>7♣,A♠</td>
            <td rowSpan={2}>High</td>
            <td>
              <CSpan $color="red">C</CSpan>HEESEVENDORS
            </td>
            <td>1</td>
            <td>C</td>
          </tr>
          <tr>
            <td>
              SPACEW<CSpan $color="red">A</CSpan>RSHIPS
            </td>
            <td>7</td>
            <td>A</td>
          </tr>
          <tr>
            <td rowSpan={2}>7♣,10♠</td>
            <td rowSpan={2}>High</td>
            <td>
              STENOG<CSpan $color="red">R</CSpan>APHERS
            </td>
            <td>7</td>
            <td>R</td>
          </tr>
          <tr>
            <td>
              CHEESEVEN<CSpan $color="red">D</CSpan>ORS
            </td>
            <td>10</td>
            <td>D</td>
          </tr>
          <tr>
            <td rowSpan={2}>A♠,10♠</td>
            <td rowSpan={2}>High</td>
            <td>
              <CSpan $color="red">S</CSpan>TENOGRAPHERS
            </td>
            <td>1</td>
            <td>S</td>
          </tr>
          <tr>
            <td>
              SPACEWARS<CSpan $color="red">H</CSpan>IPS
            </td>
            <td>10</td>
            <td>H</td>
          </tr>
          <tr>
            <td rowSpan={2}>9♣,K♣</td>
            <td rowSpan={2}>High</td>
            <td>
              CHOKINGH<CSpan $color="red">A</CSpan>ZARD
            </td>
            <td>9</td>
            <td>A</td>
          </tr>
          <tr>
            <td>
              CANINEPA<CSpan $color="red">R</CSpan>TNER
            </td>
            <td>13</td>
            <td>R</td>
          </tr>
          <tr>
            <td rowSpan={2}>A♥,8♠</td>
            <td rowSpan={2}>Low</td>
            <td>
              HARDDIS<CSpan $color="red">K</CSpan>SPACE
            </td>
            <td>8</td>
            <td>K</td>
          </tr>
          <tr>
            <td>
              <CSpan $color="red">S</CSpan>LEIGHTOFHAND
            </td>
            <td>1</td>
            <td>S</td>
          </tr>
        </tbody>
      </MonospaceTable>
    </div>
  );
};

export default Solution;
