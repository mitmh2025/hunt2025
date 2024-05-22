import type { FunctionComponent } from "react";
import type { TeamState } from "../../../lib/api/client";
import { lookupScript, lookupStylesheet } from "../server/assets";
import BackgroundCheckRoundPage from "./background_check";
import IllegalSearchRoundPage from "./illegal_search";
import PapertrailRoundPage from "./papertrail";
import ShadowDiamondRoundPage from "./shadow_diamond";
import StakeoutRoundPage from "./stakeout";
import DeadThiefRoundPage from "./the_dead_thief";
import RealDiamondRoundPage from "./the_real_diamond";

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
  shadow_diamond: {
    component: ShadowDiamondRoundPage,
    scripts: [lookupScript("shadow_diamond")],
    stylesheets: [lookupStylesheet("shadow_diamond")],
  },
  stakeout: {
    component: StakeoutRoundPage,
  },
  paper_trail: {
    component: PapertrailRoundPage,
  },
  illegal_search: {
    component: IllegalSearchRoundPage,
  },
  background_check: {
    component: BackgroundCheckRoundPage,
  },
  the_dead_thief: {
    component: DeadThiefRoundPage,
  },
  the_real_diamond: {
    component: RealDiamondRoundPage,
  },
};
