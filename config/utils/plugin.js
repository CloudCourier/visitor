const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const WebpackBar = require('webpackbar');
const DotenvPlugin = require('dotenv-webpack');
const glob = require('glob');
const variable = require('./variable');

const { PUBLIC_PATH, SRC_PATH, ENV_CONFIG_PATH } = variable;

const getPlugins = () => {
  const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(PUBLIC_PATH, 'index.html'),
    filename: 'index.html',
    minify: {
      html5: true,
      collapseWhitespace: true,
      preserveLineBreaks: true,
      minifyCSS: true,
      minifyJS: true,
    },
  });
  const cleanWebpackPlugin = new CleanWebpackPlugin();
  const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: 'css/[name].css',
  });
  const cssMinimizerPlugin = new CssMinimizerPlugin({
    parallel: true,
  });
  // new BundleAnalyzerPlugin(),
  const webpackBar = new WebpackBar({});
  const dotenvPlugin = new DotenvPlugin({
    path: ENV_CONFIG_PATH,
  });
  return [
    cleanWebpackPlugin,
    miniCssExtractPlugin,
    cssMinimizerPlugin,
    htmlWebpackPlugin,
    dotenvPlugin,
    webpackBar,
  ];
};
module.exports = {
  getPlugins,
};
