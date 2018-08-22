const logger = require('./logger');
const download = require('download-git-repo');
const ora = require('ora');

exports.downloadGit = function (git, dist) {
    return new Promise(resolve => {
        const spinner = ora(`Downloading repo: ${git}`);
        spinner.start();
        download(git, dist, function (err) {
            spinner.stop();
            if (err) logger.fatal(`Failed to download repo ${git}: ${err.message.trim()}`);
            logger.success(`Success to download repo ${git} to ${dist}`);
            resolve();
        })
    });
}