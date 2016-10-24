const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const sourcePath = path.resolve(__dirname, '../src');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000/',
    'webpack/hot/dev-server',
    './src/index.js'
  ],
  module: {
    loaders: [
      {
        include: sourcePath,
        loader: 'html-loader',
        test: /\.html$/
      },
      {
        include: sourcePath,
        loader: 'style-loader!css-loader',
        test: /\.css$/
      },
      {
        include: sourcePath,
        loader: 'babel-loader',
        test: /\.js(x?)$/
      }
    ]
  },
  output: {
    filename: 'app.bundle.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
