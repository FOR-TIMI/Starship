const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
var userAgent = require("user-agents");

const searchGoogle = async (searchQuery) => {
  return new Promise(async (resolve, reject) => {
    let browser;
    if (process.env.NODE_ENV == "production") {
      browser = await puppeteer.launch({
        headless: false,
        args: [
          "--no-sandbox",
          "--single-process",
          "--no-zygote",
          "--disable-gpu",
          "--disable-setuid-sandbox",
        ],
        ignoreDefaultArgs: ["--disable-extensions"],
        executablePath: "google-chrome",
        //
      });
    } else {
      browser = await puppeteer.launch();
    }
    //
    try {
      const page = await browser.newPage();
      await page.setUserAgent(userAgent.toString()); // added this

      await page.goto(
        "https://www.google.com/search?q=" + searchQuery + "&tbm=nws"
      );

      // //Finds input element with name attribue 'q' and types searchQuery
      // await page.type('input[name="q"]', searchQuery);

      // //   Finds an input with name 'btnK', after so it executes .click() DOM Method
      // await page.$eval("input[name=btnK]", (button) => button.click());

      //Wait for one of the div classes to load
      await page.waitForSelector(".uhHOwf > img", { visible: true });

      const results = await page.content();
      const $ = cheerio.load(results);

      const thisOne = $("#search").find("div[class=MjjYud] > div>div");

      // console.log(thisOne.length, "DKKDKDK");
      let data = [];

      //Iterate over all the divs found with class 'bkWMgd'
      thisOne.each(function (i, parent) {
        let title = $(parent).find(".mCBkyc").text();
        let content = $(parent).find(".GI74Re").text();
        let img = $(parent).find(".uhHOwf > img").attr("src");
        let pubDate = $(parent).find(".OSrXXb > span").text();
        let link = $(parent).find(".WlydOe").attr("href");

        data.push({ title, content, img, pubDate, link });
        if (i == 5) {
          // console.log(data, "THIS DATA");
          resolve(data);
          //hello
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { searchGoogle };
