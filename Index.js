const puppeteer = require("puppeteer");
const fs = require("fs");
const { runMain } = require("module");
let config = fs.readFileSync("config.json", "utf-8");
config = JSON.parse(config);
run();
async function run() {
  let browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  let pages = await browser.pages();
  const page = pages[0];
  await page.goto("https://www.hackerrank.com/");
  //click on login 1
  await page.waitForSelector(
    'a[href="https://www.hackerrank.com/access-account/"]'
  );
  await page.click('a[href="https://www.hackerrank.com/access-account/"]');
  //click on login 2
  await page.waitForSelector('a[href="https://www.hackerrank.com/login"]');
  await page.click('a[href="https://www.hackerrank.com/login"]');
  //click on USERNAME input field
  await page.waitForSelector('input[name="username"]');

  await page.type('input[name="username"]', config.userid, { delay: 100 });
  //click on PASSWORD input field

  await page.type('input[name="password"]', config.password, { delay: 100 });
  await page.waitForSelector('button[data-analytics="LoginPassword"]');
  await page.click('button[data-analytics="LoginPassword"]');
  // navbar click
  await page.waitForSelector('div[data-analytics="NavBarProfileDropDown"]');
  await page.click('div[data-analytics="NavBarProfileDropDown"]');
  await page.waitFor(3000);
  //navbar LI click
  await page.waitForSelector(
    'a[data-analytics="NavBarProfileDropDownAdministration"]'
  );
  await page.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
  // find pages
  //   await pages.waitForSelector('a[data-attr1="Last"]');
  //   let numPages = await page.$eval('a[data-attr1="Last"]', function (lastTag) {
  //     let numPages = parseInt(lastTag.getAttribute("data-page"));
  //     return numPages;
  //   });
  //move through all pages
  //   for(let i=0;i<numPages;i++){
  //       page.waitFor(1000);
  //       await page.waitForSelector("a[data-attr1='Right']");
  //       await page.click("a[data-attr1='Right']");
  //   }

  await page.waitFor(3000);

  browser.close();
}
