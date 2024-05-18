import type { FunctionComponent } from "react";

import type { TeamState } from "../../../lib/api/client";
import { lookupScript, lookupStylesheet } from "../../assets";
import BackgroundCheckRoundPage from "./BackgroundCheckRoundPage";
import DeadThiefRoundPage from "./DeadThiefRoundPage";
import IllegalSearchRoundPage from "./IllegalSearchRoundPage";
import PapertrailRoundPage from "./PapertrailRoundPage";
import RealDiamondRoundPage from "./RealDiamondRoundPage";
import ShadowDiamondRoundPage from "./ShadowDiamondRoundPage";
import StakeoutRoundPage from "./StakeoutRoundPage";

// This file is intended to include non-structural data that is only relevant
// to the frontend concerning rounds.

// Map from round `key` to component that should be rendered for that round.
// TODO: figure out the props we want to pass to the round pages
type RoundDefinition = {
  component: FunctionComponent<{ teamState: TeamState }>;
  scripts?: string[];
  stylesheets?: string[];
};

export const ROUND_PAGE_MAP: Record<string, RoundDefinition> = {
  sd: {
    component: ShadowDiamondRoundPage,
    scripts: [lookupScript("shadow_diamond")],
    stylesheets: [lookupStylesheet("shadow_diamond")],
  },
  so: {
    component: StakeoutRoundPage,
  },
  pt: {
    component: PapertrailRoundPage,
  },
  is: {
    component: IllegalSearchRoundPage,
  },
  bg: {
    component: BackgroundCheckRoundPage,
  },
  dt: {
    component: DeadThiefRoundPage,
  },
  rd: {
    component: RealDiamondRoundPage,
  },
};
