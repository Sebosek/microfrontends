const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const common = require('./webpack.config');
const json = require('../package.json');

const prod = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/dashboard/latest/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'dashboard',
      filename: 'remote-entry.js',
      exposes: {
        './startup': './src/bootstrap'
      },
      shared: json.dependencies,
    }),
  ],
};

module.exports = merge(common, prod);
