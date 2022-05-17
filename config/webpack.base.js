const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { getPlugins } = require('./utils/plugin');
const resolveConfig = require('./utils/resolve');
const variable = require('./utils/variable');
const { IS_DEV, SRC_PATH, IS_PRO, BUILD_PATH } = variable;
module.exports = {
  entry: {
    index: path.join(SRC_PATH, 'index.tsx'),
  },
  output: {
    path: BUILD_PATH,
    filename: 'js/[name].bundle.js',
    // publicPath: getCDNPath(),
    chunkFilename: 'js/[name].chunk.js',
    assetModuleFilename: 'assets/[ext][query]',
    clean: true,
  },
  cache: { type: 'memory' },
  module: {
    rules: [
      {
        test: /\.(tsx?|js|jsx)$/,
        include: [SRC_PATH],
        exclude: [/node_modules/, /public/, /(.|_)min\.js$/],
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 3,
            },
          },
          'babel-loader?cacheDirectory=true',
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/i,
        // 组件库的样式要一起打包 和 .css
        // include: [SRC_PATH],
        // exclude: /node_modules/, // 取消匹配node_modules里面的文件
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[local]',
              },
              sourceMap: !IS_PRO,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 100kb
          },
        },
      },
    ],
  },
  plugins: getPlugins(),
  resolve: resolveConfig,
};
