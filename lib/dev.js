const path = require("path");
const serve = require("webpack-serve");

module.exports = function() {
  process.env.NODE_ENV = "development";
  const webpackConfig = require("./webpack.config.js");
  const configPath = path.join(process.cwd(), "src/data/config");
  const config = require(configPath);

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
