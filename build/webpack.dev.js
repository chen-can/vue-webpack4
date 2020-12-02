// 导入webpack
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

const devConfig = {
  // 模式
  mode: 'development', //开发环境
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // 指定服务器根目录
    contentBase: './dist',
    // 自动打开浏览器
    open: true,
    // 启用热模块替换
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          "postcss-loader",
          'less-loader'
        ]
      }
    ]
  },
  // 插件
  plugins: [
    // 模块热更新插件
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(baseConfig, devConfig)