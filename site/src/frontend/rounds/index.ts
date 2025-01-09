import type { FunctionComponent } from "react";
import type { TeamHuntState, TeamInfo } from "../../../lib/api/client";
import type { Entrypoint } from "../server/assets";
import BackgroundCheckRoundPage from "./background_check";
import EventsRoundPage from "./events";
import IllegalSearchRoundPage from "./illegal_search";
import MurderRoundPage from "./murder_in_mitropolis";
import PapertrailRoundPage from "./paper_trail";
import StakeoutRoundPage from "./stakeout";
import StrayLeadsRoundPage from "./stray_leads";
import MissingDiamondRoundPage from "./the_missing_diamond";

// This file is intended to include non-structural data that is only relevant
// to the frontend concerning rounds.

// Map from round `key` to component that should be rendered for that round.
// TODO: figure out the props we want to pass to the round pages
type RoundDefinition = {
  title: string;
  component: FunctionComponent<{
    teamState: TeamHuntState;
    teamInfo: TeamInfo;
    node?: string;
  }>;
  entrypoint?: Entrypoint;
};

export const ROUND_PAGE_MAP: Record<string, RoundDefinition> = {
  the_missing_diamond: {
    title: "The Missing Diamond",
    component: MissingDiamondRoundPage,
    entrypoint: "the_missing_diamond",
  },
  stakeout: {
    title: "The Stakeout",
    component: StakeoutRoundPage,
    entrypoint: "stakeout",
  },
  paper_trail: {
    title: "The Paper Trail",
    component: PapertrailRoundPage,
    entrypoint: "paper_trail",
  },
  illegal_search: {
    title: "The Illegal Search",
    component: IllegalSearchRoundPage,
    entrypoint: "illegal_search",
  },
  background_check: {
    title: "The Background Check",
    component: BackgroundCheckRoundPage,
    entrypoint: "background_check",
  },
  murder_in_mitropolis: {
    title: "The Murder in MITropolis",
    component: MurderRoundPage,
    entrypoint: "murder_in_mitropolis",
  },
  stray_leads: {
    title: "Stray Leads",
    component: StrayLeadsRoundPage,
    entrypoint: "stray_leads",
  },
  events: {
    title: "Events",
    component: EventsRoundPage,
    entrypoint: "events",
  },
};
