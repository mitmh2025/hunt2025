import { defineConfig } from "@rspack/cli";

const config = defineConfig({
  entry: {
    main: "./main.ts",
    tbprovision: "./tbprovision.ts",
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
