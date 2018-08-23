const path = require("path");
const fs = require("fs-extra");
const logger = require("./logger");
const download = require("download-git-repo");
const ora = require("ora");
const glob = require("glob");
const writeJson = require("write-json");
const dayjs = require("dayjs");
const importFresh = require("import-fresh");
const markdownit = require("markdown-it")();
const he = require("he");
const dbPath = path.join(process.cwd(), "src/data/database/index.json");
const configPath = path.join(process.cwd(), "src/data/config");

exports.downloadGit = function downloadGit(git, dist) {
  return new Promise(resolve => {
    const spinner = ora(`Downloading repo: ${git}`);
    spinner.start();
    download(git, dist, function(err) {
      spinner.stop();
      if (err)
        logger.fatal(`Failed to download repo ${git}: ${err.message.trim()}`);
      logger.success(`Success to download repo ${git} to ${dist}`);
      resolve();
    });
  });
};

exports.pageList = function pageList() {
  const config = importFresh(configPath);
  const themePath = path.join(process.cwd(), "src/theme", config.theme);
  return glob.sync(path.join(themePath, '*.html')).map(htmlPath => {
    const filename = path.basename(htmlPath).toLowerCase();
    const chunkname = filename.replace(".html", "");
    return {
      filename: filename,
      chunkname: chunkname,
      chunk: path.join(themePath, 'js', `${chunkname}.js`),
      chunks: ["vendor", "common", chunkname],
      template: path.resolve(htmlPath)
    };
  });
};

exports.deleteFile = function deleteFile() {
  const htmlFile = glob.sync(path.join(process.cwd(), '*.html'));
  const staticFile = glob.sync(path.join(process.cwd(), 'static', '*')).filter(item => {
    return path.basename(item) !== 'img';
  });
  return [...htmlFile, ...staticFile];
}

exports.mdToText = function mdToText(md) {
  const truncateString = (str, num) =>
    str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + "..." : str;
  const config = importFresh(configPath);
  const htmlData = markdownit.render(md);
  const stripedHtml = htmlData.replace(/<[^>]*>/g, "").replace(/[\r\n]/g, "");
  const decodedStripedHtml = he.decode(stripedHtml);
  return truncateString(decodedStripedHtml, config.web.post.excerpt);
};

exports.readDb = function readDb() {
  return importFresh(dbPath);
};

exports.writeDb = function writeDb(data) {
  writeJson.sync(dbPath, data);
};

exports.resetDb = function resetDb() {
  exports.writeDb({
    posts: []
  });
};

exports.readMeta = function readMeta(name) {
  const { posts } = exports.readDb();
  const findItem = posts.find(item => item.name === name);
  return findItem;
};

exports.delMeta = function delMeta(name) {
  const db = exports.readDb();
  const findItem = db.posts.find(item => item.name === name);
  const findIndex = db.posts.indexOf(findItem);
  if (findIndex > -1) {
    db.posts.splice(findIndex, 1);
    exports.writeDb(db);
  }
};

exports.updateMeta = function updateMeta(name, creat = true) {
  const db = exports.readDb();
  const newMeta = importFresh(
    path.join(process.cwd(), "src/data/posts", `${name}/meta.js`)
  );
  const postData = fs.readFileSync(
    path.join(process.cwd(), "src/data/posts", `${name}/post.md`),
    "utf-8"
  );
  const excerpt = exports.mdToText(postData);
  const currentDate = dayjs().format("YYYY-MM-DD HH:mm:ss");
  const metaData = {
    ...newMeta,
    name: name,
    excerpt: excerpt,
    link: "/post.html?name=" + name
  };
  if (creat) {
    metaData.creatDate = currentDate;
    db.posts.unshift(metaData);
  } else {
    const findItem = db.posts.find(item => item.name === name);
    const findIndex = db.posts.indexOf(findItem);
    if (findIndex > -1) {
      db.posts[findIndex] = { ...findItem, ...metaData };
    } else {
      updateMeta(name, true);
    }
  }
  exports.writeDb(db);
};
