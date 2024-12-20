import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import birdBack from "./assets/bird-back.svg";
import birdFront from "./assets/bird-front.svg";
import invitationBack from "./assets/invitation-back.svg";
import invitationFront from "./assets/invitation-front.svg";
import overlapsBack from "./assets/overlaps-back.svg";
import overlapsFront from "./assets/overlaps-front.svg";
import textureBack from "./assets/texture-back.svg";
import textureFront from "./assets/texture-front.svg";
import voronoiBack from "./assets/voronoi-back.svg";
import voronoiFront from "./assets/voronoi-front.svg";

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 16px;
`;

const Mono = styled.span`
  font-family: monospace;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        The invitation was mailed to teams with a US address a few weeks before
        Mystery Hunt and an answer checker was hidden on the website. The puzzle
        was fully solvable, though no indication was given that the invitation
        was a puzzle and flavor text was not provided.
      </p>
      <p>The puzzle is presented as a double-sided square invitation.</p>
      <FlexWrapper>
        <LinkedImage
          src={invitationFront}
          alt="A square wedding invitation, decorated with pastel purple and yellow dots scattered semi-randomly. The invitation reads: Robert Finster cordially invites you to a gala celebrating the engagement of his daughter Gladys Finster to Ferdinand Carter. Friday, January 17, 2025, twelve noon, The Massachusetts Institute of Technology, Cambridge, Massachusetts. Suggested cocktail attire."
        />
        <LinkedImage
          src={invitationBack}
          alt="A square wedding invitation, decorated with pastel purple and yellow dots scattered semi-randomly. The invitation reads: The 45th Annual M.I.T. Mystery Hunt. Hosted by Death & Mayhem. Friday, January 17, 2025, 12pm, M.I.T. Join us for a weekend of retro glamour of the 1930s, 40s, and 50s. Visit https://www.mitmh2025.com for more details."
        />
      </FlexWrapper>
      <p>Focus on the background texture.</p>
      <FlexWrapper>
        <LinkedImage
          src={textureFront}
          alt="A square decorated with pastel purple and yellow dots scattered semi-randomly."
        />
        <LinkedImage
          src={textureBack}
          alt="A square decorated with pastel purple and yellow dots scattered semi-randomly."
        />
      </FlexWrapper>
      <p>
        Note that very few dots overlap. Those that do come in pairs of
        identical size, color, and lightness.
      </p>
      <FlexWrapper>
        <LinkedImage
          src={overlapsFront}
          alt="A square decorated sparsely with overlapping pairs of purple and yellow dots."
        />
        <LinkedImage
          src={overlapsBack}
          alt="A square decorated sparsely with overlapping pairs of purple and yellow dots."
        />
      </FlexWrapper>
      <p>
        The goal is to fold the paper so that all of these double-dots are
        overlaid on their mates. More precisely every polygonal region formed by
        page edges, folds, and overlaps is either on the outside of the folded
        paper or labelled by a double-dot and every pair of double-dots
        precisely touch.
      </p>
      <p>
        The pattern of resultant creases is as follows (with corresponding
        polygonal regions colored uniquely).
      </p>
      <FlexWrapper>
        <LinkedImage
          src={voronoiFront}
          alt="A square divided into polygonal regions. Each region has one of the pairs of dots from the last image in the middle, now colored black. Each region is also filled with a color."
        />
        <LinkedImage
          src={voronoiBack}
          alt="A square divided into polygonal regions. Each region has one of the pairs of dots from the last image in the middle, now colored black. Each region is also filled with a color."
        />
      </FlexWrapper>
      <p>
        When folded, all of the text is hidden on the inside and most of dots on
        the outside are of a single color.
      </p>
      <FlexWrapper>
        <LinkedImage
          src={birdFront}
          alt="An origami bird folded out of the wedding invitation. Letters formed by the shapes of purple dots spell DRINK."
        />
        <LinkedImage
          src={birdBack}
          alt="An origami bird folded out of the wedding invitation. Letters formed by the shapes of purple dots spell ING CUP."
        />
      </FlexWrapper>
      <p>
        The contrasting colored outside dots spell the answer:{" "}
        <Mono>
          <strong>DRINKING CUP</strong>
        </Mono>
        .
      </p>
      <h3>Author’s Note</h3>
      <p>
        A version of this puzzle with a different answer was used as the
        authors’ wedding invitation.
      </p>
    </>
  );
};

export default Solution;
