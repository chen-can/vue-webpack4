// 使用node的path模块
const path = require('path')
// 导入vue-loader插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 导入html-webpack-plugin插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 导入clean-webpack-plugin插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 导入webpack
const webpack = require('webpack');

module.exports = {
  // 模式
  mode: "development",//默认为production
  // 打包的入口
  entry: './src/main.js',
  // devServer配置
  devServer: {
    // 指定服务器根目录
    contentBase: './dist',
    // 自动打开浏览器
    open: true,
    // 启用热模块替换
    hot: true
  },
  // 打包的出口
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // 打包规则
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          limit: 2048 //2k
        }
      },
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
    // 请确保引入这个插件！
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js'
    }
  },
  
}