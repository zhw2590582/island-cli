const path = require("path");
const fs = require('fs-extra');
const inquirer = require('inquirer');
const logger = require("./logger");
const { downloadGit } = require("./utils");
const config = require("../config.json");

module.exports = function(git, showHelp) {
  if (!git) showHelp();
  const hasSlash = git.indexOf("/") > -1;
  let gitUrl, themeName;
  if (hasSlash) {
    gitUrl = git;
    themeName = git.split("/")[1];
  } else {
    const officialTheme = config.theme[git];
    if (officialTheme) {
      gitUrl = officialTheme.repository;
      themeName = officialTheme.name;
    } else {
      logger.fatal(`Can't find official theme by name: ${git}`)
    }
  }
  const rootDist = process.cwd();
  const themeDist = path.join(rootDist, "src/theme", themeName);
  if (fs.existsSync(themeDist)) {
    inquirer.prompt([{
      type: 'confirm',
      message: 'Target directory exists and it will be overwrite. Continue?',
      name: 'ok'
    }]).then(answers => {
      answers.ok && downloanTheme();
    }).catch(logger.fatal);
  } else {
    downloanTheme()
  }

  function downloanTheme() {
    fs.removeSync(themeDist);
    downloadGit(gitUrl, themeDist).then(() => {
      logger.success(`Now, you can change config.js file to switch the theme`);
    });
  }
};
