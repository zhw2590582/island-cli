const path = require("path");
const logger = require("./logger");
const { downloadGit } = require("./utils");
const config = require("../config.json");

module.exports = function() {
  const defaultTheme = config.theme.default;
  const rootDist = process.cwd();
  const themeDist = path.join(rootDist, "src/theme", defaultTheme.name);
  downloadGit(config.init, rootDist).then(() => {
    downloadGit(defaultTheme.repository, themeDist).then(() => {
      logger.success(
        `Now, you need to Install dependencies for the new theme by: cd src/theme/${defaultTheme.name} && npm install. Then, you can go back adn run development mode by: npm install && npm start`
      );
    });
  });
};
