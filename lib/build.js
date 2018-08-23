const path = require("path");
const webpack = require("webpack");
const logger = require("./logger");

module.exports = function () {
    process.env.NODE_ENV = "production";
    const webpackConfig = require("./webpack.config.js");
    webpack(webpackConfig, (err, stats) => {
        if (err) logger.fatal(err);
        logger.success(`Successfully build production`);
    })
}