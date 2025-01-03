import React from "react";
import { COPY_ONLY_CLASS } from "../../components/CopyToClipboard";
import LinkedImage from "../../components/LinkedImage";
import image from "./assets/image.png";

const GRID = `
IPSWRKOT
DOUCVERF
TFDLOPID
RMNYSNTU
JUPAOBRA
LZFEXIVP
ELWHTPEM
XACPTUSL
KURDEBNI
BNPHKODA
GSIASLRX
OEDVSYEG
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.split(""));

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">
        I’m making strides towards forgiveness; 33 just today!
      </p>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/I0S7-ZeZoFQ?si=t9cnLviFG7cgGS8J"
        title="Why Kan’t We Be Friends, Too?"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <LinkedImage
        src={image}
        alt="Clipart of houses arranged on a 12x8 grid. Each house has a letter over the door. At the top right of the grid is a clipart person in a boxing stance."
      />
      <table className={COPY_ONLY_CLASS}>
        {GRID.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={`${i}-${j}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </table>
    </>
  );
};

export default Puzzle;
