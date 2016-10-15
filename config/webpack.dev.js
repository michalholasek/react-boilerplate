const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000/',
    './src/index.js'
  ],
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'html',
        test: /\.html$/
      },
      {
        exclude: /node_modules/,
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
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
