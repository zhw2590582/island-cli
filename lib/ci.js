const path = require("path");
const exec = require('child_process').exec;
const logger = require("./logger");
const build = require('./build');
const configPath = path.join(process.cwd(), "src/data/config");
const { theme } = require(configPath);
const themeDist = path.join(process.cwd(), "src/theme", theme);

module.exports = function () {
    exec(`cd ${themeDist} && npm install`, function (err, stdout, stderr) {
        if (err) logger.fatal(err);
        build();
    });
}