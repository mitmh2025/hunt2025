import React from "react";
import { styled } from "styled-components";
import { NO_COPY_CLASS } from "../../components/CopyToClipboard";
import img01hi from "./assets/hires/01.png";
import img02hi from "./assets/hires/02.png";
import img03hi from "./assets/hires/03.png";
import img04hi from "./assets/hires/04.png";
import img05hi from "./assets/hires/05.png";
import img06hi from "./assets/hires/06.png";
import img07hi from "./assets/hires/07.png";
import img08hi from "./assets/hires/08.png";
import img09hi from "./assets/hires/09.png";
import img10hi from "./assets/hires/10.png";
import img11hi from "./assets/hires/11.png";
import img12hi from "./assets/hires/12.png";
import img13hi from "./assets/hires/13.png";
import img14hi from "./assets/hires/14.png";
import img15hi from "./assets/hires/15.png";
import img16hi from "./assets/hires/16.png";
import img17hi from "./assets/hires/17.png";
import img18hi from "./assets/hires/18.png";
import img19hi from "./assets/hires/19.png";
import img20hi from "./assets/hires/20.png";
import img21hi from "./assets/hires/21.png";
import img22hi from "./assets/hires/22.png";
import img23hi from "./assets/hires/23.png";
import img24hi from "./assets/hires/24.png";
import img25hi from "./assets/hires/25.png";
import img26hi from "./assets/hires/26.png";
import img27hi from "./assets/hires/27.png";
import img28hi from "./assets/hires/28.png";
import img29hi from "./assets/hires/29.png";
import img30hi from "./assets/hires/30.png";
import img31hi from "./assets/hires/31.png";
import img32hi from "./assets/hires/32.png";
import img33hi from "./assets/hires/33.png";
import img34hi from "./assets/hires/34.png";
import img35hi from "./assets/hires/35.png";
import img36hi from "./assets/hires/36.png";
import img37hi from "./assets/hires/37.png";
import img38hi from "./assets/hires/38.png";
import imgbottomhi from "./assets/hires/bottom.png";
import img01low from "./assets/lowres/01.png";
import img02low from "./assets/lowres/02.png";
import img03low from "./assets/lowres/03.png";
import img04low from "./assets/lowres/04.png";
import img05low from "./assets/lowres/05.png";
import img06low from "./assets/lowres/06.png";
import img07low from "./assets/lowres/07.png";
import img08low from "./assets/lowres/08.png";
import img09low from "./assets/lowres/09.png";
import img10low from "./assets/lowres/10.png";
import img11low from "./assets/lowres/11.png";
import img12low from "./assets/lowres/12.png";
import img13low from "./assets/lowres/13.png";
import img14low from "./assets/lowres/14.png";
import img15low from "./assets/lowres/15.png";
import img16low from "./assets/lowres/16.png";
import img17low from "./assets/lowres/17.png";
import img18low from "./assets/lowres/18.png";
import img19low from "./assets/lowres/19.png";
import img20low from "./assets/lowres/20.png";
import img21low from "./assets/lowres/21.png";
import img22low from "./assets/lowres/22.png";
import img23low from "./assets/lowres/23.png";
import img24low from "./assets/lowres/24.png";
import img25low from "./assets/lowres/25.png";
import img26low from "./assets/lowres/26.png";
import img27low from "./assets/lowres/27.png";
import img28low from "./assets/lowres/28.png";
import img29low from "./assets/lowres/29.png";
import img30low from "./assets/lowres/30.png";
import img31low from "./assets/lowres/31.png";
import img32low from "./assets/lowres/32.png";
import img33low from "./assets/lowres/33.png";
import img34low from "./assets/lowres/34.png";
import img35low from "./assets/lowres/35.png";
import img36low from "./assets/lowres/36.png";
import img37low from "./assets/lowres/37.png";
import img38low from "./assets/lowres/38.png";
import imgbottomlow from "./assets/lowres/bottom.png";

const StyledImg = styled.img`
  max-width: 100%;
`;

const IMAGES_HI: string[] = [
  img01hi,
  img02hi,
  img03hi,
  img04hi,
  img05hi,
  img06hi,
  img07hi,
  img08hi,
  img09hi,
  img10hi,
  img11hi,
  img12hi,
  img13hi,
  img14hi,
  img15hi,
  img16hi,
  img17hi,
  img18hi,
  img19hi,
  img20hi,
  img21hi,
  img22hi,
  img23hi,
  img24hi,
  img25hi,
  img26hi,
  img27hi,
  img28hi,
  img29hi,
  img30hi,
  img31hi,
  img32hi,
  img33hi,
  img34hi,
  img35hi,
  img36hi,
  img37hi,
  img38hi,
];

const IMAGES_LOW: string[] = [
  img01low,
  img02low,
  img03low,
  img04low,
  img05low,
  img06low,
  img07low,
  img08low,
  img09low,
  img10low,
  img11low,
  img12low,
  img13low,
  img14low,
  img15low,
  img16low,
  img17low,
  img18low,
  img19low,
  img20low,
  img21low,
  img22low,
  img23low,
  img24low,
  img25low,
  img26low,
  img27low,
  img28low,
  img29low,
  img30low,
  img31low,
  img32low,
  img33low,
  img34low,
  img35low,
  img36low,
  img37low,
  img38low,
];

const ImgBlock = ({ imgnum }: { imgnum: number }): JSX.Element => {
  return (
    <>
      <a target="_blank" rel="noreferrer" href={IMAGES_HI[imgnum] ?? ""}>
        <StyledImg src={IMAGES_LOW[imgnum] ?? ""} alt="A rebus" />
      </a>
      <hr className={NO_COPY_CLASS} />
    </>
  );
};

const Puzzle = (): JSX.Element => {
  return (
    <>
      {Array.from({ length: 38 }, (_, i) => (
        <ImgBlock key={i} imgnum={i} />
      ))}
      <a target="_blank" rel="noreferrer" href={imgbottomhi}>
        <StyledImg src={imgbottomlow} alt="A rebus" />
      </a>
    </>
  );
};

export default Puzzle;
