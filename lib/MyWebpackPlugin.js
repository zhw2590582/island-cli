const path = require("path");
const glob = require("glob");
const chokidar = require('chokidar');
const config = require('../config');
const { updateMeta } = require(path.join(config.path.database, 'index.js'));
const isProd = process.env.NODE_ENV === "production";

module.exports = class MyWebpackPlugin {
  constructor(options) {
    // 
  }

  apply(compiler) {
    if (isProd) {
      glob.sync(path.join(config.path.posts, '**/meta.js')).forEach(filePath => {
        const name = path.dirname(filePath).split(path.sep).pop();
        updateMeta(name, false);
      });
    } else {
      chokidar.watch(path.join(config.path.posts, '**/*.*')).on('all', (e, filePath) => {
        const name = path.dirname(filePath).split(path.sep).pop();
        updateMeta(name, false);
      });
    }
  }
}
