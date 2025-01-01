import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import image01 from "./assets/01.png";
import image02 from "./assets/02.png";
import image03 from "./assets/03.png";
import image04 from "./assets/04.png";
import image05 from "./assets/05.png";
import image06 from "./assets/06.png";
import image07 from "./assets/07.png";
import image08 from "./assets/08.png";
import image09 from "./assets/09.png";
import image10 from "./assets/10.png";
import image11 from "./assets/11.png";
import image12 from "./assets/12.png";
import image13 from "./assets/13.png";

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Image = styled(LinkedImage)`
  width: 160px;
  height: 160px;
  object-fit: cover;
  margin-bottom: 10px;
  border: 1px solid black;
`;

const Text = styled.p`
  font-size: 16px;
  color: #333;
  text-align: center;
`;

const Puzzle = () => {
  const items = [
    { src: image02, text: "ANNA the Natu" },
    { src: image03, text: "DRIB the Phanpy" },
    { src: image04, text: "EEPY the Staryu" },
    { src: image05, text: "GAIT the Girafarig" },
    { src: image06, text: "HAIG the Aipom" },
    { src: image07, text: "JASPER the Abra" },
    { src: image08, text: "KHAN the Paras" },
    { src: image09, text: "OPEN the Kabuto" },
    { src: image10, text: "PAL the Piplup" },
    { src: image11, text: "SIN the Ekans" },
    { src: image12, text: "SMALE the Jigglypuff" },
    { src: image13, text: "ZAP the Dunsparce" },
  ];
  return (
    <>
      <p className="puzzle-flavor">
        Your Pokémon are much too weak to take on your opponents right now!
      </p>
      <ColumnContainer>
        <h3>Your Starter:</h3>
        <Item>
          <Image src={image01} alt={`Picture 1`} />
          <Text>DIAL the Smoliv</Text>
        </Item>
        <h3>Wild Pokémon: </h3>
        {items.map((item, index) => (
          <Item key={index}>
            <Image src={item.src} alt={`Picture ${index + 2}`} />
            <Text>{item.text}</Text>
          </Item>
        ))}

        <h3>Opponents</h3>
        <p>
          AI RESEARCHER DEBRA would like to battle!
          <br />
          ALLERGIST SARAH would like to battle!
          <br />
          BENEFICIARY SOFIA would like to battle!
          <br />
          BREADMAKER JOHN would like to battle!
          <br />
          CARDINAL MARIO would like to battle!
          <br />
          CHESS MASTER GLINDA would like to battle!
          <br />
          LABORER PUCK would like to battle!
          <br />
          LINGUIST JESSICA would like to battle!
          <br />
          POTATO CHIP FAN ZELDA would like to battle!
          <br />
          SLACKER ARTHUR would like to battle!
          <br />
          STREET ARTIST HUXLEY would like to battle!
          <br />
          TAHINI VENDOR GIRARD would like to battle!
          <br />
          WEST END ACTRESS PIP would like to battle!
          <br />
        </p>
      </ColumnContainer>
    </>
  );
};
export default Puzzle;
