const fs = require("fs-extra");
const path = require("path");
const glob = require("glob");
const inquirer = require("inquirer");
const { resetDb } = require("./utils");
const logger = require("./logger");

module.exports = function() {
  inquirer
    .prompt([
      {
        type: "confirm",
        message: "Confirm that you want to reset all article data?",
        name: "ok"
      }
    ])
    .then(answers => {
      if (answers.ok) {
        glob
          .sync(path.join(process.cwd(), 'src/data/posts', '*'))
          .forEach(item => fs.removeSync(item));
        resetDb();
        creatInitPost();
        logger.success(`Reset successful!`)
      }
    })
    .catch(err => {
        logger.fatal(err);
    });

  function creatInitPost() {
    const postDir = path.join(process.cwd(), 'src/data/posts', "hello-world");
    const creatFile = {
      markdown: {
        path: path.join(postDir, "post.md"),
        data: `Welcome to Islsnd. This is your first post. This is your first post. Edit or delete it and start blogging!`
      },
      meta: {
        path: path.join(postDir, "meta.js"),
        data: `module.exports = {\n  title: 'Hello World',\n  type: '',\n  poster: '',\n  topic: 'hello, world',\n  sticky: false\n}`
      }
    };

    fs.mkdirSync(path.join(postDir));
    Object.keys(creatFile).forEach(file => {
      const filePath = creatFile[file].path;
      const fileData = creatFile[file].data;
      fs.writeFileSync(filePath, fileData);
    });
  }
};
