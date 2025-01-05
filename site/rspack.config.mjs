import { createHash } from "crypto";
import fs from "fs";
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

const swcConfig = JSON.parse(
  fs.readFileSync(path.join(currentDirname, ".swcrc"), "utf-8"),
);

const ASSET_PATH = process.env.ASSET_PATH || "/";

// A list of assets for which we wish to preserve the original filename.
// To continue to support cache-busting, we place such assets inside a
// directory named with their hash.
const PRESERVE_FILENAME_ASSET_PATHS = [
  "src/frontend/puzzles/acclaimed-file/assets/magic_i.svg",
  "src/frontend/puzzles/brilliant-center/assets/mellow-planet.pdf",
  "src/frontend/puzzles/circular-greece/assets/motifs.pdf",
  "src/frontend/puzzles/circular-greece/assets/rings-with-detentes-postsolve.3mf",
  "src/frontend/puzzles/circular-greece/assets/rings-with-detentes-postsolve.stl",
  "src/frontend/puzzles/circular-greece/assets/rod-sticker.pdf",
  "src/frontend/puzzles/clean-ivory/assets/the-inspectre.pdf",
  "src/frontend/puzzles/confused-antarctica/assets/networking-event.pdf",
  "src/frontend/puzzles/regal-knife/assets/a.mp3",
  "src/frontend/puzzles/regal-knife/assets/d.mp3",
  "src/frontend/puzzles/selfish-king/assets/bermuda-triangle-spreadsheet.xlsx",
  "src/frontend/puzzles/shoddy-table/assets/10000sheets.xlsx",
  "src/frontend/puzzles/timely-head/assets/engagements-and-other-crimes.pdf",
  "src/frontend/puzzles/valuable-alps/assets/cross-dash-word.pdf",
];

class RadioManifestPlugin {
  constructor(opts) {
    if (!opts.fileName || !opts.staticOutputPath) {
      throw new Error(
        "RadioManifestPlugin requires fileName and staticOutputPath be set in options to constructor",
      );
    }
    this.fileName = opts.fileName;
    this.staticOutputPath = opts.staticOutputPath;
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
        if (src.startsWith("src/frontend/interactions/")) {
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
        } else if (src.startsWith("src/frontend/puzzles/")) {
          const re = /src\/frontend\/puzzles\/([^/]+)\/assets\/([^.]+).opus/;
          const res = re.exec(src);
          let puzzle;
          let name;
          if (res && res.length === 3) {
            puzzle = res[1];
            name = res[2];
            files.push({
              name: `${puzzle}/${name}.opus`,
              size: asset.size,
              hash: asset.info.fullhash[0],
              url: `${ASSET_PATH}${asset.name}`,
              src, // will be something like "src/frontend/puzzles/right-palm/assets/2b.opus"
              assetName: asset.name,
              puzzle,
            });
          }
        }
      }
      if (asset.info.sourceFilename?.startsWith("src/assets/radio/")) {
        // Collect the relevant fields from other assets
        const src = asset.info.sourceFilename;
        // strip the src/assets/radio/ prefix
        const name = src.slice("src/assets/radio/".length);
        files.push({
          name,
          size: asset.size,
          hash: asset.info.fullhash[0],
          url: `${ASSET_PATH}${asset.name}`,
          src,
          assetName: asset.name,
        });
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

  processAssetsHook({ compiler, compilation, outputPath }) {
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
      // Actually emit the asset.  This is done with two outputs:
      // 1) a content-hashed output under the statics folder
      // 2) a one-key JSON manifest at the path passed in by whoever configured the plugin

      // Content-hashed asset
      const output = JSON.stringify(manifest, undefined, 2);
      const hash = createHash("sha256");
      hash.update(output);
      const contentHash = hash.digest("hex");
      const manifestFilename = `static/${contentHash}.json`;
      const contentAddressedOutputPath = path.join(
        outputPath,
        manifestFilename,
      );
      console.log(contentAddressedOutputPath);
      compilation.emitAsset(
        contentAddressedOutputPath,
        new compiler.webpack.sources.RawSource(output),
      );

      // Specified-path asset
      const fixedPathManifest = {
        current_radio_manifest: `${ASSET_PATH}${manifestFilename}`,
      };
      const fixedManifestContents = JSON.stringify(
        fixedPathManifest,
        undefined,
        2,
      );
      const fixedManifestAssetId = path.relative(outputPath, this.fileName);
      compilation.emitAsset(
        fixedManifestAssetId,
        new compiler.webpack.sources.RawSource(fixedManifestContents),
      );
    }

    this.getCompilerHooks(compiler).afterEmit.call(manifest);
  }

