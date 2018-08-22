const fs = require('fs-extra');
const path = require('path');
const glob = require("glob");
const inquirer = require('inquirer');
const slugify = require('@sindresorhus/slugify');
const { delMeta } = require("./utils");
const logger = require("./logger");

module.exports = function (postName) {
    const choices = glob.sync(path.join(process.cwd(), 'src/data/posts', '*')).map(filePath => path.basename(filePath));
    if (!postName) {
        inquirer.prompt([{
            type: 'list',
            message: 'Which article do you want to delete?',
            name: 'postName',
            choices: choices,
          }]).then(answers => {
            delPost(answers.postName)
          }).catch(err => {
            logger.fatal(err);
          });
    } else {
        delPost(postName)
    }

    function delPost(name) {
        name = slugify(name);
        const postDir = path.join(process.cwd(), 'src/data/posts', name);
        if (fs.existsSync(postDir)) {
            fs.removeSync(postDir);
            logger.success(`Successfully deleted: ${postDir}`);
            delMeta(name)
        } else {
            logger.fatal(`Directory does not exist: ${postDir}`);
        }
    }
}