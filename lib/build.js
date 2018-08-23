const path = require("path");

module.exports = function () {
    process.env.NODE_ENV = "production";
    console.log('build');
}