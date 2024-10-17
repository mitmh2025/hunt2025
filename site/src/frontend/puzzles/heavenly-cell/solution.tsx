import React from "react";
import { styled } from "styled-components";

const PreCode = styled.pre`
  font-family: monospace;
`;

const givenGrid = `COMMONYELLOWHEADED
AMERICANFISHHOODED
YELLOWBILLEDVIOLET
INCAEUROPEANTURTLE
MUSKRUDDYWOODMANED
BONELLISGOLDENBALD
SONGBAIRDSCHIPPING
TRUMPETERBLACKMUTE
PILEATEDDOWNYBLACK
`;

const sortedGrid = `SONGBAIRDSCHIPPING
YELLOWBILLEDVIOLET
MUSKRUDDYWOODMANED
TRUMPETERBLACKMUTE
AMERICANFISHHOODED
INCAEUROPEANTURTLE
BONELLISGOLDENBALD
PILEATEDDOWNYBLACK
COMMONYELLOWHEADED
`;

const extractGrid = `   G           I  
 E     I          
     U   W     N  
              M  E
       N I   O    
 N           U    
       S  L       
P           YB    
         L   E    
`;

// const BoldSpan

const Solution = () => {
  return (
    <>
      <p>
        At the top of the page there is a musical stave, with a play button next
        to each full step in the stave (line or space) that plays a musical
        clip. The songs used, in order from top to bottom:
      </p>

      <table>
        <thead>
          <tr>
            <th>Song title</th>
            <th>Artist</th>
            <th>Referenced bird</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>“Little Sparrow”</td>
            <td>Dolly Parton</td>
            <td>Sparrows</td>
          </tr>
          <tr>
            <td>“Absolutely Cuckoo”</td>
            <td>The Magnetic Fields</td>
            <td>Cuckoos</td>
          </tr>
          <tr>
            <td>“Nice Weather for Ducks”</td>
            <td>Lemon Jelly</td>
            <td>Ducks</td>
          </tr>
          <tr>
            <td>“Seven Swans”</td>
            <td>Sufjan Stevens</td>
            <td>Swans</td>
          </tr>
          <tr>
            <td>“As the Crow Flies”</td>
            <td>The Animals</td>
            <td>Crows</td>
          </tr>
          <tr>
            <td>“When Doves Cry”</td>
            <td>Prince</td>
            <td>Doves</td>
          </tr>
          <tr>
            <td>“Fly Like an Eagle”</td>
            <td>Seal</td>
            <td>Eagles</td>
          </tr>
          <tr>
            <td>“The Woodpecker Song”</td>
            <td>Glenn Miller and His Orchestra</td>
            <td>Woodpeckers</td>
          </tr>
          <tr>
            <td>“Blackbird”</td>
            <td>The Beatles</td>
            <td>Blackbirds</td>
          </tr>
        </tbody>
      </table>

      <p>
        The titles of the songs each include a type of bird – which appear below
        in the images.
      </p>

      <p>
        The images are depictions of Wingspan bird cards (including all Wingspan
        expansions released as of January 2025). Each row of birds has the same
        type of bird (swans, crows, etc), and the rows are alphabetized by bird
        type. <a href="https://navarog.github.io/wingsearch/">Wingsearch</a> may
        be a helpful resource for identifying the bird cards depicted.
      </p>

      <p>
        If you take the name of each bird depicted, remove the bird type (e.g.
        “Baird’s sparrow” becomes <code>BAIRDS</code>), and concatenate them,
        you will get a 18 x 9 grid:
      </p>

      <p>
        <PreCode>{givenGrid}</PreCode>
      </p>

      <p>
        Note that the stave has 9 whole steps (lines + spaces) and is 18
        quarter-beats long, with either a quarter note (or chord) or a quarter
        rest in each slot. This matches your letter grid!
      </p>

      <p>Reorder your bird name grid in the order given by the song clips:</p>

      <p>
        <PreCode>{sortedGrid}</PreCode>
      </p>

      <p>
        Extract the letters where a note is present (in columnar order, from top
        to bottom, left to right) to get:
      </p>

      <p>
        <PreCode>{extractGrid}</PreCode>
      </p>

      <p>
        <code>PENGUINS WILL YOU BE MINE</code>
      </p>

      <p>
        Which clues the Penguins’ hit song, and the answer to the puzzle,{" "}
        <code>EARTH ANGEL</code>.
      </p>
    </>
  );
};

export default Solution;
