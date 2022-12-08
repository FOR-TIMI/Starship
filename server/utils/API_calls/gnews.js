const playwright = require("playwright-chromium");
const cheerio = require("cheerio");

const searchGoogle = async (searchQuery) => {
  return new Promise(async (resolve) => {
    // console.log(searchQuery);
    let browser;
    if (process.env.NODE_ENV == "production") {
      browser = await playwright.chromium.launch({
        headless: true,
        chromiumSandbox: false,
        executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
        // executablePath: process.env.GOOGLE_CHROME_SHIM,
      });
    } else {
      browser = await playwright.chromium.launch({});
    }

    //
    const context = await browser.newContext();
    const page = await context.newPage();

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
  });
};

module.exports = { searchGoogle };
