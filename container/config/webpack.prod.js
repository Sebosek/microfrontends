const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const common = require('./webpack.config');
const json = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prod = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: `marketing@${domain}/marketing/remote-entry.js`,
      },
      shared: json.dependencies,
    })
  ],
};

module.exports = merge(common, prod);
