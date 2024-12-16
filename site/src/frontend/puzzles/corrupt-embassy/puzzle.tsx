import React from "react";
import { styled } from "styled-components";
import image1 from "./assets/image1.png";
import image10 from "./assets/image10.png";
import image11 from "./assets/image11.png";
import image12 from "./assets/image12.jpg";
import image13 from "./assets/image13.png";
import image14 from "./assets/image14.png";
import image15 from "./assets/image15.png";
import image16 from "./assets/image16.png";
import image17 from "./assets/image17.png";
import image18 from "./assets/image18.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.jpg";
import image4 from "./assets/image4.png";
import image5 from "./assets/image5.png";
import image6 from "./assets/image6.png";
import image7 from "./assets/image7.png";
import image8 from "./assets/image8.png";
import image9 from "./assets/image9.png";

const StyledTable = styled.table`
  border-collapse: collapse;
  th,
  td {
    border: 1px solid black;
    padding: 0px 8px;
  }
  td:first-child {
    width: 300px;
    img {
      display: block;
      margin: 16px auto;
      max-height: 130px;
    }
  }
`;

const DATA: { image: string; score: number }[] = [
  { image: image1, score: 235 },
  { image: image2, score: 247 },
  { image: image3, score: 166 },
  { image: image4, score: 317 },
  { image: image5, score: 192 },
  { image: image6, score: 283 },
  { image: image7, score: 757 },
  { image: image8, score: 205 },
  { image: image9, score: 230 },
  { image: image10, score: 314 },
  { image: image11, score: 247 },
  { image: image12, score: 186 },
  { image: image13, score: 61 },
  { image: image14, score: 50 },
  { image: image15, score: 382 },
  { image: image16, score: 25 },
  { image: image17, score: 85 },
  { image: image18, score: 177 },
];

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p>
        Once upon a time there was a woman in a dark virtual world, who rode
        naked through the streets sitting on a giant sparkly cube, to obtain
        freedom for her citizens.
      </p>
      <p>
        Once upon a time a bee landed on a woman facing into a strong wind with
        a man running in a giant wheel behind her, and hence she was recognised
        as a disguised princess.
      </p>
      <p>
        Once upon a time there was a lowly boy playing the piano who cast a
        spell to light it on fire and became king.
      </p>
      <p>
        Once upon a time there were two robots performing laser heart surgery on
        a man who sacrificed his life for his friend.
      </p>
      <p>
        Once upon a time there was a band of goth metal orcs who encountered a
        colony of gold-digging ants.
      </p>
      <p>
        Once upon a time there were woodland fairies who were dancing among the
        cherry blossoms by a throne made from an old tree trunk before the whole
        group were transformed into catfish.
      </p>
      <p>
        Once upon a time a man with a smaller animated friend stole chickens
        together. The man held a mock funeral to cover the theft and his friend
        copied his every move.
      </p>
      <p>
        Once upon a time there was a leopard who was tied up in a bag and thrown
        into the sea, an inexplicable gorilla appeared, and then he floated to
        shore and found a mate.
      </p>
      <p>
        Once upon a time there were six young women forced to choose between
        their desire to dance and their duty to do chores. Four chose to spend
        their time dancing and singing and left their two friends to wash their
        clothes and churn the butter.{" "}
      </p>
      <p>
        Once upon a time there were six old women baking bread who were brought
        back from the dead by music.
      </p>
      <p>
        Once upon a time there was a girl who had committed personal offences
        against the gods living in a house made of sheets of paper as a
        punishment.
      </p>
      <p>
        Once upon a time a barefoot girl in the golden light enticed two
        soldiers who were drumming and playing the flute by offering them her
        love, but she was actually a witch and destroyed them.
      </p>
      <p>
        Once upon a time a god cared for his favorite individuals: a country
        music band surrounded by illuminated cacti.
      </p>
      <p>
        Once upon a time there were five tough military men wearing punk dresses
        who were driven insane by a rocket-wielding autocrat who kept them
        awake.
      </p>
      <p>
        Once upon a time there was a fairy woman with a wondrous quiff hairstyle
        and a dress made of stars who combed the hair of children and grew to be
        an incredible height.
      </p>
      <p>
        Once upon a time there was a person spinning on a tilting disc who fell
        in love with another person they had never seen.
      </p>
      <p>
        Once upon a time there was a woman held captive in a tower, washing her
        hands surrounded by five attendants with towels.
      </p>
      <p>
        Once upon a time the gods were offended by a crew of flight attendants
        because they neglected the sacred fires.
      </p>
      <StyledTable>
        <tr>
          <th>Country</th>
          <th>Score</th>
        </tr>
        {DATA.map(({ image, score }, i) => (
          <tr key={i}>
            <td>
              <img src={image} alt="A flag" />
            </td>
            <td>{score}</td>
          </tr>
        ))}
      </StyledTable>
    </>
  );
};

export default Puzzle;
