import React, { type ReactNode } from "react";
import { styled, css } from "styled-components";
import the_grand_illusion_bg from "../puzzles/monstrous-shadow/assets/The-Grand-Illusion-bg.svg";
import the_oversight_bg from "../puzzles/svelte-conductor/assets/The-Oversight-bg.svg";
import the_mark_bg from "../puzzles/unique-australia/assets/The-Mark-bg.svg";
import fridge_middle from "../rounds/background_check/assets/fridge_middle.png";
import magnet_nonmeta from "../rounds/background_check/assets/magnet_puzzle.png";
import magnet_meta from "../rounds/background_check/assets/magnet_submeta.png";
import magnet_super from "../rounds/background_check/assets/magnet_supermeta.png";
import title_image_the_grand_illusion from "../rounds/background_check/assets/metas/submeta_grand_illusion_puzzle_page_title.png";
import title_image_the_mark from "../rounds/background_check/assets/metas/submeta_mark_puzzle_page_title.png";
import title_image_the_oversight from "../rounds/background_check/assets/metas/submeta_oversight_puzzle_page_title.png";
import super_paper_bottom from "../rounds/background_check/assets/metas/supermeta_alias_puzzle_page_card_bkgd_bottom.png";
import super_paper_middle from "../rounds/background_check/assets/metas/supermeta_alias_puzzle_page_card_bkgd_middle.png";
import super_paper_top from "../rounds/background_check/assets/metas/supermeta_alias_puzzle_page_card_bkgd_top.png";
import title_image_alias from "../rounds/background_check/assets/metas/supermeta_alias_puzzle_page_title.png";
import paper from "../rounds/background_check/assets/puzzle_bkgd.png";
import { deviceMax, deviceMin } from "../utils/breakpoints";
import rootUrl from "../utils/rootUrl";
import { PuzzleBacklink, PuzzleHeader, PuzzleMain } from "./PuzzleLayout";

export const BgColor = "#251214";
export const FridgeColor = "#a4b9b9";
export const MagnetColor = "#db5f00";

export const BackgroundCheckWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <BackgroundCheckWrapperOuter>
      <BackgroundCheckWrapperInner $paper>
        {children}
      </BackgroundCheckWrapperInner>
    </BackgroundCheckWrapperOuter>
  );
};

// We do not inherit from PuzzleWrapper because it does too many things that we don't want here, and
// because we want separate outer (fridge) and inner (paper background) divs.
const BackgroundCheckWrapperOuter = styled.div`
  background-image: url("${fridge_middle}");
  background-position: center;
  background-repeat: repeat-y;
  background-size: 100% auto;

  width: 100%;
  margin: 0;
  padding-top: 4rem;
  padding-bottom: 12rem;
  padding-left: 14%;
  padding-right: 14%;
  min-height: calc(100vh - 80px);

  @media (${deviceMax.sm}) {
    background-size: 125% auto;
    padding-left: 5%;
    padding-right: 5%;
  }

  color: ${BgColor};

  a {
    color: var(--red-500);
    text-decoration: underline dotted ${MagnetColor};

    &:hover {
      color: var(--red-600);
      text-decoration-color: var(--red-600);
    }
  }
`;

export const BackgroundCheckWrapperInner = styled.div<{ $paper: boolean }>`
  ${({ $paper }) =>
    $paper
      ? css`
          background-image: url("${paper}");
        `
      : css`
          background-color: var(--white);
        `};
  background-repeat: repeat-y;
  background-size: cover;
  min-height: 800px;
  margin: 0 auto;
  width: 900px;
  max-width: 100%;
  @media ${deviceMin.lg} {
    width: calc(1080px - 1rem);
  }
  @media screen {
    filter: drop-shadow(0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.3));
  }
`;

export const BackgroundCheckHeader = styled(PuzzleHeader)`
  background-color: transparent;
  font-family: "Georgia", serif;

  h1 {
    font-family: "Georgia", serif;
    text-align: center;

    > span {
      border-bottom: 2px solid black;
    }
  }

  #puzzle-guess-section {
    background-color: var(--gray-100);
    border: 1px solid var(--gray-400);

    label,
    input[type="text"],
    button {
      font-family: "Georgia", serif;
    }

    button {
      font-family: "Georgia", serif;
    }

    input {
      box-shadow: 0 0 0 2px #a4b9b9;

      &:focus-visible {
        outline-color: #fcb851;
      }
    }
  }

  #rate-limit-notice {
    background: #00000033;
  }
`;

