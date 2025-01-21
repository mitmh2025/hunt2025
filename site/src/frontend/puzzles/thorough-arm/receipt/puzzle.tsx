import React from "react";
import { createGlobalStyle, styled } from "styled-components";
import NovaMono from "./assets/NovaMono-Regular.ttf";
import UnifrakturCook from "./assets/UnifrakturCook-Bold.ttf";

export const Fonts = createGlobalStyle`
@font-face {
  font-family: "Nova Mono";
  src: url("${NovaMono}") format("truetype");
}
@font-face {
  font-family: "Unifraktur Cook";
  src: url("${UnifrakturCook}") format("truetype");
}
`;

const Receipt = styled.div`
  width: 70ch;
  padding: 48px 48px;
  margin: 0 auto;
  font-family: "Nova Mono";
  border: none;
  background:
    conic-gradient(from 135deg at top, white, #ebd5be 1deg 89deg, white 90deg)
      top/20px 51% repeat-x,
    conic-gradient(
        from -45deg at bottom,
        white,
        #ebd5be 1deg 89deg,
        white 90deg
      )
      bottom/20px 51% repeat-x;

  .blackletter {
    font-family: "Unifraktur Cook", cursive;
    font-weight: 700;
    font-style: normal;
  }

  .italic {
    font-style: italic;
  }

  /* specificity wars */
  div.tavern-name {
    display: flex;
    justify-content: center;
    text-align: center;
    flex-wrap: wrap;
  }

  div.tavern-name.big {
    font-size: 48px;
  }

  .line-item {
    display: flex;
    justify-content: space-between;
  }

  .spacer {
    height: 24px;
  }

  .name {
    text-align: left;
  }

  .price {
    text-align-last: right;
  }

  .thank-you {
    text-align: center;
  }
`;

const Puzzle = () => {
  return (
    <>
      <Fonts />
      <Receipt>
        <div className="tavern-name big blackletter">Ye Olde</div>
        <div className="tavern-name big blackletter">Mystery Hunt</div>
        <div className="tavern-name big blackletter">Tavern</div>
        <div className="tavern-name big blackletter">Est’d. 1981</div>
        <div className="spacer"></div>
        <div className="name">&nbsp;5 x REFLIP @ 20.25 gp ea</div>
        <div className="price">
          .........................................101.25 gp
        </div>
        <div className="name">&nbsp;7 x GLIGO @ 20.25 gp ea</div>
        <div className="price">
          .........................................141.75 gp
        </div>
        <div className="name">&nbsp;8 x VIBRATING @ 20.25 gp ea</div>
        <div className="price">
          .........................................162.00 gp
        </div>
        <div className="name">&nbsp;9 x FORTY-NINER @ 20.25 gp ea</div>
        <div className="price">
          .........................................182.25 gp
        </div>
        <div className="name">12 x TRAVENO @ 20.25 gp ea</div>
        <div className="price">
          .........................................243.00 gp
        </div>
        <div className="name">13 x ARWEN’S @ 20.25 gp ea</div>
        <div className="price">
          .........................................263.25 gp
        </div>
        <div className="name">15 x METAFOUR @ 20.25 gp ea</div>
        <div className="price">
          .........................................303.75 gp
        </div>
        <div className="name">21 x WOOLLY @ 20.25 gp ea</div>
        <div className="price">
          .........................................425.25 gp
        </div>
        <div className="spacer"></div>
        <div className="name">Subtotal</div>
        <div className="blackletter line-item">
          <span>_____ </span>
          <span>_____ </span>
          <span>_____ </span>
          <span>_____ </span>
          <span>_____ </span>
          <span>_____ </span>
          <span>_____ </span>
          <span>_____</span>
        </div>
        <div className="name">Total</div>
        <div className="blackletter">
          _________________________________________________________
        </div>
        <div className="spacer"></div>
        <div className="blackletter italic thank-you">
          Thank you for visiting Ye Olde Mystery Hunt Tavern
        </div>
        <div className="blackletter italic thank-you">
          Customers must perform their own transmutation
        </div>
        <div className="blackletter italic thank-you">
          We hope to see you again soon
        </div>
      </Receipt>
    </>
  );
};

export default Puzzle;
