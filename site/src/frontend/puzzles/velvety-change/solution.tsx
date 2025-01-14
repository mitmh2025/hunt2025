import React from "react";
import { PuzzleAnswer } from "../../components/StyledUI";

export default function Solution() {
  return (
    <p>
      Hunters were invited to be bartenders for a high-society event, and figure
      out what drink would satisfy each judging member of the party. Upon
      entering the room, they were handed a colorful cocktail glass, with a
      colorful liquid, sword garnish stick, and a fruit garnish, each in one of
      five different colors. When the participants interact with the judges and
      present their drink, they gradually realize that they’re playing a game of
      Mastermind, with each judge using their own unique tells to indicate the
      number of colors that are correctly assigned to items, and the number of
      colors that are correct but assigned to the incorrect item. Once teams
      found the correct drinks to satisfy two of the judges, they were presented
      with the answer to the event on a cocktail napkin:{" "}
      <PuzzleAnswer>COSMOPOLITAN</PuzzleAnswer>.
    </p>
  );
}
