const path = require("path");
const logger = require("./logger");
const { downloadGit } = require("./utils");
const config = require("../config.json");

module.exports = function() {
  const rootDist = process.cwd();
  const themeDist = path.join(rootDist, "src/theme");
  downloadGit(config.init, rootDist).then(() => {
    downloadGit(config.theme.default.repository, themeDist).then(() => {
      logger.success(
        `Now, you can run development mode by: npm install && npm start`
      );
    });
  });
};
