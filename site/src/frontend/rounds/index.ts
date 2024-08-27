import type { FunctionComponent } from "react";
import type { TeamState } from "../../../lib/api/client";
import type { Entrypoint } from "../server/assets";
import BackgroundCheckRoundPage from "./background_check";
import IllegalSearchRoundPage from "./illegal_search";
import PapertrailRoundPage from "./paper_trail";
import ShadowDiamondRoundPage from "./shadow_diamond";
import StakeoutRoundPage from "./stakeout";
import DeadThiefRoundPage from "./the_dead_thief";
import RealDiamondRoundPage from "./the_real_diamond";

// This file is intended to include non-structural data that is only relevant
// to the frontend concerning rounds.

// Map from round `key` to component that should be rendered for that round.
// TODO: figure out the props we want to pass to the round pages
type RoundDefinition = {
  component: FunctionComponent<{ teamState: TeamState; node?: string }>;
  entrypoint?: Entrypoint;
};

export const ROUND_PAGE_MAP: Record<string, RoundDefinition> = {
  shadow_diamond: {
    component: ShadowDiamondRoundPage,
    entrypoint: "shadow_diamond",
  },
  stakeout: {
    component: StakeoutRoundPage,
    entrypoint: "stakeout",
  },
  paper_trail: {
    component: PapertrailRoundPage,
    entrypoint: "paper_trail",
  },
  illegal_search: {
    component: IllegalSearchRoundPage,
    entrypoint: "illegal_search",
  },
  background_check: {
    component: BackgroundCheckRoundPage,
    entrypoint: "background_check",
  },
  the_dead_thief: {
    component: DeadThiefRoundPage,
  },
  the_real_diamond: {
    component: RealDiamondRoundPage,
  },
};
