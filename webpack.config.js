const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    /*
      把资源文件js，图片等都放到assets目录下,一般不要使用，除非确定将一些静态资源js和图片放入某个服务器下作为缓存
     */
    // publicPath: '/assets/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
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
        use: ['html-loader']
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        /*
          html , less引用的图片和字体会匹配到这里的test
          当文件的体积小鱼limit时，url-loader把文件转化为Data URI的格式内联到引用的地方
          当文件大于limit时，url-loader,url-loader会调用file-loader把文件存到输入目录
         */
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /node_modules/,
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
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    //  new webpack.HotModuleReplacementPlugin()
    // 在package.json中加入--hot，开启热更新，可以不用在devServer配置hot，也不用在这里引入插件，这一切会自动完成
  ],
  devServer: {
    port: 3000,
    // hot: true,
    historyApiFallback: true //不存在的路径，默认打开根目录下的index.html
    // historyApiFallback: {
    //   index: '/assets/'  //与output中publicPath路径一致
    // }
  },
  // devtool: 'eval-source-map'  在package.json中加入-d，开启调试模式，可以不用写这行代码
}
