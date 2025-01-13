import type React from "react";
import {
  BackgroundCheckWrapper,
  BackgroundCheckMain,
  BackgroundCheckHeader,
  BackgroundCheckBacklink,
} from "../../components/BackgroundCheckPuzzleLayout";
import {
  IllegalSearchHeader,
  IllegalSearchMain,
  IllegalSearchWrapper,
  IllegalSearchAnswer,
  IllegalSearchAcknowledgementBlock,
  BlacklightIllegalSearchHeader,
  BlacklightIllegalSearchMain,
  BlacklightIllegalSearchWrapper,
  IllegalSearchBacklink,
  IllegalSearchBacklinkBlacklight,
} from "../../components/IllegalSearchPuzzleLayout";
import {
  MissingDiamondAnswer,
  MissingDiamondBacklink,
  MissingDiamondMain,
  MissingDiamondTitle,
  MissingDiamondTitleWrapper,
  MissingDiamondWrapper,
  MissingDiamondAcknowledgementBlock,
  MissingDiamondHeaderWrapper,
} from "../../components/MissingDiamondPuzzleLayout";
import {
  MurderHeader,
  MurderMain,
  MurderAnswer,
  MurderAcknowledgementBlock,
  MurderSpoiler,
  MurderBacklink,
  MurderTitle,
  MurderTitleWrapper,
} from "../../components/MurderPuzzleLayout";
import {
  PaperTrailWrapper,
  PaperTrailMain,
  PaperTrailBacklink,
  PaperTrailHeader,
  PaperTrailFooter,
  PaperTrailAnswer,
  PaperTrailAcknowledgementBlock,
} from "../../components/PaperTrailPuzzleLayout";
import {
  PuzzleHeader,
  PuzzleTitle,
  PuzzleWrapper,
  PuzzleMain,
  PuzzleFooter,
  PuzzleBacklink,
  PuzzleTitleWrapper,
} from "../../components/PuzzleLayout";
import {
  SolutionAnswer,
  SolutionAcknowledgement,
  SolutionAcknowledgementBlock,
} from "../../components/SolutionLayout";
import Spoiler from "../../components/Spoiler";
import {
  StakeoutBacklink,
  StakeoutHeader,
  StakeoutMain,
  StakeoutWrapper,
} from "../../components/StakeoutPuzzleLayout";
import { BackgroundCheckFonts } from "../../rounds/background_check/BackgroundCheckFonts";
import { IllegalSearchFonts } from "../../rounds/illegal_search/IllegalSearchFonts";
import { MissingDiamondFonts } from "../../rounds/missing_diamond/MissingDiamondFonts";
import { MurderFonts } from "../../rounds/murder_in_mitropolis/MurderFonts";
import { PaperTrailFonts } from "../../rounds/paper_trail/PaperTrailFonts";
import { StakeoutFonts } from "../../rounds/stakeout/StakeoutFonts";
import { type Entrypoint } from "../assets";

/* eslint-disable @typescript-eslint/no-explicit-any -- I'm not clever enough to name the types for this, but we're not bothering with props so they shouldn't matter */
export type ComponentManifest = {
  wrapper: React.ComponentType<any>;
  header: React.ComponentType<any>;
  titleWrapper: React.ComponentType<any>;
  title: React.ComponentType<any>;
  backlink: React.ComponentType<any>;
  main: React.ComponentType<any>;
  footer: React.ComponentType<any>;
  fonts?: React.ComponentType<any>; // if present, a createGlobalStyle that includes any fonts needed by any of the other components
  entrypoint?: Entrypoint;
  answer: React.ComponentType<any>;
  spoiler: React.ComponentType<any>;
  acknowledgementBlock: React.ComponentType<any>;
  acknowledgement: React.ComponentType<any>;
};
/* eslint-enable @typescript-eslint/no-explicit-any -- End of round-specific component manifest exceptions */

// Add round-specific component overrides here
export const ROUND_PUZZLE_COMPONENT_MANIFESTS: Record<
  string,
  Partial<ComponentManifest>
> = {
  missing_diamond: {
    wrapper: MissingDiamondWrapper,
    main: MissingDiamondMain,
    fonts: MissingDiamondFonts,
    title: MissingDiamondTitle,
    backlink: MissingDiamondBacklink,
    titleWrapper: MissingDiamondTitleWrapper,
    answer: MissingDiamondAnswer,
    entrypoint: "missing_diamond_puzzle",
    acknowledgementBlock: MissingDiamondAcknowledgementBlock,
    header: MissingDiamondHeaderWrapper,
  },
  stakeout: {
    header: StakeoutHeader,
    main: StakeoutMain,
    backlink: StakeoutBacklink,
    wrapper: StakeoutWrapper,
    fonts: StakeoutFonts,
  },
  illegal_search: {
    header: IllegalSearchHeader,
    main: IllegalSearchMain,
    backlink: IllegalSearchBacklink,
    wrapper: IllegalSearchWrapper,
    fonts: IllegalSearchFonts,
    answer: IllegalSearchAnswer,
    acknowledgementBlock: IllegalSearchAcknowledgementBlock,
  },
  illegal_search_blacklight: {
    header: BlacklightIllegalSearchHeader,
    main: BlacklightIllegalSearchMain,
    backlink: IllegalSearchBacklinkBlacklight,
    wrapper: BlacklightIllegalSearchWrapper,
    fonts: IllegalSearchFonts,
    answer: IllegalSearchAnswer,
    acknowledgementBlock: IllegalSearchAcknowledgementBlock,
  },
  paper_trail: {
    main: PaperTrailMain,
    header: PaperTrailHeader,
    backlink: PaperTrailBacklink,
    wrapper: PaperTrailWrapper,
    footer: PaperTrailFooter,
    fonts: PaperTrailFonts,
    answer: PaperTrailAnswer,
    acknowledgementBlock: PaperTrailAcknowledgementBlock,
  },
  background_check: {
    main: BackgroundCheckMain,
    header: BackgroundCheckHeader,
    wrapper: BackgroundCheckWrapper,
    backlink: BackgroundCheckBacklink,
    fonts: BackgroundCheckFonts,
  },
  murder_in_mitropolis: {
    main: MurderMain,
    header: MurderHeader,
    titleWrapper: MurderTitleWrapper,
    title: MurderTitle,
    backlink: MurderBacklink,
    fonts: MurderFonts,
    answer: MurderAnswer,
    acknowledgementBlock: MurderAcknowledgementBlock,
    spoiler: MurderSpoiler,
  },
  stray_leads: {},
};

export const DEFAULT_MANIFEST: ComponentManifest = {
  wrapper: PuzzleWrapper,
  header: PuzzleHeader,
  backlink: PuzzleBacklink,
  titleWrapper: PuzzleTitleWrapper,
  title: PuzzleTitle,
  main: PuzzleMain,
  footer: PuzzleFooter,
  fonts: undefined,
  entrypoint: undefined,
  acknowledgementBlock: SolutionAcknowledgementBlock,
  acknowledgement: SolutionAcknowledgement,
  answer: SolutionAnswer,
  spoiler: Spoiler,
};
