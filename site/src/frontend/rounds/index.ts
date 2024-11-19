import type { FunctionComponent } from "react";
import type { TeamHuntState } from "../../../lib/api/client";
import type { Entrypoint } from "../server/assets";
import BackgroundCheckRoundPage from "./background_check";
import IllegalSearchRoundPage from "./illegal_search";
import MurderRoundPage from "./murder_in_mitropolis";
import PapertrailRoundPage from "./paper_trail";
import StakeoutRoundPage from "./stakeout";
import MissingDiamondRoundPage from "./the_missing_diamond";
import VaultRoundPage from "./the_vault";

// This file is intended to include non-structural data that is only relevant
// to the frontend concerning rounds.

// Map from round `key` to component that should be rendered for that round.
// TODO: figure out the props we want to pass to the round pages
type RoundDefinition = {
  component: FunctionComponent<{ teamState: TeamHuntState; node?: string }>;
  entrypoint?: Entrypoint;
};

export const ROUND_PAGE_MAP: Record<string, RoundDefinition> = {
  the_missing_diamond: {
    component: MissingDiamondRoundPage,
    entrypoint: "the_missing_diamond",
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
  murder_in_mitropolis: {
    component: MurderRoundPage,
    entrypoint: "murder_in_mitropolis",
  },
  the_vault: {
    component: VaultRoundPage,
  },
};