  apply(compiler) {
    const hookOptions = {
      name: "RadioManifestPlugin",
      stage: Infinity,
    };

    const outputPath = compiler.options.output?.path || "./";

    // Set up our before-run hook so we can track when we hit the final emit call
    compiler.hooks.run.tapAsync(hookOptions, this.beforeRunHook.bind(this));
    // TODO: make this work with watch(), someday, maybe?
    // compiler.hooks.watchRun.tapAsync(hookOptions, this.beforeRunHook.bind(this));

    // And then set up our asset-processing hook
    compiler.hooks.thisCompilation.tap(hookOptions, (compilation) => {
      compilation.hooks.processAssets.tap(hookOptions, () => {
        this.processAssetsHook({ compiler, compilation, outputPath });
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
    test: /\.(jpg|png|svg|ico)$/,
    type: "asset/resource",
  };

  const mp3Rule = {
    test: /\.mp3$/,
    type: "asset/resource",
  };

  const mp4Rule = {
    test: /\.mp4$/,
    type: "asset/resource",
  };

  const wavRule = {
    test: /\.wav$/,
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

  const pdfRule = {
    test: /\.pdf$/,
    type: "asset/resource",
  };

  const stlRule = {
    test: /\.stl$/,
    type: "asset/resource",
  };

  const threemfRule = {
    test: /\.3mf$/,
    type: "asset/resource",
  };

  const xlsxRule = {
    test: /\.xlsx$/,
    type: "asset/resource",
  };

  const vttRule = {
    test: /\.vtt$/,
    type: "asset/resource",
  };

  // Disable displayName classes on styled-components when not in dev mode.
  const styledComponentsPluginConfig = swcConfig.jsc.experimental.plugins.find(
    (plugin) => plugin[0] === "@swc/plugin-styled-components",
  );
  styledComponentsPluginConfig[1].displayName =
    mode === "development" ? true : false;
  const swcLoader = {
    // .swcrc can be used to configure swc
    loader: "swc-loader",
    options: swcConfig,
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
      generator: {
        "asset/resource": {
          filename: (pathData, _assetInfo) => {
            // console.log("pathData", pathData);
            // console.log("assetInfo", _assetInfo);
            if (
              PRESERVE_FILENAME_ASSET_PATHS.indexOf(pathData.filename) !== -1
            ) {
              const basename = path.basename(pathData.filename);
              return `static/[hash]/${basename}`;
            }
            return `static/[hash][ext]`;
          },
        },
      },
      rules: [
        {
          // Work around bug in websocket-express
          test: /websocket-express/,
          resolve: { conditionNames: ["require"] },
        },
        {
          test: /\.m?[jt]sx?$/,
          use: swcLoader,
        },
        cssRule,
        // TODO: support importing other kinds of assets, and aliases for
        // the results of the browser build bundles
        imageRule,
        mp3Rule,
        wavRule,
        mp4Rule,
        // Opus files should only be used by the radio and thus should
        // never be imported by browser entrypoints, only server entrypoints.
        opusRule,
        fontRule,
        pdfRule,
        stlRule,
        threemfRule,
        xlsxRule,
        vttRule,
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
      "oauth2-mock-server",
    ],
    plugins: [
      new rspack.CssExtractRspackPlugin({
        filename: "static/[contenthash].css",
        runtime: false,
      }),
      new RadioManifestPlugin({
        fileName: path.join(outputManifestDirname, "radio-manifest.json"),
        staticOutputPath: path.join(outputDirname, "static"),
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
      // Included on ~all pages
      main: "./src/frontend/client/main.tsx",
      dev: "./src/frontend/client/dev.tsx",

      // Included on specific routes
      activity_log: "./src/frontend/client/activity_log.tsx",
      all_puzzles: "./src/frontend/client/all_puzzles.tsx",
      hub: "./src/frontend/client/hub.tsx",
      manage_team: "./src/frontend/client/manage_team.tsx",
      navbar: "./src/frontend/client/navbar.tsx",
      puzzle: "./src/frontend/client/puzzle.tsx",
      solution: "./src/frontend/client/solution.tsx",

      // Included on the round pages
      the_missing_diamond:
        "./src/frontend/rounds/the_missing_diamond/client.tsx",
      stakeout: "./src/frontend/rounds/stakeout/client.tsx",
      paper_trail: "./src/frontend/rounds/paper_trail/client.tsx",
      illegal_search: "./src/frontend/rounds/illegal_search/client.tsx",
      background_check: "./src/frontend/rounds/background_check/client.tsx",
      murder_in_mitropolis:
        "./src/frontend/rounds/murder_in_mitropolis/client.tsx",
      stray_leads: "./src/frontend/rounds/stray_leads/client.tsx",

      // Illegal search interactions
      illegal_search_bookcase:
        "./src/frontend/rounds/illegal_search/client/Bookcase.tsx",
      illegal_search_cryptex:
        "./src/frontend/rounds/illegal_search/client/Cryptex.tsx",
      illegal_search_deskdrawer:
        "./src/frontend/rounds/illegal_search/client/DeskDrawer.tsx",
      illegal_search_extra:
        "./src/frontend/rounds/illegal_search/client/Extra.tsx",
      illegal_search_painting1:
        "./src/frontend/rounds/illegal_search/client/PaintingOne.tsx",
      illegal_search_painting2:
        "./src/frontend/rounds/illegal_search/client/PaintingTwo.tsx",
      illegal_search_rug: "./src/frontend/rounds/illegal_search/client/Rug.tsx",
      illegal_search_safe:
        "./src/frontend/rounds/illegal_search/client/Safe.tsx",
      illegal_search_telephone:
        "./src/frontend/rounds/illegal_search/client/Telephone.tsx",

      // Included on specific puzzle pages
      puzzle_few_nail: "./src/frontend/puzzles/few-nail/client.tsx",
      puzzle_giving_fighter: "./src/frontend/puzzles/giving-fighter/client.tsx",
      puzzle_legitimate_bridge:
        "./src/frontend/puzzles/legitimate-bridge/client.tsx",
      puzzle_right_palm: "./src/frontend/puzzles/right-palm/client.tsx",
      puzzle_sinful_turkey: "./src/frontend/puzzles/sinful-turkey/client.tsx",
      puzzle_unfit_tower: "./src/frontend/puzzles/unfit-tower/client.tsx",
      puzzle_unhealthy_mint: "./src/frontend/puzzles/unhealthy-mint/client.tsx",
      puzzle_wiry_ray: "./src/frontend/puzzles/wiry-ray/client.tsx",

      // Regsite (css only)
      regsite: "./src/frontend/regsite/regsite.css",
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
    devtool: dev ? "source-map" : false,
    module: {
      rules: [
        {
          test: /\.m?tsx?$/,
          exclude: /(node_modules)/,
          use: [swcLoader],
        },
        cssRule,
        imageRule,
        mp3Rule,
        wavRule,
        mp4Rule,
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
    devtool: dev ? "source-map" : false,
    module: {
      rules: [
        {
          test: /\.m?tsx?$/,
          exclude: /(node_modules)/,
          use: [swcLoader],
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

  const miscServerConfig = {
    name: "misc",
    entry: {
      ops: "./ops/server/main.ts",
      sync2tb: "./radioman/sync2tb.ts",
      tbprovision: "./radioman/tbprovision.ts",
      tbutil: "./radioman/tbutil.ts",
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
      path: path.join(outputDirname, "misc"),
    },
  };

  return [workerConfig, clientConfig, serverConfig, miscServerConfig];
}
