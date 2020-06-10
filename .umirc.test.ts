/*
 * @Author: your name
 * @Date: 2020-05-20 15:52:39
 * @LastEditTime: 2020-06-10 11:44:18
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \newMerchantMaster\.umirc.test.ts
 */
import { IConfig } from "umi-types";

const config: IConfig = {
  define: {
    "window.api": "http://test.bruin_shop.api.tdianyi.com",
    "Environment": "test"
  },
  chainWebpack: function (config, { webpack }) {
    config.merge({
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendor: {
              name: 'vendors',
              test({ resource }) {
                return /[\\/]node_modules[\\/]/.test(resource);
              },
              priority: 10,
            },
          },
        },
      }
    });
  },
}
export default config
