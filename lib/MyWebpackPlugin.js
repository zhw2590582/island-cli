const path = require("path");
const glob = require("glob");
const chokidar = require('chokidar');
const { updateMeta } = require('./utils');
const isProd = process.env.NODE_ENV === "production";

const rootPath = path.join(process.cwd(), 'src');
const dependencies = [
  path.join(rootPath, 'data/config/wrap.js'),
  ...glob.sync(path.join(rootPath, 'data/pages/', '*.md'))
]

module.exports = class MyWebpackPlugin {
  constructor(options) {
    // 
  }

  apply(compiler) {
    // 添加额外编译监听
    compiler.hooks.afterCompile.tap("after-compile", compilation => {
      dependencies.forEach(item => {
        compilation.fileDependencies.add(item);
      });
    });

    // 监听编译文章
    if (isProd) {
      glob.sync(path.join(process.cwd(), 'src/data/posts', '**/meta.js')).forEach(filePath => {
        const name = path.dirname(filePath).split(path.sep).pop();
        updateMeta(name, false);
      });
    } else {      
      chokidar.watch(path.join(process.cwd(), 'src/data/posts', '**/*.*')).on('all', (e, filePath) => {
        const name = path.dirname(filePath).split(path.sep).pop();
        updateMeta(name, false);
      });
    }
  }
}
