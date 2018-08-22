const serve = require("webpack-serve");
const webpackConfig = require("./webpack.config.js");
const configPath = path.join(process.cwd(), "src/data/config");
const config = require(configPath);

module.exports = function() {
  serve(
    {
      open: true,
      port: config.port
    },
    {
      config: webpackConfig
    }
  ).then(result => {
    //
  });
};
