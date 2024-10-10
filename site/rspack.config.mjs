import path from "path";
import url from "url";
import rspack from "@rspack/core";
import { SyncWaterfallHook } from "@rspack/lite-tapable";
import { RspackManifestPlugin } from "rspack-manifest-plugin";

const currentDirname = path.dirname(url.fileURLToPath(import.meta.url));
const outputDirname = path.join(currentDirname, "dist");
const outputManifestDirname = outputDirname;

const jsManifestFilename = path.join(outputManifestDirname, "js-manifest.json");
const cssManifestFilename = path.join(
  outputManifestDirname,
  "css-manifest.json",
);
const assetManifestFilename = path.join(
  outputManifestDirname,
  "asset-manifest.json",
);
const workerManifestFilename = path.join(
  outputManifestDirname,
  "worker-manifest.json",
);

const ASSET_PATH = process.env.ASSET_PATH || "/";

class OpusManifestPlugin {
  constructor(opts) {
    if (!opts.fileName) {
      throw new Error(
        "OpusManifestPlugin requires fileName be set in options to constructor",
      );
    }
    this.fileName = opts.fileName;
    this.emitCount = 0;
    this.moduleAssets = {};
    this.hooks = undefined;
  }

  getCompilerHooks() {
    if (this.hooks === undefined) {
      this.hooks = {
        afterEmit: new SyncWaterfallHook(["manifest"]),
        beforeEmit: new SyncWaterfallHook(["manifest"]),
      };
    }
    return this.hooks;
  }

  processAsset(asset, files) {
    if (asset.children?.length > 0) {
      // If this asset is not a leaf, recurse into its children.
      asset.children.forEach((child) => {
        this.processAsset(child, files);
      });
    } else {
      // Collect the relevant fields from opus files
      if (asset.name.endsWith(".opus")) {
        const src = asset.info.sourceFilename;
        const re =
          /src\/frontend\/interactions\/([^/]+)\/audio\/opus\/([^.]+).opus/;
        const res = re.exec(src);
        let interaction;
        let line;
        if (res && res.length === 3) {
          interaction = res[1];
          line = res[2];
          files.push({
            name: `${interaction}/${line}.opus`,
            size: asset.size,
            hash: asset.info.fullhash[0],
            url: `${ASSET_PATH}${asset.name}`,
            src, // will be something like "src/frontend/interactions/interview_at_the_art_gallery/audio/opus/2b.opus"
            assetName: asset.name,
            interaction,
            line,
          });
        }
      }
      //console.log("leaf asset", asset);
      //console.log("name", asset.name);
      //console.log("sourceFilename", asset.info?.sourceFilename);
      //console.log("size", asset.size);
    }
  }

  // args: (Compiler, Function)
  beforeRunHook(_, callback) {
    // Increment our counter of how many times we expect to see emit called, so
    // we'll know when we're done observing other assets getting emitted.
    this.emitCount += 1;
    if (callback) {
      callback();
    }
  }

  processAssetsHook({ compiler, compilation, manifestAssetId }) {
    // All assets pulled in as modules are not actually available directly from
    // `compilation.chunks`, so we get at them via stats.
    const stats = compilation.getStats().toJson({
      all: true,
      assets: true,
      cachedAssets: true,
      ids: true,
      publicPath: true,
    });
    const files = [];
    stats.assets.forEach((asset) => {
      this.processAsset(asset, files);
    });

    this.emitCount -= 1;

    // Sort entries in manifest to promote stability of final result
    files.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
    let manifest = { files };
    const isLastEmit = this.emitCount === 0;

    manifest = this.getCompilerHooks().beforeEmit.call(manifest);

    if (isLastEmit) {
      // Actually emit the asset.
      const output = JSON.stringify(manifest, undefined, 2);
      compilation.emitAsset(
        manifestAssetId,
        new compiler.webpack.sources.RawSource(output),
      );
    }

    this.getCompilerHooks(compiler).afterEmit.call(manifest);
  }

