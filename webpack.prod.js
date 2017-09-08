const path = require('path');
const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const Merge = require('webpack-merge');
const autoprefixer = require('autoprefixer'); //自动加前缀
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 单独打包css
const pxtorem = require('postcss-pxtorem');

const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
  entry: {
    index: './src/index.js',
    vendor: ['react', 'react-dom']
  },
  output: {
    /*
      把资源文件js，图片等都放到assets目录下,一般不要使用，除非确定将一些静态资源js和图片放入某个服务器下作为缓存
     */
    // publicPath: '/assets/',
    path: path.resolve(__dirname, 'dist'),
    /*
      [chunkhash]是打包后输出文件的hash值占位符，跟在文件名后面可以防止浏览器使用缓存的过期内容
      在生产环境中使用
    */
    filename: '[name].[chunkhash].js?'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /^node_modules$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins() {
                  return [
                    autoprefixer,
                    pxtorem({ rootValue: 75, propWhiteList: [], minPixelValue: 1 })
                  ];
                }
              }
            }],
        })
      },
      {
        test: /\.less$/,
        exclude: /^node_modules$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins() {
                  return [
                    autoprefixer,
                    pxtorem({ rootValue: 75, propWhiteList: [], minPixelValue: 1 })
                  ];
                }
              }
            },'less-loader']
        })
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ // 编译成生产版本
       'process.env': {
         NODE_ENV: JSON.stringify('production'),
       },
     }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin({ filename: '[name].[chunkhash].css', allChunks: true, disable: false }),
  ]
})
