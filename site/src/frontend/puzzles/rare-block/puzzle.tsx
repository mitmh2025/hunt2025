import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import image from "./assets/image.png";

const SizedImage = styled(LinkedImage)`
  display: block;
  width: 350px;
  margin: auto;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p>You find a note slipped under your door:</p>
      <SizedImage
        src={image}
        alt="I have some information on your case you might find useful. Call me, but stay safe—there’s a phone behind the bar at the Gala you can use. Just tell the bartender you want to call extension Carousel-18576. - a friend"
      />
    </>
  );
};

export default Puzzle;
