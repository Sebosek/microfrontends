const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const common = require('./webpack.config');
const json = require('../package.json');

const dev = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8083/'
  },
  devServer: {
    port: 8083,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'dashboard',
      filename: 'remote-entry.js',
      exposes: {
        './startup': './src/bootstrap',
      },
      shared: json.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(common, dev);