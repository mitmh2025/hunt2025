import type { Config } from "jest";

const config: Config = {
  verbose: true,
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx", ".jsx"],
};

export default config;
