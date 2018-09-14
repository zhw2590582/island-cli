const path = require("path");
const exec = require('child_process').exec;
const logger = require("./logger");
const build = require('./build');

module.exports = function () {
    const configPath = path.join(process.cwd(), "src/data/config");
    const { theme } = require(configPath);
    const themeDist = path.join(process.cwd(), "src/theme", theme);
    exec(`cd ${themeDist} && npm install`, function (err, stdout, stderr) {
        if (err) logger.fatal(err);
        build();
    });
}