import type { Config } from "jest";

const config: Config = {
  verbose: true,
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
    // Jest doesn't handle non-javascript assets by default, so if a test
    // reaches some other asset, then we need to provide a transformer to avoid
    // trying to interpret the asset as JS code, which goes poorly for most
    // file formats.
    "^.+\\.(css|jpg|mp3|wav|opus|png|xlsx)$": "jest-transform-stub",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx", ".jsx"],
};

export default config;
