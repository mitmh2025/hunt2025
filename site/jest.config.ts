import fs from "fs";
import { type Config as SwcConfig } from "@swc/core";
import type { Config } from "jest";

const swcConfig = JSON.parse(
  fs.readFileSync(`${__dirname}/.swcrc`, "utf-8"),
) as SwcConfig;

const config: Config = {
  verbose: true,
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest", { ...swcConfig }],
    // Jest doesn't handle non-javascript assets by default, so if a test
    // reaches some other asset, then we need to provide a transformer to avoid
    // trying to interpret the asset as JS code, which goes poorly for most
    // file formats.
    "^.+\\.(3mf|css|jpg|mp3|opus|pdf|png|stl|wav|xlsx)$": "jest-transform-stub",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx", ".jsx"],
};

export default config;
