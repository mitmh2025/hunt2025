import React from "react";
import { styled } from "styled-components";
import img01 from "./assets/img01.png";
import img02 from "./assets/img02.png";
import img03 from "./assets/img03.png";
import img04 from "./assets/img04.png";
import img05 from "./assets/img05.png";
import img06 from "./assets/img06.png";
import img07 from "./assets/img07.png";
import img08 from "./assets/img08.png";
import img09 from "./assets/img09.png";
import img10 from "./assets/img10.png";
import img11 from "./assets/img11.png";
import img12 from "./assets/img12.png";
import img13 from "./assets/img13.png";
import img14 from "./assets/img14.png";
import img15 from "./assets/img15.png";
import img16 from "./assets/img16.png";
import img17 from "./assets/img17.png";
import img18 from "./assets/img18.png";

const SizedImage = styled.img`
  width: 400px;
  height: 400px;
  background-color: white;
  border: 2px solid black;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const Puzzle = () => {
  return (
    <>
      <h3>Before</h3>
      <p>
        <div>1</div>
        <a href={img01} target="_blank" rel="noreferrer">
          <SizedImage
            src={img01}
            alt="Drawing of a silhouette of a person with the back and sides of their hair shaved, and the rest of the hair drawn into a high ponytail."
          />
        </a>
      </p>
      <p>
        <div>2</div>
        <a href={img02} target="_blank" rel="noreferrer">
          <SizedImage
            src={img02}
            alt="Drawing of two space ships flying away from Earth towards a black-and-white checkered banner."
          />
        </a>
      </p>
      <p>
        <div>3</div>
        <a href={img03} target="_blank" rel="noreferrer">
          <SizedImage
            src={img03}
            alt="Drawing of four women in leotards and high heels, all standing next to each other, with their arms out to their side and their right legs up in the air at shoulder level"
          />
        </a>
      </p>
      <p>
        <div>4</div>
        <a href={img04} target="_blank" rel="noreferrer">
          <SizedImage
            src={img04}
            alt="Drawing of four flapjacks with syrup and butter on a plate, flanked by a fork and a knife"
          />
        </a>
      </p>
      <p>
        <div>5</div>
        <a href={img05} target="_blank" rel="noreferrer">
          <SizedImage
            src={img05}
            alt="Drawing of a boat on water. The boat has one mast, two sails, and a pennant"
          />
        </a>
      </p>
      <p>
        <div>6</div>
        <a href={img06} target="_blank" rel="noreferrer">
          <SizedImage
            src={img06}
            alt="Drwaing of a left hand with a ring on its fourth finger, with a black arrow pointing to the ring"
          />
        </a>
      </p>
      <p>
        <div>7</div>
        <a href={img07} target="_blank" rel="noreferrer">
          <SizedImage
            src={img07}
            alt="Drawing of a long rod with indeterminate edges and a solid handle. Solrads emanate from the end of the rod opposite the handle."
          />
        </a>
      </p>
      <p>
        <div>8</div>
        <a href={img08} target="_blank" rel="noreferrer">
          <SizedImage
            src={img08}
            alt="Drawing of a crested bird with a sturdy looking beak, clinging to a tree in front of a hole in the trunk that it probably created."
          />
        </a>
      </p>
      <p>
        <div>9</div>
        <a href={img09} target="_blank" rel="noreferrer">
          <SizedImage
            src={img09}
            alt="Drawing of a fluffy clump of plant fiber."
          />
        </a>
      </p>
      <h3>After</h3>
      <FlexContainer>
        <a href={img10} target="_blank" rel="noreferrer">
          <SizedImage
            src={img10}
            alt="Drawing of a person in a ponytail sitting on an exercise ball in front of a table and using a laptop."
          />
        </a>
        <a href={img11} target="_blank" rel="noreferrer">
          <SizedImage
            src={img11}
            alt="Drawing of a three-story building with barred windows and a balcony and staircase each with concertina wire around the top. There is an X mark in the top left corner of the top two floors and a check mark in the top left corner of the lowest floor."
          />
        </a>
        <a href={img12} target="_blank" rel="noreferrer">
          <SizedImage
            src={img12}
            alt="Drawing of a hatchback with anthropomorphic eyes, throwing up."
          />
        </a>
        <a href={img13} target="_blank" rel="noreferrer">
          <SizedImage
            src={img13}
            alt="Drawing of a flexed arm with a door handle drawn on the bicep."
          />
        </a>
        <a href={img14} target="_blank" rel="noreferrer">
          <SizedImage
            src={img14}
            alt="Drawing of a sausage cart. Hawking the sausages is a man in an a cape and a crown. He is holding up a string of sausages."
          />
        </a>
        <a href={img15} target="_blank" rel="noreferrer">
          <SizedImage
            src={img15}
            alt="Drawing of a swimming basin with a diving board and a ladder. Floating on the water is a woven basket."
          />
        </a>
        <a href={img16} target="_blank" rel="noreferrer">
          <SizedImage
            src={img16}
            alt="Drawing with a man in the background holding a garden rake and looking with a surprised expression at a woman in the foreground. She is dancing and is wearing a mini dress printed with the Union Jack."
          />
        </a>
        <a href={img17} target="_blank" rel="noreferrer">
          <SizedImage
            src={img17}
            alt="Drawing of pair of hands breaking a corked, labeled bottle of dark liquid in half."
          />
        </a>
        <a href={img18} target="_blank" rel="noreferrer">
          <SizedImage
            src={img18}
            alt="Drawing of three pairs of small images, each consisting of a face and a clock. In the first, the face appears bored, and the time is 7:00. In the second, the face appears even more bored, and the time is 7:10. In the third, the face is rolling its eyes and exhaling, and the time is 7:20."
          />
        </a>
      </FlexContainer>
    </>
  );
};

export default Puzzle;
