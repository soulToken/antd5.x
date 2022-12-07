/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: haowenbin
 * @Date: 2022-08-16 17:04:25
 * @LastEditors: haowenbin
 * @LastEditTime: 2022-10-25 14:23:35
 * @FilePath: \vue3-template\src\plugins\htmlPlugin.js
 */
module.exports = class HtmlWebpackTopBannerPlugin {
  constructor(banner) {
    this.banner = `
      <!--${banner}-->
    `;
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      "HtmlWebpackTopBannerPlugin",
      (compilation, next) => {
        const value =
          `${this.banner}\n` + compilation.assets["index.html"]._value;
        compilation.assets["index.html"] = {
          source: function () {
            return value; // //文件内容
          },
        };
        next();
      }
    );
  }
};
