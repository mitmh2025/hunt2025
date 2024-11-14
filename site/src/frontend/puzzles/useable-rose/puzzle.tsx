import React from "react";
import { styled } from "styled-components";

const CenteredColumn = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const FullWidthCenteredColumn = styled(CenteredColumn)`
  width: 100%;
`;

const UnbulletedList = styled.ul`
  list-style-type: none;
`;

const Puzzle = () => {
  return (
    <>
      <UnbulletedList>
        <li>Ticertltaien shfoorrt oloppowessabtle dinobigitlity</li>
        <li>Eammmporoium grofeecerdery oorr perbodiodiegacal</li>
        <li>Licapaftcity fofror chadonginging tworiresk</li>
        <li>Chicwikenpothx vithreus alalterexannaderte hodisnoreasifice</li>
        <li>Omabsergicved rereligasiouser maresscott damry</li>
        <li>Chalighinst twinimester furcolongast</li>
        <li>Oblofemalnge dosanndkwichey</li>
        <li>Lisquegezhted frumichitelob bliqueerid</li>
        <li>Osolfafctotlyry froszensene porecrigpitanation</li>
        <li>Resploaxrt bwithy paginings</li>
        <li>Cosilnversever doarfling fafilsesh</li>
        <li>Orobobecodipsent flainstster drinaverme</li>
        <li>Dedescrigeansationing fiorn mustalderture</li>
        <li>Entracertainement pacammunesetitionter ronicknundame</li>
      </UnbulletedList>

      <FullWidthCenteredColumn>
        <p>tthwoe awornsdwesr ilonsg</p>
      </FullWidthCenteredColumn>
    </>
  );
};

export default Puzzle;
