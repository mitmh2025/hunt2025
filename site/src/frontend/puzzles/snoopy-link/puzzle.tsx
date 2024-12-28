import React from "react";
import { createGlobalStyle, styled } from "styled-components";
import FingerPaint from "./assets/FingerPaint.ttf";

// Font from https://fonts.google.com/specimen/Finger+Paint
const Fonts = createGlobalStyle`
  @font-face {
    font-family: "finger-paint";
    src: url(${FingerPaint});
    font-weight: normal;
    font-style: normal;
  }
`;

const FontParagraph = styled.p`
  font-family: "finger-paint";
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px;

  /* Responsive behavior */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  padding: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 4px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GridItem = styled.div`
  display: flex;
  place-items: center;
  padding: 10px;
  border-radius: 4px;
`;

const Puzzle = () => {
  return (
    <>
      <Fonts />
      <p className="puzzle-flavor">...now everything’s all over the map</p>
      <Container>
        <Column>
          <FontParagraph>
            The CIA sponsored exhibitions in this village north of Rajpur, which
            had been visited by both Marco Polo and Ibn Battuta.
          </FontParagraph>
          <FontParagraph>
            Ticketmaster charges exorbitant fees to explore the antenna towers
            of these ancient temples.
          </FontParagraph>
          <FontParagraph>
            Experiments on mice are conducted at this famed star at the center
            of the universe.
          </FontParagraph>
          <FontParagraph>
            Séances and child abductions were held in these colossal temples,
            which represent the peak of origami architecture.
          </FontParagraph>
          <FontParagraph>
            Cannabis was first cultivated 8000 years ago in this site, famed for
            a pyramid whose name rhymes with Ozer.
          </FontParagraph>
          <FontParagraph>
            Find Mickey Mouse and Ms. Pac-Man at this well-fortified city in
            Essex once called the “House of God“.
          </FontParagraph>
          <FontParagraph>
            The “Scottish Utah“ produces farmed salmon that is dyed pink.
          </FontParagraph>
          <FontParagraph>
            This pair of missions built by the Ottomans is famed for their
            deadly car crashes and graverobbing.
          </FontParagraph>
          <FontParagraph>
            These fantastic figures in the Peruvian theater depict the War of
            the Worlds and poisoned candy.
          </FontParagraph>
          <FontParagraph>
            This tomb of the General is filled with thousands of Oscar
            statuettes.
          </FontParagraph>
        </Column>
        <Column>
          <FontParagraph>
            Up to a hundred thousand people are kept in solitary confinement at
            these six sites, some of the world’s oldest Euclidean structures.
          </FontParagraph>
          <FontParagraph>
            Trump wanted to build a wall around these wondrous cocoons.
          </FontParagraph>
          <FontParagraph>
            Airbnb was chastised for its abusive practices in these megalithic
            palaces built on over 100 islands of Ecuador.
          </FontParagraph>
          <FontParagraph>
            Petroglyphs found in a nation inside of China explain how low social
            mobility in the United States actually is.
          </FontParagraph>
          <FontParagraph>
            Facebook and Google monitor anyone who views paintings of nude
            mammoths or sculptures of fish.
          </FontParagraph>
          <FontParagraph>
            The Founding Fathers gave suffrage to only 6% of the sculptures on
            Staten Island.
          </FontParagraph>
          <FontParagraph>
            This vast monastery in Tibet was built to try to address a homeless
            crisis.
          </FontParagraph>
          <FontParagraph>
            Concussions and overhydration have recently destroyed most of this
            temple dedicated to a god who is part of a trinity with Horus.
          </FontParagraph>
          <FontParagraph>
            Immortality potions were brewed in these extraordinary circles north
            of Banjul.
          </FontParagraph>
          <FontParagraph>
            Wearing white and experiencing limerence were hallmarks of the
            capital of the kingdom that founded Roanoke.
          </FontParagraph>
        </Column>
      </Container>
      <FontParagraph>Actually, it’s...</FontParagraph>
      <Container>
        <Column>
          <Grid>
            <GridItem>
              <FontParagraph>Aglibol</FontParagraph>
            </GridItem>
            <GridItem>
              <FontParagraph>Itches</FontParagraph>
            </GridItem>
            <GridItem>
              <FontParagraph>Religious</FontParagraph>
            </GridItem>
            <GridItem>
              <FontParagraph>Aurochs</FontParagraph>
            </GridItem>
            <GridItem>
              <FontParagraph>Mastabas</FontParagraph>
            </GridItem>
            <GridItem>
              <FontParagraph>Sanctuary</FontParagraph>
            </GridItem>
            <GridItem>
              <FontParagraph>Desert</FontParagraph>
            </GridItem>
            <GridItem>
              <FontParagraph>Micronesia</FontParagraph>
            </GridItem>
            <GridItem>
              <FontParagraph>Society of Jesus</FontParagraph>
            </GridItem>
            <GridItem>
              <FontParagraph>Dos Pilas</FontParagraph>
            </GridItem>
            <GridItem>
              <FontParagraph>Naogaon</FontParagraph>
            </GridItem>
            <GridItem>
              <FontParagraph>Sur</FontParagraph>
            </GridItem>
            <GridItem>
              <FontParagraph>Easter</FontParagraph>
            </GridItem>
            <GridItem>
              <FontParagraph>Northwest</FontParagraph>
            </GridItem>
            <GridItem>
              <FontParagraph>Upper Mesopotamia</FontParagraph>
            </GridItem>
            <GridItem>
              <FontParagraph>Emperor</FontParagraph>
            </GridItem>
            <GridItem>
              <FontParagraph>Ogival</FontParagraph>
            </GridItem>
            <GridItem>
              <FontParagraph>Upstream</FontParagraph>
            </GridItem>
            <GridItem>
              <FontParagraph>Imperial Roman</FontParagraph>
            </GridItem>
            <GridItem>
              <FontParagraph>Pompeii</FontParagraph>
            </GridItem>
          </Grid>
        </Column>
      </Container>
    </>
  );
};

export default Puzzle;
