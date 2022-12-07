const { join } = require("path");

//change
module.exports = {
  cacheDirectory: join(__dirname, ".cache", "puppeteer"),
};
