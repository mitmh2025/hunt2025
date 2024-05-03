const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = [
  {
    name: 'browser',
    target: 'web',
    entry: {
      // TODO: walk all child folders of puzzledata, look for immediate child
      // package.json?  For each one that has one, define an entry point.
    },
    // This config will ultimately produce js and css (and possibly other)
    // assets which we want to be inputs available to/referenceable by the
    // `server` bundle below, so that it is possible for puzzles with
    // frontend requirements to integrate their own code or styles in both a
    // server and client context as needed.
  },
  {
    name: 'server',
    target: 'node',
    dependencies: ['browser'],
    entry: {
      server: './src/main.ts',
      dump: './puzzledata/dump-json.ts',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      // If we hook assets up to a CDN:
      // publicPath: 'https://cdn.example.com/assets/[fullhash]/',
      filename: '[name]-bundle.js',
      publicPath: '/assets/',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /(node_modules)/,
          use: {
            // .swcrc can be used to configure swc
            loader: 'swc-loader',
          },
        },
        { test: /\.css$/, use: 'css-loader' },
        // TODO: support importing other kinds of assets, and aliases for
        // the results of the browser build bundles
        {
          test: /\.png$/,
          type: 'asset/resource',
          generator: {
            outputPath: 'assets/',
            filename: '[hash][ext][query]',
          }
        },
      ],
      // Add modules as appropriate
    },
    resolve: {
      extensions: ['.ts', '.tsx', '...'],
    },
    externalsPresets: { node: true },
    externals: [nodeExternals()],
  },
];
