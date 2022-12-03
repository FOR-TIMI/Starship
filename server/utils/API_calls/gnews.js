const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const searchGoogle = async (searchQuery) => {
  return new Promise(async (resolve) => {
    // console.log(searchQuery);
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto("https://www.google.com/webhp?tbm=nws");

    //Finds input element with name attribue 'q' and types searchQuery
    await page.type('input[name="q"]', searchQuery);

    //   Finds an input with name 'btnK', after so it executes .click() DOM Method
    await page.$eval("input[name=btnK]", (button) => button.click());

    //Wait for one of the div classes to load
    await page.waitForSelector(".uhHOwf > img");

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
  });
};

module.exports = { searchGoogle };
