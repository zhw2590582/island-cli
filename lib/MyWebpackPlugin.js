const path = require("path");
const glob = require("glob");
const chokidar = require('chokidar');
const { updateMeta } = require('./utils');
const isProd = process.env.NODE_ENV === "production";

module.exports = class MyWebpackPlugin {
  constructor(options) {
    // 
  }

  apply(compiler) {
    if (isProd) {
      glob.sync(path.join(process.cwd(), 'src/data/posts', '**/meta.js')).forEach(filePath => {
        const name = path.dirname(filePath).split(path.sep).pop();
        updateMeta(name, false);
      });
    } else {
      compiler.hooks.afterCompile.tap("after-compile", compilation => {
        glob.sync(path.join(process.cwd(), 'src/data/pages/', '*.md')).forEach(item => {
          compilation.fileDependencies.add(item);
        });
      });
      
      chokidar.watch(path.join(process.cwd(), 'src/data/posts', '**/*.*')).on('all', (e, filePath) => {
        const name = path.dirname(filePath).split(path.sep).pop();
        updateMeta(name, false);
      });
    }
  }
}
