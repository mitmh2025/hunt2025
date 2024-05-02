const path = require('path');

module.exports = {
  entry: {
    server: './src/serverMain.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // If we hook assets up to a CDN:
    // publicPath: 'https://cdn.example.com/assets/[fullhash]/',
    filename: 'server-bundle.js',
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
    ],
    // Add modules as appropriate
  },
  resolve: {
    extensions: ['.ts', '.tsx', '...'],
  },
  target: 'node',
};
