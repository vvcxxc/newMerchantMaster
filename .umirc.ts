import { IConfig } from 'umi-types';

const config: IConfig = {
  treeShaking: true,
  theme: {
    '@brand-primary': '#21418A',
  },


  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        hd: true,
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        // dynamicImport: false,
        title: '小熊敬礼',
        dll: false,
        // chunk: ['vendor','umi'],
        devServer: {
          host: 'localhost',
          inline: true,
          port: 8090,
        },
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  hash: true,
  targets: { chrome: 49, firefox: 45, safari: 10, edge: 13, ios: 8 },
  // browserslist: ['> 1%', 'last 2 versions', 'safari 10'],
};
export default config;