export const BackgroundCheckBacklink = styled(PuzzleBacklink)`
  @media ${deviceMax.sm} {
    display: block;
    max-width: 40%;
  }
`;

const BackgroundCheckMetaWrapperInner = styled(BackgroundCheckWrapperInner)<{
  $background_image: string;
  $paper: boolean;
}>`
  position: relative;
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    background-image: url(${({ $background_image }) => $background_image});
    background-repeat: repeat;
    background-position: center;
    background-size: 400px;
    opacity: 4%;
  }
`;

const TheMarkWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <BackgroundCheckWrapperOuter>
      <BackgroundCheckMetaWrapperInner
        $background_image={the_mark_bg}
        $paper={false}
      >
        {children}
      </BackgroundCheckMetaWrapperInner>
    </BackgroundCheckWrapperOuter>
  );
};

const TheGrandIllusionWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <BackgroundCheckWrapperOuter>
      <BackgroundCheckMetaWrapperInner
        $background_image={the_grand_illusion_bg}
        $paper={false}
      >
        {children}
      </BackgroundCheckMetaWrapperInner>
    </BackgroundCheckWrapperOuter>
  );
};

const TheOversightWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <BackgroundCheckWrapperOuter>
      <BackgroundCheckMetaWrapperInner
        $background_image={the_oversight_bg}
        $paper={false}
      >
        {children}
      </BackgroundCheckMetaWrapperInner>
    </BackgroundCheckWrapperOuter>
  );
};

const magnet_width = 100;
const Magnet = styled.img`
  position: absolute;
  top: -32px;
  width: ${magnet_width}px;
  left: calc(50% - ${magnet_width / 2}px);
  margin: 0 auto;
  z-index: 1;
`;

export type Setting = "puzzle" | "solution";

const BACK_TO_ROUND_TEXT = "← Back to The Background Check";
const BACK_TO_PUZZLE_TEXT = "← Back to puzzle";
const BACK_TO_ROUND_HREF = `${rootUrl}/rounds/background_check`;

export const getBackgroundCheckManifestOverrides = (
  slot: string,
  setting: Setting,
) => {
  if (slot === "bgm01") {
    return {
      header: ({ children }: { children: ReactNode }) => {
        return (
          <BackgroundCheckMetaHead
            backlinkHref={
              setting === "puzzle"
                ? BACK_TO_ROUND_HREF
                : `${rootUrl}/puzzles/the_mark`
            }
            magnet={magnet_meta}
            titleImage={title_image_the_mark}
            title="The Mark"
            setting={setting}
          >
            {children}
          </BackgroundCheckMetaHead>
        );
      },
      title: BackgroundCheckMetaTitleStub,
      wrapper:
        setting === "puzzle"
          ? ({ children }: { children: ReactNode }) => {
              return <TheMarkWrapper>{children}</TheMarkWrapper>;
            }
          : BackgroundCheckWrapper,
    };
  } else if (slot === "bgm02") {
    return {
      header: ({ children }: { children: ReactNode }) => {
        return (
          <BackgroundCheckMetaHead
            backlinkHref={
              setting === "puzzle"
                ? BACK_TO_ROUND_HREF
                : `${rootUrl}/puzzles/the_grand_illusion`
            }
            magnet={magnet_meta}
            titleImage={title_image_the_grand_illusion}
            title="The Grand Illusion"
            setting={setting}
          >
            {children}
          </BackgroundCheckMetaHead>
        );
      },
      title: BackgroundCheckMetaTitleStub,
      wrapper:
        setting === "puzzle"
          ? ({ children }: { children: ReactNode }) => {
              return (
                <TheGrandIllusionWrapper>{children}</TheGrandIllusionWrapper>
              );
            }
          : BackgroundCheckWrapper,
    };
  } else if (slot === "bgm03") {
    return {
      header: ({ children }: { children: ReactNode }) => {
        return (
          <BackgroundCheckMetaHead
            backlinkHref={
              setting === "puzzle"
                ? BACK_TO_ROUND_HREF
                : `${rootUrl}/puzzles/the_oversight`
            }
            magnet={magnet_meta}
            titleImage={title_image_the_oversight}
            title="The Oversight"
            setting={setting}
          >
            {children}
          </BackgroundCheckMetaHead>
        );
      },
      title: BackgroundCheckMetaTitleStub,
      wrapper:
        setting === "puzzle"
          ? ({ children }: { children: ReactNode }) => {
              return <TheOversightWrapper>{children}</TheOversightWrapper>;
            }
          : BackgroundCheckWrapper,
    };
  } else if (slot === "bgm04") {
    return {
      header: ({ children }: { children: ReactNode }) => {
        return (
          <BackgroundCheckMetaHead
            backlinkHref={
              setting === "puzzle"
                ? BACK_TO_ROUND_HREF
                : `${rootUrl}/puzzles/alias`
            }
            magnet={magnet_super}
            titleImage={title_image_alias}
            title="Alias"
            setting={setting}
          >
            {children}
          </BackgroundCheckMetaHead>
        );
      },
      main: BackgroundCheckSuperMain,
      title: BackgroundCheckMetaTitleStub,
      wrapper: BackgroundCheckSuperWrapper,
    };
  } else {
    return {
      header: ({ children }: { children: ReactNode }) => {
        return (
          <BackgroundCheckHeader>
            <>
              <Magnet src={magnet_nonmeta} alt="magnet" />
              {children}
            </>
          </BackgroundCheckHeader>
        );
      },
    };
  }
};

