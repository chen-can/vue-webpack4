// 使用node的path模块
const path = require('path')
const os = require('os');
const resolve = dir => path.join(__dirname, dir)
// 导入vue-loader插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 导入设置入口html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 导入清理 /dist 文件夹插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  // 打包的入口
  entry: './src/main.js',
  // 打包的出口
  output: {
    filename: 'app.js',
    path: resolve('../dist')
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
        test: /\.(gif|jpe?g|png|svg)\??.*$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          outputPath:'/assets/img',
          limit: 2048 //2k
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 2048,
          outputPath:'/assets/music',
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 2048,
          outputPath:'/assets/font',
        }
      },
      {
        test: /\.js$/,
        exclude:/node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'thread-loader', //多进程编译
            options: {
              workers: os.cpus().length,
            },
          },
        ],
      }
    ]
  },
  // 插件
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js',
      "@": resolve('src'),
    }
  },

}