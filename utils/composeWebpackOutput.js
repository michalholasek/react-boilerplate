const chalk = require('chalk');

function composeWebpackOutput(stats) {
  if (!stats.hasErrors() && !stats.hasWarnings()) {
    composeSuccessOutput(stats);
    return;
  }

  composeErrorOutput(stats);
}

function composeSuccessOutput(stats) {
  console.log();

  const assets = Object
                   .keys(stats.compilation.assets)
                   .map(assetName => {
                     return {
                       name: assetName,
                       size: stats.compilation.assets[assetName].size()
                     };
                   });

  assets.forEach(asset => {
    console.log(`${chalk.bold.white(asset.name)} ${asset.size} bytes`);
  });

  const success = `${chalk.reset.inverse.bold.green(' SUCCESS ')}`;
  const time = ` Time: ${stats.endTime - stats.startTime}ms`;

  console.log();
  console.log(`${success}${time}`);
}

function composeErrorOutput(stats) {
  stats.compilation.errors
    .map(error => formatErrorMessage(error.message))
    .forEach(message => { console.log(); console.log(message); });

  const failure = `${chalk.reset.inverse.bold.red(' FAILURE ')}`;
  const time = ` Time: ${stats.endTime - stats.startTime}ms`;

  console.log();
  console.log(`${failure}${time}`);
}

function formatErrorMessage(message) {
  message = message
             .replace('Module build failed: SyntaxError: ', '')
             .replace('Module not found: ', '');

  const firstLine = message.split('\n')[0];

  return message.replace(firstLine, `${chalk.bold.red(firstLine)}`);
}

module.exports = composeWebpackOutput;
