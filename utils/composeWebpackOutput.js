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
    console.log(`  ${chalk.bold(asset.name)} ${asset.size} bytes`);
  });

  console.log();
  console.log(`> Time: ${stats.endTime - stats.startTime}ms`);
  console.log(`> ${chalk.bold.green('SUCCESS!')}`);
}

function composeErrorOutput(stats) {
  stats.compilation.errors
    .map(error => formatErrorMessage(error.message))
    .forEach(message => { console.log(); console.log(message); });

  console.log(`> ${chalk.bold.red('FAILURE!')}`);
}

function formatErrorMessage(message) {
  message = message
             .replace('Module build failed: SyntaxError: ', '')
             .replace('Module not found: ', '');

  const firstLine = message.split('\n')[0];

  return message
           .replace(firstLine, `  ${chalk.bold.red(firstLine)}`)
           .replace(/\n/g, '\n  ');
}

module.exports = composeWebpackOutput;
