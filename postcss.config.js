const glob = require('glob');
const path = require('path');
const { SRC_PATH } = require('./config/utils/variable');
module.exports = {
  plugins: [
    require('postcss-import'), // css导入
    require('postcss-preset-env'), // 浏览器兼容
    // require('@fullhuman/postcss-purgecss')({
    //   content: [...glob.sync(path.join(SRC_PATH, '/**/*.{tsx,jsx}'), { nodir: true })],
    // }),
  ],
};
