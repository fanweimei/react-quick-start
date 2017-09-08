const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports= {
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        /*
          匹配.html文件
          使用html-loader,将html内容存为js字符串，
          比如遇到import tabContent from './template.html';
          template.html的内容就会被转化为一个js字符串
         */
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src','link:href']
            }
          }
        ]
      },
      {
        test: /favicon\.png$/,
        use: [
          {
            loader: 'file-loader',
            options :{
              name:'[name].[ext]?[hash]'
            }
          }
        ]
      },
      {
        /*
          html , less引用的图片和字体会匹配到这里的test
          当文件的体积小鱼limit时，url-loader把文件转化为Data URI的格式内联到引用的地方
          当文件大于limit时，url-loader,url-loader会调用file-loader把文件存到输入目录
         */
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2000 //单位是字节
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [' ', '.js','.jsx','.less','.json'],
    alias: {
      '~': path.resolve(__dirname,'src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'], // 将公共的代码打包到vendor.js中，将文件名打包到mainfest中，这样vendor文件名的改变，不会引起其它js文件在打包过程时发生改变
    }),
    new webpack.DefinePlugin({ // 插入环境变量

    }),
    new webpack.ProvidePlugin({ //配置全局变量
      React: 'react',
      ReactDOM: 'react-dom'
    })
  ],
}
