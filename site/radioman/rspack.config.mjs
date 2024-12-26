import { defineConfig } from "@rspack/cli";

const config = defineConfig({
  entry: {
    sync2tb: "./sync2tb.ts",
    tbprovision: "./tbprovision.ts",
    tbutil: "./tbutil.ts",
  },
  target: "node22",
  module: {
    rules: [
      {
        test: /\.ts$/,
        //exclude: [/node_modules/],
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
            },
          },
        },
        type: "javascript/auto",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  experiments: {
    outputModule: true,
  },
  output: {
    module: true,
  },
});

export default config;
