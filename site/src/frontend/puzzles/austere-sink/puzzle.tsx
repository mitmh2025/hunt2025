import React from "react";
import { styled } from "styled-components";
import {
  COPY_ONLY_CLASS,
  NO_COPY_CLASS,
} from "../../components/CopyToClipboard";
import LinkedImage from "../../components/LinkedImage";
import image from "./assets/image.png";

const BorderCell = styled.td`
  border: 1px solid black;
`;

const RightCell = styled.td`
  text-align: right;
`;

const CopyTable = ({
  swaps,
  propagateLeft,
  propagateRight,
  extract,
}: {
  swaps: [string, string, string, string];
  propagateLeft: "L" | "R";
  propagateRight: "L" | "R";
  extract: "L" | "R";
}) => (
  <table className={COPY_ONLY_CLASS}>
    <tr>
      <BorderCell colSpan={2} />
      <BorderCell colSpan={2} />
      <td />
      <td />
      <BorderCell colSpan={2} />
      <BorderCell colSpan={2} />
    </tr>
    <tr>
      <td>↓ {swaps[0]}</td>
      <td />
      <td />
      <RightCell>{swaps[1]} ↓</RightCell>
      <td />
      <td />
      <td>↓ {swaps[2]}</td>
      <td />
      <td />
      <RightCell>{swaps[3]} ↓</RightCell>
    </tr>
    <tr>
      <BorderCell colSpan={2} />
      <BorderCell colSpan={2} />
      <td />
      <td />
      <BorderCell colSpan={2} />
      <BorderCell colSpan={2} />
    </tr>
    <tr>
      <td />
      <td>{propagateLeft === "L" && "↓"}</td>
      <td>{extract === "L" && "★"}</td>
      <td>{propagateLeft === "R" && "↓"}</td>
      <td />
      <td />
      <td>{propagateRight === "L" && "↓"}</td>
      <td>{extract === "R" && "★"}</td>
      <td>{propagateRight === "R" && "↓"}</td>
    </tr>
    <tr>
      <td />
      <BorderCell colSpan={4} />
      <BorderCell colSpan={4} />
    </tr>
  </table>
);

const Puzzle = (): JSX.Element => {
  return (
    <>
      <ul>
        <li>blanched carp</li>
        <li>cloud fruit</li>
        <li>cycling raider</li>
        <li>debonair trim</li>
        <li>devil farmland</li>
        <li>lounge barrel</li>
        <li>mends platoons</li>
        <li>scam blazer</li>
      </ul>
      <LinkedImage
        className={NO_COPY_CLASS}
        src={image}
        alt="A diagram showing four groups of boxes and arrows."
      />

      <br className={COPY_ONLY_CLASS} />
      <CopyTable
        swaps={["U", "H", "K", "U"]}
        propagateLeft="L"
        propagateRight="R"
        extract="R"
      />
      <CopyTable
        swaps={["B", "V", "R", "J"]}
        propagateLeft="R"
        propagateRight="L"
        extract="R"
      />
      <CopyTable
        swaps={["R", "T", "N", "L"]}
        propagateLeft="R"
        propagateRight="L"
        extract="L"
      />
      <CopyTable
        swaps={["T", "N", "V", "K"]}
        propagateLeft="L"
        propagateRight="L"
        extract="R"
      />
    </>
  );
};

export default Puzzle;