  apply(compiler) {
    const hookOptions = {
      name: "OpusManifestPlugin",
      stage: Infinity,
    };
    const manifestFileName = path.resolve(
      compiler.options.output?.path || "./",
      this.fileName,
    );
    const manifestAssetId = path.relative(
      compiler.options.output?.path || "./",
      manifestFileName,
    );

    // Set up our before-run hook so we can track when we hit the final emit call
    compiler.hooks.run.tapAsync(hookOptions, this.beforeRunHook.bind(this));
    // TODO: make this work with watch(), someday, maybe?
    // compiler.hooks.watchRun.tapAsync(hookOptions, this.beforeRunHook.bind(this));

    // And then set up our asset-processing hook
    compiler.hooks.thisCompilation.tap(hookOptions, (compilation) => {
      compilation.hooks.processAssets.tap(hookOptions, () => {
        this.processAssetsHook({ compiler, compilation, manifestAssetId });
      });
    });
  }
}

/**
 * @param {unknown} _env
 * @param {{readonly mode?: import('@rspack/core').Configuration['mode']}} argv
 * @return {import('@rspack/core').Configuration[]}
 */
export default function createConfigs(_env, argv) {
  const { mode } = argv;
  const dev = mode === "development";

  const cssRule = {
    test: /\.css$/,
    use: [
      rspack.CssExtractRspackPlugin.loader,
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

  const imageRule = {
    test: /\.(jpg|png|svg)$/,
    type: "asset/resource",
  };

  const mp3Rule = {
    test: /\.mp3$/,
    type: "asset/resource",
  };

  const opusRule = {
    test: /\.opus$/,
    type: "asset/resource",
  };

  const fontRule = {
    test: /\.ttf$/,
    type: "asset/resource",
  };

  const serverSwcLoader = {
    // .swcrc can be used to configure swc
    loader: "swc-loader",
  };

  const serverConfig = {
    name: "server",
    target: "node",
    // Server code imports JSON manifests that are generated by the client build,
    // so we need to run after the client build.
    dependencies: ["client"],
    entry: {
      server: "./src/main.ts",
    },
    output: {
      path: outputDirname,
      // If we hook assets up to a CDN:
      // publicPath: 'https://cdn.example.com/assets/[fullhash]/',
      filename: "[name]-bundle.js",
      assetModuleFilename: "static/[hash][ext][query]",
      cssFilename: "static/[hash][ext][query]",
      publicPath: ASSET_PATH,
      libraryTarget: "module",
      chunkFormat: "module",
      devtoolModuleFilenameTemplate: (
        /** @type {{ absoluteResourcePath: string; }} */ info,
      ) => info.absoluteResourcePath,
    },
    module: {
      rules: [
        {
          // Work around bug in websocket-express
          test: /websocket-express/,
          resolve: { conditionNames: ["require"] },
        },
        {
          test: /\.m?[jt]sx?$/,
          use: serverSwcLoader,
        },
        cssRule,
        // TODO: support importing other kinds of assets, and aliases for
        // the results of the browser build bundles
        imageRule,
        mp3Rule,
        // Opus files should only be used by the radio and thus should never be
        // imported by browser entrypoints, only server entrypoints.
        opusRule,
        fontRule,
      ],
      // Add modules as appropriate
    },
    resolve: {
      extensions: [".ts", ".tsx", "..."],
      extensionAlias: {
        ".js": [".ts", ".js"],
        ".mjs": [".mts", ".mjs"],
      },
    },
    externalsPresets: { node: true },
    externals: [
      "express",
      "websocket-express",
      "better-sqlite3",
      "pg-native",
      "knex",
      "swagger-ui-express",
      "redis",
    ],
    plugins: [
      new rspack.CssExtractRspackPlugin({
        filename: "static/[contenthash].css",
        runtime: false,
      }),
      new OpusManifestPlugin({
        fileName: path.join(outputManifestDirname, "radio-manifest.json"),
      }),
    ],
    experiments: {
      outputModule: true,
      layers: true,
    },
    devtool: dev ? "source-map" : "source-map",
    mode,
    stats: {
      errorDetails: true,
      // TODO: stats
    },
  };

  const clientConfig = {
    name: "client",
    entry: {
      activity_log: "./src/frontend/client/activity_log.tsx",
      all_puzzles: "./src/frontend/client/all_puzzles.tsx",
      background_check: "./src/frontend/rounds/background_check/client.tsx",
      dev: "./src/frontend/client/dev.tsx",
      illegal_search: "./src/frontend/rounds/illegal_search/client.tsx",
      main: "./src/frontend/client/main.tsx",
      navbar: "./src/frontend/client/navbar.tsx",
      paper_trail: "./src/frontend/rounds/paper_trail/client.tsx",
      puzzle: "./src/frontend/client/puzzle.tsx",
      the_missing_diamond:
        "./src/frontend/rounds/the_missing_diamond/client.tsx",
      stakeout: "./src/frontend/rounds/stakeout/client.tsx",
      puzzle_right_palm: "./src/frontend/puzzles/right-palm/client.tsx",
    },
    // Client code needs to reference the webworker bundle by URL.
    dependencies: ["worker"],
    target: "web",
    output: {
      filename: dev
        ? "static/[name].[contenthash:16].js"
        : "static/[contenthash:16].js",
      assetModuleFilename: "static/[hash][ext][query]",
      cssFilename: "static/[hash][ext][query]",
      path: outputDirname,
      publicPath: ASSET_PATH,
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.m?tsx?$/,
          exclude: /(node_modules)/,
          use: ["swc-loader"],
        },
        cssRule,
        imageRule,
        mp3Rule,
        fontRule,
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", "..."],
      extensionAlias: {
        ".js": [".ts", ".js"],
        ".mjs": [".mts", ".mjs"],
      },
      modules: [path.join(currentDirname, "node_modules")],
    },
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
      },
    },
    plugins: [
      new rspack.CssExtractRspackPlugin({
        filename: dev
          ? "static/[name].[contenthash:16].css"
          : "static/[contenthash:16].css",
        runtime: false,
      }),
      new RspackManifestPlugin({
        fileName: cssManifestFilename,
        publicPath: ASSET_PATH,
        filter: (file) => file.path.endsWith(".css"),
      }),
      new RspackManifestPlugin({
        fileName: path.join(
          outputManifestDirname,
          "js-manifest-with-chunks.json",
        ),
        generate: (seed, files, entries) => {
          // console.log(entries);
          // console.log("entrypoints:", Object.keys(entries));
          // For each named entrypoint, collect the files referenced by the
          // chunks needed by that entrypoint.
          return Object.fromEntries(
            Object.entries(entries).map(([entrypoint, files]) => {
              return [entrypoint, files.map((file) => `${ASSET_PATH}${file}`)];
            }),
          );
        },
      }),
      new RspackManifestPlugin({
        fileName: jsManifestFilename,
        publicPath: ASSET_PATH,
        filter: (file) => file.path.endsWith(".js"),
      }),
      new RspackManifestPlugin({
        fileName: assetManifestFilename,
        publicPath: ASSET_PATH,
        filter: (file) =>
          !file.path.endsWith(".js") && !file.path.endsWith(".css"),
      }),
    ],
    experiments: {
      outputModule: true,
      layers: true,
    },
    // ...
  };

  const workerConfig = {
    name: "worker",
    entry: {
      websocket_worker: "./worker/SharedWebsocketWorker.ts",
    },
    target: "webworker",
    output: {
      filename: dev
        ? "static/[name].[contenthash:16].js"
        : "static/[contenthash:16].js",
      path: outputDirname,
      publicPath: ASSET_PATH,
    },
    module: {
      rules: [
        {
          test: /\.m?tsx?$/,
          exclude: /(node_modules)/,
          use: ["swc-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", "..."],
      extensionAlias: {
        ".js": [".ts", ".js"],
        ".mjs": [".mts", ".mjs"],
      },
    },
    plugins: [
      new RspackManifestPlugin({
        fileName: workerManifestFilename,
        publicPath: ASSET_PATH,
      }),
    ],
  };

  return [workerConfig, clientConfig, serverConfig];
}
