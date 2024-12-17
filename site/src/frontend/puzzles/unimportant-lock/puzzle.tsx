import React from "react";
import { createGlobalStyle, styled } from "styled-components";
import { CaveatFont } from "../../assets/SharedFonts";
import Courier from "./assets/CourierPrime-Regular.ttf";

const PostItWrapper = styled.div`
  padding: 32px;
  display: flex;
  flex-wrap: wrap;
  min-height: 325px;
`;

const PostIt = styled.div<{ $rotate: number }>`
  font-family: "Caveat";
  background: linear-gradient(to bottom, #fef5d9, #f6ce5b);
  border: 1px solid black;
  flex: 0 0 200px;
  width: 200px;
  height: 200px;
  padding: 1em;
  transform: rotate(${({ $rotate }) => $rotate}deg);
  &:nth-child(2) {
    align-self: flex-end;
  }
`;

const CourierFont = createGlobalStyle`
  @font-face {
    font-family: "Courier";
    src: url(${Courier});
    font-weight: normal;
    font-style: normal;
  }
`;

const PrinterPaperWrapper = styled.div`
  padding: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  min-height: 550px;
`;

const RotateWrapper = styled.div<{ $rotate: number }>`
  transform: rotate(${({ $rotate }) => $rotate}deg);
  background: linear-gradient(to bottom, #fcfcfc, #b4b4b4);
  display: flex;
  flex: 0 0 calc((2 * 32px) + 26ch);
`;

const PrinterPaperEdge = styled.div`
  width: 32px;
  display: flex;
  flex-direction: column;
`;

const PrinterPaperHole = styled.div`
  margin: 8px;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background: linear-gradient(to bottom, #757575, #b0b0b0);
`;

const PrinterPaperMain = styled.div`
  font-family: "Courier";
  border-color: black;
  border-style: dashed;
  border-width: 0px 1px;
  width: 26ch;
  padding: 1ch;
`;

const PrinterPaperSide = (): JSX.Element => {
  return (
    <PrinterPaperEdge>
      <PrinterPaperHole />
      <PrinterPaperHole />
      <PrinterPaperHole />
      <PrinterPaperHole />
      <PrinterPaperHole />
      <PrinterPaperHole />
      <PrinterPaperHole />
    </PrinterPaperEdge>
  );
};

const PrinterPaper = ({
  rotate,
  text,
}: {
  rotate: number;
  text: string;
}): JSX.Element => {
  return (
    <RotateWrapper $rotate={rotate}>
      <PrinterPaperSide />
      <PrinterPaperMain>{text}</PrinterPaperMain>
      <PrinterPaperSide />
    </RotateWrapper>
  );
};

const Puzzle = (): JSX.Element => {
  return (
    <>
      <CaveatFont />
      <CourierFont />
      <p className="puzzle-flavor">
        I wanted to plant in columns, but I had to do some transposition to
        account for the irregular shape.
      </p>
      <PostItWrapper>
        <PostIt $rotate={15}>
          I started clearing out the herb garden today—the mint had gotten
          really out of control and the rosemary was almost dead, but the thyme
          is doing well. I must buy some sage next x
        </PostIt>
        <PostIt $rotate={-20}>
          The rose garden is starting to look really wonderful, as the roses are
          in full bloom, and the scent of them wafts down the path to the
          kitchen garden where I tend the carrots xx
        </PostIt>
        <PostIt $rotate={-5}>
          Finally making some progress in the orchard beyond the walled
          courtyard. The pear trees are fruiting for the first time! And the
          crabapple I put in last year is thriving xxx
        </PostIt>
      </PostItWrapper>
      <PrinterPaperWrapper>
        <PrinterPaper
          rotate={5}
          text="OIONS OFWHN CEGTO RANER AAKFR DMTKH RETAN EXTSS LDEMT NEWAT ELIHT ROHLT DHADL NSTGN NTOOO TEERR RUETW HIERA ANECE THESO ESAHE NLTUC FPETX YEBOO TRTGW RLODH DILSF SAEHI S"
        />
        <PrinterPaper
          rotate={-15}
          text="SPPNT ITHCT IARAM BRLRN MSUES OENOR HNOIA EXTFH EUTCH AEEGI AINDT RXHAI ESETH DRNMF YAYET NTRAE TRIRI OFFTT NAEHO XRORR MEAEE TOTPA MESLX NEBFT TLTOB LEAEO KNIGL RSNEM X"
        />
        <PrinterPaper
          rotate={-5}
          text="LSSBD ATREI RNMET OURGA APHNR EFTRL VFHEL AXFLO IECRI SCNIO OTYSB SNAHU FNIIT REAER GSDEE HTHKR EDTEO TAAIR HAAAT GIYMN YOTNN RHWDE TMPEX ALEII DPSER LPTUT IGCER RRIPY X"
        />
        <PrinterPaper
          rotate={10}
          text="RIRTE NESTL STDOA MEORA CURIA LYDYI GEABO UXITN BHNTM THLAT ETLNE UNGOO MTNST RLUIY REYTO EEELT DNLAW EMMEN HYDIS ESEGG ERRAA EODUH SDDBT DOFSO TGOHA TCHWM EHTAO TAAST X"
        />
      </PrinterPaperWrapper>
    </>
  );
};

export default Puzzle;
