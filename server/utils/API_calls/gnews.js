const { chromium } = require("playwright-chromium");
const cheerio = require("cheerio");
const { test, expect } = require("@playwright/test");

const searchGoogle = async (searchQuery) => {
  return new Promise(async (resolve) => {
    const browser = await chromium.launch({
      headless: true,
      chromiumSandbox: false,
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    });

    //
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(
      "https://www.google.com/search?q=" + searchQuery + "&tbm=nws"
    );

    try {
      await expect(page.locator("a[class=spell_orig]")).toBeVisible();

      let clickme = await page.locator("a[class=spell_orig]");
      let link = await clickme.getAttribute("href");
      await page.goto("https://google.com" + link);
    } catch {}

    await Promise.all([
      page.waitForSelector(".uhHOwf > img", {
        state: "visible",
      }),
    ]);

    const results = await page.content();
    await browser.close();
    const $ = cheerio.load(results);

    const thisOne = $("#search").find("div[class=MjjYud] > div>div");

    let data = [];

    thisOne.each(async function (i, parent) {
      let title = $(parent).find(".mCBkyc").text();
      let content = $(parent).find(".GI74Re").text();
      let img = $(parent).find(".uhHOwf > img").attr("src");
      let pubDate = $(parent).find(".OSrXXb > span").text();
      let link = $(parent).find(".WlydOe").attr("href");

      data.push({ title, content, img, pubDate, link });
      if (i == 5) {
        resolve(data);
      }
    });
  });
};

module.exports = { searchGoogle };