// Meta pages in this round have images for puzzle titles instead of text, so we simply do not
// render anything for the title element which would have the title in plain text.
const BackgroundCheckMetaTitleStub = () => {
  return undefined;
};

const BackgroundCheckMetaHeader = styled(PuzzleHeader)`
  background-color: transparent;
  @media ${deviceMax.md} {
    gap: 2rem;
    padding: 2rem;
    padding-top: 1rem;
  }

  @media ${deviceMax.sm} {
    gap: 1rem;
    padding: 1rem;
  }
`;

export const BackgroundCheckMetaHead = ({
  backlinkHref,
  children,
  magnet,
  setting,
  titleImage,
  title,
}: {
  backlinkHref: string;
  children: ReactNode;
  magnet: string;
  setting: string;
  titleImage: string;
  title: string;
}) => {
  return (
    <BackgroundCheckMetaHeader>
      <>
        <Magnet src={magnet} alt="magnet" />
        <BackgroundCheckBacklink href={backlinkHref}>
          {setting === "puzzle" ? BACK_TO_ROUND_TEXT : BACK_TO_PUZZLE_TEXT}
        </BackgroundCheckBacklink>
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gridColumn: "1 / 3",
          }}
        >
          <img style={{ maxWidth: "100%" }} src={titleImage} alt={title} />
        </div>
        {children}
      </>
    </BackgroundCheckMetaHeader>
  );
};

export const BackgroundCheckMain = styled(PuzzleMain)`
  background-color: #ffffff00;
  font-family: "Georgia", "Times New Roman", "Times", "Garamond", serif;
`;

// The super gets extra-special custom treatment
export const BackgroundCheckSuperWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <BackgroundCheckWrapperOuter>
      <BackgroundCheckSuperWrapperInner>
        {children}
      </BackgroundCheckSuperWrapperInner>
    </BackgroundCheckWrapperOuter>
  );
};

export const BackgroundCheckSuperWrapperInner = styled.div`
  background-image: url(${super_paper_top}), url(${super_paper_bottom}),
    url(${super_paper_middle});
  background-repeat: no-repeat, no-repeat, repeat-y;
  background-position:
    left top,
    left bottom,
    left top;
  background-size: contain, contain, contain;

  min-height: 800px;
  margin: 0 auto;
  width: 900px;
  max-width: 100%;
  @media ${deviceMin.lg} {
    width: calc(1080px - 1rem);
  }
  filter: drop-shadow(0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.3));
`;

export const BackgroundCheckSuperMain = styled(BackgroundCheckMain)`
  padding: 2rem;
  padding-bottom: 4rem;
  @media ${deviceMax.lg} {
    padding: 2rem;
    padding-bottom: 2rem;
  }

  @media ${deviceMax.sm} {
    padding: 2rem;
    padding-bottom: 1rem;
  }
`;
