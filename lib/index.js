const init = require('./init');
const add = require('./add');
const dev = require('./dev');
const build = require('./build');
const del = require('./del');
const reset = require('./reset');
const update = require('./update');

module.exports = function(cli) {
  const { flags, input, help, showHelp, showVersion, pkg } = cli;
  if (flags.init || input[0] === 'init') {
    init();
  } else if (flags.add || input[0] === 'add') {
    add(input[input[0] === 'add' ? 1 : 0]);
  } else if (flags.del || input[0] === 'del') {
    del(input[input[0] === 'del' ? 1 : 0]);
  } else if (flags.reset || input[0] === 'reset') {
    reset();
  } else if (flags.update || input[0] === 'update') {
    update(input[input[0] === 'update' ? 1 : 0], showHelp);
  } else if (flags.dev || input[0] === 'dev') {
    dev();
  } else if (flags.build || input[0] === 'build') {
    build();
  } else if (flags.version || input[0] === 'version') {
    showVersion();
  } else {
    showHelp();
  }
};
