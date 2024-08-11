import React from "react";
import board_letters from "./assets/board-letters.png";
import board_locations from "./assets/board-locations.png";

const Solution = () => {
  return (
    <>
      <p>
        Each of the feeder answers references a property on the board in a
        version of Monopoly:
      </p>
      <table>
        <thead>
          <tr>
            <th>Feeder answer</th>
            <th>Monopoly version</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>NEWMANS APARTMENT</td>
            <td>Seinfeld</td>
          </tr>
          <tr>
            <td>FROM RUSSIA WITH LOVE</td>
            <td>007</td>
          </tr>
          <tr>
            <td>JABBAS BOILER ROOM</td>
            <td>Star Wars Return of the Jedi</td>
          </tr>
          <tr>
            <td>HAL INSTITUTE FOR CRIMINALLY INSANE ROBOTS</td>
            <td>Futurama</td>
          </tr>
          <tr>
            <td>THE BEATLES</td>
            <td>The Beatles Collectors Edition</td>
          </tr>
          <tr>
            <td>DEVILS MARBLES</td>
            <td>Australia Here and Now</td>
          </tr>
        </tbody>
      </table>
      <p>
        They also are each in a unique position on the board, as shown below:
      </p>

      <img
        src={board_locations}
        alt="Monopoly board showing the six locations where the properties listed are located on the board"
      />

      <p>
        Starting at the location of the property on the board, write one letter
        of the property in each space as you “walk” around the board. If a space
        has a duplicate letter, take that letter.
      </p>

      <img
        src={board_letters}
        alt="Monopoly board with addition letters spelling out the feeders starting on the space with those feeders"
      />

      <p>
        Reading these duplicates in order around the board (starting from “GO”)
        and you get BAIL MATE.
      </p>

      <table>
        <thead>
          <tr>
            <th>Board space</th>
            <th>Doubled letter</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>St. Charles Place</td>
            <td>B</td>
          </tr>
          <tr>
            <td>Electric Company</td>
            <td>A</td>
          </tr>
          <tr>
            <td>St. James Place</td>
            <td>I</td>
          </tr>
          <tr>
            <td>Community Chest</td>
            <td>L</td>
          </tr>
          <tr>
            <td>New York Avenue</td>
            <td>M</td>
          </tr>
          <tr>
            <td>Free Parking</td>
            <td>A</td>
          </tr>
          <tr>
            <td>Ventnor Avenue</td>
            <td>T</td>
          </tr>
          <tr>
            <td>Marvin Gardens</td>
            <td>E</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Solution;
