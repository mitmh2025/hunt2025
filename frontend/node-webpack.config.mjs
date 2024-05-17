import path from "path";
import url from "url";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";

import MiniCssExtractPlugin from "mini-css-extract-plugin";

import {
  WebpackRscClientPlugin,
  WebpackRscServerPlugin,
  createWebpackRscClientLoader,
  createWebpackRscServerLoader,
  createWebpackRscSsrLoader,
  webpackRscLayerName,
} from "@mfng/webpack-rsc";

const currentDirname = path.dirname(url.fileURLToPath(import.meta.url));
const outputDirname = path.join(currentDirname, "dist");
const outputManifestDirname = outputDirname;

const reactServerManifestFilename = path.join(
  outputManifestDirname,
  `react-server-manifest.json`,
);

const reactClientManifestFilename = path.join(
  outputManifestDirname,
  `react-client-manifest.json`,
);

const reactSsrManifestFilename = path.join(
  outputManifestDirname,
  `react-ssr-manifest.json`,
);

const jsManifestFilename = path.join(outputManifestDirname, "js-manifest.json");
const cssManifestFilename = path.join(
  outputManifestDirname,
  "css-manifest.json",
);

class LogValue {
  constructor(name, m) {
    this.name = name;
    this.m = m;
  }
  apply(compiler) {
    compiler.hooks.emit.tap("LogValue", () => {
      console.log(this.name, this.m);
    });
  }
}

/**
 * @param {unknown} _env
 * @param {{readonly mode?: import('webpack').Configuration['mode']}} argv
 * @return {import('webpack').Configuration[]}
 */
export default function createConfigs(_env, argv) {
  const { mode } = argv;
  const dev = mode === "development";

  const clientReferencesMap = new Map();
  const serverReferencesMap = new Map();

  const rscServerLoader = createWebpackRscServerLoader({
    clientReferencesMap,
    serverReferencesMap,
  });

  const rscSsrLoader = createWebpackRscSsrLoader({ serverReferencesMap });
  const rscClientLoader = createWebpackRscClientLoader({ serverReferencesMap });

  const cssRule = {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: dev
              ? "[local]__[hash:base64:5]"
              : "[hash:base64:7]",
            auto: true,
          },
        },
      },
      // TODO: {loader: "postcss-loader",},
    ],
  };

  const pngRule = (publicPath) => ({
    test: /\.png$/,
    type: "asset/resource",
    generator: {
      outputPath: "assets/",
      publicPath: `${publicPath}/assets/`,
      filename: "[hash][ext][query]",
    },
  });

  const serverSwcLoader = {
    // .swcrc can be used to configure swc
    loader: "swc-loader",
  };

  const serverConfig = {
    name: "server",
    target: "node",
    entry: {
      server: "./src/main.ts",
      //dump: "./puzzledata/dump-json.ts",
    },
    output: {
      path: outputDirname,
      // If we hook assets up to a CDN:
      // publicPath: 'https://cdn.example.com/assets/[fullhash]/',
      filename: "[name]-bundle.js",
      publicPath: "/assets/",
      libraryTarget: "module",
      chunkFormat: "module",
      devtoolModuleFilenameTemplate: (
        /** @type {{ absoluteResourcePath: string; }} */ info,
      ) => info.absoluteResourcePath,
    },
    module: {
      rules: [
        {
          resource: [/\/server\/rsc\//, /\/routes\/.*\.tsx/],
          layer: webpackRscLayerName,
        },
        {
          resource: /\/server\/shared\//,
          layer: `shared`,
        },
        {
          // Work around bug in websocket-express
          test: /websocket-express/,
          resolve: { conditionNames: ["require"] },
        },
        {
          issuerLayer: webpackRscLayerName,
          resolve: { conditionNames: [`react-server`, `...`] },
        },
        {
          oneOf: [
            {
              issuerLayer: webpackRscLayerName,
              test: /\.tsx?$/,
              use: [rscServerLoader, serverSwcLoader],
            },
            {
              test: /\.tsx?$/,
              use: [rscSsrLoader, serverSwcLoader],
            },
            {
              issuerLayer: webpackRscLayerName,
              test: /\.m?jsx?$/,
              use: rscServerLoader,
            },
            {
              test: /\.m?jsx?$/,
              use: rscSsrLoader,
            },
          ],
        },
        cssRule,
        // TODO: support importing other kinds of assets, and aliases for
        // the results of the browser build bundles
        pngRule(""),
      ],
      // Add modules as appropriate
    },
    resolve: {
      extensions: [".ts", ".tsx", "..."],
      extensionAlias: {
        ".js": [".ts", ".js"],
        ".mjs": [".mts", ".mjs"],
      },
      alias: {
        "@": path.join(currentDirname, "src"),
      },
    },
    externalsPresets: { node: true },
    plugins: [
      // server-main.css is not used, but required by MiniCssExtractPlugin.
      new MiniCssExtractPlugin({
        filename: `[contenthash].css`,
        runtime: false,
      }),
      new WebpackRscServerPlugin({
        clientReferencesMap,
        serverReferencesMap,
        serverManifestFilename: path.relative(
          outputManifestDirname,
          reactServerManifestFilename,
        ),
      }),
    ],
    experiments: {
      outputModule: true,
      layers: true,
    },
    devtool: dev ? "source-map" : `source-map`,
    mode,
    stats: {
      errorDetails: true,
      // TODO: stats
    },
  };

  const clientOutputDirname = path.join(outputDirname, `static/client`);

  const clientConfig = {
    name: "client",
    dependencies: ["server"],
    entry: {
      main: {
        import: "./src/client.tsx",
        layer: "main",
      },
      shadow_diamond: "./src/client/shadow_diamond.tsx",
    },
    target: "web",
    output: {
      filename: dev ? "[name].[contenthash:16].js" : "[contenthash:16].js",
      path: clientOutputDirname,
      clean: !dev,
      publicPath: "/client/",
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          issuerLayer: "main",
          test: [/\.tsx?$/, /\.m?jsx?$/],
          use: rscClientLoader,
        },
        // Matching rules are applied in reverse order (so swc-loader comes first).
        {
          test: /\.tsx?$/,
          use: ["swc-loader"],
        },
        cssRule,
        pngRule("/client"),
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", "..."],
      extensionAlias: {
        ".js": [".ts", ".js"],
        ".mjs": [".mts", ".mjs"],
      },
      alias: {
        "@": path.join(currentDirname, "src"),
      },
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: dev ? "[name].[contenthash:16].css" : "[contenthash:16].css",
        runtime: false,
      }),
      new WebpackManifestPlugin({
        fileName: cssManifestFilename,
        publicPath: "/client/",
        filter: (file) => file.path.endsWith(".css"),
      }),
      new WebpackManifestPlugin({
        fileName: jsManifestFilename,
        publicPath: "/client/",
        filter: (file) => file.path.endsWith(".js"),
      }),
      new WebpackRscClientPlugin({
        clientReferencesMap,
        clientManifestFilename: path.relative(
          clientOutputDirname,
          reactClientManifestFilename,
        ),
        ssrManifestFilename: path.relative(
          clientOutputDirname,
          reactSsrManifestFilename,
        ),
      }),
      new LogValue(`clientReferencesMap`, clientReferencesMap),
      new LogValue(`serverReferencesMap`, serverReferencesMap),
    ],
    experiments: {
      layers: true,
    },
    // ...
  };
  return [serverConfig, clientConfig];
}
