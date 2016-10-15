const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const composeWebpackOutput = require('../utils/composeWebpackOutput');
const config = require('../config/webpack.dev');

process.env.NODE_ENV = 'development';

const compiler = webpack(config);
compiler.plugin('done', composeWebpackOutput);

new WebpackDevServer(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  quiet: true
}).listen(3000, 'localhost', function (err) {
  if (err) return console.log(err);
  process.stdout.write('\x1bc'); // Clear console completely in the beginning
  console.log('> Server started at http://localhost:3000/');
});
