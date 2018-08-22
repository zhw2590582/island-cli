const path = require("path");
const fs = require('fs-extra');
const slugify = require('@sindresorhus/slugify');
const logger = require("./logger");
const { updateMeta } = require("./utils");

module.exports = function (name, showHelp) {
    if (!name) showHelp();
    const postName = slugify(name);
    const postDir = path.join(process.cwd(), 'src/data/posts', postName);

    if (fs.existsSync(postDir)) {
        logger.fatal(`The article directory already exists, please delete it first: island del ${postName}`);
    } else {
        fs.mkdirSync(path.join(postDir));
    }

    const creatFile = {
        markdown: {
            path: path.join(postDir, 'post.md'),
            data: `### ${postName}`
        },
        meta: {
            path: path.join(postDir, 'meta.js'),
            data: `module.exports = {\n  title: '${postName}',\n  type: '',\n  poster: '',\n  topic: '',\n  sticky: false\n}`
        }
    };

    Object.keys(creatFile).forEach(file => {
        const filePath = creatFile[file].path;
        const fileData = creatFile[file].data;
        fs.writeFileSync(filePath, fileData);
        logger.success(`Successfully created: ${filePath}`);
    });

    updateMeta(postName, true);
}