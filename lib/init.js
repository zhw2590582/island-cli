const path = require("path");
const exec = require('child_process').exec;
const ora = require("ora");
const logger = require("./logger");
const { downloadGit } = require("./utils");
const config = require("../config.json");

module.exports = function () {
  const defaultTheme = config.theme.default;
  const rootDist = process.cwd();
  const themeDist = path.join(rootDist, "src/theme", defaultTheme.name);
  downloadGit(config.init, rootDist).then(() => {
    downloadGit(defaultTheme.repository, themeDist).then(() => {
      const spinner = ora(`Install dependencies for theme: ${defaultTheme.name}`);
      spinner.start();
      exec(`cd ${themeDist} && npm install`, function (err, stdout, stderr) {
        spinner.stop();
        if (err) logger.fatal(err);
        logger.success(stdout);
        logger.success(`Now, you can run development mode by: npm install && npm start`);
      });
    });
  });
};
