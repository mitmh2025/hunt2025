import type { FunctionComponent } from 'react';

import BackgroundCheckRoundPage from './BackgroundCheckRoundPage';
import DeadThiefRoundPage from './DeadThiefRoundPage';
import IllegalSearchRoundPage from './IllegalSearchRoundPage';
import PapertrailRoundPage from './PapertrailRoundPage';
import RealDiamondRoundPage from './RealDiamondRoundPage';
import ShadowDiamondRoundPage from './ShadowDiamondRoundPage';
import StakeoutRoundPage from './StakeoutRoundPage';

// This file is intended to include non-structural data that is only relevant
// to the frontend concerning rounds.

// Map from round `key` to component that should be rendered for that round.
// TODO: figure out the props we want to pass to the round pages
export const ROUND_PAGE_MAP: Record<string, FunctionComponent<{ session: object }>> = {
  sd: ShadowDiamondRoundPage,
  so: StakeoutRoundPage,
  pt: PapertrailRoundPage,
  is: IllegalSearchRoundPage,
  bg: BackgroundCheckRoundPage,
  dt: DeadThiefRoundPage,
  rd: RealDiamondRoundPage,
};
