const path = require("path");

const app_dir = __dirname + '/src';

const config = {
  mode: 'development',
  entry: app_dir + '/electron.ts',
  target: 'electron-main',
  output: {
    path: __dirname + '/dist',
    filename: 'electron-app.js',
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: "ts-loader",
      exclude: /(node_modules|bower_components)/
    }]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  }
};
module.exports = config;