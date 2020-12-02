const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
// 导入css抽离插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 导入css压缩插件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// 导入js压缩插件
const TerserPlugin = require("terser-webpack-plugin");
// 导入Gzip插件
const CompressionPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

const prodConfig = {
  // 模式
  mode: 'production', //生产环境
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(
        {
          extractComments: false,
          cache: true,
          parallel: true, // 多线程
        }
      ),
    ],
    splitChunks: {
      chunks: "async",
      minSize: 20000, // 模块的最小体积
      minChunks: 1, // 模块的最小被引用次数
      maxAsyncRequests: 5, // 按需加载的最大并行请求数
      maxInitialRequests: 3, // 一个入口最大并行请求数
      automaticNameDelimiter: '~', // 文件名的连接符
      name: true,
      cacheGroups: { // 缓存组
          vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10
          },
          default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
          }
      }
  }
  },
  // 打包规则
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          "postcss-loader",
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    // css抽离
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].css",
    }),
    // gzip
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: productionGzipExtensions,
      threshold: 10240,
      minRatio: 0.8
    }),
  ],
}

module.exports = merge(baseConfig, prodConfig)