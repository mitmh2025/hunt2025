import { createRequire } from "module";
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

const require = createRequire(import.meta.url);
const currentDirname = path.dirname(url.fileURLToPath(import.meta.url));
const outputDirname = path.join(currentDirname, `dist`);
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

const jsManifestFilename = path.join(outputManifestDirname, `js-manifest.json`);

const cssManifestFilename = path.join(
  outputManifestDirname,
  `css-manifest.json`,
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
  const dev = mode === `development`;

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
              ? `[local]__[hash:base64:5]`
              : `[hash:base64:7]`,
            auto: true,
          },
        },
      },
      // TODO: {loader: "postcss-loader",},
    ],
  };

  const pngRule = {
    test: /\.png$/,
    type: "asset/resource",
    generator: {
      outputPath: "assets/",
      filename: "[hash][ext][query]",
    },
  };

  const serverSwcLoader = {
    // .swcrc can be used to configure swc
    loader: "swc-loader",
  };

  const serverConfig = {
    name: "server",
    target: "node",
    entry: {
      server: "./src/main.ts",
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
          resolve: { conditionNames: [`require`] },
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
        pngRule,
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
      new MiniCssExtractPlugin({ filename: `server-main.css`, runtime: false }),
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
    },
    // TODO: stats
  };

  const clientOutputDirname = path.join(outputDirname, `static/client`);

  const clientConfig = {
    name: "client",
    dependencies: ["server"],
    entry: "./src/client.tsx",
    output: {
      filename: dev ? `main.js` : `main.[contenthash:8].js`,
      path: clientOutputDirname,
      clean: !dev,
      publicPath: `/client/`,
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [rscClientLoader, "swc-loader"],
        },
        {
          test: /\.m?jsx?$/,
          use: rscClientLoader,
        },
        cssRule,
        pngRule,
      ],
    },
    plugins: [
      new WebpackManifestPlugin({
        fileName: cssManifestFilename,
        publicPath: `/client/`,
        filter: (file) => file.path.endsWith(`.css`),
      }),
      new WebpackManifestPlugin({
        fileName: jsManifestFilename,
        publicPath: `/client/`,
        filter: (file) => file.path.endsWith(`.js`),
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
    // ...
  };
  return [serverConfig, clientConfig];
}
