import { css, styled } from "styled-components";
import diamondIcon from "../../assets/logo-simple.svg";
import { PuzzleMain } from "./PuzzleLayout";
import { Wrapper, darkBgLinkStyles } from "./StyledUI";

const BG = "var(--black)";

const StyledWrapper = styled(Wrapper)<{ $fullWidth?: boolean }>`
  display: grid;
  grid-template-columns: [outer-start] 0.5rem [mid-start] 0.5rem [inner-start] 1fr [inner-end] 0.5rem [mid-end] 0.5rem [outer-end];
  grid-template-rows: [inner-start] 0.5rem [mid-start] 0.5rem [outer-start] 1fr [outer-end] 0.5rem [mid-end] 0.5rem [inner-end];

  padding-bottom: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
`;

const StairOuterLeft = styled.div`
  background-color: ${BG};
  grid-column: outer-start / mid-start;
  grid-row: outer-start / outer-end;
  border-left: 1px solid var(--gold-800);
  border-top: 1px solid var(--gold-800);
  border-bottom: 1px solid var(--gold-800);
`;

const StairOuterRight = styled.div`
  background-color: ${BG};
  grid-column: mid-end / outer-end;
  grid-row: outer-start / outer-end;
  border-right: 1px solid var(--gold-800);
  border-top: 1px solid var(--gold-800);
  border-bottom: 1px solid var(--gold-800);
`;

const StairMidLeft = styled.div`
  background-color: ${BG};
  grid-column: mid-start / inner-start;
  grid-row: mid-start / mid-end;
  border-top: 1px solid var(--gold-800);
  border-bottom: 1px solid var(--gold-800);
  margin: -1px 0;
`;

const StairMidRight = styled.div`
  background-color: ${BG};
  grid-column: inner-end / mid-end;
  grid-row: mid-start / mid-end;
  border-top: 1px solid var(--gold-800);
  border-bottom: 1px solid var(--gold-800);
  margin: -1px 0;
`;

const StairMidTop = styled.div`
  background-color: ${BG};
  grid-column: mid-start / mid-end;
  grid-row: outer-start / mid-start;
  border-left: 1px solid var(--gold-800);
  border-right: 1px solid var(--gold-800);
  margin-bottom: -1px;
`;

const StairMidBottom = styled.div`
  background-color: ${BG};
  grid-column: mid-start / mid-end;
  grid-row: mid-end / outer-end;
  border-left: 1px solid var(--gold-800);
  border-right: 1px solid var(--gold-800);
`;

const StairInnerTop = styled.div`
  background-color: ${BG};
  grid-column: inner-start / inner-end;
  grid-row: inner-start / mid-start;
  border-left: 1px solid var(--gold-800);
  border-right: 1px solid var(--gold-800);
  border-top: 1px solid var(--gold-800);
`;

const StairInnerBottom = styled.div`
  background-color: ${BG};
  grid-column: inner-start / inner-end;
  grid-row: mid-end / inner-end;
  border-left: 1px solid var(--gold-800);
  border-right: 1px solid var(--gold-800);
  border-bottom: 1px solid var(--gold-800);
`;

const InnerWrapper = styled(Wrapper)`
  grid-column: inner-start / inner-end;
  grid-row: outer-start / outer-end;
  background-color: ${BG};
  display: grid;
  grid-template-columns: [wide-start] 0.5rem [mid-start] 0.5rem [tall-start] 1fr [tall-end] 0.5rem [mid-end] 0.5rem [wide-end];
  grid-template-rows: [tall-start] 0.5rem [mid-start] 0.5rem [wide-start] 1fr [wide-end] 0.5rem [mid-end] 0.5rem [tall-end];
  width: 100%;
  padding: 0;
`;

const NoPointerEvents = styled.div`
  pointer-events: none;
`;

const ContentsWrapper = styled.div`
  grid-column: tall-start / tall-end;
  grid-row: wide-start / wide-end;
  padding: 0.5rem;
  position: relative;

  &:before {
    content: "";
    background: url(${diamondIcon});
    background-repeat: no-repeat;
    width: 5rem;
    height: 7rem;
    display: block;
    position: absolute;
    top: 1rem;
    right: 1.5rem;
    opacity: 0.3;
    transform: rotate(2deg);
  }
`;

const GoldBorderTall = styled(NoPointerEvents)`
  grid-area: tall;
  border: 2px solid var(--gold-700);
`;

const GoldBorderMid = styled(NoPointerEvents)`
  grid-area: mid;
  border: 2px solid var(--gold-700);
`;

const GoldBorderWide = styled(NoPointerEvents)`
  grid-area: wide;
  border: 2px solid var(--gold-700);
`;

export const PageHeader = styled.header`
  padding: 1rem;

  a {
    ${darkBgLinkStyles}
  }
`;

export const PageTitle = styled.h1`
  padding: 0;
`;

export const PageMain = styled(PuzzleMain)`
  width: 100%;
  padding: 1rem;

  a {
    ${darkBgLinkStyles}
  }
`;

export const PageWrapper = ({
  children,
  fullWidth,
}: {
  children: JSX.Element;
  fullWidth?: boolean;
}) => {
  return (
    <StyledWrapper $fullWidth={fullWidth}>
      <InnerWrapper>
        <ContentsWrapper>{children}</ContentsWrapper>
        <GoldBorderTall />
        <GoldBorderMid />
        <GoldBorderWide />
      </InnerWrapper>
      <StairOuterLeft />
      <StairOuterRight />
      <StairMidLeft />
      <StairMidRight />
      <StairMidTop />
      <StairMidBottom />
      <StairInnerTop />
      <StairInnerBottom />
    </StyledWrapper>
  );
};
