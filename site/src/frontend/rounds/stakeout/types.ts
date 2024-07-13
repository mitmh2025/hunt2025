export type StakeoutSlot =
  | "sop01"
  | "sop02"
  | "sop03"
  | "sop04"
  | "sop05"
  | "sop06"
  | "sop07"
  | "sop08"
  | "sop09"
  | "sop10"
  | "sop11"
  | "sop12"
  | "sop13"
  | "sop14"
  | "sop15"
  | "sop16"
  | "sop17"
  | "sop18"
  | "sop19"
  | "sop20"
  | "sop21"
  | "sop22"
  | "sop23"
  | "sop24"
  | "sop25"
  | "sop26"
  | "sop27"
  | "sop28"
  | "sop29"
  | "sop30"
  | "sop31"
  | "sop32"
  | "sop33"
  | "sop34"
  | "sop35"
  | "sop36"
  | "sop37"
  | "sop38"
  | "sop39"
  | "sop40"
  | "sop41"
  | "sop42";
export type StakeoutPhotoState = {
  slot: StakeoutSlot;
  slug?: string;
  title?: string;
  asset: string;
};

export type StakeoutState = {
  photos: StakeoutPhotoState[];
  overlay?: {
    slug: string;
    label: string;
    asset: string;
    top: string;
    bottom: string;
    left: string;
    right: string;
    transform: string;
  };
};
